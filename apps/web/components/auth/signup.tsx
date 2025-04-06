"use client";

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

  const handleSignUp = async (data: signupType) => {
    const user = await signUp(data);
    redirect("/signin");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-md border rounded-2xl border-gray-300 p-6 shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignUp)}>
          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>

          <Input
            type="text"
            name="name"
            label="Name"
            placeholder="John Doe"
            register={register}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}

          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="email@example.com"
            register={register}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="********"
            register={register}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-5 py-2 font-semibold transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
