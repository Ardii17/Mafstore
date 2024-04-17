import SidebarAdminLayout from "@/components/fragments/Sidebar";
import React from "react";

type types = {
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

const AdminLayout = (props: types) => {
  const { children } = props;
  return (
    <div className="flex gap-4">
      <SidebarAdminLayout lists={listItems} />
      {children}
    </div>
  );
};

export default AdminLayout;
