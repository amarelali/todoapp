import { ReactNode, useState } from "react";
import Anchor from "../components/ui/Anchor";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Title from "../components/ui/Title";
import Label from "../components/ui/label";
import firstimg from "../assets/img/1.png";
import secondimg from "../assets/img/2.png";
import { IInputForm } from "../interfaces";
interface IProps {}
const Register = ({}: IProps) => {
  const [registeredUser, setRegisteredUser] = useState(true);

  // **
  const SignInForm = (): ReactNode => {
    return (
      <form>
        <Title>Sign in</Title>
        <div className="flex h-[55px] gap-3 items-center mt-[62px] lg:mt-[40px] 2xl:mt-[62px] lg:justify-between">
          <Anchor
            href="https://google.com"
            className="flex gap-[12px] bg-[#FFF4E3] rounded-[9px] px-[17px] py-[18px] text-[#E48700] text-[12px]  lg:text-base lg:w-[298px]"
          >
            <span className="w-[18px] h-[19px] lg:w-[26px] 2xl:h-[26px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 19"
                fill="none"
              >
                <path
                  d="M16.8759 9.68478C16.8759 9.00132 16.8223 8.50257 16.7063 7.98535H9.16162V11.0702H13.5902C13.5009 11.8368 13.0188 12.9913 11.9473 13.7671L11.9323 13.8704L14.3178 15.782L14.483 15.7991C16.0009 14.349 16.8759 12.2155 16.8759 9.68478Z"
                  fill="#E48700"
                />
                <path
                  d="M9.16098 17.8126C11.3306 17.8126 13.152 17.0736 14.4824 15.7991L11.9467 13.7671C11.2681 14.2566 10.3574 14.5983 9.16098 14.5983C7.03601 14.5983 5.23246 13.1483 4.58954 11.144L4.4953 11.1523L2.01486 13.1381L1.98242 13.2314C3.30383 15.9468 6.01811 17.8126 9.16098 17.8126Z"
                  fill="#34A853"
                />
                <path
                  d="M4.58998 11.1439C4.42034 10.6267 4.32216 10.0725 4.32216 9.49988C4.32216 8.92721 4.42034 8.37306 4.58105 7.85585L4.57656 7.7457L2.06503 5.72803L1.98285 5.76846C1.43824 6.89528 1.12573 8.16065 1.12573 9.49988C1.12573 10.8391 1.43824 12.1044 1.98285 13.2312L4.58998 11.1439Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9.16103 4.40165C10.6699 4.40165 11.6878 5.07588 12.2682 5.63932L14.536 3.34875C13.1432 2.00952 11.3306 1.1875 9.16103 1.1875C6.01814 1.1875 3.30384 3.05318 1.98242 5.76858L4.58063 7.85596C5.23248 5.85173 7.03604 4.40165 9.16103 4.40165Z"
                  fill="#EB4335"
                />
              </svg>
            </span>
            Sign in with google
          </Anchor>
          <div className="flex gap-2 lg:gap-[13px] h-full">
            <Anchor
              href="www.facebook.com"
              className="h-full rounded-[9px] bg-[#F2F2F2] px-[9px] flex items-center lg:w-[60px] lg:px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                fill="none"
                className="w-[18px] lg:w-[29px]"
              >
                <ellipse
                  cx="9"
                  cy="8.27978"
                  rx="7.875"
                  ry="7.875"
                  fill="url(#paint0_linear_45_193)"
                />
                <path
                  d="M11.9327 11.4084L12.2825 9.18568H10.0942V7.74393C10.0942 7.13571 10.3993 6.54248 11.3795 6.54248H12.375V4.65018C12.375 4.65018 11.4719 4.5 10.6089 4.5C8.80585 4.5 7.62844 5.56478 7.62844 7.49163V9.18568H5.625V11.4084H7.62844V16.7819C8.03065 16.8435 8.44213 16.875 8.86131 16.875C9.28049 16.875 9.69197 16.8435 10.0942 16.7819V11.4084H11.9327Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_45_193"
                    x1="9"
                    y1="0.404785"
                    x2="9"
                    y2="16.1081"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#18ACFE" />
                    <stop offset="1" stop-color="#0163E0" />
                  </linearGradient>
                </defs>
              </svg>
            </Anchor>
            <Anchor
              href="www.apple.com"
              className=" h-full rounded-[9px] bg-[#F2F2F2] px-[9px] flex items-center lg:w-[60px] lg:px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                fill="none"
                className="w-[18px] lg:w-[29px] "
              >
                <path
                  d="M16.875 9C16.875 13.347 13.3509 16.875 9 16.875C4.64906 16.875 1.125 13.347 1.125 9C1.125 4.64906 4.64906 1.125 9 1.125C13.3509 1.125 16.875 4.64906 16.875 9Z"
                  fill="#283544"
                />
                <path
                  d="M12.6912 7.00728C12.6482 7.03235 11.6252 7.5614 11.6252 8.73442C11.6734 10.0722 12.9162 10.5413 12.9375 10.5413C12.9162 10.5664 12.7499 11.1804 12.2573 11.8241C11.8663 12.3785 11.4324 12.9375 10.7734 12.9375C10.1467 12.9375 9.92165 12.568 9.19844 12.568C8.42177 12.568 8.20201 12.9375 7.60736 12.9375C6.94843 12.9375 6.48236 12.3485 6.07009 11.7993C5.53449 11.0805 5.07925 9.95237 5.06318 8.8692C5.05235 8.29523 5.17044 7.73102 5.47021 7.25178C5.8933 6.58274 6.64866 6.12857 7.47355 6.1136C8.10558 6.09374 8.66808 6.51795 9.05379 6.51795C9.42344 6.51795 10.1145 6.1136 10.8964 6.1136C11.2339 6.11392 12.1339 6.20866 12.6912 7.00728ZM9.00034 5.999C8.88784 5.47483 9.19844 4.95067 9.48772 4.61631C9.85737 4.21195 10.4412 3.9375 10.9446 3.9375C10.9768 4.46166 10.7731 4.97574 10.409 5.35014C10.0824 5.75449 9.51987 6.0589 9.00034 5.999Z"
                  fill="white"
                />
              </svg>
            </Anchor>
          </div>
        </div>
        <div className="inputs mt-[52px] lg:mt-[32px] flex flex-col gap-[38px]">
          {renderInput({
            label: "Enter your username or email address",
            type: "text",
            placeholder: "Username or email address",
            inputClassName: "w-full",
          })}
          {renderInput({
            label: "Enter your password",
            type: "password",
            placeholder: "Password",
            inputClassName: "w-full",
          })}
        </div>
        <div className="flex justify-end mt-3">
          <Anchor href="" className="text-[#E48700] text-[11px] lg:text-[13px]">
            Forget Password
          </Anchor>
        </div>
        <Button>Sign in</Button>
      </form>
    );
  };
  const SignUpForm = (): ReactNode => {
    return (
      <form>
        <Title>Sign up</Title>
        <div className="inputs mt-[52px] flex flex-col gap-[38px]">
          {renderInput({
            label: "Enter your username or email address",
            placeholder: "Username or email address",
            type: "text",
            inputClassName: "w-full",
          })}
          <div className="flex gap-[11.49px]">
            {renderInput({
              label: "User Name",
              type: "text",
              inputClassName:
                "w-[130.642px] lg:w-full pt-5 pb-4 pl-[7.86px] pr-0 text-sm font-light",
              placeholder: "Username",
            })}
            {renderInput({
              label: "Contact Number",
              type: "text",
              inputClassName:
                "w-[130.642px] lg:w-full pb-4 pl-[7.86px] pr-0 text-sm font-light",
              placeholder: "Contact Number",
            })}
          </div>
          {renderInput({
            label: "Enter your Password",
            placeholder: "Password",
            type: "password",
            inputClassName: "w-full",
          })}
        </div>
        <Button>Sign up</Button>
      </form>
    );
  };
  // ** Renders
  const renderInput = ({
    label,
    type,
    placeholder,
    inputClassName,
  }: IInputForm): ReactNode => {
    return (
      <div className="space-y-[16px] lg:space-y-[5px] 2xl:space-y-[16px]">
        <Label>{label}</Label>
        <Input
          className={inputClassName}
          type={type}
          placeholder={placeholder}
        />
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
        {registeredUser ? SignInForm() : SignUpForm()}
      </div>
    </div>
  );
};
export default Register;
