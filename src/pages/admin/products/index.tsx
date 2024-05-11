import AdminProductsView from "@/components/views/admin/Products";
import productsServices from "@/services/products";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const AdminProductsPage = (props: propTypes) => {
  const { setToaster } = props;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productsServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  return (
    <>
      <AdminProductsView products={products} setToaster={setToaster} />
    </>
  );
};

export default AdminProductsPage;
