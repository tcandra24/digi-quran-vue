import axios from "@/server/api";

export const useApi = () => {
  const get = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const post = async (url: string, data = {}) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  return {
    get,
    post,
  };
};
