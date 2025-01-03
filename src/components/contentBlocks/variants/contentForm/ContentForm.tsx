import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";
import { Box, Button } from "@mui/joy";
import React, { FormEvent, useCallback, useEffect, useMemo } from "react";
import { contentFormStyles } from "./contentForm.styles";
import { FormGroupedElement } from "@models/utility-types/form-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { ContentFormGroup } from "./components/ContentFormGroup";
import { useTranslation } from "react-i18next";
import { pageApi } from "@api/pageApi";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

export interface ContentTextProps {
  block: ContentBlockFormDto;
}

export const ContentForm: React.FC<ContentTextProps> = ({ block }) => {
  const { t } = useTranslation();

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
          fieldValidations[fieldData.id] = z.optional(z.boolean());

          if (fieldData.required) {
            fieldValidations[fieldData.id] = z.boolean();
          }
        } else if (fieldData.type === "options") {
          fieldValidations[fieldData.id] = z.nullable(
            z.array(z.union([z.string(), z.number()]))
          );

          if (fieldData.required) {
            fieldValidations[fieldData.id] = z
              .array(z.union([z.string(), z.number()]))
              .min(1);
          }
        } else {
          fieldValidations[fieldData.id] = z.string();

          if (fieldData.required) {
            fieldValidations[fieldData.id] = z.string().min(1);
          }
        }
      }
    }

    return z.object(fieldValidations);
  }, [block?.form?.fields]);

  type FormData = z.infer<typeof validationSchema>;

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

  useEffect(() => {
    console.log("state", errors);
  }, [errors]);

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

  const onSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    console.log("submit2", data);
  }, []);

  if (!groupedFields?.fields?.length) {
    return null;
  }

  return (
    <Box
      className={`content-block content-form ${block.classes}`}
      sx={contentFormStyles}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <ContentFormGroup
        item={groupedFields}
        isRoot={true}
        control={control}
      ></ContentFormGroup>

      <Box className="form-actions">
        <Button type="submit" size="lg">
          {t("general.actions.submit")}
        </Button>
      </Box>
    </Box>
  );
};
