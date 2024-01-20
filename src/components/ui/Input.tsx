import { InputHTMLAttributes, forwardRef ,Ref} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}
const Input = forwardRef(({ className,...rest }: IProps , ref : Ref<HTMLInputElement>) => {
  return (
    <input
      className={`rounded-[9px] border-solid border-[#ADADAD] outline-[#E48700] border-2 h-[57px] px-[15px] py-[19px] text-[#808080] sm:text-[13px] lg:text-[14px] ${className}`}
      {...rest}
      ref={ref}
    />
  );
});
export default Input;
