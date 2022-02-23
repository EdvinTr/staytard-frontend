import { FieldAttributes, useField } from "formik";
import { editInputClassNames } from "../../../../constants";
import { BaseInput, BaseInputProps } from "../../../global/BaseInput";

type CustomInputFieldProps = BaseInputProps & FieldAttributes<{}>;
export const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  id,
  value,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <BaseInput
      {...field}
      {...props}
      className={`${editInputClassNames} text-13 ${
        props.className ? props.className : ""
      }`}
      id={id}
      name={field.name}
      label={label}
      hasError={!!meta.error && meta.touched}
      value={value}
    />
  );
};
