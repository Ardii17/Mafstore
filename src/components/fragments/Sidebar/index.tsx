import Button from "@/components/elements/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type types = {
  lists: Array<{
    title: string;
    link: string;
    icon: string;
  }>;
};

const SidebarAdminLayout = (props: types) => {
  const { pathname } = useRouter();
  const { lists } = props;
  return (
    <div className="h-screen min-h-screen w-1/5 bg-blue-600 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl text-white text-center">Admin Panel</h1>
        <div className="flex flex-col gap-1 mt-4">
          {lists.map((list, index) => (
            <Link
            href={list.link}
              key={index}
              className={`flex items-center gap-4 cursor-pointer hover:bg-blue-800 py-2 px-3 rounded-md ${
                pathname === list.link ? "bg-blue-800" : ""
              }`}
            >
              <i className={`bx ${list.icon} text-white text-2xl`} />
              <p className="text-white">{list.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Button
          type="button"
          className="bg-blue-800 hover:bg-blue-900"
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SidebarAdminLayout;
