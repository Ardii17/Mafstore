import CardProduct from "@/components/elements/cardproduct";
import { Product } from "@/types";
import { useEffect, useState } from "react";

type proptypes = {
  products: Product[];
};

const Related = (props: proptypes) => {
  const { products } = props;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [onHoverPrev, setOnHoverPrev] = useState(false);
  const [onHoverNext, setOnHoverNext] = useState(false);

  const handlePrevCurrentPosition = () => {
    setCurrentPosition(currentPosition === 0 ? 0 : currentPosition + 1);
  };

  const handleNextCurrentPosition = () => {
    setCurrentPosition(
      currentPosition === products.length - 11
        ? currentPosition
        : currentPosition - 1
    );
  };

  useEffect(() => {
    if (currentPosition === 0) {
      setOnHoverPrev(false);
    } else if (currentPosition === products.length - 11) {
      setOnHoverNext(false);
    }
  }, [currentPosition]);

  return (
    <div className="w-full p-2 bg-white rounded flex flex-col gap-2 relative shadow">
      {currentPosition !== 0 && (
        <i
          className={`${
            onHoverPrev ? "opacity-100 scale-125" : "opacity-70"
          } bx bx-chevron-left absolute -left-5 bg-white shadow-md -translate-y-1/2 text-2xl top-1/2 py-[1px] px-1 transition-all rounded-full z-20 cursor-pointer`}
          onClick={handlePrevCurrentPosition}
          onMouseEnter={() => setOnHoverPrev(true)}
          onMouseLeave={() => setOnHoverPrev(false)}
        />
      )}
      <p className="text-lg text-blue-800 font-semibold tracking-wider">
        KESUKAANMU
      </p>
      <div className="overflow-hidden w-full">
        <div
          className="flex w-full gap-2 transition-all"
          style={{ transform: `translateX(${currentPosition * 215}px)` }}
        >
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
      {currentPosition !== -3 && (
        <i
          className={`${
            onHoverNext ? "opacity-100 scale-125" : "opacity-70"
          } bg-white bx bx-chevron-right absolute -right-5 shadow-md -translate-y-1/2 text-2xl top-1/2 py-[1px] px-1 transition-all rounded-full z-20 cursor-pointer`}
          onClick={handleNextCurrentPosition}
          onMouseEnter={() => setOnHoverNext(true)}
          onMouseLeave={() => setOnHoverNext(false)}
        />
      )}
    </div>
  );
};

export default Related;
