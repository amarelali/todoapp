import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IErrorMessage } from "../../interfaces";

const MyToDo = () => {
  const [data, setData] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [toDoForEdit, setToDoForEdit] = useState({id:0,title:""});
  const [isLoading, setIsLoading] = useState(false);

  //** edit to do storage */
  const { jwt } = JSON.parse(localStorage.getItem("userdata") || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await axiosInstance.get("/to-dos", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (status === 200) {
          console.log(data.data);
          setData(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
  }, [toDoForEdit]);
  // ** modal for edit todo
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDoForEdit({...toDoForEdit,title:e.target.value});
  };
  const editToDo = async () => {
    console.log(toDoForEdit);
    const {title,id } = toDoForEdit;
    const { jwt, user } = JSON.parse(localStorage.getItem("userdata") || "");
    try {
      setIsLoading(true);
      const {status} = await axiosInstance.put(
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
        toast.success(`todo edited successfully!`);
       }
    } catch (error) {
       setIsLoading(false);
      const errorObj = error as AxiosError<IErrorMessage>;
      toast.error(errorObj.response?.data.error.message);
    } finally {
      setEditModalIsOpen(false);
      setIsLoading(false);
    }
 
  };

  return (
    <>
      <div className="w-4/5 flex m-auto ">
        <ul className="w-4/5">
          {data.map((e) => (
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
              {e.id} - {e.attributes.title}
              <span className="flex space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setToDoForEdit({...toDoForEdit,id:e.id});
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
          ))}
        </ul>
      </div>
      {/* modal for edit todo */}
      <Modal
        title="Edit todo title"
        isOpen={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
      >
        <Input
          className="my-2 w-full"
          onChange={onChange}
        />

        <div className="flex space-x-2">
          <Button onClick={editToDo} isLoading={isLoading}>Edit</Button>
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
export default MyToDo;
