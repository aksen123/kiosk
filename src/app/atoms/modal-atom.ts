import { atom } from "recoil";

export enum CheckType {
  alert = "alert",
  yesNo = "yesNo",
  select = "select",
}

export interface AtomType {
  type: CheckType;
  title: string;
  message: string;
  yes: string;
  handleEvent?: (bool?: boolean) => void;
}
const modal: AtomType = {
  type: CheckType.alert,
  title: "",
  message: "",
  yes: "확인",
  handleEvent: undefined,
};

export const modalState = atom({
  key: "modalState",
  default: modal,
});
