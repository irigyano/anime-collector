"use client";
import toast from "react-hot-toast";
import { useQueryState } from "next-usequerystate";
import { useRef } from "react";

const ModalOverlay = ({
  toggleModal,
  children,
}: {
  toggleModal: () => void;
  children: React.ReactNode;
}) => {
  const modalOverlay = useRef<HTMLDivElement>(null);
  const [modalParam, setModalParam] = useQueryState("modal");

  function onModalClose() {
    setModalParam(null);
    toast.remove();
    toggleModal();
  }

  return (
    <div
      ref={modalOverlay}
      className="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50 outline-none"
      onMouseDown={onModalClose}
      onKeyDown={(e) => {
        if (e.code === "Escape") onModalClose();
      }}
      tabIndex={0}
      onMouseEnter={(e) => {
        modalOverlay.current?.focus();
      }}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
