import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children:ReactNode;
}
const Button= ({children,...rest}: IProps) => {
  return (
    <button
    className="mt-[35px]  2xl:mt-[47px] text-white text-base font-medium h-[54px] bg-[#E48700] rounded-[10px] w-full"
    style={{ boxShadow: "0px 4px 19px 0px rgba(119, 147, 65, 0.30)" }}
    {...rest}
  >
    {children}
  </button>
  );
};
export default Button;