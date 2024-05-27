import CheckoutView from "@/components/views/checkout";
import userServices from "@/services/user";
import { Product } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const [checkoutProducts, setCheckoutProducts] = useState<Product[]>([]);
  const session: any = useSession();

  const getCarts = async () => {
    const { data } = await userServices.getCarts(session.data?.accessToken);
    setCheckoutProducts(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) {
      getCarts();
    }
  }, [session]);

  return <CheckoutView checkoutProducts={checkoutProducts} />;
};

export default CheckoutPage;
