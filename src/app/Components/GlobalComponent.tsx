"use client";

import { useEffect, useState } from "react";
import Alert from "../modal/Alert";
import Confirm from "../modal/Confirm";
import Warning from "../modal/Warning";
import { CheckType, modalState } from "../atoms/modal-atom";
import { useRecoilState } from "recoil";
import OrderType from "../modal/OrderType";
const GlobalComponent = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.alert = (
      message1: string,
      message2?: string | (() => void),
      cb?: () => void
    ) => {
      if (typeof message2 === "string") {
        const handle = () => {
          cb && cb();
          setOpen(false);
        };
        setTimeout(() => {
          setModal({
            ...modal,
            type: CheckType.alert,
            title: message1,
            message: message2,
            handleEvent: handle,
          });
          setOpen(true);
        }, 100);
      }
      if (typeof message2 === "function") {
        const handle = () => {
          message2();
          setOpen(false);
        };
        setTimeout(() => {
          setModal({
            ...modal,
            type: CheckType.alert,
            title: message1,
            message: "",
            handleEvent: handle,
          });
          setOpen(true);
        }, 100);
      }
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

    window.selectOrder = (callback: (bool: boolean) => void) => {
      const handle = (bool?: boolean) => {
        typeof bool === "boolean" && callback(bool);
      };
      setTimeout(() => {
        setModal({
          ...modal,
          type: CheckType.select,
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
        <Alert
          title={modal.title}
          message={modal.message}
          callback={modal.handleEvent}
        />
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
      {modal.type === CheckType.select && (
        <OrderType
          callback1={modal.handleEvent as (bool?: boolean) => void}
          callback2={() => setOpen(false)}
        />
      )}
    </Warning>
  );
};

export default GlobalComponent;
