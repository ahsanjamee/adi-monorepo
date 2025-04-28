// SelectArea.js
import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import Label from "@component/form/Label";
import Error from "./Error";

const InputSelect = ({
  name,
  label,
  options,
  control,
  defaultValue,
  placeholder,
  isRequired,
  validation,
  disabled,
  setCity,
}) => {
  return (
    <>
      <Label label={label} />
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue} // Set default value if necessary
        rules={{
          required: isRequired ? `${label} is required!` : false,
          ...validation,
        }}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <div className="remove-input-txt-border">
            <Select
              inputRef={ref}
              onChange={(selectedOption) => {
                setCity(selectedOption.value);
                onChange(selectedOption.value); // Call onChange from Controller
              }}
              onBlur={onBlur} // Handle blur event if necessary
              value={value?.value}
              placeholder={placeholder}
              options={options}
              isDisabled={disabled}
              classNamePrefix="select"
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={{
                control: (base, state) => ({
                  ...base,
                  border: "1px solid #e6e6e6",
                  height: "46px",
                  boxShadow: "none",
                  "&:hover": {
                    border: "1px solid #e6e6e6",
                  },
                  "&:focus": {
                    border: "1px solid green",
                  },
                }),
              }}
            />
          </div>
        )}
      />
    </>
  );
};

export default InputSelect;
