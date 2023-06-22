import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

export default function FormInputTextarea({ fieldName, inline, control, rules }: FormFieldProps) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <InputTextarea
          id={fieldName}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          style={{ width: "100%" }}
          rows={3}
          cols={20}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
