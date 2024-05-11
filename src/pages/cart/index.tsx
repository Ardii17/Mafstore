import CartViews from "@/components/views/cart";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const session: any = useSession();
  const getCarts = async () => {
    const { data } = await userServices.getCarts(session.data?.accessToken);
    setCarts(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) {
      getCarts();
    }
  }, [session]);

  return (
    <div>
      <CartViews carts={carts} />
    </div>
  );
};

export default CartPage;
