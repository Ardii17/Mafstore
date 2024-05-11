import Card from "./card";

type propTypes = {
  products: any;
};

const ProductsViews = (props: propTypes) => {
  const { products } = props;

  return (
    <div className="py-4 px-12 flex gap-8">
      <div className="w-1/5 h-screen">
        <p className="text-xl mb-2">All Products ({products.length})</p>
        <p className="text-lg font-semibold">Gender</p>
        <div className="flex gap-3 items-center">
          <input type="checkbox" name="men" id="men" />
          <label htmlFor="men">Men</label>
        </div>
        <div className="flex gap-3 items-center">
          <input type="checkbox" name="women" id="women" />
          <label htmlFor="women">Women</label>
        </div>
        <div className="flex gap-3 items-center">
          <input type="checkbox" name="unisex" id="unisex" />
          <label htmlFor="unisex">Unisex</label>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-3">
        {products.map((product: any, index: string) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsViews;
