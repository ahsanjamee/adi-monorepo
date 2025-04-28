import React from "react";
import { Input } from "@windmill/react-ui";

const InputArea = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type,
  autoComplete,
  placeholder,
  validation,
}) => {
  return (
    <>
      <Input
        {...register(`${name}`, {
          required: required ? false : `${label} is required!`,
          ...validation,
        })}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        className="mr-2 h-12 p-2"
      />
    </>
  );
};

export default InputArea;
