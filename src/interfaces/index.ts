export interface IInputForm {
    label: string, type: string, placeholder: string, inputClassName: string, name: "username" | "email" | "password" | "contact_number" | "identifier"
}
export interface IAuthFormSignUp {
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
    errors?: string
}