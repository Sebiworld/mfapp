import React, { ReactNode, useId, useMemo } from "react";
import {
  FormElementDto,
  FormInputVariant,
} from "@models/utility-types/form-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { useTranslation } from "react-i18next";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";
import Check from "@mui/icons-material/Check";
import { autocompleteNamesMap } from "../functions/autocompleteNamesMap";

export interface ContentFormInputProps {
  item: FormInputVariant | FormElementDto;
  control?: Control<FieldValues>;
  errors?: FieldErrors;
  formValidationResponse?: FormValidationResponseDto;
  classes?: string[];
  inputClasses?: string[];
  id?: string;
}

export const ContentFormInput: React.FC<ContentFormInputProps> = ({
  item,
  control,
  errors,
  formValidationResponse,
  classes: customClasses,
  inputClasses: customInputClasses,
  id,
}) => {
  const { t } = useTranslation();
  const fieldValidationState = useMemo(
    () => formValidationResponse?.fields?.[item.name],
    [formValidationResponse?.fields, item.name]
  );

  const autoId = useId();
  const inputId = id || autoId;

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
    const output: string[] = [];

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
      autocomplete: autocompleteName,
      endAdornment: (
        <InputAdornment position="end" className="success-marker">
          <Check color="success" />
        </InputAdornment>
      ),
    };

    if (item.type === "antispam_code") {
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

    if (item.type === "markup") {
      return (
        <Box
          className="form-markup"
          aria-labelledby={`${inputId}-label`}
          aria-describedby={
            item.description ? `${inputId}-description` : undefined
          }
          dangerouslySetInnerHTML={{ __html: item.value as string }}
        ></Box>
      );
    }

    if (item.type === "checkbox") {
      if (!control) {
        return (
          <Checkbox
            name={item.name}
            className={inputClasses}
            id={`${inputId}-input`}
            aria-labelledby={`${inputId}-label`}
            aria-describedby={
              item.description ? `${inputId}-description` : undefined
            }
          ></Checkbox>
        );
      }

      return (
        <Controller
          render={({ field }) => (
            <Checkbox
              {...field}
              className={inputClasses}
              id={`${inputId}-input`}
              aria-labelledby={`${inputId}-label`}
              aria-describedby={
                item.description ? `${inputId}-description` : undefined
              }
            ></Checkbox>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "options") {
      if (!item?.options?.length) {
        return <></>;
      }

      if (item.isMultiselect) {
        if (!control) {
          let v;
          if (isValidArray(item.value)) {
            v = item.value as string[];
          } else if (typeof item.value === "string") {
            v = [item.value];
          }

          return (
            <Select
              multiple
              name={item.name}
              value={v}
              error={Boolean(errors?.[item.name])}
              className={inputClasses}
              id={`${inputId}-input`}
              aria-labelledby={`${inputId}-label`}
              aria-describedby={
                item.description ? `${inputId}-description` : undefined
              }
            >
              {item.options?.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          );
        }

        return (
          <Controller
            defaultValue={[]}
            render={({ field: { value, ...field } }) => {
              let v: (string | number)[];
              if (isValidArray(value)) {
                v = value as (string | number)[];
              } else if (
                typeof value === "string" ||
                typeof value === "number"
              ) {
                v = [value];
              } else {
                v = [];
              }

              return (
                <Select
                  {...field}
                  multiple
                  defaultValue={[]}
                  value={v}
                  error={Boolean(errors?.[item.name])}
                  id={`${inputId}-input`}
                  labelId={`${inputId}-label`}
                  aria-describedby={
                    item.description ? `${inputId}-description` : undefined
                  }
                  className={inputClasses}
                  // sx={{ minWidth: "13rem" }}
                  // slotProps={{
                  //   listbox: {
                  //     sx: {
                  //       width: "100%",
                  //     },
                  //   },
                  // }}
                >
                  {item?.options?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.title}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
            control={control}
            name={item.name}
          />
        );
      }

      if (!control) {
        return (
          <RadioGroup
            name={item.name}
            className={inputClasses}
            id={`${inputId}-input`}
            aria-labelledby={`${inputId}-label`}
            aria-describedby={
              item.description ? `${inputId}-description` : undefined
            }
          >
            {item.options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.value}
                label={option.title}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        );
      }

      return (
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              className={inputClasses}
              id={`${inputId}-input`}
              aria-labelledby={`${inputId}-label`}
              aria-describedby={
                item.description ? `${inputId}-description` : undefined
              }
            >
              {item.options?.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.value}
                  label={option.title}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "input") {
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
    }

    console.error("Unknown input type", item.type, item);
    return <Box>{t("error.title")}</Box>;
  }, [control, errors, fieldError, inputClasses, inputId, item, t]);

  const noLabel =
    item.type === "options" ||
    item.type === "checkbox" ||
    item.type === "markup";

  return (
    <FormControl
      required={item?.required}
      error={Boolean(errors?.[item.name])}
      className={classes}
    >
      {!noLabel ? (
        <FormLabel
          className="form-input-label"
          id={`${inputId}-label`}
          htmlFor={`${inputId}-input`}
        >
          {item.label}
        </FormLabel>
      ) : (
        <Typography className="form-input-label" id={`${inputId}-label`}>
          {item.label}
        </Typography>
      )}

      {item.description && (
        <Box
          className="form-input-description"
          dangerouslySetInnerHTML={{ __html: item.description }}
          id={`${inputId}-description`}
        ></Box>
      )}

      {inputElement}
    </FormControl>
  );
};
