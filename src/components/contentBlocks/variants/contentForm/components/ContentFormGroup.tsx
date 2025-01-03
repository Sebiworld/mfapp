import { Box, Typography } from "@mui/joy";
import React from "react";
import { FormGroupedElement } from "@models/utility-types/form-dto.model";
import { ContentFormInput } from "./ContentFormInput";
import { Control, FieldValues } from "react-hook-form";

export interface ContentFormGroupProps {
  item: FormGroupedElement;
  isRoot?: boolean;
  control?: Control<FieldValues>;
}

export const ContentFormGroup: React.FC<ContentFormGroupProps> = ({
  item,
  isRoot,
  control,
}) => {
  return (
    <Box className={`form-group ${isRoot ? "root" : ""}`}>
      {!isRoot &&
        (item.label ? (
          <Typography level="h3" className="form-group-label">
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
              ></ContentFormGroup>
            );
          }

          return (
            <ContentFormInput
              key={fieldData.id}
              item={fieldData}
              control={control}
            ></ContentFormInput>
          );
        })}
    </Box>
  );
};
