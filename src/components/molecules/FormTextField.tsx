import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../atoms/form";
import { Input } from "../atoms/input";

interface FormTextFieldProps<T extends FieldValues>
  extends React.ComponentProps<"input"> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  control: Control<T>;
  type?: string;
}

export const FormTextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  type = "text",
  ...inputProps
}: FormTextFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
