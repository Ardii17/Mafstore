import CartViews from "@/components/views/cart";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type proptypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const CartPage = (props: proptypes) => {
  const { setToaster } = props;
  const [carts, setCarts] = useState<[]>([]);
  const [favorite, setFavorite] = useState<[]>([]);
  const session: any = useSession();
  const getCarts = async () => {
    const { data } = await userServices.getCarts(session.data?.accessToken);
    setCarts(data.data);
  };
  
  const getFavorite = async () => {
    const { data } = await userServices.getFavorite(session.data?.accessToken);
    setFavorite(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) {
      getCarts();
    }
  }, [session]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getFavorite();
    }
  }, [session]);

  return (
    <div>
      <CartViews
        carts={carts}
        setCarts={setCarts}
        favorite={favorite}
        setFavorite={setFavorite}
      />
    </div>
  );
};

export default CartPage;
