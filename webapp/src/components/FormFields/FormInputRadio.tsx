import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import FormField from "./FormField";
import FormFieldProps from "./FormFieldProps";

interface Props extends FormFieldProps {
  options: {
    name: string;
    value: string;
  }[];
}

export default function FormInputRadio({ fieldName, inline, control, rules, options }: Props) {
  return (
    <FormField
      fieldName={fieldName}
      control={control}
      rules={rules}
      inline={!!inline}
      render={({ field, fieldState }) => (
        <div className="flex flex-wrap gap-3">
          {options.map((opt) => (
            <div className="flex align-items-center" key={opt.value}>
              <RadioButton
                value={opt.value}
                onChange={(e) => field.onChange(e.value)}
                checked={field.value === opt.value}
                className={classNames({ "p-invalid": fieldState.error })}
              />

              <p className="ml-2 text-sm">{opt.name}</p>
            </div>
          ))}
        </div>
      )}
    />
  );
}
