import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IErrorMessage, IToDo } from "../../interfaces";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const MyToDo = () => {
  const [data, setData] = useState<IToDo[]>([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentToDo, setCurrentToDo] = useState<{ id: number; title: string }>(
    { id: 0, title: "" }
  );
  const [editedData, setEditedData] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  //** edit to do storage */
  const { jwt } = JSON.parse(localStorage.getItem("userdata") || "");
   useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, status } = await axiosInstance.get("/users/me?populate=to_dos", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (status === 200) {
          setData(data.to_dos);
        }
      } catch (error) {
        const errorObj = error as AxiosError<{ message: string }>;
        toast.error(errorObj.message, {
          position: "bottom-center",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [editedData]);
  // ** modal for edit todo
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentToDo({ ...currentToDo, title: e.target.value });
  };
  const editToDo = async () => {
    const { title, id } = currentToDo;
    const { jwt, user } = JSON.parse(localStorage.getItem("userdata") || "");
    try {
      setIsLoadingEdit(true);
      const { status } = await axiosInstance.put(
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
      if (status === 200) {
        toast.success(`todo edited successfully!`, {
          position: "bottom-center",
        });
        setEditedData(true);
        setTimeout(()=>{
          location.replace('/todo');
        },1000);      }
    } catch (error) {
      setIsLoading(false);
      const errorObj = error as AxiosError<IErrorMessage>;
      toast.error(errorObj.response?.data.error.message, {
        position: "top-center",
      });
    } finally {
      setEditModalIsOpen(false);
      setIsLoadingEdit(false);
      setEditedData(false);
    }
  };
  // ** modal for delete todo
  const deleteToDo = async () => {
    const { id } = currentToDo;
    const { jwt } = JSON.parse(localStorage.getItem("userdata") || "");
    try {
      setIsLoadingDelete(true); 
      const { status } = await axiosInstance.delete(`/to-dos/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (status === 200) {
        toast.success(`todo deleted successfully!`, {
          position: "bottom-center",
        });
        setEditedData(true);
        setTimeout(()=>{
          location.replace('/todo');
        },1000);      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorMessage>;
      toast.error(errorObj.response?.data.error.message, {
        position: "top-center",
      });
    } finally {
      setDeleteModalIsOpen(false);
      setIsLoadingDelete(false);
      setEditedData(false);
    }
  };

  if(isLoading) return <span>Loading...</span>;
  return (
    <>
      <div className="w-4/5 flex m-auto ">
        <ul className="w-full sm:w-4/5">
        { data.length !== 0 
          ? (
            data.map((e,i) => (
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
                {++i} - {e.title}
                <span className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      setCurrentToDo({ ...currentToDo, id: e.id });
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
            ))
          ) : (
            <div>No TODOs created yet</div>
          )}
        </ul>
      </div>
      {/* modal for edit todo */}
      <Modal
        title="Edit todo title"
        isOpen={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
      >
        <Input className="my-2 w-full" onChange={onChange} />

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
