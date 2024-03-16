import ToDoItem from "../../components/ToDoItem";
import useCustomHook from "../../hooks/useCustomHook";
import { IMyToDo } from "../../interfaces";
import SkeletonTodos from "../Home/SkeletonTodos";

const MyToDos = () => {
  const { jwt } = JSON.parse(localStorage.getItem("userdata") || "");

  const { isLoading, error, data } = useCustomHook({
    queryKey: ["repoData"],
    url: `/users/me?populate=to_dos`,
    config: {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  });
  console.log(data);
  if (isLoading) return <SkeletonTodos />;
  if (error) return <span>{error.message}</span>;
  return (
    <div className="w-4/5 flex m-auto ">
      <ul className="w-full sm:w-4/5">
        {data.to_dos.length !== 0 ? (
          data.to_dos.map((e: IMyToDo) => (
            <ToDoItem id={e.id} title={e.title} />
          ))
        ) : (
          <div>There is no TODOs created yet for you</div>
        )}
      </ul>
    </div>
  );
};
export default MyToDos;
