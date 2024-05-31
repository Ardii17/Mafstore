import SidebarLayout from "@/components/fragments/Sidebar";
import React from "react";

type propTypes = {
  children?: React.ReactNode;
};

const MemberLayout = (props: propTypes) => {
  const { children } = props;
  return (
    <div className="max-sm:block md:flex md:flex-col lg:flex-row gap-2">
      <SidebarLayout titleSidebar="Settings" className="max-sm:hidden" />
      <div className="my-3 w-full me-4 md:px-4 max-md:px-4 lg:ms-12">{children}</div>
    </div>
  );
};

export default MemberLayout;
