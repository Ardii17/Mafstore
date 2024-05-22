import Button from "@/components/elements/button";
import userServices from "@/services/user";
import { Product } from "@/types";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Rating } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ThemeContext } from "@/components/elements/contextAPI";

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
        <div className="md:min-w-[33.33%] lg:min-w-[50%] sm:w-full ">
          <div className="md:mb-4 md:max-w-[450px] md:min-w-full max-md:min-w-full sm:min-w-full max-sm:min-w-full max-md:hidden md:hidden lg:block">
            <Image
              src={product?.image}
              alt={product?.name}
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
              src={product?.image}
              alt={product?.name}
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
        <div className="w-full max-sm:px-2 lg:px-8 py-6 flex flex-col gap-3 sm:min-w-full max-sm:min-w-full md:pe-4 md:min-w-[60%] lg:min-w-[50%]">
          <p className="md:text-xl font-semibold">{product?.name}</p>
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
              <span className="opacity-100 font-semibold md:text-lg">
                10,5RB
              </span>{" "}
              Penilaian
            </p>
            <p className="text-sm opacity-70 pe-4">
              <span className="opacity-100 font-semibold md:text-lg">
                91,1RB
              </span>{" "}
              Terjual
            </p>
          </div>
          <p className="md:text-3xl max-sm:text-2xl md:bg-gray-100 md:px-4 py-2 font-semibold text-blue-800">
            {convertIDR(product?.price)}
          </p>
          <table className="w-2/3">
            <tbody>
              <tr>
                <td className=" text-gray-700">Category</td>
                <td className="">{product?.category}</td>
              </tr>
            </tbody>
          </table>
          {/* Start Untuk Mobile */}
          <div className="md:hidden lg:hidden" ref={addToCartRef}>
            <div
              className={`${
                onAddToCart ? "bottom-0" : "-bottom-96"
              } fixed bg-white h-96 md:hidden min-w-full transition-all flex flex-col gap-4 shadow z-40 lg:hidden left-0 right-0`}
            >
              <div className="flex gap-4">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  width={100}
                  height={100}
                  className="object-cover aspect-square max-h-[100px]"
                />
                <div className="pt-4 flex flex-col gap-1">
                  <p>{product?.name}</p>
                  <p className="font-semibold text-blue-700">
                    {convertIDR(product?.price)}
                  </p>
                  <p className="opacity-70 text-sm">
                    tersisa{" "}
                    {product?.stock
                      ?.map((stock: any) => stock.qty)
                      .reduce(
                        (a: any, b: any) => parseInt(a) + parseInt(b),
                        0
                      )}{" "}
                    buah
                  </p>
                </div>
              </div>
              <div className="px-2">
                <p>Ukuran</p>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {product?.stock?.map((stock: any, index: number) => (
                    <button
                      className={`border-2 border-gray rounded-lg box-border`}
                      onClick={() => setSelectedSize(parseInt(stock.size))}
                    >
                      <div
                        className={`${
                          parseInt(stock.size) === selectedSize
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
                      countProduct > 0
                        ? setCountProduct(countProduct - 1)
                        : null
                    }
                  >
                    <i className="bx bx-minus py-1 px-4 text-xl border-y-2 border-s-2 border-gray-200" />
                  </button>
                  <p className="py-1 px-6 flex border-2 border-gray-200 items-center justify-center">
                    {countProduct}
                  </p>
                  <button onClick={() => setCountProduct(countProduct + 1)}>
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
                <button className="w-1/2">
                  <i className="bx bx-heart text-2xl text-white" />
                </button>
              </div>
              <div className="w-1/2 min-h-full flex p-1 items-center justify-center bg-blue-900">
                <button
                  className={`flex items-center gap-4`}
                  onClick={() =>
                    onAddToCart ? addToCart() : setOnAddToCart(true)
                  }
                >
                  <i className="bx bx-cart text-2xl text-white" />
                  <p className="font-semibold text-white">Add To Cart</p>
                </button>
              </div>
            </div>
          </div>
          {/* End Untuk Mobile */}
          <div className="min-w-full w-full flex flex-col gap-3 max-sm:hidden sm:hidden md:flex lg:flex">
            <div className="w-full">
              <p>Select Size</p>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {product?.stock?.map((stock: any, index: number) => (
                  <button
                    className={` border-2 border-gray rounded-lg box-border`}
                    onClick={() => setSelectedSize(parseInt(stock.size))}
                  >
                    <div
                      className={`${
                        parseInt(stock.size) === selectedSize
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
                      countProduct > 0
                        ? setCountProduct(countProduct - 1)
                        : null
                    }
                  >
                    <i className="bx bx-minus py-1 px-4 text-xl border-y-2 border-s-2 border-gray-200" />
                  </button>
                  <p className="py-1 px-6 flex border-2 border-gray-200 items-center justify-center">
                    {countProduct}
                  </p>
                  <button onClick={() => setCountProduct(countProduct + 1)}>
                    <i className="bx bx-plus py-1 px-4 text-xl border-y-2 border-e-2 border-gray-200" />
                  </button>
                </div>
                <p>
                  tersisa{" "}
                  {product?.stock
                    ?.map((stock: any) => stock.qty)
                    .reduce(
                      (a: any, b: any) => parseInt(a) + parseInt(b),
                      0
                    )}{" "}
                  buah
                </p>
              </div>
            </div>
            {warningAddToCart ? (
              <p className="text-red-500 mb-2">Pilih ukuran terlebih dahulu</p>
            ) : (
              ""
            )}
            <Button
              type={session.status === "authenticated" ? "submit" : "button"}
              className="py-4 rounded-full w-full flex gap-3 bg-blue-700 font-semibold items-center justify-center"
              onClick={() => {
                if (selectedSize !== 0) {
                  session.status === "authenticated"
                    ? addToCart()
                    : router.push(`/auth/signin?callbackUrl=${router.asPath}`);
                } else {
                  setWarningAddToCart(true);
                }
              }}
            >
              <i className="bx bx-cart text-2xl" />
              Add to cart
            </Button>
            <Button
              type={session.status === "authenticated" ? "submit" : "button"}
              className="py-4 w-full rounded-full flex gap-3 bg-red-700 font-semibold items-center justify-center"
              onClick={() =>
                session.status === "authenticated"
                  ? favorite?.find(
                      (item: { id: string }) => item.id === productId
                    )
                    ? handleFavorite("delete")
                    : handleFavorite("add")
                  : router.push(`/auth/signin?callbackUrl=${router.asPath}`)
              }
            >
              <i
                className={`bx ${
                  favorite &&
                  favorite?.find(
                    (item: { id: string }) => item.id === productId
                  )
                    ? "bxs-heart"
                    : "bx-heart"
                } text-2xl text-white `}
              />
              Favorite
            </Button>
          </div>
          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            doloribus, odit magni architecto cum earum saepe commodi, vero et
            accusamus eligendi nemo culpa, quibusdam pariatur aliquid? Inventore
            vel assumenda perferendis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Harum rerum mollitia tenetur quo, modi repudiandae
            eaque distinctio corporis incidunt explicabo.
          </p>
        </div>
      </div>
      <hr className="bg-gray-200 h-[0.15rem] rounded-full" />
      <div
        className="py-4 sm:px-2 max-sm:px-2 md:px-4 max-md:px-4"
        style={{ height: "500px" }}
      >
        <p className="text-lg font-semibold">Detail Produk</p>
      </div>
    </div>
  );
};

export default DetailProduct;
