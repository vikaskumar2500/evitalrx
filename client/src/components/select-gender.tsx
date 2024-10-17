import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import { forwardRef } from "react";
import { FormError } from "./form";

interface SelectGenderProps {
  error?: any;
  id: string;
  label?: string;
  value?:string;
}

export const SelectGender = forwardRef<HTMLDivElement, SelectGenderProps>(
  ({ error, label, value,id, ...props }, ref) => {
    console.log("value", value);
    return (
      <div className="flex flex-col items-start gap-2">
        {label ? <Label htmlFor="gender">{label}</Label> : null}
        <RadioGroup
          ref={ref}
          className="flex items-center gap-5"
          id={id}
          value={value}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="M" id="category1" />
            <Label htmlFor="category1">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="F" id="category2" />
            <Label htmlFor="category2">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="O" id="category3" />
            <Label htmlFor="category3">Others</Label>
          </div>
        </RadioGroup>
        <FormError error={error} />
      </div>
    );
  }
);

SelectGender.displayName = "SelectGender";
