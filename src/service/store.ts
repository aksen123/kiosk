import api from "./axios";

interface Store {
  store: string;
  name: string;
  address: string;
  phone: number;
}

export const storeApi = {
  get(store: string): Promise<Store> {
    return api.get("/api/store", { params: { store } });
  },
};
