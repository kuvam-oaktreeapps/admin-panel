import { InputSwitch } from "primereact/inputswitch";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

export default function FormInputSwitch({ fieldName, inline, control, rules }: FormFieldProps) {
  return (
    <FormField
      className={`field ${inline ? "flex-grow-1" : "w-full"} flex items-center`}
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <InputSwitch
          checked={field.value}
          onChange={(e) => field.onChange(e.value)}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
