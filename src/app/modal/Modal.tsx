"use client";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  const root = document.querySelector("#modal");

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]"
      >
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
          className="relative top-1/2 left-1/2 w-1/2 h-4/5 -translate-x-[50%] -translate-y-[50%] bg-white z-[11]"
        >
          {children}
        </div>
      </div>
    </>,
    root as HTMLElement
  );
};

export default Modal;
