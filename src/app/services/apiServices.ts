import axios from "axios";

const addApiUrl = (endpoint: string) => {
  return `http://localhost:3380${endpoint}`;
};

export const ApiServices = {
  search: async (endpoint: string) => {
    return axios.get(addApiUrl(endpoint));
  },
  create: async (endpoint: string, data: any) => {
    return axios.post(addApiUrl(endpoint), data);
  },
  update: async (endpoint: string, data: any) => {
    return axios.put(addApiUrl(endpoint), data);
  },
  delete: async (endpoint: string, data: any) => {
    return axios.delete(addApiUrl(endpoint));
  },
};
