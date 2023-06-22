import ImageUpload from "./ImageUpload";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

interface Props extends FormFieldProps {
  folderName: string;
}

export default function FormInputUpload({ fieldName, inline, control, rules, folderName }: Props) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <ImageUpload
          value={field.value}
          fieldName={fieldName}
          onUpload={(url) => field.onChange(url)}
          folder={folderName}
          error={!!fieldState.error}
        />
      )}
    />
  );
}
