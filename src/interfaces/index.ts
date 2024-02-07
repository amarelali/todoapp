import { UseFormRegister } from "react-hook-form";

export interface IInputForm {
    label: string, type: string, placeholder: string, inputClassName: string
}
export interface IAuthForm {
    email: string,
    username?: string;
    contact_number?: string;
    password: string;
}
export interface IAuthFormSignIn {
    password: string;
    identifier: string;
}
export interface IInputProps {
    required?: string;
    errors?: string;
}
export interface IInputPropsSignUp extends IInputProps {
    register: UseFormRegister<IAuthForm>;
}
export interface IInputPropsSignIn extends IInputProps {
    register: UseFormRegister<IAuthFormSignIn>;
}

export interface IErrorMessage {
    error: {
        message?: string;
    };
}

export interface IToDo {
    id: number,
    attributes: {
        title: string
    }
}