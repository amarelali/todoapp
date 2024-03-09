import Button from "../../components/ui/Button";
import { useState } from "react";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import axiosInstance from "../../config/axios.config";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTodoSchema } from "../../validation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IErrorMessage } from "../../interfaces";
import { ToastContainer, toast } from "react-toastify";

const CreateTodos = ({setQueryVersion}: {setQueryVersion: React.Dispatch<React.SetStateAction<number>>}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ title: string }>({
    resolver: yupResolver(addTodoSchema),
  });
  const { jwt, user } = JSON.parse(localStorage.getItem("userdata") || "");

  const mutation = useMutation({
    mutationKey: ["mutation"],
    mutationFn: async (formData: { title: string }) => {
      const { title } = formData;

      const { data } = await axiosInstance.post(
        "/to-dos",
        {
          data: {
            title,
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
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      setIsOpen(false);
      setValue("title", "");
      setQueryVersion((prev)=>prev+1);
      toast.success(`todo added successfully!`, {
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
      setIsLoading(false);
      setIsOpen(false);
    },
  });
  function closeModal() {
    setIsOpen(false);
    setValue("title", "");
  }

  function openModal() {
    setIsOpen(true);
  }
  const addToDo: SubmitHandler<{ title: string }> = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <div className="flex m-auto w-fit">
        <Button onClick={openModal} className="rounded-md p-2">
          Create TODO
        </Button>
      </div>

      <Modal title={"New TODO"} isOpen={isOpen} onClose={closeModal}>
        <form>
          <div className="flex flex-col mt-2">
            <label htmlFor="title">Title</label>
            <Input id="title" {...register("title")} />
            {errors && (
              <span style={{ color: "#E48700" }}>{errors.title?.message}</span>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <Button onClick={handleSubmit(addToDo)} isLoading={isLoading}>
              Add TODO
            </Button>
            <Button onClick={closeModal} type="button" className="bg-gray-400">
              Close
            </Button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default CreateTodos;
