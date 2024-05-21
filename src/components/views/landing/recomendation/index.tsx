import CardProduct from "@/components/elements/cardproduct";
import { Product } from "@/types";

type proptypes = {
  products: Product[];
};

const Recomendation = (props: proptypes) => {
  const { products } = props;

  return (
    <div className="w-full p-2 bg-white rounded flex flex-col gap-2 shadow">
      <p className="text-lg text-blue-800 font-semibold tracking-wider">
        REKOMENDASI
      </p>
      <div className="overflow-hidden w-full grid grid-cols-5 gap-2">
        {products &&
          products.map((product: Product) => (
            <CardProduct
              product={product}
              key={product.id}
              className="min-w-[213.2px] w-1/5"
            />
          ))}
        {products &&
          products.map((product: Product) => (
            <CardProduct
              product={product}
              key={product.id}
              className="min-w-[213.2px] w-1/5"
            />
          ))}
      </div>
    </div>
  );
};

export default Recomendation;
