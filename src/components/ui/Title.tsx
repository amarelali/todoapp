import { ReactNode } from "react";

interface IProps {
    children:ReactNode;
}
const Title= ({children}: IProps) => {
  return (
    <h1 className="text-[40px] font-medium">{children}</h1>
  );
};
export default Title;