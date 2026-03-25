import { useEffect, useState } from "react";

interface ModalProps {
  open: boolean;
  children: any;
}

export const Modal = ({ open, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);

      setTimeout(() => {
        setAnimate(true);
      }, 10); // allow DOM render before animating
    } else {
      setAnimate(false);

      setTimeout(() => {
        setMounted(false);
      }, 200);
    }
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
      bg-purple-200/50 backdrop-blur-sm
      transition-opacity duration-200
      ${animate ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`transform transition-all duration-200
        ${animate ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
      >
        {children}
      </div>
    </div>
  );
};