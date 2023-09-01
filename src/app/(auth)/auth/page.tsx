import { Metadata } from "next";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Authentication | Micro Blog",
  description: "Authentication Page Micro Blog",
};

const AuthPage = () => {
  return (
    <section>
      <h2 className="p-5 text-center">Authentication</h2>
      <div className="flex justify-center gap-16">
        <SignInForm />
        <SignUpForm />
      </div>
    </section>
  );
};
export default AuthPage;
