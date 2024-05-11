import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [profile, setProfile] = useState<any>({});
  const session: any = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);

  return (
    <div className="flex px-16 justify-between items-center py-4 shadow bg-blue-800 text-white">
      <p
        className="text-3xl font-bold font-mono pe-28 cursor-default"
        onClick={() => router.push("/")}
      >
        Mafstore
      </p>
      <ul className="flex  gap-4 items-center">
        <li className="cursor-pointer">New Featured</li>
        <li className="cursor-pointer">Men</li>
        <li className="cursor-pointer">Women</li>
        <li className="cursor-pointer">Kids</li>
        <li className="cursor-pointer">Adult</li>
      </ul>
      {session.status === "authenticated" ? (
        <div className="flex items-center gap-4">
          <div className="relative">
            <i className="bx bx-search absolute left-4  top-1/2 -translate-y-1/2 text-xl text-black" />
            <input
              type="text"
              name="search"
              placeholder="Search products"
              className="bg-gray-200 rounded-full py-2 ps-12 pe-4 text-black"
            />
          </div>
          <i className="bx bx-bell text-2xl cursor-pointer" />
          <Link href={"/cart"}>
            <i className="bx bx-cart-alt text-2xl cursor-pointer" />
          </Link>
          <Image
            src={profile.image}
            alt="Profile"
            width={40}
            height={40}
            onClick={() => router.push("/member")}
            className="object-cover rounded-full max-w-[40px] max-h-[40px] my-auto aspect-square cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href={"/auth/signin"}
            className="py-2 px-3 rounded bg-yellow-600"
          >
            Signin
          </Link>
          <Link
            href={"/auth/signup"}
            className="py-2 px-3 rounded bg-yellow-600"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
