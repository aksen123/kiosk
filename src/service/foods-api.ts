import { Food } from "@/types/serivce";
import api from "./axios";

export const foodsApi = {
  list: (): Promise<Food[]> => {
    return api.get("/api/foods");
  },
};
