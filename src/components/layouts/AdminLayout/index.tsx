import SidebarLayout from "@/components/fragments/Sidebar";
import React from "react";

type propTypes = {
  children: React.ReactNode;
};

const listItems = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Users",
    link: "/admin/users",
    icon: "bxs-user-account",
  },
  {
    title: "Products",
    link: "/admin/products",
    icon: "bxs-box",
  },
  {
    title: "Profile",
    link: "/admin/profile",
    icon: "bxs-user",
  },
];

const AdminLayout = (props: propTypes) => {
  const { children } = props;
  return (
    <div className="flex">
      <SidebarLayout lists={listItems} titleSidebar="Admin Panel" />
       {children}
    </div>
  );
};

export default AdminLayout;
