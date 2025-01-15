import axios from "@/server/api";

export const useApi = () => {
  const get = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const post = async (url: string, data = {}) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  return {
    get,
    post,
  };
};
