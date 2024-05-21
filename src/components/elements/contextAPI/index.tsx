import { createContext, useEffect, useState } from "react";

type Data = {
  deviceType: string | undefined;
  notification: boolean;
  toaster: {};
  setToaster: (value: {}) => void;
  handleNotification: (value: boolean) => void;
};

export const ThemeContext = createContext<Data | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState(false);
  const [toaster, setToaster] = useState({});
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const checkDeviceType = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setDeviceType("mobile");
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Initial check
    checkDeviceType();

    // Listen for resize events
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  useEffect(() => {
    const handleToaster = () => {
      if (Object.keys(toaster).length > 0) {
        setTimeout(() => {
          setToaster({});
        }, 5000);
      }
    };

    handleToaster();
  }, [toaster]);

  const handleNotification = (value: boolean) => {
    setNotification(value);
  };

  const value = {
    deviceType,
    notification,
    toaster,
    setToaster,
    handleNotification: (value: boolean) => handleNotification(value),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
