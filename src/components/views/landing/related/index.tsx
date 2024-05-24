import CardProduct from "@/components/elements/cardproduct";
import { ThemeContext } from "@/components/elements/contextAPI";
import { Product } from "@/types";
import { Skeleton } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";

type proptypes = {
  products: Product[];
};

const Related = (props: proptypes) => {
  const { products } = props;
  const theme = useContext(ThemeContext);
  const cardRef: any = useRef(null);
  const [devideMode, setDeviceMode] = useState(0);
  const [isReadyComponent, setIsReadyComponent] = useState(false);
  const [widthCard, setWidthCard] = useState(0);
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

  useEffect(() => {
    if (cardRef.current && theme?.deviceType === "tablet") {
      setWidthCard((cardRef.current.offsetWidth - 10) / 4 - 3);
    } else if (cardRef.current && theme?.deviceType === "desktop") {
      setWidthCard((cardRef.current.offsetWidth - 30) / 5 - 4);
    } else if (cardRef.current && theme?.deviceType === "mobile") {
      setWidthCard((cardRef.current.offsetWidth - 8) / 2 - 3);
    }
  }, [cardRef.current]);

  useEffect(() => {
    if (products.length > 0) {
      setIsReadyComponent(true);
    }
  }, [products]);

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
    <div
      className="w-full p-2 bg-white rounded flex flex-col gap-2 relative shadow h-auto"
      ref={cardRef}
    >
      {currentPosition !== 0 && (
        <i
          className={`${
            onHoverPrev ? "opacity-100 scale-125" : "opacity-70"
          } bx bx-chevron-left absolute left-0 bg-white shadow-md -translate-y-1/2 text-2xl top-1/2 py-[1px] px-1 transition-all rounded-full z-20 cursor-pointer`}
          onClick={handlePrevCurrentPosition}
          onMouseEnter={() => setOnHoverPrev(true)}
          onMouseLeave={() => setOnHoverPrev(false)}
        />
      )}
      {isReadyComponent ? (
        <>
          <p className="text-lg text-blue-800 font-semibold tracking-wider">
            KESUKAANMU
          </p>
          <div className="overflow-hidden w-full">
            <div
              className="min-w-full flex gap-2 py-1 transition-all z-10"
              style={{
                transform: `translateX(${
                  currentPosition * widthCard - currentPosition * -9
                }px)`,
              }}
            >
              {products &&
                products.map((product: Product) => (
                  <div
                    className="min-h-full"
                    style={{
                      minWidth: `${widthCard}px`,
                      width: `${widthCard}px`,
                    }}
                  >
                    <div></div>
                    <CardProduct product={product} key={product.id} />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Skeleton height={15} radius="xl" width="15%" />
          <div className="overflow-hidden w-full">
            <div className="min-w-full flex gap-2 py-1 transition-all z-10">
              {Array(devideMode)
                .fill(false)
                .map(() => (
                  <Skeleton>
                    <div
                      className="min-h-full min-w-full"
                      style={{
                        minWidth: `${widthCard}px`,
                        width: `${widthCard}px`,
                      }}
                    >
                      <div className="h-56"></div>
                    </div>
                  </Skeleton>
                ))}
            </div>
          </div>
        </>
      )}

      {currentPosition !== -3 && (
        <i
          className={`${
            onHoverNext ? "opacity-100 scale-125" : "opacity-70"
          } bg-white bx bx-chevron-right absolute right-0 shadow-md -translate-y-1/2 text-2xl top-1/2 py-[1px] px-1 transition-all rounded-full z-20 cursor-pointer`}
          onClick={handleNextCurrentPosition}
          onMouseEnter={() => setOnHoverNext(true)}
          onMouseLeave={() => setOnHoverNext(false)}
        />
      )}
    </div>
  );
};

export default Related;
