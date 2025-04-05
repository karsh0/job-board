
import { useForm } from "react-hook-form";
import { signupType } from "../../types/auth.types";
import { signUp } from "../../actions/auth.action";
import { redirect } from "next/navigation";


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
    const user  = await signUp(data)
    redirect('/signin')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(signUpHandler)}>
        <input type="text" placeholder="Enter your name" {...register("name", { required: "Name is required" })} />

        <input type="email" placeholder="Enter your email" {...register("email", { required: "Email is required" })} />

        <input type="password" placeholder="Enter your password" {...register("password", { required: "Password is required" })} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
