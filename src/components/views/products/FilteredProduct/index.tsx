import { Skeleton } from "@mantine/core";

export default function FilteredProduct(props: {
  length: number;
  query: string | undefined;
}) {
  return (
    <div className="w-1/5 lg:h-screen">
      <Skeleton height={15} width="15%" />
      <p className="text-xl mb-2 max-sm:w-full max-sm:whitespace-nowrap sm:whitespace-nowrap">
        {props.query
          ? props.query.charAt(0).toUpperCase() + props.query.slice(1)
          : "All Products"}{" "}
        ({props.length})
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
  );
}
