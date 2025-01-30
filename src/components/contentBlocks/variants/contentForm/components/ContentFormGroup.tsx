import React from "react";
import { FormGroupedElement } from "@models/utility-types/form-dto.model";
import { ContentFormInput } from "./ContentFormInput";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";

export interface ContentFormGroupProps {
  item: FormGroupedElement;
  isRoot?: boolean;
  control?: Control<FieldValues>;
  errors?: FieldErrors;
  formValidationResponse?: FormValidationResponseDto;
}

export const ContentFormGroup: React.FC<ContentFormGroupProps> = ({
  item,
  isRoot,
  control,
  errors,
  formValidationResponse,
}) => {
  return (
    <Box className={`form-group ${isRoot ? "root" : ""}`}>
      {!isRoot &&
        (item.label ? (
          <Typography variant="h3" className="form-group-label">
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
