import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { contentFormStyles } from "./contentForm.styles";
import { FormGroupedElement } from "@models/utility-types/form-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { ContentFormGroup } from "./components/ContentFormGroup";
import { useTranslation } from "react-i18next";
import { pageApi } from "@api/pageApi";
import { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";
import axios from "axios";
import { toast } from "react-toastify";
import { zod } from "@utils/i18n/i18n";
import { superRefineIsNotEmpty } from "@utils/functions/zod/superRefineIsNotEmpty";

export interface ContentTextProps {
  block: ContentBlockFormDto;
}

export const ContentForm: React.FC<ContentTextProps> = ({ block }) => {
  const { t } = useTranslation();

  const classes: string = useMemo(() => {
    if (!block?.id) {
      return "";
    }

    const output: string[] = [
      "content-block",
      "content-form",
      `block-depth-${block.depth}`,
    ];

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block?.classes, block?.depth, block?.id]);

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

  useEffect(() => {
    console.log("block", block);
  }, [block]);

  const validationSchema = useMemo(() => {
    const fieldValidations: { [key: string]: ZodTypeAny } = {};

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

        if (fieldData.type === "checkbox") {
          fieldValidations[fieldData.id] = zod.optional(zod.boolean());

          if (fieldData.required) {
            fieldValidations[fieldData.id] = zod.boolean();
          }
        } else if (fieldData.type === "options") {
          fieldValidations[fieldData.id] = zod.nullable(
            zod.array(zod.union([zod.string(), zod.number()]))
          );

          if (fieldData.required) {
            fieldValidations[fieldData.id] = zod
              .array(zod.union([zod.string(), zod.number()]))
              .min(1);
          }
        } else {
          fieldValidations[fieldData.id] = zod.string();

          if (fieldData.required) {
            fieldValidations[fieldData.id] = zod
              .string()
              // .min(1)
              .superRefine(superRefineIsNotEmpty);
          }
        }
      }
    }

    return zod.object(fieldValidations);
  }, [block?.form?.fields]);

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
          output[fieldData.id] = [];
        } else {
          output[fieldData.id] = "";
        }
      }
    }

    return output;
  }, [block?.form?.fields]);

  const {
    handleSubmit,
    control,
    formState: { errors },
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
      setLoading(true);
      try {
        const response = await pageApi.submitPageForm(
          "kontakt",
          block.form.form_origin,
          data
        );
        console.log("response", response);
        setFormValidationResponse(response.data);
      } catch (error) {
        console.log("ERROR", error);
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
    [block.form.form_origin, t]
  );

  React.useEffect(() => {
    console.log("ERRORS---", errors);
  }, [errors]);

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
        errors={errors}
        formValidationResponse={formValidationResponse}
      ></ContentFormGroup>

      <Box className="form-actions">
        <Button
          variant="contained"
          size="large"
          type="submit"
          loading={loading}
        >
          {t("general.actions.submit")}
        </Button>
      </Box>
    </Box>
  );
};
