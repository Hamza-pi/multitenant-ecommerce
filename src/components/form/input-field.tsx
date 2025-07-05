import { Control, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TypeOf, z } from "zod";
import {
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  ReactNode,
  RefAttributes,
} from "react";
import { LucideProps } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

interface InputFieldProps<T extends z.ZodType> {
  control: Control<z.infer<T>>;
  name: Path<TypeOf<T>>;
  label?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  description?: string | ReactNode;
  placeholder?: string;
  onChange?: Function;
  className?: string;
  inputMode?:
    | "search"
    | "text"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  inputProps?: Omit<
    InputProps,
    "name" | "value" | "onChange" | "onBlur" | "ref"
  >;
}

const InputField = <T extends z.ZodType>({
  control,
  name,
  icon: Icon,
  label,
  description,
  placeholder,
  className,
  inputProps,
  inputMode,
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                <span className="inline-flex items-end gap-1">
                  {Icon && <Icon size={18} />} {label}
                </span>
              </FormLabel>
            )}
            <FormControl>
              <Input
                {...inputProps}
                className={`${className} ${
                  fieldState.error
                    ? "ring-0 border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
                inputMode={inputMode}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputField;
