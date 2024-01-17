import { AnchorHTMLAttributes } from "react";

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}
const Anchor = ({ children, ...rest }: IProps) => {
  return (
    <a {...rest}>
      {children}
    </a>
  );
};
export default Anchor;
