
import { useForm } from "react-hook-form";
import { signinType } from "../../types/auth.types";
import { signIn } from "../../actions/auth.action";
import { redirect } from "next/navigation";

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
    const user  = await signIn(data)
    redirect('/dashboard')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(SignInHandler)}>

        <input type="email" placeholder="Enter your email" {...register("email", { required: "Email is required" })} />

        <input type="password" placeholder="Enter your password" {...register("password", { required: "Password is required" })} />

        <button type="submit">Signin</button>
      </form>
    </div>
  );
}
