import { Product } from "@/types";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";

type proptypes = {
  product: Product;
  className?: string;
  key: string;
};

const CardProduct = (props: proptypes) => {
  const { product, className, key } = props;
  return (
    <Link
      href={`/products/${product.id}`}
      className={`py-1 flex md:gap-2 lg:gap-4 h-full w-full ${className}`}
      key={key}
    >
      <div className="shadow relative flex flex-col rounded">
        <Image
          src={product.image}
          alt="Coba Gambar"
          width={250}
          height={100}
          className="object-cover rounded aspect-square md:hidden lg:block min-w-[250] h-full"
        />
        <Image
          src={product.image}
          alt="Coba Gambar"
          width={215}
          height={100}
          className="object-cover rounded aspect-square md:block lg:hidden min-w-[215] h-full"
        />
        <div className="flex flex-col gap-2 p-2 justify-between h-full">
          <div>
            <p className="">{product.name}</p>
            <p className="opacity-65">{product.category}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg text-blue-700">{convertIDR(product.price)}</p>
            <p className="opacity-70 text-sm">5 Terjual</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
