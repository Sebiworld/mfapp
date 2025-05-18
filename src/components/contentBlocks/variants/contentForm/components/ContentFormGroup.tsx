import React, { useMemo } from "react";
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

  return (
    <Box className={classes}>
      {!isRoot &&
        (item.label ? (
          <Typography variant="h3" className="form-group-label layout-block">
            <hr />
            {item.label}
            <hr />
          </Typography>
        ) : (
          <Box className="title-placeholder"></Box>
        ))}

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
