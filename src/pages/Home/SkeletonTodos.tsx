import { Skeleton } from "@mui/material";
import { memo } from "react";

const SkeletonTodos = () => {
  return (
    <>
      <div className="flex m-auto w-fit">
        <Skeleton animation="wave" width={121} height={54} variant="rounded" />
      </div>
      <div className="space-x-3 flex justify-end m-auto w-4/5 mt-3">
        <Skeleton animation="wave" width={109} height={37} variant="rounded" />
        <Skeleton animation="wave" width={109} height={37} variant="rounded" />
      </div>
      <div className="w-4/5 flex m-auto ">
        <ul className="w-full sm:w-4/5">
          {Array.from({ length: 4 }, (_,i) => (
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
              <span className="flex space-x-2">
                <Skeleton
                  animation="wave"
                  width={24}
                  height={24}
                  variant="rounded"
                />
                <Skeleton
                  animation="wave"
                  width={24}
                  height={24}
                  variant="rounded"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default memo(SkeletonTodos);
