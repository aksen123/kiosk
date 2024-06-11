import api from "./axios";

interface Store {
  store: string;
  name: string;
  address: string;
  phone: number;
}
interface Codes {
  code: string;
  name: string;
}
export const storeApi = {
  get(store: string): Promise<Store> {
    return api.post("/api/store", { store });
  },
  getCode(): Promise<Codes[]> {
    return api.get("/api/store");
  },
};
