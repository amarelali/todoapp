import { Skeleton } from "@mui/material";

interface IProps {}
const SkeletonTodos = ({}: IProps) => {
  return (
    <li
      className="flex justify-between"
      style={{
        padding: "16px",
        borderRadius: "9px",
        margin: "25px 0px",
        boxShadow: "2px 3px 15px -3px gray",
      }}
    >
      <div className="flex gap-2 items-center">
        <Skeleton animation="wave" width={32} height={32} variant="circular" />
        <Skeleton animation="wave" width={150} />
      </div>
      <span className="flex space-x-2">
        <Skeleton animation="wave" width={24} height={24} variant="rounded" />
        <Skeleton animation="wave" width={24} height={24} variant="rounded" />
      </span>
    </li>
  );
};
export default SkeletonTodos;
