import api from "./axios";

interface Store {
  id: string;
  address: string;
  phone: number;
}

export const storeApi = {
  list(): Promise<string[]> {
    return api.get("/api/store");
  },
  get(store: string): Promise<Store> {
    return api.get("/api/store", { params: { store } });
  },
};
