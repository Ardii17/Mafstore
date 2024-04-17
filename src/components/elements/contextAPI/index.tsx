import { createContext } from "react";

type Data = {
  name: string;
};

export const ThemeContext = createContext<Data | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = {
    name: "Ardiansyah",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
