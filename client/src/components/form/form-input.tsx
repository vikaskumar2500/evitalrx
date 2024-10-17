import { forwardRef, useState } from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { FormError } from "./form-error";
import { cn } from "@/lib/utils";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface FormInputProps extends InputProps {
  id: string;
  label?: string;
  error?: any;
  description?: string;
  isPassword?: boolean;
}
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      description,
      isPassword = false,
      type = "text",
      error,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 relative">
          {label ? (
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor={id}>{label}</Label>
              {description && (
                <p className="text-xs font-extralight">{description}</p>
              )}
            </div>
          ) : null}
          <Input
            className={cn(
              "outline-none",
              error?.message
                ? "border border-rose-600 focus-visible:border focus-visible:border-rose-600"
                : ""
            )}
            type={!open ? type : "text"}
            {...props}
            ref={ref}
            id={id}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-2 z-10 bottom-[0.6rem]"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <HiOutlineEye size={20} />
              ) : (
                <HiOutlineEyeOff size={20} />
              )}
            </button>
          )}
        </div>
        <FormError error={error} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
