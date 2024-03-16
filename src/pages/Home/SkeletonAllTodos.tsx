import { Skeleton } from "@mui/material";
import { memo } from "react";
import SkeletonToDos from "../../components/ToDoItem/SkeletonOneToDo";

const SkeletonAllTodos = () => {
  return (
    <>
      <div className="flex m-auto w-fit">
        <Skeleton animation="wave" width={121} height={54} variant="rounded" />
      </div>
      <div className="space-x-3 flex justify-end m-auto w-4/5 mt-3">
        <Skeleton animation="wave" width={109} height={37} variant="rounded" />
        <Skeleton animation="wave" width={109} height={37} variant="rounded" />
      </div>
      <SkeletonToDos>
        <span className="flex space-x-2">
          <Skeleton animation="wave" width={24} height={24} variant="rounded" />
          <Skeleton animation="wave" width={24} height={24} variant="rounded" />
        </span>
      </SkeletonToDos>
    </>
  );
};
export default memo(SkeletonAllTodos);
