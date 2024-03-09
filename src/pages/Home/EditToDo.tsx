import Input from "../../components/ui/Input";
import { useState } from "react";
import axiosInstance from "../../config/axios.config";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IErrorMessage } from "../../interfaces";
import { useMutation } from "@tanstack/react-query";
interface IProps {
  isOpenModal: boolean;
  setQueryVersion: React.Dispatch<React.SetStateAction<number>>;
  setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentToDo: { id: number; title: string };
  setCurrentToDo: (
    value: React.SetStateAction<{
      id: number;
      title: string;
    }>
  ) => void;
}
const EditToDo = ({
  setQueryVersion,
  isOpenModal,
  setEditModalIsOpen,
  currentToDo,
  setCurrentToDo
}: IProps) => {
  const { jwt, user } = JSON.parse(localStorage.getItem("userdata") || "");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
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
  return (
    <>
      {/* modal for edit todo */}
      <Modal
        title="Edit todo title"
        isOpen={isOpenModal}
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
    </>
  );
};
export default EditToDo;
