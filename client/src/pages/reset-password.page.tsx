import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormSubmit } from "@/components/form";
import { useAuth } from "@/hooks/use-auth";

const ResetPasswordSchema = z
  .object({
    credential: z
      .string()
      .min(1, "Email is required field"),
    password: z.string().min(1, "password is required field"),
    newPassword: z.string().min(1, "New password is required"),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "New password cannot be the same as the current password.",
    path: ["newPassword"],
  });

type FieldTypes = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const { user, resetPassword, loading} = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<FieldTypes>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      credential: "",
      password: "",
      newPassword:""
    },
  });

  const onSubmit = async (data: FieldTypes) => await resetPassword(data)
  return (
    <section className="flex flex-col items-center gap-5 w-full">
      <h2 className="text-2xl font-bold text-gray-700">RESET YOUR PASSWORD</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xs w-full flex flex-col gap-5"
      >
        <FormInput
          id="credential"
          defaultValue={user?.email || user?.mobile}
          {...register("credential")}
          error={errors.credential}
          label="Email Address / Mobile Number"
        />
        <FormInput
          id="password"
          type="password"
          {...register("password")}
          error={errors.password}
          isPassword
          label="Password"
        />
        <FormInput
          id="newPassword"
          type="newPassword"
          {...register("newPassword")}
          error={errors.newPassword}
          isPassword
          label="New Password"
        />
        <FormSubmit disabled={loading} variant="secondary" control={control} type="submit">
          Submit
        </FormSubmit>
      </form>
    </section>
  );
};

export default ResetPassword;
