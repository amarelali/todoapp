import { LabelHTMLAttributes, ReactNode } from "react";

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}
const label = ({ children, ...rest }: IProps) => {
  return (
    <label className="text-sm font-normal lg:text-base" {...rest}>
      {children}
    </label>
  );
};
export default label;
