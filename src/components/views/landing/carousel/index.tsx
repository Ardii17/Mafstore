import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import { useState } from "react";

type proptypes = {
  carousel: [];
};

export default function CarouselPage(props: proptypes) {
  const { carousel } = props;
  const [device, setDevice] = useState(0);
  const [onHoverPrevButton, setOnHoverPrevButton] = useState(false);
  const [onHoverNextButton, setOnHoverNextButton] = useState(false);

  const controlHover = {
    backgroundColor:
      onHoverPrevButton || onHoverNextButton
        ? "rgba(255, 255, 255, 1)"
        : "rgba(255, 255, 255, 0.5)",
    color: "black",
    transform: onHoverPrevButton || onHoverNextButton ? "scale(1.3)" : "",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
  };

  return (
    <div className="lg:max-h-[400px] md:max-h-[300px]">
      <Carousel
        withIndicators
        previousControlProps={{
          style: onHoverPrevButton
            ? controlHover
            : { color: "black", backgroundColor: "rgba(255, 255, 255, 0.5)" },
          onMouseEnter: () => setOnHoverPrevButton(true),
          onMouseLeave: () => setOnHoverPrevButton(false),
        }}
        nextControlProps={{
          style: onHoverNextButton
            ? controlHover
            : { color: "black", backgroundColor: "rgba(255, 255, 255, 0.5)" },
          onMouseEnter: () => setOnHoverNextButton(true),
          onMouseLeave: () => setOnHoverNextButton(false),
        }}
        className={``}
      >
        {carousel.map((item: any) => (
          <Carousel.Slide>
            <Image
              src={item.link}
              alt="Carousel 1"
              width={1220}
              height={400}
              className="rounded"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
