import { useForm } from "react-hook-form";
import { signinType } from "../../types/auth.types";
import { signIn } from "../../actions/auth.action";
import { redirect } from "next/navigation";
import Input from "../ui/input";

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function SignInHandler(data: signinType) {
    const user = await signIn(data);
    redirect("/dashboard");
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-96 border rounded-xl border-gray-300 p-5">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(SignInHandler)}>
          <span className="text-2xl font-semibold text-center">Welcome back</span>

          <Input
            name="email"
            type="email"
            label="Enter your Email"
            placeholder="email@example.com"
            register={register}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <Input
            name="password"
            type="password"
            label="Enter your Password"
            placeholder="••••••••"
            register={register}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          <button type="submit" className="bg-blue-300 rounded-xl px-5 py-2 font-semibold cursor-pointer">
            Signin
          </button>
        </form>
      </div>
    </div>
  );
}
