import { ReactNode, useState } from "react";
import Button from "./ui/Button";
import Title from "./ui/Title";
import {
  IAuthFormSignIn,
  IErrorMessage,
  IInputForm,
  IInputPropsSignIn,
} from "../interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../validation";
import axiosInstance from "../config/axios.config";
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
}: IInputForm & {
  name: keyof IAuthFormSignIn;
} & IInputPropsSignIn): ReactNode => {
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

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormSignIn>({
    resolver: yupResolver(signInSchema),
  });
  const onSubmit: SubmitHandler<{
    password: string;
    identifier: string;
  }> = async (formData) => {
    setIsLoading(true);
    try {
      const { data, status } = await axiosInstance.post(`auth/local`, formData);
      if (status === 200) {
        localStorage.setItem("userdata", JSON.stringify(data));
        toast.success("Welcome to TODO App!", {
          position: "top-center",
        });
        setTimeout(() => {
          location.replace("/todo");
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      const errorObj = error as AxiosError<IErrorMessage>;
      toast.error(errorObj.response?.data.error.message, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form>
        <Title>Sign in</Title>
        <div className="inputs flex flex-col gap-[30px] mt-[62px] lg:mt-[40px] 2xl:mt-[62px] lg:justify-between">
          {renderInput({
            label: "Enter your username or email address",
            type: "text",
            placeholder: "Username or email address",
            inputClassName: "w-full",
            name: "identifier",
            register,
            required: "email is missing",
            errors: errors.identifier?.message,
          })}

          {renderInput({
            label: "Enter your password",
            type: "password",
            placeholder: "Password",
            inputClassName: "w-full",
            name: "password",
            register,
            required: "password is missing",
            errors: errors.password?.message,
          })}
          <Button
            onClick={handleSubmit(onSubmit)}
            isLoading={isLoading}
            className="mt-3 mb-[30px]"
          >
            Sign in
          </Button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};
export default SignInForm;
