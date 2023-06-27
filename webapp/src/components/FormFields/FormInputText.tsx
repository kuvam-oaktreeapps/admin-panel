import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

export default function FormInputText({ fieldName, inline, control, rules }: FormFieldProps) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <InputText
          id={field.name}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          autoFocus
          style={{ width: "100%" }}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
