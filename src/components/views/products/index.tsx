import { Product } from "@/types";
import Card from "./card";
import { useEffect, useState } from "react";

type propTypes = {
  products: Product[];
  query?: string; 

};

const ProductsViews = (props: propTypes) => {
  const { products, query } = props;

  return (
    <div className="py-4 px-12 flex gap-8">
      <div className="w-1/5 h-screen">
        <p className="text-xl mb-2">
          {query ? query.charAt(0).toUpperCase() + query.slice(1) : "All Products"} ({products.length})
        </p>
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
        {products.map((product: Product, index: number) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsViews;
