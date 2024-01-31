import { ReactNode, useState } from "react";
import { IInputForm, IInputProps, IAuthFormSignUp } from "../interfaces";
import Title from "./ui/Title";
import Button from "./ui/Button";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
interface IProps {
  renderInput: (
    formInput: IInputForm &
      IInputProps & {
        register: UseFormRegister<IAuthFormSignUp>;
      }
  ) => ReactNode;
}

const SignUpForm = ({ renderInput }: IProps) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormSignUp>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<IAuthFormSignUp> = async (data) => {
    setIsLoading(true);

    try {
      await axiosInstance
        .post(`auth/local/register`, data)
        .then((res) => {
          localStorage.setItem("userdata", res.data);
          toast.success("Welcome to TODO App!");
          location.replace("/todo");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error.message);
      } else {
        toast.error("Something went wrong ");
      }
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
