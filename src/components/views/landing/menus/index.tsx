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
    <div className="rounded bg-white p-4 flex gap-2 shadow">
      <div className="w-1/3">
        <p className="mb-4 text-lg font-bold text-blue-700">MENU</p>
        <div className="grid grid-cols-3 gap-2 place-content-start">
          {menus &&
            menus.map((menu: any, index: number) => (
              <div className="flex flex-col items-center justify-start gap-2">
                <div className="border-2 border-gray-100 rounded-md max-w-16 w-16 p-4 flex items-center cursor-pointer justify-center">
                  <Image
                    src={menu.link}
                    alt={menu.name}
                    width={30}
                    height={30}
                  />
                </div>
                <p className="text-center">{nameIcon[index]} </p>
              </div>
            ))}
        </div>
      </div>
      <span className="w-[2px] bg-gray-100" />
      <div className="w-2/3 min-h-full flex flex-col gap-4">
        <p className="text-lg text-blue-700 font-bold">KATEGORI PILIHAN</p>
        <div className="grid gap-4 grid-cols-5 w-full grid-rows-2 h-full">
          {category.map(
            (item: { link: string; name: string }, index: number) => (
              <Link
                href={`/products?q=${item.name.split(".")[0]}`}
                key={index}
                className="border-2 border-gray-100 rounded-md flex flex-col gap-2 items-center justify-center"
              >
                <Image
                  src={item.link}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="drop-shadow w-28 h-28 object-cover aspect-square"
                />
                <p>{item.name.split(".")[0]}</p>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Menus;
