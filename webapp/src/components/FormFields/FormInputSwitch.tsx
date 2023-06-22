import { InputSwitch } from "primereact/inputswitch";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";
import { getLabel } from "@/utils/strings";

export default function FormInputSwitch({ fieldName, inline, control, rules }: FormFieldProps) {
  return (
    <FormField
      className={`field ${inline ? "flex-grow-1" : "w-full"} flex items-center`}
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <div className="flex align-items-center">
          <p className="mr-2">${getLabel(fieldName)}</p>
          <InputSwitch
            checked={field.value}
            onChange={(e) => field.onChange(e.value)}
            className={classNames({ "p-invalid": fieldState.error })}
          />
        </div>
      )}
    />
  );
}
