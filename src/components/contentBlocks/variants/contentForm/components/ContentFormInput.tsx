import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Option,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "@mui/joy";
import React, { useMemo } from "react";
import {
  FormElementDto,
  FormInputVariant,
} from "@models/utility-types/form-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { useTranslation } from "react-i18next";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface ContentFormInputProps {
  item: FormInputVariant | FormElementDto;
  control?: Control<FieldValues>;
}

export const ContentFormInput: React.FC<ContentFormInputProps> = ({
  item,
  control,
}) => {
  const { t } = useTranslation();

  const inputElement = useMemo(() => {
    if (item.type === "antispam_code") {
      if (!control) {
        return <Input name={item.name}></Input>;
      }

      return (
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur} onChange={onChange} value={value}></Input>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "text") {
      if (!control) {
        return <Input name={item.name}></Input>;
      }

      return (
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur} onChange={onChange} value={value}></Input>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "email") {
      if (!control) {
        return <Input type="email" name={item.name}></Input>;
      }

      return (
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="email"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            ></Input>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "textarea") {
      if (!control) {
        return <Textarea name={item.name} minRows={2}></Textarea>;
      }

      return (
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <Textarea
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              minRows={2}
            ></Textarea>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    if (item.type === "checkbox") {
      if (!control) {
        return <Checkbox name={item.name}></Checkbox>;
      }

      return (
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              onBlur={onBlur}
              onChange={onChange}
              value={value}
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
              // sx={{ minWidth: "13rem" }}
              // slotProps={{
              //   listbox: {
              //     sx: {
              //       width: "100%",
              //     },
              //   },
              // }}
              name={item.name}
              value={v}
            >
              {item.options?.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.title}
                </Option>
              ))}
            </Select>
          );
        }

        return (
          <Controller
            defaultValue={[]}
            render={({ field: { value, ...field } }) => {
              console.log("V", { value, item });
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
                    <Option key={option.id} value={option.id}>
                      {option.title}
                    </Option>
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
          <RadioGroup name={item.name}>
            {item.options?.map((option) => (
              <Radio value={option.value} label={option.title}></Radio>
            ))}
          </RadioGroup>
        );
      }

      return (
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup onBlur={onBlur} onChange={onChange} value={value}>
              {item.options?.map((option) => (
                <Radio value={option.value} label={option.title}></Radio>
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
        return <Input name={item.name}></Input>;
      }

      return (
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur} onChange={onChange} value={value}></Input>
          )}
          control={control}
          name={item.name}
        />
      );
    }

    return <Box>{t("error.title")}</Box>;
  }, [control, item, t]);

  return (
    <FormControl required={item?.required}>
      <FormLabel slotProps={{ asterisk: { title: t("general.required") } }}>
        {item.label}
      </FormLabel>
      {inputElement}
    </FormControl>
  );
};
