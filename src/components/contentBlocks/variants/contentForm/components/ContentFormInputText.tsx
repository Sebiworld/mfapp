import React, { ReactNode, useId, useMemo } from "react";
import { FormInputTextVariant } from "@models/utility-types/form-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";
import Check from "@mui/icons-material/Check";
import { autocompleteNamesMap } from "../functions/autocompleteNamesMap";
import { parseHtml } from "@utils/functions/parseHtml";

export interface ContentFormInputTextProps {
  item: FormInputTextVariant;
  control?: Control<FieldValues>;
  errors?: FieldErrors;
  formValidationResponse?: FormValidationResponseDto;
  classes?: string[];
  inputClasses?: string[];
  id?: string;
}

export const ContentFormInputText: React.FC<ContentFormInputTextProps> = ({
  item,
  control,
  errors,
  formValidationResponse,
  classes: customClasses,
  inputClasses: customInputClasses,
  id,
}) => {
  const autoId = useId();
  const inputId = id || autoId;

  const fieldValidationState = useMemo(
    () => formValidationResponse?.fields?.[item.name],
    [formValidationResponse?.fields, item.name]
  );

  const fieldError = useMemo((): ReactNode => {
    // Local zod validation errors
    if (errors?.[item.name]?.message) {
      return errors?.[item.name]?.message as string;
    }

    // Server side errors
    if (
      isValidArray(fieldValidationState?.error) &&
      fieldValidationState.error.length
    ) {
      return fieldValidationState.error.map((error, index) => (
        <>
          {index !== 0 && <br />}
          {error}
        </>
      ));
    }

    return "";
  }, [errors, fieldValidationState, item.name]);

  const fieldSuccess = useMemo(() => {
    return fieldValidationState?.isSuccessful;
  }, [fieldValidationState]);

  const classes = useMemo((): string => {
    const output: string[] = [
      "content-form-input",
      "layout-block",
      "content-form-input-text",
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
    const output: string[] = ["input-field"];

    if (fieldSuccess) {
      output.push("successful");
    }

    if (isValidArray(customInputClasses)) {
      output.push(...customInputClasses);
    }

    return output.join(" ");
  }, [customInputClasses, fieldSuccess]);

  const inputElement = useMemo(() => {
    const autocompleteName = autocompleteNamesMap[item.name];

    const inputProps = {
      "aria-labelledby": `${inputId}-label`,
      "aria-describedby": item.description
        ? `${inputId}-description`
        : undefined,
      autoComplete: autocompleteName,
      endAdornment: (
        <InputAdornment position="end" className="success-marker">
          <Check color="success" />
        </InputAdornment>
      ),
    };

    if (item.type === "text") {
      if (!control) {
        return (
          <TextField
            name={item.name}
            error={!!fieldError}
            helperText={fieldError}
            className={inputClasses}
            id={`${inputId}-input`}
            slotProps={{
              input: inputProps,
            }}
          ></TextField>
        );
      }

      return (
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              error={!!fieldError}
              helperText={fieldError}
              className={inputClasses}
              id={`${inputId}-input`}
              slotProps={{
                input: inputProps,
              }}
            ></TextField>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "number") {
      if (!control) {
        return (
          <TextField
            type="number"
            name={item.name}
            error={!!fieldError}
            helperText={fieldError}
            className={inputClasses}
            id={`${inputId}-input`}
            slotProps={{
              input: inputProps,
            }}
          ></TextField>
        );
      }

      return (
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              error={!!fieldError}
              helperText={fieldError}
              className={inputClasses}
              id={`${inputId}-input`}
              slotProps={{
                input: inputProps,
              }}
            ></TextField>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "email") {
      if (!control) {
        return (
          <TextField
            type="email"
            name={item.name}
            error={!!fieldError}
            helperText={fieldError}
            className={inputClasses}
            id={`${inputId}-input`}
            slotProps={{
              input: inputProps,
            }}
          ></TextField>
        );
      }

      return (
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              error={!!fieldError}
              helperText={fieldError}
              className={inputClasses}
              id={`${inputId}-input`}
              slotProps={{
                input: inputProps,
              }}
            ></TextField>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "textarea") {
      if (!control) {
        return (
          <TextField
            name={item.name}
            minRows={2}
            multiline
            error={!!fieldError}
            helperText={fieldError}
            className={inputClasses}
            id={`${inputId}-input`}
            slotProps={{
              input: inputProps,
            }}
          ></TextField>
        );
      }

      return (
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              minRows={2}
              multiline
              error={!!fieldError}
              helperText={fieldError}
              className={inputClasses}
              id={`${inputId}-input`}
              slotProps={{
                input: inputProps,
              }}
            ></TextField>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (!control) {
      return (
        <TextField
          name={item.name}
          className={inputClasses}
          id={`${inputId}-input`}
          slotProps={{
            input: inputProps,
          }}
        ></TextField>
      );
    }

    return (
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            error={Boolean(errors?.[item.name])}
            helperText={(errors?.[item.name]?.message as string) || ""}
            className={inputClasses}
            id={`${inputId}-input`}
            slotProps={{
              input: inputProps,
            }}
          ></TextField>
        )}
        control={control}
        name={item.name}
      />
    );
  }, [
    inputId,
    item.description,
    item.type,
    item.name,
    control,
    fieldError,
    inputClasses,
    errors,
  ]);

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
      <FormLabel
        className="form-input-label"
        // slotProps={{ asterisk: { title: t("general.required") } }}
        id={`${inputId}-label`}
        htmlFor={`${inputId}-input`}
      >
        {label}
      </FormLabel>

      {description && (
        <Box className="form-input-description" id={`${inputId}-description`}>
          {description}
        </Box>
      )}

      {inputElement}
    </FormControl>
  );
};
