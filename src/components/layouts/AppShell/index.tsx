import { ThemeContext } from "@/components/elements/contextAPI";
import { useRouter } from "next/router";
import { useContext } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext);
  const disableNavbar = ["auth", "admin"];
  const { pathname } = useRouter();
  return (
    <>
      <div>{children}</div>
    </>
  );
}
