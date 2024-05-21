import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type Data = {
  notification: boolean;
  toaster: {};
  setToaster: (value: {}) => void;
  handleNotification: (value: boolean) => void;
};

export const ThemeContext = createContext<Data | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState(false);
  const [toaster, setToaster] = useState({});

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
    notification,
    toaster,
    setToaster,
    handleNotification: (value: boolean) => handleNotification(value),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
