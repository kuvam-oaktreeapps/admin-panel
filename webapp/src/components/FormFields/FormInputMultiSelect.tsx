import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

interface Props extends FormFieldProps {
  options: { name: string; value: string }[];
}

export default function FormInputMultiSelect({
  fieldName,
  inline,
  control,
  rules,
  options,
}: Props) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <MultiSelect
          value={field.value}
          onChange={(e) => field.onChange(e.value)}
          options={options}
          optionLabel="name"
          optionValue="value"
          maxSelectedLabels={3}
          className={classNames({ "p-invalid": fieldState.error }, "w-full")}
        />
      )}
    />
  );
}
