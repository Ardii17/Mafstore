import { ThemeContext } from "@/components/elements/contextAPI";
import productsServices from "@/services/products";
import { AddressTypes, KotaTypes, Product, ProvinsiTypes } from "@/types";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AddressSection from "./AddressSection";
import DeliveryPayingSection from "./DeliveryPatingSection";
import ProductsSection from "./ProductsSection";

type proptypes = {
  checkoutProducts: Product[];
  address: AddressTypes[];
  provinsi: ProvinsiTypes[];
  kota: KotaTypes[];
  kecamatan: KotaTypes[];
  kelurahan: KotaTypes[];
  idProvinsi: number;
  idKota: number;
  idKecamatan: number;
  idKelurahan: number;
  setIDProvinsi: Dispatch<SetStateAction<number>>;
  setIDKota: Dispatch<SetStateAction<number>>;
  setIDKecamatan: Dispatch<SetStateAction<number>>;
  setIDKelurahan: Dispatch<SetStateAction<number>>;
};

const CheckoutView = (props: proptypes) => {
  const router = useRouter();
  const theme = useContext(ThemeContext);
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
        <AddressSection
          address={props.address}
        />
        <ProductsSection
          productCheckouted={productCheckouted}
          totalPrice={totalPrice}
          theme={theme}
        />
        <DeliveryPayingSection
          totalPrice={totalPrice}
          deliveryCost={deliveryCost}
        />
      </div>
    </div>
  );
};

export default CheckoutView;
