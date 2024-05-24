import { Product } from "@/types";
import { useContext, useEffect, useRef, useState } from "react";
import CardProduct from "@/components/elements/cardproduct";
import FilteredProduct from "./FilteredProduct";
import { Skeleton } from "@mantine/core";
import { ThemeContext } from "@/components/elements/contextAPI";

type propTypes = {
  products: Product[];
  query?: string;
};

const ProductsViews = (props: propTypes) => {
  const { products, query } = props;
  const theme = useContext(ThemeContext);
  const [isReadyComponent, setIsReadyComponent] = useState(false);
  const [deviceMode, setDeviceMode] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef: any = useRef(null);

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
    if (theme?.deviceType === "desktop") {
      setDeviceMode(5);
    } else if (theme?.deviceType === "tablet") {
      setDeviceMode(4);
    } else {
      setDeviceMode(2);
    }
  }, [theme?.deviceType]);

  return (
    <div className="py-4 sm:px-2 max-sm:px-2 md:px-4 max-md:px-4 lg:px-12 flex lg:flex-row lg:gap-8 max-md:flex-col max-md:gap-2 md:flex-col min-h-screen">
      {isReadyComponent ? (
        <>
          <FilteredProduct length={products.length} query={query} />
          <div className="grid sm:gap-2 max-sm:gap-2 md:gap-4 max-md:gap-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product: Product) => (
              <CardProduct product={product} key={product.id} />
            ))}
          </div>
        </>
      ) : (
        <>
          <Skeleton height={15} width="15%">
            <FilteredProduct length={products.length} query={query} />
          </Skeleton>
          <div
            className="grid sm:gap-2 max-sm:gap-2 md:gap-4 max-md:gap-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-2 lg:grid-cols-4"
            ref={cardRef}
          >
            {Array(deviceMode)
              .fill(false)
              .map(() => (
                <Skeleton>
                  <div
                    className="min-h-full min-w-full"
                    style={{
                      minWidth: `${cardWidth}px`,
                      width: `${cardWidth}px`,
                    }}
                  >
                    <div className="h-56"></div>
                  </div>
                </Skeleton>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsViews;
