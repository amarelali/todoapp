import { UseFormRegister } from "react-hook-form";

export interface IInputForm {
    label: string, type: string, placeholder: string, inputClassName: string, name: "username" | "email" | "password" | "contact_number"
}
export interface IAuthForm {
    email: string,
    username?: string;
    contact_number?: unknown;
    password: string;
}
export interface IInputProps{
    register: UseFormRegister<IAuthForm>
  }