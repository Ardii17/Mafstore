import Image from "next/image";

type proptypes = {
  product: any;
};

export default function LeftSideDetail(props: proptypes) {
  return (
    <div className="md:min-w-[33.33%] lg:min-w-[50%] sm:w-full ">
      <div className="md:mb-4 md:max-w-[450px] md:min-w-full max-md:min-w-full sm:min-w-full max-sm:min-w-full max-md:hidden md:hidden max-sm:block sm:block lg:block">
        <Image
          src={props.product?.image}
          alt={props.product?.name}
          width={500}
          height={500}
          className="aspect-square object-cover rounded-lg lg:block"
        />
        <p className="text-lg font-[400] px-2 max-sm:hidden">Bagikan:</p>
        <div className="w-3/4 grid-cols-10 grid gap-2 px-2 max-sm:hidden">
          <img src="./../Icons/Icons Web/whatsapp.png" alt="whatsapp" />
          <img src="./../Icons/Icons Web/instagram.png" alt="instagram" />
          <img src="./../Icons/Icons Web/facebook.png" alt="facebook" />
          <img src="./../Icons/Icons Web/pinterest.png" alt="pinterest" />
          <img src="./../Icons/Icons Web/twitter.png" alt="twitter" />
        </div>
      </div>
      <div className="mb-4 md:max-w-[450px] lg:hidden min-w-full w-[250px] sticky top-8 max-sm:hidden">
        <Image
          src={props.product?.image}
          alt={props.product?.name}
          width={500}
          height={500}
          className="aspect-square object-cover rounded-lg w-[280px] max-w-[280px]"
        />
        <p className="text-lg font-[400]">Bagikan:</p>
        <div className="w-3/4 grid-cols-10 grid gap-2">
          <img src="./../Icons/Icons Web/whatsapp.png" alt="whatsapp" />
          <img src="./../Icons/Icons Web/instagram.png" alt="instagram" />
          <img src="./../Icons/Icons Web/facebook.png" alt="facebook" />
          <img src="./../Icons/Icons Web/pinterest.png" alt="pinterest" />
          <img src="./../Icons/Icons Web/twitter.png" alt="twitter" />
        </div>
      </div>
    </div>
  );
}
