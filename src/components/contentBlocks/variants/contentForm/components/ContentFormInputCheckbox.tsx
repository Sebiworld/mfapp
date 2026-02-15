import React, { useMemo } from "react";
import { FormInputCheckbox } from "@models/utility-types/form-dto.model";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { Box, Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { parseHtml } from "@utils/functions/parseHtml";

export interface ContentFormInputCheckboxProps {
  item: FormInputCheckbox;
  control?: Control<FieldValues>;
  errors?: FieldErrors;
  formValidationResponse?: FormValidationResponseDto;
  classes?: string[];
  inputClasses?: string[];
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
}

export const ContentFormInputCheckbox: React.FC<
  ContentFormInputCheckboxProps
> = ({
  item,
  control,
  errors,
  formValidationResponse,
  classes: customClasses,
  inputClasses: customInputClasses,
  checkboxProps,
}) => {
  const fieldValidationState = useMemo(
    () => formValidationResponse?.fields?.[item.name],
    [formValidationResponse?.fields, item.name]
  );

  // const fieldError = useMemo((): ReactNode => {
  //   // Local zod validation errors
  //   if (errors?.[item.name]?.message) {
  //     return errors?.[item.name]?.message as string;
  //   }

  //   // Server side errors
  //   if (
  //     isValidArray(fieldValidationState?.error) &&
  //     fieldValidationState.error.length
  //   ) {
  //     return fieldValidationState.error.map((error, index) => (
  //       <>
  //         {index !== 0 && <br />}
  //         {error}
  //       </>
  //     ));
  //   }

  //   return "";
  // }, [errors, fieldValidationState, item.name]);

  const fieldSuccess = useMemo(() => {
    return fieldValidationState?.isSuccessful;
  }, [fieldValidationState]);

  const classes = useMemo((): string => {
    const output: string[] = [
      "content-form-input",
      "layout-block",
      "content-form-input-checkbox",
      `type-${item.type}`,
    ];

    if (fieldSuccess) {
      output.push("successful");
    }

    if (isValidArray(customClasses)) {
      output.push(...customClasses);
    }

    return output.join(" ");
  }, [customClasses, fieldSuccess, item.type]);

  const inputClasses = useMemo((): string => {
    const output: string[] = ["input-checkbox"];

    if (fieldSuccess) {
      output.push("successful");
    }

    if (isValidArray(customInputClasses)) {
      output.push(...customInputClasses);
    }

    return output.join(" ");
  }, [customInputClasses, fieldSuccess]);

  const label = useMemo(() => {
    if (!item.label) {
      return null;
    }

    return parseHtml(item.label);
  }, [item.label]);

  const description = useMemo(() => {
    if (!item.description) {
      return null;
    }

    return parseHtml(item.description);
  }, [item.description]);

  return (
    <FormControl
      required={item?.required}
      error={Boolean(errors?.[item.name])}
      className={classes}
      // helperText={(errors?.[item.name]?.message as string) || ""}
    >
      {control ? (
        <Controller
          render={({ field }) => (
            <FormControlLabel
              className="form-input-label-container"
              label={
                <>
                  {label && <Box className="form-input-label">{label}</Box>}

                  {description && (
                    <Box className="form-input-description">{description}</Box>
                  )}

                  {errors?.[item.name]?.message && (
                    <Box className="form-input-error">
                      {errors?.[item.name]?.message as string}
                    </Box>
                  )}
                </>
              }
              control={
                <Checkbox
                  {...checkboxProps}
                  {...field}
                  className={inputClasses}
                ></Checkbox>
              }
            ></FormControlLabel>
          )}
          control={control}
          name={item.name}
        />
      ) : (
        <Checkbox
          {...checkboxProps}
          name={item.name}
          className={`${fieldSuccess ? "successful" : ""}`}
        ></Checkbox>
      )}
    </FormControl>
  );
};
