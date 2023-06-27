import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

export default function FormInputPassword({ fieldName, inline, control, rules }: FormFieldProps) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <Password
          id={fieldName}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          style={{ width: "100%" }}
          feedback={false}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
