import { ReactNode } from "react";

interface IProps {
    title:string;
    id:number;
    children?: ReactNode;

}
const ToDoItem= ({title,id,children}: IProps) => {
  return (
    <li
    className="flex justify-between"
    key={id}
    style={{
      padding: "16px",
      borderRadius: "9px",
      margin: "25px 0px",
      boxShadow: "2px 3px 15px -3px gray",
    }}
  >
    <div className="flex gap-2 items-center">
      <span className="w-8 h-8 rounded-full bg-[#e48700] text-white text-sm flex justify-center items-center">
        <span>{id}</span>
      </span>
      {title}
    </div>
    {children}
  </li>
  );
};
export default ToDoItem;