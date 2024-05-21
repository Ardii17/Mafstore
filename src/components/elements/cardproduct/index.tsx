import { Product } from "@/types";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";

type proptypes = {
  product: Product;
  className?: string;
  key: string
};

const CardProduct = (props: proptypes) => {
  const { product, className, key } = props;
  return (
    <Link
      href={`/products/${product.id}`}
      className={`py-1 flex gap-4 max-w-[250px] ${className}`}
      key={product.id}
    >
      <div className="shadow relative flex flex-col rounded">
        <Image
          src={product.image}
          alt="Coba Gambar"
          width={250}
          height={100}
          className="object-cover rounded aspect-square"
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
