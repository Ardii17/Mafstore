import { Skeleton } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";

type proptypes = {
  src: string;
};

const Banner = (props: proptypes) => {
  const { src } = props;
  const [isReadyComponent, setIsReadyComponent] = useState(false);

  useEffect(() => {
    if (src) {
      setIsReadyComponent(true)
    }
  }, [src])

  return isReadyComponent ? (
    <Image
      src={src}
      alt="Poster"
      width={1200}
      height={195}
      className="rounded shadow"
    />
  ) : (
    <Skeleton visible={!isReadyComponent}>
      <Image
        src={src}
        alt="Poster"
        width={1200}
        height={195}
        className="rounded shadow"
      />
    </Skeleton>
  );
};

export default Banner;
