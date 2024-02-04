import * as yup from "yup";
export const signInSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(12).required(),
}).required();

export const signUpSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6,"Minimun of character are 6").max(12,"Maximun of character are 12").required("Password required"),
    contact_number : yup.string(),
    username:yup.string()
}).required();