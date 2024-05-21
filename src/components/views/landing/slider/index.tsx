import CardProduct from "@/components/elements/cardproduct";
import { ThemeContext } from "@/components/elements/contextAPI";
import { Product } from "@/types";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

type proptypes = {
  products: any[];
};

const Slider = (props: proptypes) => {
  const { products } = props;
  const theme = useContext(ThemeContext);
  const [deviceType, setDeviceType] = useState("");
  const [currentPosition, setCurrentPosition] = useState(0);
  const [widthCard, setWidthCard] = useState(0);
  const refCard: any = useRef(null);
  const [onHoverPrev, setOnHoverPrev] = useState(false);
  const [onHoverNext, setOnHoverNext] = useState(false);

  const handlePrevCurrentPosition = () => {
    setCurrentPosition(currentPosition === 0 ? 0 : currentPosition + 1);
  };

  const handleNextCurrentPosition = () => {
    setCurrentPosition(
      currentPosition === products.slice(0, 6).length - 10
        ? currentPosition
        : currentPosition - 1
    );
  };

  useEffect(() => {
    setDeviceType(theme?.deviceType || "");
  }, []);

  useEffect(() => {
    if (currentPosition === 0) {
      setOnHoverPrev(false);
    } else if (currentPosition === products.slice(0, 6).length - 10) {
      setOnHoverNext(false);
    }
  }, [currentPosition]);

  useEffect(() => {
    if (refCard.current && theme?.deviceType === "tablet") {
      setWidthCard((refCard.current.offsetWidth - 24) / 3 - 3);
    } else if (refCard.current && theme?.deviceType === "desktop") {
      setWidthCard((refCard.current.offsetWidth - 32) / 4);
    } else if (refCard.current && theme?.deviceType === "mobile") {
      setWidthCard((refCard.current.offsetWidth - 16) / 3);
    }
  }, [refCard.current]);

  return (
    <div className="w-full relative rounded">
      <div className="flex gap-2 lg:min-h-[380px] max-md:min-h-[350px] max-sm:min-h-[200px]">
        <div className="w-1/4 h-full relative z-0 max-sm:hidden">
          <Image
            src="/Random/banner.png"
            alt="Banner"
            width={250}
            height={380}
            className="md:max-w-[200px] md:min-h-[350px] lg:max-h-[380px] lg:min-w-[280px] absolute object-cover rounded-lg max-sm:hidden"
          />
        </div>
        <div className="w-3/4 flex overflow-hidden relative z-10 max-sm:w-full">
          {currentPosition !== 0 && (
            <i
              className={`${
                onHoverPrev ? "opacity-100 scale-125" : "opacity-70"
              } bx bx-chevron-left absolute left-2 bg-white shadow-md -translate-y-1/2 text-2xl top-1/2 py-[1px] px-1 transition-all rounded-full z-20 cursor-pointer`}
              onClick={handlePrevCurrentPosition}
              onMouseEnter={() => setOnHoverPrev(true)}
              onMouseLeave={() => setOnHoverPrev(false)}
            />
          )}
          <div
            className="min-w-full flex gap-2 py-1 transition-all z-10"
            style={{
              transform: `translateX(${currentPosition * widthCard}px)`,
            }}
            ref={refCard}
          >
            {products.map((product: Product) => (
              <div
                className={`min-h-full`}
                style={{ minWidth: `${widthCard}px` }}
              >
                <CardProduct product={product} key={product.id} />
              </div>
            ))}
          </div>
          {currentPosition !== -4 && (
            <i
              className={`${
                onHoverNext ? "opacity-100 scale-125" : "opacity-70"
              } bg-white bx bx-chevron-right absolute right-2 shadow-md -translate-y-1/2 text-2xl top-1/2 py-[1px] px-1 transition-all rounded-full z-20 cursor-pointer`}
              onClick={handleNextCurrentPosition}
              onMouseEnter={() => setOnHoverNext(true)}
              onMouseLeave={() => setOnHoverNext(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
