import { useState } from "react";
import axiosInstance from "../../config/axios.config";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IErrorMessage } from "../../interfaces";
import { useMutation } from "@tanstack/react-query";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";


interface IProps {
  deleteModalIsOpen: boolean;
  setQueryVersion: React.Dispatch<React.SetStateAction<number>>;
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentToDo: { id: number; title: string };
}
const DeleteToDo = ({
    deleteModalIsOpen ,
  currentToDo,
  setQueryVersion,
  setDeleteModalIsOpen,
}: IProps) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { jwt } = JSON.parse(localStorage.getItem("userdata") || "");

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
  return (
    <>
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
export default DeleteToDo;
