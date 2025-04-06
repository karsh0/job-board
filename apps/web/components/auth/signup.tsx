// app/(auth)/signup.tsx
import { useForm } from "react-hook-form";
import { signupType } from "../../types/auth.types";
import { signUp } from "../../actions/auth.action";
import { redirect } from "next/navigation";
import Input from "../ui/input";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function signUpHandler(data: signupType) {
    const user = await signUp(data);
    redirect('/signin');
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-96 border rounded-xl border-gray-300 p-5">
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(signUpHandler)}
        >
          <span className="text-2xl font-semibold text-center">Welcome</span>
          <Input
            type="text"
            name="name"
            label="Enter your name"
            placeholder="John Doe"
            register={register}
          />
          <Input
            type="email"
            name="email"
            label="Enter your email"
            placeholder="email@example.com"
            register={register}
          />
          <Input
            type="password"
            name="password"
            label="Enter your password"
            placeholder="********"
            register={register}
          />

          <button
            type="submit"
            className="bg-blue-300 rounded-xl px-5 py-2 font-semibold cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
