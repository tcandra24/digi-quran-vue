import axios from "@/server/external/api";

export const useApi = () => {
  const get = async (url: string, headers: object = {}) => {
    try {
      const response = await axios.get(url, headers);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  return {
    get,
  };
};
