import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormSubmit } from "@/components/form";
import { useAuth } from "@/hooks/use-auth";

const ForgotPasswordSchema = z.object({
  credential: z
    .string()
    .min(1, "Email is required field")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FieldTypes = z.infer<typeof ForgotPasswordSchema>;
const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<FieldTypes>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      credential: "",
    },
  });

  const onSubmit = async (data: FieldTypes) => await forgotPassword(data);
  return (
    <section className="flex flex-col items-center gap-5 w-full">
      <h2 className="text-xl font-bold text-gray-700">FORGOT YOUR PASSWORD</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xs w-full flex flex-col gap-5"
      >
        <FormInput
          id="credential"
          {...register("credential")}
          error={errors.credential}
          label="Email Address / Mobile Number"
        />
        <FormInput
          id="password"
          type="password"
          isPassword
          {...register("password")}
          error={errors.password}
        />
        <FormSubmit variant="secondary" control={control} type="submit">
          Submit
        </FormSubmit>
      </form>
    </section>
  );
};

export default ForgotPassword;
