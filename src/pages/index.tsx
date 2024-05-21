import LandingViews from "@/components/views/landing";
import { getPictureFromStorage } from "@/lib/firebase/services";
import productsServices from "@/services/products";
import { useEffect, useState } from "react";

export default function Home() {
  const [carousel, setCarousel] = useState<[] | any>([]);
  const [menus, setMenus] = useState<[]>([]);
  const [poster, setPoster] = useState<[]>([]);
  const [products, setProducts] = useState<[]>([]);
  const [category, setCategory] = useState<[]>([]);
  useEffect(() => {
    const getCarousel = async () => {
      const data: any = await getPictureFromStorage("carousel");
      setCarousel(data);
    };

    const getMenus = async () => {
      const data: any = await getPictureFromStorage("icons");
      setMenus(data);
    };

    const getPoster = async () => {
      const data: any = await getPictureFromStorage("poster");
      setPoster(data);
    };

    const getProducts = async () => {
      const data: any = await productsServices.getAllProducts();
      setProducts(data.data.data);
    };

    const getCategory = async () => {
      const data: any = await getPictureFromStorage("category");
      setCategory(data);
    };

    getProducts();
    getMenus();
    getPoster();
    getCarousel();
    getCategory();
  }, []);

  return (
    <div>
      <LandingViews
        menus={menus}
        carousel={carousel}
        poster={poster}
        products={products}
        category={category}
      />
    </div>
  );
}
