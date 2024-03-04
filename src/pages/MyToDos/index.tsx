import { useState } from "react";
import axiosInstance from "../../config/axios.config";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IErrorMessage, IToDo } from "../../interfaces";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import useCustomHook from "../../hooks/useCustomHook";
import { useMutation } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";
import SkeletonTodos from "./SkeletonTodos";

const MyToDo = ({ dataUpdated }: { dataUpdated: number }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentToDo, setCurrentToDo] = useState<{ id: number; title: string }>(
    { id: 0, title: "" }
  );
  const [queryVersion, setQueryVersion] = useState(1);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("DESC");
  const [pageSize, setPageSize] = useState("10");
  //pagination data
  const [page, setPage] = useState<number>(1);

  //** edit to do storage */
  const { jwt, user } = JSON.parse(localStorage.getItem("userdata") || "");

  const { isLoading, error, data } = useCustomHook({
    queryKey: [
      "repoData",
      `${queryVersion}-${dataUpdated}-${sortBy}-${pageSize}-${page}`,
    ],
    url: `/to-dos?sort=createdAt:${sortBy}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    config: {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  });
  // ** modal for edit todo
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentToDo({ ...currentToDo, title: e.target.value });
  };
  const mutationEdit = useMutation({
    mutationKey: ["editMutation"],
    mutationFn: async () => {
      const { title, id } = currentToDo;
      const { data } = await axiosInstance.put(
        `/to-dos/${id}`,
        {
          data: {
            title: title,
            users: [user.id],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return data;
    },
    onMutate: () => {
      setIsLoadingEdit(true);
    },
    onSuccess: () => {
      setEditModalIsOpen(false);
      setIsLoadingEdit(false);
      setQueryVersion((prev) => prev + 1);
      toast.success(`todo edited successfully!`, {
        position: "bottom-center",
      });
    },
    onError: (error) => {
      if (error as AxiosError<IErrorMessage>) {
        const errorObj = error as AxiosError<IErrorMessage>;
        toast.error(errorObj.response?.data.error.message, {
          position: "top-center",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
        });
      }
      setIsLoadingEdit(false);
      setEditModalIsOpen(false);
    },
  });
  const editToDo = async () => {
    mutationEdit.mutate();
  };
  // ** modal for delete todo
  const mutationDelete = useMutation({
    mutationKey: ["deleteMutation"],
    mutationFn: async () => {
      const { id } = currentToDo;
      const { data } = await axiosInstance.delete(`/to-dos/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return data;
    },
    onMutate: () => {
      setIsLoadingDelete(true);
    },
    onSuccess: () => {
      setDeleteModalIsOpen(false);
      setIsLoadingDelete(false);
      setQueryVersion((prev) => prev + 1);
      toast.success(`todo deleted successfully!`, {
        position: "bottom-center",
      });
    },
    onError: (error) => {
      if (error as AxiosError<IErrorMessage>) {
        const errorObj = error as AxiosError<IErrorMessage>;
        toast.error(errorObj.response?.data.error.message, {
          position: "top-center",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
        });
      }
      setIsLoadingDelete(false);
      setDeleteModalIsOpen(false);
    },
  });
  const deleteToDo = () => {
    mutationDelete.mutate();
  };
  //** sort by
  const onChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  //** Page size
  const onChangePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(event.target.value);
  };

  if (isLoading)
    return (
      <div className="w-4/5 flex m-auto ">
        <ul className="w-full sm:w-4/5">
          {Array.from({ length: 10 }, () => (
            <SkeletonTodos />
          ))}
        </ul>
      </div>
    );
console.log(data)
  if (error) return <span>{error.message}</span>;
  return (
    <>
      <div className="space-x-3 flex justify-end m-auto w-4/5 mt-3">
        <select
          className="border-2 border-[#E48700] focus-visible:outline-[0px] rounded-md p-1"
          value={pageSize}
          onChange={onChangePageSize}
        >
          <option disabled>Page size</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <select
          className="border-2 border-[#E48700] focus-visible:outline-[0px] rounded-md p-1"
          value={sortBy}
          onChange={onChangeSortBy}
        >
          <option disabled>Sort by</option>
          <option value="ASC">Oldest</option>
          <option value="DESC">Latest</option>
        </select>
      </div>

      <div className="w-4/5 flex m-auto ">
        <ul className="w-full sm:w-4/5">
          {data.data.length !== 0 ? (
            data.data.map((e: IToDo) => (
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
                    {e.attributes.title}
                  </div>
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
                </li>
              </>
            ))
          ) : (
            <div>No TODOs created yet</div>
          )}
        </ul>
      </div>
      <Pagination
        page={page}
        pageCount={data.meta.pagination.pageCount}
        onClickPrev={() => setPage((prev) => prev - 1)}
        onClickNext={() => setPage((prev) => prev + 1)}
      />

      {/* modal for edit todo */}
      <Modal
        title="Edit todo title"
        isOpen={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
      >
        <Input
          className="my-2 w-full"
          onChange={onChange}
          value={currentToDo.title}
        />

        <div className="flex space-x-2">
          <Button onClick={editToDo} isLoading={isLoadingEdit}>
            Edit
          </Button>
          <Button
            onClick={() => setEditModalIsOpen(false)}
            className="bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </Modal>

      {/*  modal for delete todo  */}
      <Modal
        title="Delete todo"
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        icon={
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
        }
      >
        <p className="my-2">
          Are you sure you want to delete this todo? your data will be
          permanently removed. This action cannot be undone.
        </p>
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              deleteToDo();
            }}
            isLoading={isLoadingDelete}
          >
            Delete
          </Button>
          <Button
            onClick={() => setDeleteModalIsOpen(false)}
            className="bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default MyToDo;
