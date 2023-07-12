import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

export default function FormInputCalendar({ fieldName, inline, control, rules }: FormFieldProps) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <Calendar
          id={field.name}
          value={new Date(field.value)}
          onChange={(e) => field.onChange(e.target.value)}
          style={{ width: "100%" }}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
