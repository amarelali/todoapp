import Button from "../../components/ui/Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Input from "../../components/ui/Input";
import axiosInstance from "../../config/axios.config";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { IErrorMessage } from "../../interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTodoSchema } from "../../validation";
import MyToDo from "../MyToDos";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({
    resolver: yupResolver(addTodoSchema),
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const addToDo: SubmitHandler<{ title: string }> = async (formData) => {
    const { jwt, user } = JSON.parse(localStorage.getItem("userdata") || "");
    try {
      setIsLoading(true);

      const {status} = await axiosInstance.post(
        "/to-dos",
        {
          data: {
            ...formData,
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
        toast.success(`new todo inserted successfully!`);
        location.reload();
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorMessage>;
      toast.error(errorObj.response?.data.error.message);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <div className="flex m-auto w-fit">
        <Button onClick={openModal} className="rounded-md p-2">
          Create TODO
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    New TODO
                  </Dialog.Title>
                  <form>
                    <div className="flex flex-col mt-2">
                      <label htmlFor="title">Title</label>
                      <Input id="title" {...register("title")} />
                      {errors && (
                        <span style={{ color: "#E48700" }}>
                          {errors.title?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={handleSubmit(addToDo)}
                        isLoading={isLoading}
                      >
                        Add TODO
                      </Button>
                      <Button
                        onClick={closeModal}
                        type="button"
                        className="bg-gray-400"
                      >
                        Close
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <MyToDo />
      <ToastContainer />

    </>
  );
};
export default Home;
