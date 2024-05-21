import AdminProductsView from "@/components/views/admin/Products";
import productsServices from "@/services/products";
import { useEffect, useState } from "react";

const AdminProductsPage = () => {
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
      <AdminProductsView products={products} />
    </>
  );
};

export default AdminProductsPage;
