import * as yup from "yup";
export const signInSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(12).required(),
}).required();

export const signUpSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(12).required(),
    contact_number : yup.number(),
    username:yup.string()
}).required();