import { UseFormRegister } from "react-hook-form";
import { signupType } from "../../types/auth.types";

type InputProps = {
  name: keyof signupType;
  type: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<signupType>;
};

export default function Input({
  name,
  type,
  label,
  placeholder,
  register,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${name} is required` })}
        className="p-2 outline outline-gray-200 rounded"
      />
    </div>
  );
}
