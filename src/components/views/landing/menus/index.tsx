import { Skeleton } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type proptypes = {
  menus: [];
  category: [];
};

const Menus = (props: proptypes) => {
  const { menus, category } = props;
  const [isReadyComponent, setIsReadyComponent] = useState(false);
  const nameIcon = [
    "Pulsa dan Tagihan",
    "Elektrik",
    "Handphone",
    "Pakaian",
    "Komputer",
    "Topup",
    "Peliharaan Hewan",
  ];

  useEffect(() => {
    if (menus.length > 0 && category.length > 0) {
      setIsReadyComponent(true);
    }
  }, [menus, category]);

  return (
    <div className="rounded bg-white max-sm:p-2 md:p-4 flex md:gap-4 lg:gap-4 lg:flex-row shadow max-md:flex-col sm:flex-col">
      <div className="lg:w-1/3 md:w-full p-2 sm:w-full min-h-full">
        <p className="mb-4 text-lg font-semibold text-blue-700">MENU</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-7 gap-2 place-content-start max-sm:grid-cols-3 min-h-full h-full">
          {isReadyComponent
            ? menus.map((menu: any, index: number) => (
                <div className="flex flex-col items-center justify-start gap-2">
                  <div className="border-2 border-gray-100 rounded-md md:max-w-16 max-md:w-16 p-4 flex items-center cursor-pointer justify-center">
                    <Image
                      src={menu.link}
                      alt={menu.name}
                      width={30}
                      height={30}
                    />
                  </div>
                  <p className="text-center max-sm:text-sm">
                    {nameIcon[index]}{" "}
                  </p>
                </div>
              ))
            : Array(9)
                .fill(false)
                .map(() => (
                  <div className="flex flex-col items-center justify-start gap-2">
                    <Skeleton visible={!isReadyComponent}>
                      <div
                        className={`${
                          isReadyComponent ? "hidden" : "block"
                        } min-h-[6.5rem] min-w-[33%]`}
                      >
                        s
                      </div>
                    </Skeleton>
                  </div>
                ))}
        </div>
      </div>
      <span className="lg:w-[2px] lg:block bg-gray-100 max-md:hidden" />
      <div className="md:w-full lg:w-2/3 min-h-full flex flex-col gap-4 sm:w-full max-sm:mt-4">
        <p className="mt-2 text-lg text-blue-700 font-semibold">
          KATEGORI PILIHAN
        </p>
        <div className="grid gap-2 grid-cols-5 w-full grid-rows-2 h-full max-sm:grid-cols-3">
          {isReadyComponent
            ? category.map(
                (item: { link: string; name: string }, index: number) => (
                  <Link
                    href={`/products?q=${item.name.split(".")[0]}`}
                    key={index}
                    className="border-2 border-gray-100 rounded-md flex flex-col gap-2 items-center justify-center p-1"
                  >
                    <Image
                      src={item.link}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="drop-shadow w-28 h-28 object-cover aspect-square max-sm:max-h-[80px]"
                    />
                    <p className="max-sm:text-[11px]">
                      {item.name.split(".")[0]}
                    </p>
                  </Link>
                )
              )
            : Array(10)
                .fill(false)
                .map(() => (
                  <div className="flex flex-col items-center justify-start">
                    <Skeleton visible={!isReadyComponent}>
                      <div
                        className={`${
                          isReadyComponent ? "hidden" : "block"
                        } min-h-full min-w-[33%]`}
                      >
                        <div className="drop-shadow w-28 h-[9.8rem] object-cover aspect-square max-sm:max-h-[10rem]"></div>
                      </div>
                    </Skeleton>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default Menus;
