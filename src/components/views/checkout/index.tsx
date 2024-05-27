import productsServices from "@/services/products";
import { Product } from "@/types";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

type proptypes = {
  checkoutProducts: Product[];
};

const CheckoutView = (props: proptypes) => {
  const router = useRouter();
  const session: any = useSession();
  const { checkoutProducts } = props;
  const [productCheckouted, setProductCheckouted] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(20000);
  const containerRef: any = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      if (checkoutProducts) {
        const cart = checkoutProducts.map(async (cart: any) => {
          const { data } = await productsServices.getDetailProduct(cart.id);
          return {
            product: data.data,
            size: cart.size,
            qty: cart.qty,
          };
        });
        const result = await Promise.all(cart);
        setProductCheckouted(result);
      }
    };
    getProducts();
  }, [checkoutProducts]);

  useEffect(() => {
    const getTotalPrice = () => {
      let allPriceProduct = productCheckouted.map((item: any) => {
        return item.product.price * item.qty;
      });

      setTotalPrice(allPriceProduct.reduce((a: any, b: any) => a + b, 0));
    };
    getTotalPrice();
  }, [productCheckouted]);

  return (
    <div className="w-full bg-zinc-100" ref={containerRef}>
      <div className="w-full p-4 bg-blue-800 flex gap-4 items-center">
        <div className={`flex items-center`}>
          <img
            className={`max-sm:block max-w-[50px] max-h-[50px]`}
            src="/./../Icons/icon-web.png"
            alt="Web Icon"
          />
          <p
            className={`lg:text-3xl text-white max-md:text-2xl font-semibold lg:font-bold font-mono md:pe-4 lg:pe-4 cursor-default`}
            onClick={() => router.push("/")}
          >
            Mafstore
          </p>
        </div>
        <hr className={"w-[3px] bg-white rounded-full h-14"}></hr>
        <p className="text-white text-xl">Checkout</p>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex gap-2 items-center">
            <i className="bx bx-map text-2xl text-blue-700 " />
            <p className="text-blue-700 text-lg">Alamat Pengiriman</p>
          </div>
          <hr className="my-4" />
          <div className="flex">
            <div className="w-1/6">
              <p className="text-lg">Ardiansyah</p>
              <p>08123456789</p>
            </div>
            <hr className="w-[3px] h-[100%] bg-gray-200 rounded-full" />
            <div className="w-4/6 px-4">
              <p>
                Dusun Sindangkasih, Desa Sindangpakuon RT 001 RW 008 Kecamatan
                Cimanggung Kabupaten Sumedang Jawa Barat, Indonesia
              </p>
            </div>
            <div className="w-1/6 flex items-center justify-center">
              <button className="flex px-4 py-1 rounded items-center justify-center gap-2 bg-blue-700">
                <i className="bx bx-edit text-2xl text-white" />
                <p className="text-white">Edit Address</p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full">
            <thead>
              <tr>
                <td className="text-blue-700 text-lg">Produk Yang Dipesan</td>
                <td className="text-center">Harga</td>
                <td className="text-center">Jumlah</td>
                <td className="text-center">Total</td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <hr className="my-4 w-full" />
                </td>
              </tr>
            </thead>
            <tbody className="text-center">
              {productCheckouted.map((product: any) => (
                <tr className="py-4">
                  <td className="flex gap-4 items-center my-1">
                    <Image
                      src={product.product.image}
                      alt={product.product.name}
                      width={100}
                      height={100}
                      className="aspect-square"
                    />
                    <p>{product.product.name}</p>
                  </td>
                  <td>{convertIDR(product.product.price)}</td>
                  <td>{product.qty}</td>
                  <td>{convertIDR(product.product.price * product.qty)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>
                  <hr className="my-4 w-full" />
                </td>
              </tr>

              <tr>
                <td colSpan={3} className="text-start">
                  <div className="flex gap-4 items-center">
                    <p>Message : </p>
                    <input
                      type="text"
                      className="py-2 px-2 w-96 rounded border border-gray-300"
                      placeholder="(Optional)"
                    />
                  </div>
                </td>
                <td>
                  <p>{convertIDR(totalPrice)}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-white rounded shadow h-auto">
          <p className="text-blue-700 text-lg">Pengiriman dan Pembayaran</p>
          <hr className="my-4" />
          <div className="flex gap-2">
            <div className="w-1/5">
              <p>Metode Pengiriman</p>
            </div>
            <div className="w-2/5">
              <p className="font-semibold">JNE</p>
              <p className="text-sm opacity-70">
                Waktu Garansi Tiba Sampai: 30 Maret 2024
              </p>
              <p className="text-sm opacity-70">
                Jaminan mendapatkan voucher diskon 10% jika lebih dari 30 Maret
                2024
              </p>
            </div>
            <div className="w-1/5 flex items-center justify-center">
              <p>{convertIDR(deliveryCost)}</p>
            </div>
            <div className="w-1/5 flex items-center justify-center">
              <button className="py-2 px-3 text-white bg-blue-700 rounded">
                Edit Pengiriman
              </button>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-2">
            <div className="w-1/5 flex items-center">
              <p>Metode Pembayaran</p>
            </div>
            <div className="w-3/5 flex items-center">
              <p>Cash of Delivery (COD)</p>
            </div>
            <div className="w-1/5 flex items-center justify-center">
              <button className="py-2 px-3 text-white bg-blue-700 rounded">
                Edit Pengiriman
              </button>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-2 flex-col w-96 float-end">
            <table>
              <tbody>
                <tr>
                  <td className="py-2">Total Barang</td>
                  <td>{convertIDR(totalPrice)}</td>
                </tr>
                <tr>
                  <td className="py-2">Estimasi Pengiriman</td>
                  <td>{convertIDR(deliveryCost)}</td>
                </tr>
                <tr>
                  <td className="py-2">Biaya Penanganan</td>
                  <td>{convertIDR(5000)}</td>
                </tr>
                <tr>
                  <td className="py-2">Total Pemesanan Yang Dibayar</td>
                  <td>{convertIDR(totalPrice + deliveryCost + 5000)}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="text-end">
                    <button className="w-full py-2 bg-blue-700 text-white rounded my-2 font-semibold">
                      Buat Pesanan
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
