import { Editor } from "primereact/editor";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

export default function FormInputEditor({ fieldName, inline, control, rules }: FormFieldProps) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <Editor
          id={fieldName}
          value={field.value}
          onTextChange={(e) => field.onChange(e.htmlValue)}
          required
          style={{ height: "320px", width: "100%" }}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
