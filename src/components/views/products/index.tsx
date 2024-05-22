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
    <div className="py-4 sm:px-2 max-sm:px-2 md:px-4 max-md:px-4 lg:px-12 flex lg:flex-row lg:gap-8 max-md:flex-col max-md:gap-2 md:flex-col">
      <div className="w-1/5 lg:h-screen">
        <p className="text-xl mb-2 max-sm:w-full max-sm:whitespace-nowrap sm:whitespace-nowrap">
          {query
            ? query.charAt(0).toUpperCase() + query.slice(1)
            : "All Products"}{" "}
          ({products.length})
        </p>
        <div className="max-md:hidden md:hidden lg:block">
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
      </div>
      <div className="grid sm:gap-2 max-sm:gap-2 md:gap-4 max-md:gap-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-2">
        {products.map((product: Product, index: number) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsViews;
