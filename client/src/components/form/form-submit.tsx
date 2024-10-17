import { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { useFormState } from "react-hook-form";

interface FormSubmitProps extends ButtonProps {
  children: ReactNode;
  control: any;
}
export const FormSubmit = ({
  type = "submit",
  control,
  children,
  ...props
}: FormSubmitProps) => {
  const { isSubmitting } = useFormState({ control });
  console.log("isSubmitting", isSubmitting);
  return (
    <div className="">
      <Button type={type} {...props}>
        {children}
      </Button>
    </div>
  );
};
