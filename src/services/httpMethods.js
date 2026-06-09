import axiosInstance from './axiosInstance';

export const httpMethods = {
  get: async (url, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  patch: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.patch(url, data, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

export default httpMethods;
