import DetailProduct from "@/components/views/detailproduct";
import productsServices from "@/services/products";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type proptypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const DetailProductPage = (props: proptypes) => {
  const { setToaster } = props;
  const [product, setProduct] = useState({});
  const [carts, setCarts] = useState({});
  const [favorite, setFavorite] = useState<[]>([]);
  const { id } = useRouter().query;
  const session: any = useSession();

  const getProduct = async (id: string) => {
    const { data } = await productsServices.getDetailProduct(id);
    setProduct(data.data);
  };

  const getCarts = async () => {
    const { data } = await userServices.getCarts(session.data?.accessToken);
    setCarts(data.data);
  };

  const getFavorite = async () => {
    const { data } = await userServices.getFavorite(session.data?.accessToken);
    setFavorite(data.data);
  };

  useEffect(() => {
    getProduct(id as string);
  }, [id]);

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
    <DetailProduct
      product={product}
      carts={carts}
      favorite={favorite}
      setFavorite={setFavorite}
      productId={id as string}
      setToaster={setToaster}
    />
  );
};

export default DetailProductPage;
