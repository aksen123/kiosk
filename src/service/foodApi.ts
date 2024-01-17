import { Food } from "@/types/serivce";
import { Order } from "@/app/api/order/route";
import api from "./axios";

export const foodApi = {
  get: (id: string): Promise<Food> => {
    return api.get("/api/food", { params: { id } });
  },
  list: (): Promise<Food[]> => {
    return api.get("/api/foods");
  },
  order: (food: Food[]) => {
    return api.post("/api/order", food);
  },
  orderList: (): Promise<Order[]> => {
    return api.get("api/order");
  },
};
