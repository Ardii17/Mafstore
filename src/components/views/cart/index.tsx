import Button from "@/components/elements/button";
import productsServices from "@/services/products";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type proptypes = {
  carts: any[];
};

const CartViews = (props: proptypes) => {
  const { carts } = props;
  const startRef: any = useRef(null);
  const [isFixedTop, setIsFixedTop] = useState(true);
  const [isFixedBottom, setIsFixedBottom] = useState(false);
  const [cartsData, setCartsData] = useState<any>([]);
  const session: any = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (startRef.current) {
        const start = startRef.current.getBoundingClientRect();
        if (start.bottom >= 720) {
          setIsFixedBottom(false);
        } else {
          setIsFixedBottom(true);
        }
        
        if (start.top <= 0) {
          setIsFixedTop(false);
        } else {
          setIsFixedTop(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const cart = carts.map(async (cart: any) => {
        const { data } = await productsServices.getDetailProduct(cart.id);
        return {
          product: data.data,
          size: cart.size,
          qty: cart.qty,
        };
      });
      const result = await Promise.all(cart);
      setCartsData(result);
    };

    getProducts();
  }, [session, carts]);

  const [countProduct, setCountProduct] = useState(0);
  return (
    <div className="px-16 flex w-full h-full py-2 box-border">
      <div className="w-2/3 box-border">
        <p className="text-xl pb-4">Cart</p>
        <div className="flex flex-col gap-2">
          {cartsData.map((item: any) => (
            <div key={item.product.id}>
              <div className="flex gap-4">
                <Image
                  src={item.product.image}
                  alt="Product"
                  width={200}
                  height={200}
                />
                <div className="flex justify-between flex-col w-full">
                  <div className="w-full flex flex-col">
                    <div className="flex justify-between">
                      <p className="text-lg">{item.product.name}</p>
                      <p className="text-lg">
                        {convertIDR(item.product.price)}
                      </p>
                    </div>
                    <p>{item.product.category}</p>
                    <div className="flex gap-4 py-2 items-center">
                      <p>Size</p>
                      <select
                        name="size"
                        id="size"
                        defaultValue={item.size}
                        className="px-4 bg-gray-100 py-1"
                      >
                        {item.product.stock.map(
                          (
                            stock: { size: string; qty: string },
                            index: number
                          ) => (
                            <option key={index} value={stock.size}>
                              {stock.size}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="flex gap-4 items-center">
                      <p>Quantity</p>
                      <div className="flex">
                        <button
                          onClick={() =>
                            countProduct > 0
                              ? setCountProduct(countProduct - 1)
                              : null
                          }
                        >
                          <i className="bx bx-minus px-2 text-xl border-y-2 border-s-2 border-gray-200" />
                        </button>
                        <input
                          type="number"
                          className="ps-4 min-w-4 text-center w-12 border-2 border-gray-200"
                          defaultValue={item.qty}
                          disabled
                        />
                        <button
                          onClick={() => setCountProduct(countProduct + 1)}
                        >
                          <i className="bx bx-plus px-2 text-xl border-y-2 border-e-2 border-gray-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <i className="bx bx-heart text-2xl cursor-pointer" />
                    <i className="bx bx-trash text-2xl cursor-pointer" />
                  </div>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          ))}
        </div>
      </div>
      <div className={`w-1/3 relative`} ref={startRef}>
        <div
          className={`${
            isFixedBottom && !isFixedTop ? "absolute bottom-0 h-[40rem]" : ""
          } ${
            !isFixedBottom && !isFixedTop
              ? "fixed right-7 top-4 shadow py-2 bottom-4"
              : ""
          } ${
            !isFixedBottom && isFixedTop ? "h-[39.5rem] bottom-0" : ""
          } w-[22rem] ms-12 px-4 rounded-lg flex flex-col justify-between`}
        >
          <div>
            <p className="text-xl pb-4">Summary</p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="">Subtotal</p>
                <p className="text-lg">Rp 5,000,000</p>
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
              className="py-4 rounded-full flex gap-3 bg-blue-700 font-semibold items-center  w-full justify-center"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartViews;
