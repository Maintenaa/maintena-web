import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface Props<T extends FieldValues> {
  control: Control<T, unknown, T> | undefined;
  name: Path<T>;
  label?: string;
  labelHtmlFor?: string;
  required?: boolean;
  render: (props: {
    fieldState: ControllerFieldState;
    field: ControllerRenderProps<T, Path<T>>;
    formState: UseFormStateReturn<T>;
  }) => React.ReactNode;
}

export default function FormControl<T extends FieldValues>({
  control,
  name,
  render,
  label,
  labelHtmlFor,
  required,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState, field, formState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className="flex flex-col gap-1.5"
        >
          {label && (
            <FieldLabel htmlFor={labelHtmlFor}>
              {label}
              {required && <span className="text-destructive ml-0.5">*</span>}
            </FieldLabel>
          )}
          {render({ fieldState, field, formState })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    ></Controller>
  );
}
