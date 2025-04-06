"use client";

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

  const handleSignIn = async (data: signinType) => {
    const user = await signIn(data);
    redirect("/dashboard");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-md border rounded-2xl border-gray-300 p-6 shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>

          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="email@example.com"
            register={register}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            register={register}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-5 py-2 font-semibold transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
