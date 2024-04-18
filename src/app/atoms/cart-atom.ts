import { atom, selector } from "recoil";
import { Food } from "@/types/serivce";

export const cartState = atom<Food[]>({
  key: "cart",
  default: [],
});

export const cartSelect = selector<Food[]>({
  key: "cartSelector",
  get: ({ get }) => {
    let cart = get(cartState);
    let list = [...cart].sort((a, b) => a.sort - b.sort);
    return list;
  },
  set: ({ set }, newArr) => {
    set(cartState, newArr);
  },
});
