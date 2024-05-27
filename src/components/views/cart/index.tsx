import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import productsServices from "@/services/products";
import userServices from "@/services/user";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PaySection from "./paysection";
import ProductsSection from "./productssection";

type proptypes = {
  carts: any[];
  favorite: [];
  setFavorite: Dispatch<SetStateAction<[]>>;
  setCarts: Dispatch<SetStateAction<[]>>;
};

const CartViews = (props: proptypes) => {
  const theme = useContext(ThemeContext);
  const { carts, setCarts, favorite, setFavorite } = props;
  const session: any = useSession();
  const startRef: any = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isFixedTop, setIsFixedTop] = useState(true);
  const [cartsData, setCartsData] = useState<any>([]);
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
          theme?.setToaster({
            variant: "success",
            message: "Berhasil Menambahkan Ke Favorite",
          });
        } else {
          theme?.setToaster({
            variant: "success",
            message: "Berhasil Menghapus di Favorite",
          });
        }
      }
    } catch (error) {
      theme?.setToaster({
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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (startRef.current) {
  //       const start = startRef.current.getBoundingClientRect();
  //       if (start.bottom >= 720) {
  //         setIsFixedBottom(false);
  //       } else {
  //         setIsFixedBottom(true);
  //       }

  //       if (start.top <= 0) {
  //         setIsFixedTop(false);
  //       } else {
  //         setIsFixedTop(true);
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
    <div className="px-16 flex w-full h-full py-2 box-border mb-4">
      <div className="w-2/3 box-border">
        <p className="text-xl pb-4">Cart</p>
        <ProductsSection
          favorite={favorite}
          cartsData={cartsData}
          handleUpdateProduct={handleUpdateProduct}
          handleFavorite={handleFavorite}
        ></ProductsSection>
      </div>
      <div className={`w-1/3 relative`} ref={startRef}>
        <PaySection
          totalPrice={totalPrice}
          isFixedTop={isFixedTop}
          isFixedBottom={isFixedBottom}
        ></PaySection>
      </div>
    </div>
  );
};

export default CartViews;
