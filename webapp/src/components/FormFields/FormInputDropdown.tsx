import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";
import { getLabel } from "@/utils/strings";

interface Props extends FormFieldProps {
  options: { name: string; value: string }[];
}

export default function FormInputDropdown({ fieldName, inline, control, rules, options }: Props) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <Dropdown
          value={field.value}
          onChange={(e) => field.onChange(e.value)}
          options={options}
          optionLabel="name"
          placeholder={`Select a ${getLabel(fieldName)}`}
          style={{ width: "100%" }}
          className={classNames({ "p-invalid": fieldState.error })}
        />
      )}
    />
  );
}
