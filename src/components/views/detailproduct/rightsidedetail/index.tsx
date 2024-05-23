import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { Rating } from "@mui/material";
import { convertIDR } from "@/utils/currency";
import MobileViewAction from "../mobileviewaction";
import Button from "@/components/elements/button";

type proptypes = {
  product: any;
  productId: string;
  favorite: [];
  selectedSize: number;
  setSelectedSize: Dispatch<SetStateAction<number>>;
  onAddToCart: boolean;
  setOnAddToCart: Dispatch<SetStateAction<boolean>>;
  addToCartRef: any;
  warningAddToCart: boolean
  setWarningAddToCart: Dispatch<SetStateAction<boolean>>;
  countProduct: number;
  setCountProduct: Dispatch<SetStateAction<number>>;
  session: any;
  router: NextRouter;
  addToCart: () => void;
  handleFavorite: (type: string) => void;
};

export default function RigthSideDetail(props: proptypes) {
  return (
    <div className="w-full max-sm:px-2 lg:px-8 py-6 flex flex-col gap-3 sm:min-w-full max-sm:min-w-full md:pe-4 md:min-w-[60%] lg:min-w-[50%]">
      <p className="md:text-xl font-semibold">{props.product?.name}</p>
      <div className="flex gap-4">
        <p className="text-sm opacity-70 pe-4 border-e-2 border-gray-100">
          <span className="opacity-100 font-semibold md:text-lg">4,3</span>{" "}
          <Rating
            name="read-only"
            value={4.5}
            precision={0.5}
            readOnly
            className="md:text-[1rem] max-sm:text-[1px] sm:text-sm"
          />
        </p>
        <p className="text-sm opacity-70 pe-4 border-e-2 border-gray-100">
          <span className="opacity-100 font-semibold md:text-lg">10,5RB</span>{" "}
          Penilaian
        </p>
        <p className="text-sm opacity-70 pe-4">
          <span className="opacity-100 font-semibold md:text-lg">91,1RB</span>{" "}
          Terjual
        </p>
      </div>
      <p className="md:text-3xl max-sm:text-2xl md:bg-gray-100 md:px-4 py-2 font-semibold text-blue-800">
        {convertIDR(props.product?.price)}
      </p>
      <table className="w-2/3">
        <tbody>
          <tr>
            <td className=" text-gray-700">Category</td>
            <td className="">{props.product?.category}</td>
          </tr>
        </tbody>
      </table>
      <div className="min-w-full w-full flex flex-col gap-3 max-sm:hidden sm:hidden md:flex lg:flex">
        <div className="w-full">
          <p>Select Size</p>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {props.product?.stock?.map((stock: any, index: number) => (
              <button
                className={` border-2 border-gray rounded-lg box-border`}
                onClick={() => props.setSelectedSize(parseInt(stock.size))}
              >
                <div
                  className={`${
                    parseInt(stock.size) === props.selectedSize
                      ? "border-2 border-gray-500"
                      : ""
                  } py-3 m-[0.1rem] rounded-md`}
                >
                  {stock.size}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 my-4">
          <p>Kuantitas</p>
          <div className="flex gap-4 items-center">
            <div className="flex">
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
            <p>
              tersisa{" "}
              {props.product?.stock
                ?.map((stock: any) => stock.qty)
                .reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0)}{" "}
              buah
            </p>
          </div>
        </div>
        {props.warningAddToCart ? (
          <p className="text-red-500 mb-2">Pilih ukuran terlebih dahulu</p>
        ) : (
          ""
        )}
        <Button
          type={props.session.status === "authenticated" ? "submit" : "button"}
          className="py-4 rounded-full w-full flex gap-3 bg-blue-700 font-semibold items-center justify-center"
          onClick={() => {
            if (props.selectedSize !== 0) {
              props.session.status === "authenticated"
                ? props.addToCart()
                : props.router.push(
                    `/auth/signin?callbackUrl=${props.router.asPath}`
                  );
            } else {
              props.setWarningAddToCart(true);
            }
          }}
        >
          <i className="bx bx-cart text-2xl" />
          Add to cart
        </Button>
        <Button
          type={props.session.status === "authenticated" ? "submit" : "button"}
          className="py-4 w-full rounded-full flex gap-3 bg-red-700 font-semibold items-center justify-center"
          onClick={() =>
            props.session.status === "authenticated"
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
          <i
            className={`bx ${
              props.favorite &&
              props.favorite?.find(
                (item: { id: string }) => item.id === props.productId
              )
                ? "bxs-heart"
                : "bx-heart"
            } text-2xl text-white `}
          />
          Favorite
        </Button>
      </div>
      <p className="py-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo doloribus,
        odit magni architecto cum earum saepe commodi, vero et accusamus
        eligendi nemo culpa, quibusdam pariatur aliquid? Inventore vel assumenda
        perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Harum rerum mollitia tenetur quo, modi repudiandae eaque distinctio
        corporis incidunt explicabo.
      </p>
      {/* Start Untuk Mobile */}
      <MobileViewAction
        product={props.product}
        productId={props.productId}
        favorite={props.favorite}
        selectedSize={props.selectedSize}
        setSelectedSize={props.setSelectedSize}
        onAddToCart={props.onAddToCart}
        setOnAddToCart={props.setOnAddToCart}
        addToCartRef={props.addToCartRef}
        countProduct={props.countProduct}
        setCountProduct={props.setCountProduct}
        status={props.session.status}
        router={props.router}
        addToCart={props.addToCart}
        handleFavorite={props.handleFavorite}
      />
      {/* End Untuk Mobile */}
    </div>
  );
}
