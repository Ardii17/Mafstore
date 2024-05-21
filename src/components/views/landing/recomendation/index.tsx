import CardProduct from "@/components/elements/cardproduct";
import { ThemeContext } from "@/components/elements/contextAPI";
import { Product } from "@/types";
import { useContext, useEffect, useRef, useState } from "react";

type proptypes = {
  products: Product[];
};

const Recomendation = (props: proptypes) => {
  const { products } = props;
  const theme = useContext(ThemeContext);
  const cardRef: any = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (theme?.deviceType === "tablet" && cardRef.current) {
      setCardWidth((cardRef.current.offsetWidth - 32) / 4);
    } else if (theme?.deviceType === "desktop" && cardRef.current) {
      setCardWidth((cardRef.current.offsetWidth - 32) / 5);
    }
  }, []);

  return (
    <div className="w-full p-2 bg-white rounded flex flex-col gap-2 shadow">
      <p className="text-lg text-blue-800 font-semibold tracking-wider">
        REKOMENDASI
      </p>
      <div
        className="overflow-hidden w-full grid md:grid-cols-4 max-lg:grid-cols-5 gap-2"
        ref={cardRef}
      >
        {products &&
          products.map((product: Product) => (
            <div
              className={`min-h-full`}
              style={{ minWidth: `${cardWidth}px` }}
            >
              <CardProduct
                product={product}
                key={product.id}
              />
            </div>
          ))}
        {products &&
          products.map((product: Product) => (
            <div
              className={`min-h-full`}
              style={{ minWidth: `${cardWidth}px` }}
            >
              <CardProduct
                product={product}
                key={product.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recomendation;
