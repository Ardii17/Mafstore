import Footer from "@/components/elements/Footer";
import Toaster from "@/components/elements/Toaster";
import { ThemeContext } from "@/components/elements/contextAPI";
import Notification from "@/components/elements/notification";
import Navbar from "@/components/fragments/Navbar";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext);
  const disableNavbar = ["auth", "admin", "member"];
  const { pathname }: any = useRouter();

  return (
    <div className="h-screen">
      <div className="relative">
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        <Notification />
      </div>
      <div>{children}</div>
      {!disableNavbar.includes(pathname.split("/")[1]) && <Footer />}
      {theme?.deviceType === "desktop" && theme?.toaster && Object.keys(theme?.toaster).length > 0 && <Toaster />}
    </div>
  );
}
