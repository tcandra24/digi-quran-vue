import axios from "@/server/internal/api";

export const useApi = () => {
  const get = async (url: string, headers: object = {}) => {
    try {
      const response = await axios.get(url, headers);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const post = async (url: string, data: object, headers: object = {}) => {
    try {
      const response = await axios.post(url, data, headers);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const put = async (url: string, data: object, headers: object = {}) => {
    try {
      const response = await axios.put(url, data, headers);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const destroy = async (url: string, headers: object = {}) => {
    try {
      const response = await axios.delete(url, headers);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  return {
    get,
    post,
    put,
    destroy,
  };
};
