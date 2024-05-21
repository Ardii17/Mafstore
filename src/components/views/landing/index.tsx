import Menus from "./menus";
import Slider from "./slider";
import Banner from "./banner";
import Related from "./related";
import { Product } from "@/types";
import Recomendation from "./recomendation";
import CarouselPage from "./carousel";

type proptypes = {
  carousel: [];
  menus: [];
  poster: { link: string }[];
  products: Product[];
  category: []
};

const LandingViews = (props: proptypes) => {
  const { carousel, menus, poster, products, category } = props;

  return (
    <div className="py-4 bg-gray-100 max-sm:px-2 md:px-4 lg:px-12 flex flex-col gap-4">
      <CarouselPage carousel={carousel} />
      <Menus menus={menus} category={category} />
      <Banner src={poster[0]?.link} />
      <Slider products={products} />
      <Banner src={poster[1]?.link} />
      <Related products={products} />
      <Recomendation products={products} />
    </div>
  );
};

export default LandingViews;
