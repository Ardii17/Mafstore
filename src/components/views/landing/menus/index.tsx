import Image from "next/image";
import Link from "next/link";

type proptypes = {
  menus: [];
  category: [];
};

const Menus = (props: proptypes) => {
  const { menus, category } = props;
  const nameIcon = [
    "Pulsa dan Tagihan",
    "Elektrik",
    "Handphone",
    "Pakaian",
    "Komputer",
    "Topup",
    "Peliharaan Hewan",
  ];

  return (
    <div className="rounded bg-white max-sm:p-2 md:p-4 flex md:gap-4 lg:gap-4 lg:flex-row shadow max-md:flex-col sm:flex-col">
      <div className="lg:w-1/3 md:w-full p-2 sm:w-full">
        <p className="mb-4 text-lg font-bold text-blue-700">MENU</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-7 gap-2 place-content-start max-sm:grid-cols-3">
          {menus &&
            menus.map((menu: any, index: number) => (
              <div className="flex flex-col items-center justify-start gap-2">
                <div className="border-2 border-gray-100 rounded-md md:max-w-16 max-md:w-16 p-4 flex items-center cursor-pointer justify-center">
                  <Image
                    src={menu.link}
                    alt={menu.name}
                    width={30}
                    height={30}
                  />
                </div>
                <p className="text-center max-sm:text-sm">{nameIcon[index]} </p>
              </div>
            ))}
        </div>
      </div>
      <span className="lg:w-[2px] lg:block bg-gray-100 max-md:hidden" />
      <div className="md:w-full lg:w-2/3 min-h-full flex flex-col gap-4 sm:w-full">
        <p className="text-lg text-blue-700 font-bold">KATEGORI PILIHAN</p>
        <div className="grid gap-4 grid-cols-5 w-full grid-rows-2 h-full max-sm:grid-cols-3">
          {category.map(
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
                <p className="max-sm:text-[11px]">{item.name.split(".")[0]}</p>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Menus;
