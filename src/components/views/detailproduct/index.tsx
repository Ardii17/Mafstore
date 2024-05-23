import userServices from "@/services/user";
import { Product } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ThemeContext } from "@/components/elements/contextAPI";
import LeftSideDetail from "./leftsidedetail";
import RigthSideDetail from "./rightsidedetail";
import BottomSideDetail from "./bottomsidedetail";

type propTypes = {
  product: Product | any;
  carts: [];
  productId: string;
  favorite: [];
  setFavorite: Dispatch<SetStateAction<[]>>;
};

const DetailProduct = (props: propTypes) => {
  const theme = useContext(ThemeContext);
  const { product, carts, productId, favorite, setFavorite } = props;
  const [selectedSize, setSelectedSize] = useState(0);
  const [onAddToCart, setOnAddToCart] = useState(false); //Hanya untuk device mobile
  const addToCartRef: any = useRef(null); //Hanya untuk device mobile
  const [warningAddToCart, setWarningAddToCart] = useState(false);
  const [countProduct, setCountProduct] = useState(1);
  const [cartsData, setCartsData] = useState([]);
  const session: any = useSession();
  const router = useRouter();

  const handleUpdateCart = async (newCarts: any) => {
    try {
      const result = await userServices.updateCarts(
        {
          carts: newCarts,
        },
        session.data?.accessToken
      );

      if (result.status === 200) {
        setCartsData(newCarts);
        setSelectedSize(0);
        setCountProduct(1);
        theme?.setToaster({
          variant: "success",
          message: "Berhasil Menambahkan Ke Cart",
        });
      }
    } catch (error) {
      theme?.setToaster({
        variant: "failed",
        message: "Gagal Menambahkan Ke Cart",
      });
    }
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

  const addToCart = () => {
    let newCarts = [];
    const data = {
      id: productId,
      size: selectedSize,
      qty: countProduct,
    };

    if (carts) {
      if (
        carts.find(
          (cart: any) => cart.id === productId && cart.size === selectedSize
        )
      ) {
        newCarts = carts.map((cart: any) => {
          if (cart.id === productId && cart.size === selectedSize) {
            cart.qty += countProduct;
            return cart;
          }
        });
      } else {
        newCarts = [...carts, data];
      }

      handleUpdateCart(newCarts);
    } else {
      newCarts.push(data);
      handleUpdateCart(newCarts);
    }
  };

  const handleFavorite = (type: string) => {
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
    const handleClick = (event: any) => {
      if (
        addToCartRef.current &&
        !addToCartRef.current.contains(event.target)
      ) {
        setOnAddToCart(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [onAddToCart]);

  return (
    <div className="lg:px-16 md:px-4 sm:px-2 pb-8">
      <div className="py-4 max-sm:hidden">
        <p>
          <Link href={"/"}>Beranda</Link> {">"}{" "}
          <Link href={"/products"}>Products</Link> {">"}{" "}
          <Link href={`/products?q=${product.category}`}>
            {product.category}
          </Link>{" "}
          {">"} <Link href={`/products/${productId}`}>{product?.name}</Link>
        </p>
      </div>
      <div className="flex sm:gap-2 md:gap-8 md:flex-row bg-white max-sm:flex-col sm:flex-col">
        <LeftSideDetail product={product} />
        <RigthSideDetail
          product={product}
          productId={productId}
          favorite={favorite}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onAddToCart={onAddToCart}
          setOnAddToCart={setOnAddToCart}
          addToCartRef={addToCartRef}
          warningAddToCart={warningAddToCart}
          setWarningAddToCart={setWarningAddToCart}
          countProduct={countProduct}
          setCountProduct={setCountProduct}
          session={session}
          router={router}
          addToCart={addToCart}
          handleFavorite={handleFavorite}
        />
      </div>
      <hr className="bg-gray-200 h-[0.15rem] rounded-full" />
      <BottomSideDetail />
    </div>
  );
};

export default DetailProduct;
