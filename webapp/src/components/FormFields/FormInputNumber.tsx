import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

export default function FormInputNumber({ fieldName, inline, control, rules }: FormFieldProps) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <InputNumber
          id={fieldName}
          value={field.value}
          onValueChange={(e) => field.onChange(e.value)}
          style={{ width: "100%" }}
          useGrouping={false}
          maxFractionDigits={5}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
