import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

type propTypes = {
  className?: string
  titleSidebar: string;
};

const SidebarLayout = (props: propTypes) => {
  const { pathname } = useRouter();
  const theme = useContext(ThemeContext);
  const { titleSidebar, className } = props;
  return (
    <div
      className={`${className} sm:h-screen md:h-auto lg:h-screen md:w-full lg:w-1/5 max-sm:min-w-full md:border-b max-md:border-b`}
    >
      <div className="sm:h-screen md:h-auto lg:h-screen lg:fixed top-0 left-0 bottom-0 max-sm:w-full lg:w-1/5  md:w-full max-md:w-full max-sm:bg-blue-800 md:items-center max-md:items-center lg:bg-blue-800 p-4 flex flex-col justify-between ">
        <div className="max-sm:w-full lg:w-full">
          <h1 className="text-2xl text-center text-white md:text-black lg:text-white">
            {titleSidebar}
          </h1>
          <div className="flex max-sm:flex-col lg:flex-col gap-1 mt-4 ">
            {theme?.listItems.map((list, index) => (
              <Link
                href={list.link}
                key={index}
                className={`flex items-center gap-4 cursor-pointer transition-all w-full max-sm:hover:bg-blue-900 lg:hover:bg-blue-900 py-2 px-3 rounded ${
                  pathname === list.link ? "lg:bg-blue-900" : ""
                }`}
              >
                <i
                  className={`bx ${list.icon} text-2xl text-white md:text-black lg:text-white`}
                />
                <p className="text-white md:text-black lg:text-white">
                  {list.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full md:hidden lg:block my-4">
          <Button
            type="button"
            className="bg-red-700 hover:bg-red-800 w-full rounded"
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
