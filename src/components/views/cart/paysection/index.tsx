import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import { convertIDR } from "@/utils/currency";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

type proptypes = {
  totalPrice: number;
};

const PaySection = (props: proptypes) => {
  const router = useRouter();
  const theme = useContext(ThemeContext)
  const [viewAllDetail, setViewAllDetails] = useState(false);
  const [delivery, setDelivery] = useState(20000);
  const [handling, setHandling] = useState(5000);

  return (
    <div
      className={`sticky top-4 sm:w-full max-md:w-full lg:w-[22rem] lg:ms-12 px-4 rounded-lg flex-col lg:min-h-[39rem] justify-between z-30`}
    >
      <div className="flex flex-col justify-between lg:min-h-[39rem]">
        <div
          className={`${
            theme?.deviceType === "mobile"
              ? `${
                  viewAllDetail ? "bottom-0" : "-bottom-96"
                } fixed left-0 right-0 bg-white transition-all p-4 rounded shadow pb-20`
              : ""
          }`}
        >
          <p className="text-xl pb-4">Summary</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="">Subtotal</p>
              <p className="text-lg">{convertIDR(props.totalPrice)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="">Estimasi Delivery</p>
              <p className="text-lg">{convertIDR(delivery)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="">Handling</p>
              <p className="text-lg">{convertIDR(handling)}</p>
            </div>
          </div>
        </div>
        <div className="max-sm:hidden">
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="">Total</p>
            <p className="text-lg">
              {convertIDR(props.totalPrice + delivery + handling)}
            </p>
          </div>
          <hr className="my-4" />
          <Button
            type="button"
            disable={props.totalPrice === 0}
            onClick={() => router.push("/checkout")}
            className="py-4 rounded-full flex gap-3 bg-blue-700 font-semibold items-center  w-full justify-center text-white"
          >
            Checkout
          </Button>
        </div>
      </div>
      <div className="bg-white md:hidden max-sm:flex fixed bottom-0 left-0 right-0 h-14 shadow">
        <p className="w-1/4 flex items-center justify-center text-lg">
          Total :{" "}
        </p>
        <div
          className="w-2/4 pe-2 flex items-center justify-between"
          onClick={() => setViewAllDetails(!viewAllDetail)}
        >
          <p className="text-lg">
            {convertIDR(props.totalPrice + delivery + handling)}
          </p>
          <i
            className={`${
              viewAllDetail ? "rotate-180" : "rotate-0"
            } bx bx-chevron-up text-2xl transition-all`}
          />
        </div>
        <button
          className="w-1/4 bg-blue-700 text-white"
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default PaySection;
