import Button from "@/components/elements/button";
import { convertIDR } from "@/utils/currency";
import { useRouter } from "next/router";

type proptypes = {
  totalPrice: number;
  isFixedTop: boolean;
  isFixedBottom: boolean;
};

const PaySection = (props: proptypes) => {
  const router = useRouter();

  return (
    <div
      className={`sticky top-4 w-[22rem] ms-12 px-4 rounded-lg flex flex-col min-h-[39rem] justify-between`}
    >
      <div>
        <p className="text-xl pb-4">Summary</p>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="">Subtotal</p>
            <p className="text-lg">{convertIDR(props.totalPrice)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="">Estimasi Delivery & Handling</p>
            <p className="text-lg">Rp 5,000,000</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="">Estimasi Duties and Taxes</p>
            <p className="text-lg">-</p>
          </div>
        </div>
      </div>
      <div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="">Total</p>
          <p className="text-lg">Rp 5,000,000</p>
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
  );
};

export default PaySection;
