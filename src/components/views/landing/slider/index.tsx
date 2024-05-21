import CardProduct from "@/components/elements/cardproduct";
import Image from "next/image";
import { useEffect, useState } from "react";

type proptypes = {
  products: any[];
};

const Slider = (props: proptypes) => {
  const { products } = props;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [onHoverPrev, setOnHoverPrev] = useState(false);
  const [onHoverNext, setOnHoverNext] = useState(false);

  const handlePrevCurrentPosition = () => {
    setCurrentPosition(currentPosition === 0 ? 0 : currentPosition + 1);
  };

  const handleNextCurrentPosition = () => {
    setCurrentPosition(
      currentPosition === products.slice(0, 6).length - 9
        ? currentPosition
        : currentPosition - 1
    );
  };

  useEffect(() => {
    if (currentPosition === 0) {
      setOnHoverPrev(false);
    } else if (currentPosition === products.slice(0, 6).length - 9) {
      setOnHoverNext(false);
    }
  }, [currentPosition]);

  return (
    <div className="w-full relative shadow rounded">
      <div className="w-full bg-white rounded flex overflow-hidden relative">
        <Image
          src="/Random/banner.png"
          alt="Banner"
          width={260}
          height={400}
          className="w-[260px] min-w-[260px] h-[400px] rounded shadow z-10 pe-[1px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        />
        <div className="relative w-full flex">
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
          <div
            className="w-full flex gap-2 max-w-full px-2 relative transition-all"
            style={{ transform: `translateX(${currentPosition * 231}px)` }}
          >
            {products &&
              products.map((product: any) => (
                <CardProduct
                  product={product}
                  key={product.id}
                  className="min-w-[250px]"
                />
              ))}
          </div>
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

export default Slider;
