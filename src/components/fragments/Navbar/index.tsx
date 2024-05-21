import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";

const Navbar = () => {
  const theme = useContext(ThemeContext);
  const [profile, setProfile] = useState<any>({});
  const [onSearch, setOnSearch] = useState(false);
  const session: any = useSession();
  const router = useRouter();
  const refSearch: any = useRef(null);
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target as HTMLFormElement;
    router.push(`/products/?q=${form.search.value}`);
    setOnSearch(false);
    form.search.blur();
    form.reset();
  };

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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (refSearch.current && !refSearch.current.contains(event.target)) {
        setOnSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {onSearch && <div style={{ height: "72px" }}></div>}
      <div
        className={`${
          onSearch ? "absolute top-0 left-0 bottom-0 right-0 h-screen z-50" : ""
        }`}
        style={onSearch ? { backgroundColor: "rgba(0, 0, 0, 0.5)" } : {}}
      >
        <div
          className={
            onSearch
              ? "fixed top-0 left-0 right-0 h-96 z-40 bg-white shadow"
              : ""
          }
          ref={refSearch}
        >
          <div
            className={`${
              onSearch ? "fixed top-0 left-0 right-0" : ""
            } flex max-sm:px-2 px-4 lg:px-16 justify-between items-center py-4 shadow bg-blue-800 text-white z-50`}
          >
            <div
              className={`${onSearch ? "hidden" : ""} flex gap-4 items-center`}
            >
              <i className="bx bx-menu max-md:block lg:hidden text-2xl" />
              <p
                className="lg:text-3xl sm:text-xl max-md:text-2xl max-md:font-semibold lg:font-bold font-mono md:pe-4 lg:pe-28 cursor-default"
                onClick={() => router.push("/")}
              >
                Mafstore
              </p>
            </div>
            <ul
              className={`${
                onSearch ? "hidden" : ""
              } gap-4 items-center flex max-sm:hidden`}
            >
              <li className="cursor-pointer">New Featured</li>
              <li className="cursor-pointer">Men</li>
              <li className="cursor-pointer">Women</li>
              <li className="cursor-pointer">Kids</li>
              <li className="cursor-pointer">Adult</li>
            </ul>
            {session.status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div
                  className={`${
                    onSearch
                      ? "max-sm:left-0 max-md:-left-32 -left-52"
                      : "left-0"
                  } relative transition-all gap-2 max-sm:justify-center flex items-center`}
                >
                  {onSearch && (
                    <i className="bx bx-left-arrow-alt text-2xl p-1" />
                  )}
                  <form
                    className="flex max-sm:gap-2 md:gap-4"
                    onSubmit={handleSearch}
                  >
                    <div>
                      <i
                        className={`${
                          onSearch ? "block" : "max-md:hidden max-sm:hidden"
                        } bx bx-search absolute left-4 lg:block top-1/2 -translate-y-1/2 text-xl text-black`}
                      />
                      <input
                        type="text"
                        name="search"
                        onFocus={() => setOnSearch(true)}
                        placeholder="Search products"
                        autoComplete="off"
                        className={`${
                          onSearch ? "block" : "max-md:hidden sm:hidden"
                        } bg-gray-200 transition-all lg:block rounded-full w-56 lg:focus:w-96 py-2 ps-12 pe-4 text-black`}
                      />
                    </div>
                    <Button
                      type="submit"
                      className={`${
                        onSearch ? "block" : "hidden"
                      } px-4 border-2 text-sm border-blue-900 bg-blue-900 rounded-full py-2`}
                    >
                      Cari
                    </Button>
                  </form>
                </div>
                <i
                  className={`${
                    onSearch ? "" : "hidden"
                  } bx bx-x max-sm:hidden py-2 px-3 text-xl bg-blue-900 text-white rounded-full cursor-pointer`}
                  onClick={() => setOnSearch(false)}
                />
                <div
                  className={`${
                    onSearch ? "hidden" : ""
                  } flex gap-4 items-center`}
                >
                  <i
                    className="bx bx-search max-sm:text-xl text-2xl md:block"
                    onClick={() => setOnSearch(true)}
                  />
                  <i
                    className="bx bx-bell max-sm:text-xl text-2xl cursor-pointer"
                    onClick={() => theme?.handleNotification(true)}
                  />
                  <Link href={"/cart"}>
                    <i className="bx bx-cart-alt max-sm:text-xl text-2xl cursor-pointer" />
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
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  href={`/auth/signin?callbackUrl=${router.asPath}`}
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
