import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInput, FormSubmit } from "@/components/form";
import { SelectGender } from "@/components/select-gender";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^(?:0)?[6-9]\d{9}$/, "Invalid mobile number"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Invalid password"
    ),
  dob: z.string().min(1, "Date of birth is required").date("Enter correct DOB"),
  gender: z.enum(["O", "M", "F"], { message: "Select your gender" }),
  address: z.string().min(1, "Address is required"),
});

type FieldValues = z.infer<typeof SignupSchema>;

const UpdateProfile = () => {
  const { user, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  console.log("user", user);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
  });
  const onSubmit = async (data: any) => {
   await updateProfile(data);
   navigate("/");
  }
  return (
    <section className="flex flex-col items-center gap-5 w-full">
      <h2 className="text-2xl font-bold text-gray-700">UPDATE YOUR PROFILE</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "max-w-xs w-full flex flex-col",
          Object.keys(errors).length > 0 ? "gap-3" : "gap-5"
        )}
      >
        <FormInput
          type="text"
          label="Name"
          id="name"
          value={user?.name}
          {...register("name")}
          error={errors.name}
        />
        <FormInput
          type="text"
          label="Mobile"
          id="mobile"
          disabled
          value={user?.mobile}
          {...register("mobile")}
          error={errors.mobile}
        />
        <FormInput
          type="email"
          label="Email Address"
          id="email"
          disabled
          value={user?.email}
          {...register("email")}
          error={errors.email}
        />
        <FormInput
          type="date"
          label="Date of birth"
          id="dob"
          value={user?.dob}
          {...register("dob")}
          error={errors.dob}
        />
        <SelectGender
          id="gender"
          {...register("gender")}
          error={errors.gender}
          value={user?.gender}
          label="Gender"
        />
        <FormInput
          type="text"
          id="address"
          label="Address"
          value={user?.address}
          {...register("address")}
          error={errors.address}
        />
        <FormSubmit disabled={loading} control={control} variant={"secondary"}>
          Submit
        </FormSubmit>
      </form>
    </section>
  );
};

export default UpdateProfile;
