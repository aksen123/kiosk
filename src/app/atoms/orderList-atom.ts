import { atom } from "recoil";
import { Food } from "@/types/serivce";
export const orderListState = atom<Food[][]>({
  key : 'orderList',
  default: []
})