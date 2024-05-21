import Image from "next/image";

type proptypes = {
  src: string;
};

const Banner = (props: proptypes) => {
  const { src } = props;
  return (
    <Image
      src={src}
      alt="Poster"
      width={1200}
      height={400}
      className="rounded shadow"
    />
  );
};

export default Banner;
