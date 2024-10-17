import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "./ui/label";
import { FormError, FormSubmit } from "./form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
const InputOTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Invalid OTP",
  }),
});

type FieldTypes = z.infer<typeof InputOTPSchema>;

export function InputOTPPattern() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<FieldTypes>({
    resolver: zodResolver(InputOTPSchema),
    mode: "onSubmit",
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: FieldTypes) => {
    console.log("values", data);
    navigate("/");
  };
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-700">VERIFY YOUR OTP</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xs w-full flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <InputOTP
              maxLength={6}
              id="otp"
              onChange={(value) => setValue("pin", value)}
              name="pin"
              className="w-full"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className="w-full flex justify-between">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <InputOTPSlot
                    key={idx}
                    className="border focus-visible:outline-none focus-visible:border focus-visible:border-blue-600"
                    itemType="number"
                    index={idx}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <FormError error={errors.pin} />
        </div>
        <FormSubmit variant="secondary" control={control} type="submit">
          Submit
        </FormSubmit>
      </form>
    </>
  );
}
