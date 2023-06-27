import { Control, FieldValues, RegisterOptions } from "react-hook-form";

export default interface FormFieldProps {
  inline?: boolean;
  fieldName: string;
  control: Control<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}
