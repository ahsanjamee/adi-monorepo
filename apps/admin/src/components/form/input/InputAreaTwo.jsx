import { Input } from "@windmill/react-ui";

const InputAreaTwo = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type,
  placeholder,
  validation
}) => {
  return (
    <>
      <Input
        {...register(`${name}`, {
          required: required ? false : `${label} is required!`,
        })}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete="new-password"
        className="mr-2 p-2"
        validation={validation}
      />
    </>
  );
};

export default InputAreaTwo;
