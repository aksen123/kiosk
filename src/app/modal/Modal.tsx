"use client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  const [root, setRoot] = useState<Element | null>(null);
  useEffect(() => {
    const root = document.querySelector("#modal");
    root && setRoot(root);
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[1]"
      >
        {children}
      </div>
    </>,
    root as HTMLElement
  );
};

export default Modal;
