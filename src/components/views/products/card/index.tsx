import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";

type propTypes = {
  product: any;
  key: string
};

const Card = (props: propTypes) => {
  const { product, key } = props;
  return (
    <Link href={`/products/${product.id}`} className="flex flex-col gap-1 cursor-pointer" key={key}>
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="aspect-square object-cover"
      />
      <p className="font-semibold">{product.name}</p>
      <p>{product.category}</p>
      <p className="font-semibold">{convertIDR(product.price)}</p>
    </Link>
  );
};

export default Card;
