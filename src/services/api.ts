import axios, { AxiosResponse } from "axios";
import { ImageData } from "../components/App/App.types";

const ACCESSKEY = 'eOjNQNHRBl0b_PoxTkfZa7x5RLtwue3t-YfJ0HrhpXk';
const instance = axios.create({
  baseURL: "https://api.unsplash.com",
});

export const requestProductsByQuery = async (
  query = "",
  per_page = 12,
  page = 1
): Promise<ImageData> => {
  const response: AxiosResponse<ImageData> = await instance.get(
    `/search/photos?client_id=${ACCESSKEY}&query=${query}&per_page=${per_page}&page=${page}`
  );
  return response.data;
};
  