import { ReactNode, useState } from "react";
import Input from "../components/ui/Input";
import Label from "../components/ui/label";
import firstimg from "../assets/img/1.png";
import secondimg from "../assets/img/2.png";
import { IAuthFormSignIn, IAuthFormSignUp, IInputForm, IInputProps } from "../interfaces";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import { Path, UseFormRegister } from "react-hook-form";
interface IProps {}

const Auth = ({}: IProps) => {
  const [registeredUser, setRegisteredUser] = useState(true);

  // ** Renders
  const renderInput = <T extends IAuthFormSignIn | IAuthFormSignUp>({
    label,
    type,
    placeholder,
    inputClassName,
    name,
    register,
    required = "",
    errors,
  }: IInputForm & IInputProps & {register: UseFormRegister<T>}) : ReactNode => {
    return (
      <div className="space-y-[16px] lg:space-y-[5px] 2xl:space-y-[16px]">
        <Label>{label}</Label>
        <Input
          className={inputClassName}
          type={type}
          placeholder={placeholder}
          {...register(name as Path<T>, { required })}
        />
        {errors && <span style={{color:'#E48700'}}>{errors}</span>}
      </div>
    );
  };
  return (
    <div className="h-screen p-0 lg:flex relative">
      <div
        className="w-[100%] lg:w-[50%] h-screen flex justify-start 2xl:justify-center items-center flex-shrink-0"
        style={{ backgroundColor: "rgba(236, 188, 118, 1)" }}
      >
        <img src={firstimg} className="hidden lg:block w-[269px] h-[256px]" />
      </div>
      <div className="hidden lg:w-[50%] lg:flex justify-end 2xl:justify-center items-center flex-shrink-0">
        <img src={secondimg} className="hidden lg:block w-[450px] h-[450px]" />
      </div>
      <div
        style={{ backgroundColor: "white" }}
        className="rounded-[40px] h-[680px] w-[326px] px-[27px] pt-11 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 lg:w-[539px] 2xl:h-[741px]"
      >
        <div className="flex justify-between">
          <div className="text-base lg:text-[20px] font-normal text-nowrap">
            Welcome to
            <span className="text-[#E48700] font-semibold">&nbsp; LOREM</span>
          </div>
          <div className="flex">
            {registeredUser ? (
              <div className="flex flex-col font-normal text-[13px] w-[92px] 2xl:text-[16px] 2xl:w-[124px]">
                <span className="text-[#8D8D8D]">No Account?</span>
                <span
                  className="text-[#E48700] cursor-pointer"
                  onClick={() => setRegisteredUser(!registeredUser)}
                >
                  Sign up
                </span>
              </div>
            ) : (
              <div className="flex flex-col font-normal text-[13px] w-[76px] 2xl:text-[16px] 2xl:w-[122px]">
                <span className="text-[#8D8D8D]">Have an Account?</span>
                <span
                  className="text-[#E48700] cursor-pointer"
                  onClick={() => setRegisteredUser(!registeredUser)}
                >
                  Sign in
                </span>
              </div>
            )}
          </div>
        </div>
        {registeredUser ? (
          <SignInForm renderInput={renderInput} />
        ) : (
          <SignUpForm renderInput={renderInput} />
        )}
      </div>
    </div>
  );
};
export default Auth;
