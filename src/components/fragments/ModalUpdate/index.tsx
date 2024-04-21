import { useEffect, useRef } from "react";

type types = {
  children: React.ReactNode;
  onClose: any;
};

const ModalUpdate = (props: types) => {
  const { children, onClose } = props;
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
      <div className="w-1/3 h-auto bg-white p-4 rounded" ref={ref}>
        <p className="text-xl mb-4">Update User</p>
        {children}
      </div>
    </div>
  );
};

export default ModalUpdate;
