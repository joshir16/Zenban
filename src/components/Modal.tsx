import { useEffect, type ReactElement } from "react";
import { createPortal } from "react-dom";

type Prop = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
};

export default function Modal({ isOpen, onClose, children }: Prop) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e1e] p-3 md:p-6 rounded-lg shadow-2xl border border-background-500 flex-1 max-w-80 md:max-w-md flex flex-col gap-5 relative animate-in fade-in zoom-in duration-400"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,

    document.body,
  );
}
