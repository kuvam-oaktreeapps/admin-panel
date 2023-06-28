import { Control, FieldValues, RegisterOptions } from "react-hook-form";

export default interface FormFieldProps {
  inline?: boolean;
  fieldName: string;
  control: Control<any>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}
