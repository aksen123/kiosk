import { Food } from "@/types/serivce";
import api from "./axios";

export const foodApi = {
  get: (): Promise<Food> => {
    return api.get("/api/food");
  },
  list: (): Promise<Food[]> => {
    return api.get("/api/foods");
  },
};
