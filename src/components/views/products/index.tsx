import { Product } from "@/types";
import { useState } from "react";
import CardProduct from "@/components/elements/cardproduct";
import FilteredProduct from "./FilteredProduct";
import { Skeleton } from "@mantine/core";

type propTypes = {
  products: Product[];
  query?: string;
};

const ProductsViews = (props: propTypes) => {
  const { products, query } = props;
  const [isReadyComponent, setIsReadyComponent] = useState(false);

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
          <Skeleton height={15} width="15%" >
            <FilteredProduct length={products.length} query={query} />
          </Skeleton>
          <div className="grid sm:gap-2 max-sm:gap-2 md:gap-4 max-md:gap-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-2 lg:grid-cols-4">
            {Array(8).fill(false).map(() => (
              <Skeleton visible={!isReadyComponent}>
                <div className="min-w-56 w-full min-h-32 h-full"></div>
              </Skeleton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsViews;
