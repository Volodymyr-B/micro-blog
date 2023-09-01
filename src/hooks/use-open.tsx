import { useState } from "react";

export const useOpen = () => {
  const [isOpen, setOpen] = useState(false);

  const handlerOpen = () => {
    setOpen(!isOpen);
  };
  const handleClose = () => {
    if (!isOpen) return;
    setOpen(false);
  };

  return { isOpen, handlerOpen, handleClose };
};
