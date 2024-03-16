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
            <>
              <li
                className="flex justify-between"
                key={e.id}
                style={{
                  padding: "16px",
                  borderRadius: "9px",
                  margin: "25px 0px",
                  boxShadow: "2px 3px 15px -3px gray",
                }}
              >
                <div className="flex gap-2 items-center">
                  <span className="w-8 h-8 rounded-full bg-[#e48700] text-white text-sm flex justify-center items-center">
                    <span>{e.id}</span>
                  </span>
                  {e.title}
                </div>
              </li>
            </>
          ))
        ) : (
          <div>There is no TODOs created yet for you</div>
        )}
      </ul>
    </div>
  );
};
export default MyToDos;
