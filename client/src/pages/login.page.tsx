import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInput, FormSubmit } from "@/components/form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const LoginSchema = z.object({
  credential: z.string().min(1, "This field is required"),
  password: z.string().min(1, "Password is required"),
});

type FieldValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      credential: "",
      password: "",
    },
  });
  const onSubmit = async (data: FieldValues) => {
    await login(data);
    navigate("/");
  };

  return (
    <section className="flex flex-col items-center gap-5 w-full">
      <h2 className="text-2xl font-bold text-gray-700">LOGIN FORM</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xs w-full flex flex-col gap-5"
      >
        <FormInput
          type="text"
          label="Email Address / Mobile Number"
          id="credential"
          {...register("credential")}
          error={errors.credential}
        />
        <div>
          <FormInput
            type="password"
            label="Password"
            {...register("password")}
            id="password"
            autoComplete="current-password"
            isPassword
            error={errors.password}
          />
          <div className="flex">
            <Link
              to={"/auth/forgot-password"}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Forgot
            </Link>
            <span className="text-sm font-semibold text-blue-600 mx-1">/</span>
            <Link
              to={"/auth/reset-password"}
              className="text-sm font-semibold hover:underline text-blue-600 mr-1"
            >
              Reset
            </Link>
            <span className="text-sm font-semibold text-blue-600">
              Password
            </span>
          </div>
        </div>
        <FormSubmit disabled={loading} control={control} variant={"secondary"}>
          Submit
        </FormSubmit>
      </form>
    </section>
  );
};

export default LoginPage;
