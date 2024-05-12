import Button from "@/components/elements/button";
import userServices from "@/services/user";
import { Product } from "@/types";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type propTypes = {
  product: Product | any;
  carts: any;
  productId: string;
  favorite: [];
  setFavorite: Dispatch<SetStateAction<[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const DetailProduct = (props: propTypes) => {
  const { product, carts, productId, setToaster, favorite, setFavorite } =
    props;
  const [stars, setStars] = useState<any>(Array(5).fill(true));
  const [selectedSize, setSelectedSize] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
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
        setCountProduct(0);
        setToaster({
          variant: "success",
          message: "Berhasil Menambahkan Ke Cart",
        });
      }
    } catch (error) {
      setToaster({
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

  return (
    <div className="px-16 pb-8">
      <div className="py-4">
        <p>
          <Link href={"/"}>Beranda</Link> {">"}{" "}
          <Link href={"/products"}>Products</Link> {">"}{" "}
          <Link href={"/products/sepatu"}>Sepatu</Link> {">"}{" "}
          <Link href={`/products/${productId}`}>{product?.name}</Link>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-white">
        <div>
          <div className="mb-4">
            <Image
              src={product?.image}
              alt={product?.name}
              width={500}
              height={500}
              className="aspect-square object-cover rounded-lg"
            />
          </div>
          <p className="text-lg font-[400]">Bagikan:</p>
          <div className="w-3/4 grid-cols-10 grid gap-2">
            <img src="./../Icons/Icons Web/whatsapp.png" alt="whatsapp" />
            <img src="./../Icons/Icons Web/instagram.png" alt="instagram" />
            <img src="./../Icons/Icons Web/facebook.png" alt="facebook" />
            <img src="./../Icons/Icons Web/pinterest.png" alt="pinterest" />
            <img src="./../Icons/Icons Web/twitter.png" alt="twitter" />
          </div>
        </div>
        <div className="w-full px-8 py-6 flex flex-col gap-3">
          <p className="text-xl font-semibold">{product?.name}</p>
          <div className="flex gap-4">
            <p className="text-sm opacity-70 pe-4 border-e-2 border-gray-100">
              <span className="opacity-100 font-semibold text-lg">4,3</span>{" "}
              <i className="bx bxs-star text-blue-800" />
              <i className="bx bxs-star text-blue-800" />
              <i className="bx bxs-star text-blue-800" />
              <i className="bx bxs-star text-blue-800" />
              <i className="bx bxs-star text-blue-800" />
              {stars.map((star: number, index: number) => {
                <>
                  <p>star</p>
                  <i key={index} className="bx bxs-star" />
                  <p>hai</p>
                </>;
              })}
            </p>
            <p className="text-sm opacity-70 pe-4 border-e-2 border-gray-100">
              <span className="opacity-100 font-semibold text-lg">10,5RB</span>{" "}
              Penilaian
            </p>
            <p className="text-sm opacity-70 pe-4">
              <span className="opacity-100 font-semibold text-lg">91,1RB</span>{" "}
              Terjual
            </p>
          </div>
          <p className="text-3xl bg-gray-100 px-4 py-2 font-semibold text-blue-800">
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
          <div>
            <p className="text-lg">Select Size</p>
            <div className="grid grid-cols-4 gap-4 my-2">
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
          <div className="flex flex-col gap-1 mb-4">
            <p>Kuantitas</p>
            <div className="flex gap-4 items-center">
              <div className="flex">
                <button
                  onClick={() =>
                    countProduct > 0 ? setCountProduct(countProduct - 1) : null
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
          <Button
            type={session.status === "authenticated" ? "submit" : "button"}
            className="py-4 rounded-full flex gap-3 bg-blue-700 font-semibold items-center justify-center"
            onClick={() => {
              if (selectedSize !== 0 && countProduct !== 0) {
                session.status === "authenticated"
                  ? addToCart()
                  : router.push(`/auth/signin?callbackUrl=${router.asPath}`);
              }
            }}
          >
            <i className="bx bx-cart text-2xl" />
            Add to cart
          </Button>
          <Button
            type={session.status === "authenticated" ? "submit" : "button"}
            className="py-4 rounded-full flex gap-3 bg-red-700 font-semibold items-center justify-center"
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
                favorite?.find((item: { id: string }) => item.id === productId)
                  ? "bxs-heart"
                  : "bx-heart"
              } text-2xl text-white `}
            />
            Favorite
          </Button>
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
      <div className="py-4">
        <p className="text-lg font-semibold">Detail Produk</p>
      </div>
    </div>
  );
};

export default DetailProduct;
