import { getLabel } from "@/utils/strings";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface Props {
  className?: string;
  control: Control<FieldValues>;
  fieldName: string;
  inline: boolean;
  render: (props: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
  }) => any;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function FormField({ fieldName, control, inline, render, rules, className }: Props) {
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={className || `field ${inline ? "flex-grow-1" : "w-full"}`}>
          <p>{getLabel(field.name)}</p>

          {render({ field, fieldState })}

          {fieldState?.error?.message && (
            <small className="text-red-500">{fieldState.error.message}</small>
          )}
        </div>
      )}
    />
  );
}
