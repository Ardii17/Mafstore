import Footer from "@/components/elements/Footer";
import { ThemeContext } from "@/components/elements/contextAPI";
import Navbar from "@/components/fragments/Navbar";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext);
  const disableNavbar = ["auth", "admin", "member"];
  const { pathname }: any = useRouter();

  return (
    <div className="h-screen">
      {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
      <div>{children}</div>
      {!disableNavbar.includes(pathname.split("/")[1]) && <Footer />}
    </div>
  );
}
