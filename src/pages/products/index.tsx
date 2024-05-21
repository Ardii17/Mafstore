import ProductsViews from "@/components/views/products";
import productsServices from "@/services/products";
import { Product } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { q }: any = useRouter().query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productsServices.getAllProducts();
      if (q) {
        let newProductsDataByName = data.data.filter((product: Product) =>
          product.name.toLowerCase().includes(q.toLowerCase())
        );

        let newProductsDataByCategory = data.data.filter((product: Product) =>
          product.category.toLowerCase().includes(q.toLowerCase())
        );

        if (newProductsDataByCategory.length > 0) {
          newProductsDataByCategory.map((product: Product) =>
            newProductsDataByName.push(product)
          );
        }

        setProducts(newProductsDataByName);
      } else {
        setProducts(data.data);
      }
    };

    getAllProducts();
  }, [q]);

  return <ProductsViews products={products} query={q} />;
};

export default ProductPage;
