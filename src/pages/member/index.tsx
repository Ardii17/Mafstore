import { ThemeContext } from "@/components/elements/contextAPI";
import Member from "@/components/views/member";
import MemberDashboardView from "@/components/views/member/Dashboard";
import { useContext } from "react";

const MemberPage = () => {
  const theme = useContext(ThemeContext)
  return (
    <>
      {theme?.deviceType === "mobile" ? <Member /> : <MemberDashboardView />}
    </>
  );
};

export default MemberPage;
