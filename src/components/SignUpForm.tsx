import { ReactNode } from "react";
import { IInputForm, IInputProps, IAuthForm } from "../interfaces";
import Title from "./ui/Title";
import Button from "./ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../validation";

interface IProps {
  renderInput: (formInput: IInputForm & IInputProps) => ReactNode;
}

const SignUpForm = ({ renderInput }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(signUpSchema)
  });
  const onSubmit: SubmitHandler<IAuthForm> = (data) => console.log(data);

  return (
    <form>
      <Title>Sign up</Title>
      <div className="inputs mt-[52px] flex flex-col gap-[38px]">
        {renderInput({
          label: "Enter your username or email address",
          placeholder: "Username or email address",
          type: "text",
          inputClassName: "w-full",
          name: "email",
          register,
          errors:errors.email?.message
        })}
        <div className="flex gap-[11.49px]">
          {renderInput({
            label: "User Name",
            type: "text",
            inputClassName:
              "w-[130.642px] lg:w-full pt-5 pb-4 pl-[7.86px] pr-0 text-sm font-light",
            placeholder: "Username",
            name: "username",
            register
          })}
          {renderInput({
            label: "Contact Number",
            type: "number",
            inputClassName:
              "w-[130.642px] lg:w-full pb-4 pl-[7.86px] pr-0 text-sm font-light",
            placeholder: "Contact Number",
            name: "contact_number",
            register
          })}
        </div>
        {renderInput({
          label: "Enter your Password",
          placeholder: "Password",
          type: "password",
          inputClassName: "w-full",
          name: "password",
          register,
          errors:errors.password?.message
        })}
      </div>
      <Button onClick={handleSubmit(onSubmit)}>Sign up</Button>
    </form>
  );
};
export default SignUpForm;
