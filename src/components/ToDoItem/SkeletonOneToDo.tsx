import { Skeleton } from "@mui/material";
import { ReactNode } from "react";
interface IProps {
  children?: ReactNode;
}
const SkeletonToDos = ({children}:IProps) => {
  return (
    <div className="w-4/5 flex m-auto ">
      <ul className="w-full sm:w-4/5">
        {Array.from({ length: 4 }, (_, i) => (
          <li
            className="flex justify-between"
            style={{
              padding: "16px",
              borderRadius: "9px",
              margin: "25px 0px",
              boxShadow: "2px 3px 15px -3px gray",
            }}
            key={i}
          >
            <div className="flex gap-2 items-center">
              <Skeleton
                animation="wave"
                width={32}
                height={32}
                variant="circular"
              />
              <Skeleton animation="wave" width={150} />
            </div>
           {children}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SkeletonToDos;
