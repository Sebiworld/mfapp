import React, { useId, useMemo } from "react";
import {
  FormGroupedElement,
  FormInputTextVariant,
} from "@models/utility-types/form-dto.model";
import { ContentFormInput } from "./ContentFormInput";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";
import { isTextInputType } from "../functions/isTextInputType";
import { ContentFormInputText } from "./ContentFormInputText";
import { ContentFormInputCheckbox } from "./ContentFormInputCheckbox";
import { isValidArray } from "@utils/functions/isValidArray";
import { parseHtml } from "@utils/functions/parseHtml";

/** A `{{name}}` the CMS did not replace, because no text was entered for it. */
const UNFILLED_PLACEHOLDER = /\{\{\s*[\w-]+\s*\}\}/;

export interface ContentFormGroupProps {
  item: FormGroupedElement;
  isRoot?: boolean;
  control?: Control<FieldValues>;
  errors?: FieldErrors;
  formValidationResponse?: FormValidationResponseDto;
  classes?: string[];
}

export const ContentFormGroup: React.FC<ContentFormGroupProps> = ({
  item,
  isRoot,
  control,
  errors,
  formValidationResponse,
  classes: customClasses,
}) => {
  const classes = useMemo((): string => {
    const output: string[] = ["form-group"];

    if (isRoot) {
      output.push("root");
    }

    if (isValidArray(customClasses)) {
      output.push(...customClasses);
    }

    return output.join(" ");
  }, [customClasses, isRoot]);

  const labelId = useId();
  const hasLabel = !isRoot && !!item.label;

  const description = useMemo(() => {
    if (
      isRoot ||
      !item.description ||
      UNFILLED_PLACEHOLDER.test(item.description)
    ) {
      return null;
    }

    return parseHtml(item.description);
  }, [isRoot, item.description]);

  return (
    <Box
      className={classes}
      role={isRoot ? undefined : "group"}
      aria-labelledby={hasLabel ? labelId : undefined}
    >
      {hasLabel && (
        <Typography
          variant="h3"
          id={labelId}
          className="form-group-label layout-block"
        >
          {item.label}
        </Typography>
      )}

      {!!description && (
        <Box className="form-group-description layout-block">{description}</Box>
      )}

      {!!item?.fields?.length &&
        item.fields.map((fieldData) => {
          if (!fieldData.id) {
            return;
          }

          if (fieldData.type === "antispam_code") {
            return;
          }

          if (fieldData.type === "group") {
            return (
              <ContentFormGroup
                key={fieldData.id}
                item={fieldData}
                control={control}
                errors={errors}
                formValidationResponse={formValidationResponse}
              ></ContentFormGroup>
            );
          }

          if (isTextInputType(fieldData.type)) {
            return (
              <ContentFormInputText
                key={fieldData.id}
                item={fieldData as FormInputTextVariant}
                control={control}
                errors={errors}
                formValidationResponse={formValidationResponse}
              ></ContentFormInputText>
            );
          }

          if (fieldData.type === "checkbox") {
            return (
              <ContentFormInputCheckbox
                key={fieldData.id}
                item={fieldData}
                control={control}
                errors={errors}
                formValidationResponse={formValidationResponse}
              ></ContentFormInputCheckbox>
            );
          }

          return (
            <ContentFormInput
              key={fieldData.id}
              item={fieldData}
              control={control}
              errors={errors}
              formValidationResponse={formValidationResponse}
            ></ContentFormInput>
          );
        })}
    </Box>
  );
};
