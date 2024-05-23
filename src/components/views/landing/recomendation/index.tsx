import CardProduct from "@/components/elements/cardproduct";
import { ThemeContext } from "@/components/elements/contextAPI";
import { Product } from "@/types";
import { Skeleton } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";

type proptypes = {
  products: Product[];
};

const Recomendation = (props: proptypes) => {
  const { products } = props;
  const theme = useContext(ThemeContext);
  const cardRef: any = useRef(null);
  const [isReadyComponent, setIsReadyComponent] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (theme?.deviceType === "tablet" && cardRef.current) {
      setCardWidth((cardRef.current.offsetWidth - 24) / 4);
    } else if (theme?.deviceType === "desktop" && cardRef.current) {
      setCardWidth((cardRef.current.offsetWidth - 48) / 5);
    } else if (theme?.deviceType === "mobile" && cardRef.current) {
      setCardWidth((cardRef.current.offsetWidth - 8) / 2);
    }
  }, [cardRef.current]);

  useEffect(() => {
    if (products.length > 0) {
      setIsReadyComponent(true);
    }
  }, [products]);

  return (
    <div className="w-full p-2 bg-white rounded flex flex-col gap-2 shadow">
      {isReadyComponent ? (
        <>
          <p className="text-lg text-blue-800 font-semibold tracking-wider">
            REKOMENDASI
          </p>
          <div
            className="overflow-hidden w-full grid md:grid-cols-4 lg:grid-cols-5 gap-2 max-sm:grid-cols-2"
            ref={cardRef}
          >
            {products &&
              products.map((product: Product) => (
                <div style={{ minWidth: `${cardWidth}px` }}>
                  <CardProduct product={product} key={product.id} />
                </div>
              ))}
            {products &&
              products.map((product: Product) => (
                <div style={{ minWidth: `${cardWidth}px` }}>
                  <CardProduct product={product} key={product.id} />
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <Skeleton height={15} width="15%" radius="xl" />
          <div
            className="overflow-hidden w-full grid md:grid-cols-4 lg:grid-cols-5 gap-2 max-sm:grid-cols-2"
            ref={cardRef}
          >
            {Array(15)
              .fill(false)
              .map((product: Product) => (
                <Skeleton>
                  <div style={{ minWidth: `${cardWidth}px` }}>
                    <CardProduct product={product} key={product.id} />
                  </div>
                </Skeleton>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Recomendation;
