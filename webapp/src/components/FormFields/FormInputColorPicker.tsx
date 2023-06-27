import { ColorPicker } from "primereact/colorpicker";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

export default function FormInputColorPicker({
  fieldName,
  inline,
  control,
  rules,
}: FormFieldProps) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <ColorPicker
          id={fieldName}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
