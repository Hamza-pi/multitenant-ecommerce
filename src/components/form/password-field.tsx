"use client";
import { Control, Path } from "react-hook-form";
import { TypeOf, z } from "zod";
import { useCallback, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "./input-field";

interface InputFieldProps<T extends z.ZodType> {
  control: Control<z.infer<T>>;
  name: Path<TypeOf<T>>;
  label?: string;
  description?: string;
  placeholder?: string;
}

const iconStyle = "h-5 w-5 cursor-pointer";

const PasswordField = <T extends z.ZodType>({
  control,
  name,
  label,
  placeholder,
}: InputFieldProps<T>) => {
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = useCallback(() => setShow(!show), [show]);

  return (
    <div className="relative">
      <InputField
        control={control}
        name={name}
        placeholder={placeholder}
        label={label}
        className="pr-10"
        inputProps={{ type: show ? "text" : "password" }}
      />
      <div className="absolute top-9 right-2 ">
        {show ? (
          <Eye onClick={toggleShow} className={iconStyle} />
        ) : (
          <EyeOff onClick={toggleShow} className={iconStyle} />
        )}
      </div>
    </div>
  );
};

export default PasswordField;
