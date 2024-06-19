import axios from "axios";

export const ApiServices = {
  search: async (endpoint: string) => {
    return axios.get(endpoint);
  },
  create: async (endpoint: string, data: any) => {
    return axios.post(endpoint, data);
  },
  update: async (endpoint: string, data: any) => {
    return axios.put(endpoint, data);
  },
  delete: async (endpoint: string, data: any) => {
    return axios.delete(endpoint);
  },
};
