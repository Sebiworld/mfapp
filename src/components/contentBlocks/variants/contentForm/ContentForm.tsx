import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";
import React, { useCallback, useId, useMemo, useState } from "react";
import { contentFormStyles } from "./contentForm.styles";
import { FormGroupedElement } from "@models/utility-types/form-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { ContentFormGroup } from "./components/ContentFormGroup";
import { useTranslation } from "react-i18next";
import { pageApi } from "@api/axios/pageApi";
import { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";
import axios from "axios";
import { toast } from "react-toastify";
import { zod } from "@utils/i18n/i18n";
import { superRefineIsNotEmpty } from "@utils/functions/zod/superRefineIsNotEmpty";
import { ContentFormInputCheckbox } from "./components/ContentFormInputCheckbox";
import { isValidObject } from "@utils/functions/isValidObject";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { SectionFormDto } from "@models/section/section-form.model";
import { useReward } from "react-rewards";
import { useGlobalStore } from "@src/store/global.store";
import { useLocation } from "react-router";
import { selectProjects } from "@src/store/projects/projects.selectors";
import { useAppContext } from "@src/context/appContext/useAppContext";

export interface FormMessage {
  id: string;
  type: "error" | "success" | "info" | "warning";
  title?: string;
  message: string;
}

export interface ContentTextProps {
  block: ContentBlockFormDto | SectionFormDto;
}

export const ContentForm: React.FC<ContentTextProps> = ({ block }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;
  const appContext = useAppContext();

  const loadedProjects = useGlobalStore(selectProjects);
  const projectColors = useMemo(() => {
    if (!isValidObject(loadedProjects)) {
      return undefined;
    }

    return Object.values(loadedProjects).reduce((acc, curr) => {
      if (curr?.color) {
        acc.push(`#${curr.color}`);
      }
      return acc;
    }, [] as string[]);
  }, [loadedProjects]);

  const rewardId = useId();
  const { reward, isAnimating: isRewardAnimating } = useReward(
    rewardId,
    "balloons",
    {
      position: "absolute",
      colors: projectColors,
    }
  );

  const blockDepth = useMemo(() => {
    if ((block as ContentBlockFormDto)?.depth !== undefined) {
      return (block as ContentBlockFormDto).depth;
    }

    return undefined;
  }, [block]);

  const classes: string = useMemo(() => {
    if (!block?.id) {
      return "";
    }

    const output: string[] = ["content-block", "layout-block", "content-form"];

    if (blockDepth !== undefined) {
      output.push(`block-depth-${blockDepth}`);
    }

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block?.classes, blockDepth, block?.id]);

  const groupedFields = useMemo((): FormGroupedElement => {
    const output: FormGroupedElement = { fields: [], type: "group" };

    if (!isValidArray(block?.form?.fields)) {
      return output;
    }

    const cursors: FormGroupedElement[] = []; // Is used to hold the current group object when in multi-level groups.
    for (const fieldData of block.form.fields) {
      if (!fieldData?.id) {
        continue;
      }

      if (fieldData?.type === "fieldset_open") {
        // Start new group
        cursors.push({
          ...fieldData,
          fields: [],
          type: "group",
        });
        output.fields.push(cursors[cursors.length - 1]);
      } else if (fieldData?.type === "fieldset_close") {
        // Close current group
        cursors.pop();
      } else {
        if (cursors.length) {
          // Cursor exists => add element inside group
          cursors[cursors.length - 1].fields.push(fieldData);
        } else {
          output.fields.push(fieldData);
        }
      }
    }

    return output;
  }, [block?.form?.fields]);

  const validationSchema = useMemo(() => {
    const fieldValidations: { [key: string]: ZodTypeAny } = {
      data: zod.optional(zod.boolean()),
    };

    if (isValidArray(block?.form?.fields)) {
      for (const fieldData of block.form.fields) {
        if (!fieldData?.id) {
          continue;
        }

        if (
          fieldData?.type === "fieldset_open" ||
          fieldData?.type === "fieldset_close"
        ) {
          continue;
        }

        console.log('Field: ', fieldData);

        if (fieldData.type === "checkbox") {
          fieldValidations[fieldData.name] = zod.optional(
            zod.preprocess((value) => {
              return (
                value === "on" ||
                value === true ||
                value === "1" ||
                value === 1 ||
                value === "checked"
              );
            }, zod.boolean())
          );

          if (fieldData.required) {
            fieldValidations[fieldData.name] = zod
              .preprocess((value) => {
                return (
                  value === "on" ||
                  value === true ||
                  value === "1" ||
                  value === 1 ||
                  value === "checked"
                );
              }, zod.boolean())
              .refine((val) => val === true, {
                message: t("error.form_checkbox_required"),
              });
          }
        } else if (fieldData.type === "options") {
          fieldValidations[fieldData.name] = zod.nullable(
            zod.array(zod.union([zod.string(), zod.number()]))
          );

          if (fieldData.required) {
            fieldValidations[fieldData.name] = zod
              .array(zod.union([zod.string(), zod.number()]))
              .min(1);
          }
        } else {
          fieldValidations[fieldData.name] = zod.string();

          if (fieldData.required) {
            fieldValidations[fieldData.name] = zod
              .string()
              // .min(1)
              .superRefine(superRefineIsNotEmpty);
          }
        }
      }
    }

    return zod.object(fieldValidations);
  }, [block?.form?.fields, t]);

  type FormData = zod.infer<typeof validationSchema>;

  const formDataDefaults: FormData = useMemo(() => {
    const output: FormData = {};

    if (isValidArray(block?.form?.fields)) {
      for (const fieldData of block.form.fields) {
        if (!fieldData?.id) {
          continue;
        }

        if (
          fieldData?.type === "fieldset_open" ||
          fieldData?.type === "fieldset_close"
        ) {
          continue;
        }

        if (fieldData.type === "options" && fieldData.isMultiselect) {
          output[fieldData.name] = [];
        } else {
          output[fieldData.name] = "";
        }
      }
    }

    return output;
  }, [block?.form?.fields]);

  const {
    handleSubmit,
    control,
    formState: { errors: localFormErrors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: formDataDefaults,
  });

  // useEffect(() => {
  //   console.log("groupedFields", groupedFields);
  // }, [groupedFields]);

  // const submitForm = useCallback(
  //   async (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     console.log("Form Submit", event);

  //     const response = await pageApi.submitPageForm(
  //       "kontakt",
  //       block.form.form_origin
  //     );

  //     console.log("RESPONSE", response);
  //   },
  //   [block.form.form_origin]
  // );

  const [formValidationResponse, setFormValidationResponse] = useState<
    FormValidationResponseDto | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      if (loading) {
        return;
      }

      setLoading(true);

      try {
        const response = await pageApi.submitPageForm(
          currentPath,
          block.form.form_origin,
          data
        );

        if (response?.status !== 200) {
          throw new Error(
            t("error.form_submit_error", {
              code: response?.status,
              message: response?.statusText,
            })
          );
        }

        if (!isRewardAnimating) {
          reward();
        }

        const matomo = appContext?.matomoInstance;
        if (matomo) {
          matomo.trackEvent(
            "form",
            "submit",
            "success",
            response?.data?.request_id
          );
        }

        if (response?.data?.success?.finished) {
          toast.success(response.data.success.finished, {
            toastId: "form_submit_succes",
          });
        } else {
          toast.success(t("general.form-submit-success"), {
            toastId: "form_submit_succes",
          });
        }

        setFormValidationResponse(response.data);
      } catch (error) {
        console.error("Api Request error", error);

        const matomo = appContext?.matomoInstance;
        if (matomo) {
          matomo.trackEvent("form", "submit", "error");
        }

        if (axios.isAxiosError(error)) {
          toast.error(
            t("error.general_message_code", {
              message: error.message,
              code: error.code,
            }),
            { toastId: "form_submit_error" }
          );

          setFormValidationResponse(error.response?.data);
        } else {
          toast.error(
            t("error.general_message_code", {
              message: (error as { message?: string })?.message || "Unknown",
              code: "unknown",
            }),
            { toastId: "form_submit_error" }
          );
        }
      }
      setLoading(false);
    },
    [
      appContext?.matomoInstance,
      block.form.form_origin,
      currentPath,
      isRewardAnimating,
      loading,
      reward,
      t,
    ]
  );

  const formState = useMemo((): undefined | "error" | "success" => {
    if (formValidationResponse?.success) {
      return "success";
    }

    if (formValidationResponse?.error) {
      return "error";
    }

    if (isValidObject(localFormErrors)) {
      const errorKeys = Object.keys(localFormErrors);
      if (errorKeys.length) {
        return "error";
      }
    }

    return undefined;
  }, [
    formValidationResponse?.error,
    formValidationResponse?.success,
    localFormErrors,
  ]);

  const formMessages = useMemo((): FormMessage[] => {
    const output: FormMessage[] = [];

    if (isValidObject(localFormErrors)) {
      const errorKeys = Object.keys(localFormErrors);
      if (errorKeys.length) {
        output.push({
          id: "local-form-errors",
          type: "error",
          title: t("error.form_error.title"),
          message: t("error.form_error.description"),
        });
      }
    }

    if (isValidObject(formValidationResponse?.error)) {
      for (const [key, value] of Object.entries(formValidationResponse.error)) {
        output.push({
          id: key,
          type: "error",
          message: value,
        });
      }
    }

    if (isValidObject(formValidationResponse?.success)) {
      for (const [key, value] of Object.entries(
        formValidationResponse.success
      )) {
        output.push({
          id: key,
          type: "success",
          message: value,
        });
      }
    }

    return output;
  }, [
    formValidationResponse?.error,
    formValidationResponse?.success,
    localFormErrors,
    t,
  ]);

  if (!groupedFields?.fields?.length) {
    return null;
  }

  return (
    <Box
      className={classes}
      sx={contentFormStyles}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <ContentFormGroup
        item={groupedFields}
        isRoot={true}
        control={control}
        errors={localFormErrors}
        formValidationResponse={formValidationResponse}
      ></ContentFormGroup>

      <ContentFormInputCheckbox
        item={{
          type: "checkbox",
          name: "data",
          id: "data",
          label: "Data",
        }}
        control={control}
        errors={localFormErrors}
        formValidationResponse={formValidationResponse}
        classes={["hp-field"]}
        checkboxProps={{
          inputProps: {
            autoComplete: "new-password",
          },
        }}
      ></ContentFormInputCheckbox>

      {!!formMessages?.length && (
        <Box className="form-messages">
          {formMessages?.map((message) => (
            <Alert variant="filled" severity={message.type} key={message.id}>
              {!!message.title && <AlertTitle>{message.title}</AlertTitle>}
              {message.message}
            </Alert>
          ))}
        </Box>
      )}

      <Box className="form-actions">
        <Button
          variant="contained"
          color={formState || "projectPrimary"}
          size="large"
          type="submit"
          loading={loading}
          startIcon={
            formState === "error" ? (
              <ClearIcon />
            ) : formState === "success" ? (
              <CheckIcon />
            ) : undefined
          }
        >
          {t("general.actions.submit")}
        </Button>

        <Box component="span" id={rewardId} />
      </Box>
    </Box>
  );
};
