import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contextAPI";
import { ToasterTypes } from "@/types";

const variantToaster: any = {
  success: {
    text: "Success",
    icon: "bx bx-check-circle",
    color: "text-green-700",
    bg: "#e6f4e7",
    boxbg: "#7cc680",
  },
  failed: {
    text: "Error",
    icon: "bx bx-error-circle",
    color: "text-red-700",
    bg: "#fff1db",
    boxbg: "#fd845c",
  },
  warning: {
    text: "Warning",
    icon: "bx bx-check-circle",
    color: "text-yellow-700",
    bg: "#e6f4e7",
    boxbg: "#feb64d",
  },
};

const Toaster = () => {
  const { toaster, setToaster } = useContext<ToasterTypes | any>(ThemeContext);
  const [lengthToaster, setLengthToaster] = useState(100);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const handleLengthToaster = () => {
      timerRef.current = setInterval(() => {
        setLengthToaster((prev) => prev - 0.15);
      }, 1);
    };

    handleLengthToaster();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (lengthToaster < 0) {
      setToaster({});
    }
  }, [lengthToaster, setToaster]);

  return (
    <div className="fixed right-12 bottom-12 shadow rounded overflow-hidden">
      <div
        className="flex gap-4 items-center px-5 py-3 z-10 min-w-72"
        style={{
          backgroundColor: `${variantToaster[`${toaster?.variant}`].bg}`,
        }}
      >
        <i
          className={`${variantToaster[`${toaster?.variant}`].icon} text-2xl`}
          style={{
            color: `${variantToaster[`${toaster?.variant}`].boxbg}`,
          }}
        />
        <div>
          <p>{`${variantToaster[`${toaster?.variant}`].text}`}</p>
          <p className="whitespace-normal">{`${toaster?.message}`}</p>
        </div>
      </div>
      <i
        className="bx bx-x absolute top-0 right-1 text-2xl cursor-pointer"
        style={{ color: `${variantToaster[`${toaster?.variant}`].boxbg}` }}
        onClick={() => setToaster({})}
      />
      <div
        className="h-1 absolute left-0 right-0 bottom-0"
        style={{
          backgroundColor: `${variantToaster[`${toaster?.variant}`].boxbg}`,
        }}
      >
        <div
          className="bg-green-700 h-1 top-0 bottom-0 z-10"
          style={{ width: `${lengthToaster}%` }}
        />
      </div>
    </div>
  );
};

export default Toaster;
