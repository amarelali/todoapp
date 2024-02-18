import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IProps {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}
const useCustomHook = ({ queryKey, url, config }: IProps) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, config);

      return data;
    },
  });
};
export default useCustomHook;
