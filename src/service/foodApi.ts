import { Food, Order } from "@/types/serivce";
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
    return api.get("/api/order");
  },
  payment: (tableNo: string, total: number) => {
    return api.post("/api/payment", { tableNo, total });
  },
};
