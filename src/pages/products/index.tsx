import ProductsViews from "@/components/views/products";
import productsServices from "@/services/products";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductPage = (props: propTypes) => {
  const { setToaster } = props;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productsServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  return <ProductsViews products={products} />;
};

export default ProductPage;
