import { useEffect, useRef } from "react";

type propTypes = {
  children: React.ReactNode;
  modalTitle: string;
  onClose: any;
  className?: string;
};

const ModalUpdate = (props: propTypes) => {
  const { children, onClose, modalTitle, className = "w-1/3" } = props;
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div
      className="flex w-screen h-screen z-50 fixed items-center justify-center top-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className={`bg-white p-4 rounded overflow-y-auto ${className}`}
        id="modalUpdate"
        ref={ref}
        style={{ maxHeight: "35rem" }}
      >
        <p className="text-xl mb-4">{modalTitle}</p>
        {children}
      </div>
    </div>
  );
};

export default ModalUpdate;
