import { memo, useCallback, useState } from "react";
import useCustomHook from "../../hooks/useCustomHook";
import Pagination from "../../components/Pagination";
import SkeletonAllTodos from "./SkeletonAllTodos";
import CreateTodos from "./CreateTodos";
import EditToDo from "./EditToDo";
import DeleteToDo from "./DeleteToDo";
import { IToDo } from "../../interfaces";
import SortingToDo from "./SortingToDo";
import ToDoItem from "../../components/ToDoItem";

const AllToDo = () => {
  const [currentToDo, setCurrentToDo] = useState<{ id: number; title: string }>(
    { id: 0, title: "" }
  );
  const [queryVersion, setQueryVersion] = useState(1);
  const [sortBy, setSortBy] = useState("DESC");
  const [pageSize, setPageSize] = useState("10");
  //pagination data
  const [page, setPage] = useState<number>(1);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  //** edit to do storage */
  const { jwt } = JSON.parse(localStorage.getItem("userdata") || "");

  const { isLoading, error, data } = useCustomHook({
    queryKey: ["repoData", `${queryVersion}-${sortBy}-${pageSize}-${page}`],
    url: `/to-dos?sort=createdAt:${sortBy}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    config: {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  });

  //** sort by
  const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  //** Page size
  const onChangePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(event.target.value);
  };

  const onclickPrev = useCallback(() => setPage((prev) => prev - 1), []);
  const onclickNext = useCallback(() => setPage((next) => next + 1), []);

  if (isLoading) return <SkeletonAllTodos />;

  if (error) return <span>{error.message}</span>;
  return (
    <>
      <CreateTodos setQueryVersion={setQueryVersion} />
      <SortingToDo
        select={[
          {
            values: { ASC: "Oldest", DESC: "Latest" },
            onChangeFn: onChangeSortBy,
            currentValue: sortBy,
          },
          {
            values: { 10: 10, 50: 50, 100: 100 },
            onChangeFn: onChangePageSize,
            currentValue: +pageSize,
          },
        ]}
      />
      <div className="w-4/5 flex m-auto ">
        <ul className="w-full sm:w-4/5">
          {data.data.length !== 0 ? (
            data.data.map((e: IToDo) => (
              <ToDoItem id={e.id} title={e.attributes.title}>
                <span className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      setCurrentToDo({ title: e.attributes.title, id: e.id });
                      setEditModalIsOpen(true);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      setCurrentToDo({ ...currentToDo, id: e.id });
                      setDeleteModalIsOpen(true);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </span>
              </ToDoItem>
            ))
          ) : (
            <div>There is no TODOs created yet</div>
          )}
        </ul>
      </div>
      <Pagination
        page={page}
        pageCount={data.meta.pagination.pageCount}
        onClickPrev={onclickPrev}
        onClickNext={onclickNext}
      />

      <EditToDo
        setCurrentToDo={setCurrentToDo}
        setEditModalIsOpen={setEditModalIsOpen}
        isOpenModal={editModalIsOpen}
        setQueryVersion={setQueryVersion}
        currentToDo={currentToDo}
      />
      <DeleteToDo
        deleteModalIsOpen={deleteModalIsOpen}
        currentToDo={currentToDo}
        setDeleteModalIsOpen={setDeleteModalIsOpen}
        setQueryVersion={setQueryVersion}
      />
    </>
  );
};
export default memo(AllToDo);
