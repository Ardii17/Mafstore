import { ThemeContext } from "@/components/elements/contextAPI";
import { Product } from "@/types";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

type propTypes = {
  product: Product;
  key: number;
};

const Card = (props: propTypes) => {
  const theme = useContext(ThemeContext)
  const { product, key } = props;
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col justify-between shadow rounded cursor-pointer h-full min-h-full max-h-full"
      key={key}
    >
      <div className="mb-8">
        <div className="flex flex-col gap-1">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="aspect-square object-cover"
          />
          <p className=" md:font-semibold px-2 pt-2">{theme?.deviceType === 'mobile' && product.name.length > 31 ? product.name.slice(0, 30) + '...' : product.name}</p>

          <p className="px-2 opacity-70">{product.category}</p>
        </div>
      </div>
      <div className="flex justify-between px-2 items-center">
        <p className="text-blue-700 font-semibold pb-2 sm:text-sm max-sm:text-sm">
          {convertIDR(product.price)}
        </p>
        <p className="px-2 pb-2 text-sm opacity-70 text-[12px]">5 Terjual</p>
      </div>
    </Link>
  );
};

export default Card;
