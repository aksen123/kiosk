import { Food, Order } from "@/types/serivce";
import api from "./axios";

export const foodApi = {
  get: (id: string): Promise<Food> => {
    return api.get("/api/food", { params: { id } });
  },
  list: (store: string): Promise<Food[]> => {
    return api.get("/api/foods", { params: { store } });
  },
  order: (food: Food[]) => {
    return api.post("/api/order", food);
  },
  orderList: (): Promise<Order[]> => {
    return api.get("/api/order");
  },
  payment: (store: string, total: number, order: Food[], orderType: boolean) => {
    return api.post("/api/payment", { store, total, order,orderType });
  },
};
