import { ReactNode, useState } from "react";
import {
  IInputForm,
  IAuthForm,
  IErrorMessage,
  IInputPropsSignUp,
} from "../interfaces";
import Title from "./ui/Title";
import Button from "./ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import Label from "./ui/label";
import Input from "./ui/Input";

// ** Renders
const renderInput = ({
  label,
  type,
  placeholder,
  inputClassName,
  name,
  register,
  required = "",
  errors,
}: IInputForm & { name: keyof IAuthForm} & IInputPropsSignUp): ReactNode => {
  return (
    <div className="space-y-[16px] lg:space-y-[5px] 2xl:space-y-[16px]">
      <Label>{label}</Label>
      <Input
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
      />
      {errors && <span style={{ color: "#E48700" }}>{errors}</span>}
    </div>
  );
};
const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<IAuthForm> = async (formData) => {
    setIsLoading(true);

    try {
      const { data, status } = await axiosInstance.post(
        `auth/local/register`,
        formData
      );
      if (status === 200) {
        localStorage.setItem("userdata", data);
        console.log(data);
        toast.success("Welcome to TODO App!");
        setTimeout(() => {
          location.replace("/todo");
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      const errorObj = error as AxiosError<IErrorMessage>;
      toast.error(errorObj.response?.data.error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form>
        <Title>Sign up</Title>
        <div className="inputs my-[30px] flex flex-col gap-[30px]">
          {renderInput({
            label: "Enter your username or email address",
            placeholder: "Username or email address",
            type: "text",
            inputClassName: "w-full",
            name: "email",
            register,
            errors: errors.email?.message,
          })}
          <div className="flex gap-[11.49px]">
            {renderInput({
              label: "User Name",
              type: "text",
              inputClassName:
                "w-[130.642px] lg:w-full pt-5 pb-4 pl-[7.86px] pr-0 text-sm font-light",
              placeholder: "Username",
              name: "username",
              register,
            })}
            {renderInput({
              label: "Contact Number",
              type: "text",
              inputClassName:
                "w-[130.642px] lg:w-full pb-4 pl-[7.86px] pr-0 text-sm font-light",
              placeholder: "Contact Number",
              name: "contact_number",
              register,
            })}
          </div>
          {renderInput({
            label: "Enter your Password",
            placeholder: "Password",
            type: "password",
            inputClassName: "w-full",
            name: "password",
            register,
            errors: errors.password?.message,
          })}
        </div>
        <Button onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
          Sign up
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};
export default SignUpForm;
