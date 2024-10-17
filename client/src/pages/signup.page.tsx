import { useState } from "react";
import { InputOTPPattern } from "@/components/input-otp-pattern";
import SignupForm from "@/components/signup-form";

const SignupPage = () => {
  const [isSignup, setSignup] = useState(false);
  const handleSignup = (value: boolean) => setSignup(value);
  return (
    <section className="flex flex-col items-center gap-5 w-full mb-10">
      {!isSignup ? (
        <SignupForm onSignup={handleSignup} />
      ) : (
        <InputOTPPattern />
      )}
    </section>
  );
};

export default SignupPage;
