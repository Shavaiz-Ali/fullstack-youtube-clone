import SignInForm from "@/components/auth/login-form";
import Logo from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-[#000000] flex justify-center py-[101px]">
      <div className="flex flex-col items-center space-y-10 w-full">
        <div className="space-y-6">
          <Logo height={54} width={54} />
          <h1 className="text-white text-[24px] font-semibold">Play</h1>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
