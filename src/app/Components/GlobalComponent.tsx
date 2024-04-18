"use client";

import { useEffect, useState } from "react";
import Alert from "../modal/Alert";
import Confirm from "../modal/Confirm";
import Warning from "../modal/Warning";
import { CheckType, modalState } from "../atoms/modal-atom";
import { useRecoilState } from "recoil";
const GlobalComponent = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.alert = (message: string, cb?: () => void) => {
      const handle = () => {
        cb && cb();
        setOpen(false);
      };
      setTimeout(() => {
        setModal({
          ...modal,
          type: CheckType.alert,
          title: message,
          handleEvent: handle,
        });
        setOpen(true);
      }, 100);
    };

    window.yesNo = (
      title: string,
      message: string,
      yes?: string,
      cb?: () => void
    ) => {
      const handle = () => {
        cb && cb();
        setOpen(false);
      };
      setTimeout(() => {
        setModal({
          ...modal,
          type: CheckType.yesNo,
          title: title,
          message: message,
          yes: yes ? yes : "확인",
          handleEvent: handle,
        });
        setOpen(true);
      }, 100);
    };
    const main = document.getElementById("main");
    const root = document.createElement("div");
    const root2 = document.createElement("div");
    const modalCheck = document.getElementById("modal");
    const alertCheck = document.getElementById("alert");
    if (!modalCheck) {
      root.setAttribute("id", "modal");
      main?.appendChild(root);
    }
    if (!alertCheck) {
      root2.setAttribute("id", "alert");
      main?.appendChild(root2);
    }
  }, [modal, setModal]);

  return (
    <Warning open={open}>
      {modal.type === CheckType.alert && (
        <Alert message={modal.title} callback={modal.handleEvent} />
      )}
      {modal.type === CheckType.yesNo && (
        <Confirm
          title={modal.title}
          message={modal.message}
          yes={modal.yes}
          cb1={modal.handleEvent}
          cb2={() => setOpen(false)}
        />
      )}
    </Warning>
  );
};

export default GlobalComponent;
