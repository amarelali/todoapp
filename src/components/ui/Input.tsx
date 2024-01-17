import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}
const Input = ({ className,...rest }: IProps) => {
  return (
    <input
      className={`rounded-[9px] border-solid border-[#ADADAD] outline-[#E48700] border-2 h-[57px] px-[15px] py-[19px] text-[#808080] text-[13px] lg:text-[14px] ${className}`}
      {...rest}
    />
  );
};
export default Input;
