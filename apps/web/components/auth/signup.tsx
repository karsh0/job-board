"use client";

import { useForm } from "react-hook-form";
import { signupType } from "../../types/auth.types";

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
    console.log("Signup Data:", data);
    // Here, send `data` to your API
  }

  return (
    <div>
      <form onSubmit={handleSubmit(signUpHandler)}>
        <input type="text" placeholder="Enter your name" {...register("name", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="email" placeholder="Enter your email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" placeholder="Enter your password" {...register("password", { required: "Password is required" })} />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
