import axios, { AxiosResponse } from "axios";
import { ImageData } from "../components/App/App.types";


export interface ApiResponse {
  results: [ImageData];
  total: number;
  data: string;
}

const ACCESSKEY = 'eOjNQNHRBl0b_PoxTkfZa7x5RLtwue3t-YfJ0HrhpXk';
const instance = axios.create({
  baseURL: "https://api.unsplash.com",
});

export const requestProductsByQuery = async (
  query = "",
  per_page = 12,
  page = 1
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await instance.get(
    `/search/photos?client_id=${ACCESSKEY}&query=${query}&per_page=${per_page}&page=${page}`
  );
  return response.data;
};
  