import Button from "@/components/elements/button";
import productsServices from "@/services/products";
import userServices from "@/services/user";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type proptypes = {
  carts: any[];
  favorite: [];
  setFavorite: Dispatch<SetStateAction<[]>>;
  setCarts: Dispatch<SetStateAction<[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const CartViews = (props: proptypes) => {
  const { carts, setCarts, favorite, setFavorite, setToaster } = props;
  const session: any = useSession();
  const startRef: any = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isFixedTop, setIsFixedTop] = useState(true);
  const [cartsData, setCartsData] = useState<any>([]);
  const [countProduct, setCountProduct] = useState(0);
  const [isFixedBottom, setIsFixedBottom] = useState(false);
  const handleUpdateProduct = async (
    type: string,
    i: number,
    value: number = 1
  ) => {
    let newUpdateCarts = [];
    if (type === "size") {
      newUpdateCarts = carts.map((item: any, index: number) => {
        if (index === i) {
          return { ...item, size: value };
        } else {
          return item;
        }
      });
    } else if (type === "qty") {
      newUpdateCarts = carts.map((item: any, index: number) => {
        if (index === i) {
          setCartsData(
            cartsData.map((item: any, ind: number) => {
              if (ind === i) {
                return { ...item, qty: value };
              } else {
                return item;
              }
            })
          );
          return { ...item, qty: value };
        } else {
          return item;
        }
      });
    } else if (type === "delete") {
      newUpdateCarts = carts.filter((item: any) => item.id !== i);
    }

    await userServices.updateCarts(
      { carts: newUpdateCarts },
      session.data?.accessToken
    );

    const { data } = await userServices.getCarts(session.data?.accessToken);
    setCarts(data.data);
  };
  const handleUpdateFavorite = async (data: any, type: string) => {
    try {
      const result = await userServices.updateFavorite(
        {
          favorites: data,
        },
        session.data?.accessToken
      );

      if (result.status === 200) {
        const { data } = await userServices.getFavorite(
          session.data?.accessToken
        );
        setFavorite(data.data);
        if (type === "add") {
          setToaster({
            variant: "success",
            message: "Berhasil Menambahkan Ke Favorite",
          });
        } else {
          setToaster({
            variant: "success",
            message: "Berhasil Menghapus di Favorite",
          });
        }
      }
    } catch (error) {
      setToaster({
        variant: "failed",
        message: "Gagal Menambahkan Ke Favorite",
      });
    }
  };
  const handleFavorite = (type: string, productId: string) => {
    let newFavorite = [];

    const data = {
      id: productId,
    };

    if (type === "add") {
      if (favorite) {
        newFavorite = [...favorite, data];
        handleUpdateFavorite(newFavorite, "add");
      } else {
        newFavorite.push(data);
        handleUpdateFavorite(newFavorite, "add");
      }
    } else {
      newFavorite = favorite.filter(
        (item: { id: string }) => item.id !== productId
      );
      handleUpdateFavorite(newFavorite, "delete");
    }
  };

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
      if (carts) {
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
      }
    };

    getProducts();
  }, [carts]);

  useEffect(() => {
    const getTotalPrice = () => {
      let total = 0;
      cartsData.map((item: any) => {
        total += item.product.price * item.qty;
      });
      setTotalPrice(total);
    };

    getTotalPrice();
  }, [cartsData]);

  return (
    <div className="px-16 flex w-full h-full py-2 box-border">
      <div className="w-2/3 box-border">
        <p className="text-xl pb-4">Cart</p>
        <div className="flex flex-col gap-2">
          {cartsData.map((item: any, index: number) => (
            <div key={item.product.id}>
              <div className="flex gap-4">
                <Image
                  src={item.product.image}
                  alt="Product"
                  width={200}
                  height={200}
                  className="rounded aspect-square object-cover"
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
                        onChange={(e: any) =>
                          handleUpdateProduct("size", index, e.target.value)
                        }
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
                            item.qty > 1
                              ? handleUpdateProduct("qty", index, item.qty - 1)
                              : null
                          }
                        >
                          <i className="bx bx-minus px-2 text-xl border-y-2 border-s-2 border-gray-200" />
                        </button>
                        <input
                          type="number"
                          className="ps-4 min-w-12 max-w-20 text-center w-auto border-2 border-gray-200"
                          value={item.qty}
                          disabled
                        />
                        <button
                          onClick={() =>
                            handleUpdateProduct("qty", index, item.qty + 1)
                          }
                        >
                          <i className="bx bx-plus px-2 text-xl border-y-2 border-e-2 border-gray-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <i
                      className={`bx ${
                        favorite?.find(
                          (i: { id: string }) => i.id === item.product.id
                        )
                          ? "bxs-heart text-red-600"
                          : "bx-heart"
                      } bx-heart text-2xl cursor-pointer`}
                      onClick={() =>
                        favorite?.find(
                          (i: { id: string }) => i.id === item.product.id
                        )
                          ? handleFavorite("delete", item.product.id)
                          : handleFavorite("add", item.product.id)
                      }
                    />
                    <i
                      className="bx bx-trash text-2xl cursor-pointer"
                      onClick={() =>
                        handleUpdateProduct("delete", item.product.id)
                      }
                    />
                  </div>
                </div>
              </div>
              <hr className="my-4 h-[1px] bg-gray-200" />
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
                <p className="text-lg">{convertIDR(totalPrice)}</p>
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
