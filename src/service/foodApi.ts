import { Food } from "@/types/serivce";
import api from "./axios";

export const foodApi = {
  get: (id: string): Promise<Food> => {
    return api.get("/api/food", { params: { id } });
  },
  list: (): Promise<Food[]> => {
    return api.get("/api/foods");
  },
};
