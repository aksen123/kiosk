import { atom } from "recoil";
import { Food } from "@/types/serivce";



export const cartState = atom<Food[]>({
  key : 'cart',
  default : []
}) 
