import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../atoms/form";
import { Textarea } from "../atoms/textarea";

interface FormTextareaFieldProps<T extends FieldValues>
  extends React.ComponentProps<"textarea"> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
}

export const FormTextareaField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  ...textareaProps
}: FormTextareaFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} {...textareaProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
