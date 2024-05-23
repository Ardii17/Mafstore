import { Product } from "@/types";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type proptypes = {
  product: any;
  productId: string;
  favorite: [];
  selectedSize: number;
  setSelectedSize: Dispatch<SetStateAction<number>>;
  onAddToCart: boolean;
  setOnAddToCart: Dispatch<SetStateAction<boolean>>;
  addToCartRef: any;
  countProduct: number;
  setCountProduct: Dispatch<SetStateAction<number>>;
  status: any;
  router: NextRouter;
  addToCart: () => void;
  handleFavorite: (type: string) => void;
};

export default function MobileViewAction(props: proptypes) {
  return (
    <div className="md:hidden lg:hidden" ref={props.addToCartRef}>
      <div
        className={`${
          props.onAddToCart ? "bottom-0" : "-bottom-96"
        } fixed bg-white h-96 md:hidden min-w-full transition-all flex flex-col gap-4 shadow z-40 lg:hidden left-0 right-0`}
      >
        <div className="flex gap-4">
          <Image
            src={props.product?.image}
            alt={props.product?.name}
            width={100}
            height={100}
            className="object-cover aspect-square max-h-[100px]"
          />
          <div className="pt-4 flex flex-col gap-1">
            <p>{props.product?.name}</p>
            <p className="font-semibold text-blue-700">
              {convertIDR(props.product?.price)}
            </p>
            <p className="opacity-70 text-sm">
              tersisa{" "}
              {props.product?.stock
                ?.map((stock: any) => stock.qty)
                .reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0)}{" "}
              buah
            </p>
          </div>
        </div>
        <div className="px-2">
          <p>Ukuran</p>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {props.product?.stock?.map((stock: any, index: number) => (
              <button
                className={`border-2 border-gray rounded-lg box-border`}
                onClick={() => props.setSelectedSize(parseInt(stock.size))}
              >
                <div
                  className={`${
                    parseInt(stock.size) === props.selectedSize
                      ? "border-2 border-gray-500"
                      : ""
                  } py-1 m-[0.1rem] rounded-md`}
                >
                  {stock.size}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="px-2">
          <p>Jumlah</p>
          <div className="flex py-2">
            <button
              onClick={() =>
                props.countProduct > 0
                  ? props.setCountProduct(props.countProduct - 1)
                  : null
              }
            >
              <i className="bx bx-minus py-1 px-4 text-xl border-y-2 border-s-2 border-gray-200" />
            </button>
            <p className="py-1 px-6 flex border-2 border-gray-200 items-center justify-center">
              {props.countProduct}
            </p>
            <button
              onClick={() => props.setCountProduct(props.countProduct + 1)}
            >
              <i className="bx bx-plus py-1 px-4 text-xl border-y-2 border-e-2 border-gray-200" />
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden z-50 lg:hidden fixed bottom-0 left-0 right-0 h-14 flex ">
        <div className="w-1/2 min-h-full flex items-center p-1 bg-blue-700">
          <button className="w-1/2">
            <i className="bx bx-chat text-2xl text-white" />
          </button>
          <hr className="w-[2px] h-12 bg-white" />
          <button
            className="w-1/2"
            onClick={() =>
              props.status === "authenticated"
                ? props.favorite?.find(
                    (item: { id: string }) => item.id === props.productId
                  )
                  ? props.handleFavorite("delete")
                  : props.handleFavorite("add")
                : props.router.push(
                    `/auth/signin?callbackUrl=${props.router.asPath}`
                  )
            }
          >
            <i className="bx bx-heart text-2xl text-white" />
          </button>
        </div>
        <div className="w-1/2 min-h-full flex p-1 items-center justify-center bg-blue-900">
          <button
            className={`flex items-center gap-4`}
            onClick={() =>
              props.onAddToCart ? props.addToCart() : props.setOnAddToCart(true)
            }
          >
            <i className="bx bx-cart text-2xl text-white" />
            <p className="font-semibold text-white">Add To Cart</p>
          </button>
        </div>
      </div>
    </div>
  );
}
