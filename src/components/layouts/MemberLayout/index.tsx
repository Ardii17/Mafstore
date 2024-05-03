import SidebarLayout from "@/components/fragments/Sidebar";
import React from "react";

type types = {
  children: React.ReactNode;
};

const listItems = [
  {
    title: "Dashboard",
    link: "/member",
    icon: "bxs-dashboard",
  },
  {
    title: "Order",
    link: "/member/order",
    icon: "bxs-cart",
  },
  {
    title: "Profile",
    link: "/member/profile",
    icon: "bxs-user",
  },
];

const MemberLayout = (props: types) => {
  const { children } = props;
  return (
    <div className="flex gap-4">
      <SidebarLayout lists={listItems} titleSidebar="Settings" />
      <div className="my-3 w-full me-4">{children}</div>
    </div>
  );
};

export default MemberLayout;
