import { convertIDR } from "@/utils/currency";
import Image from "next/image";

export default function ProductsSection(props: {
  productCheckouted: any;
  totalPrice: number;
  theme: any;
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      {props.theme?.deviceType === "mobile" ? (
        <div className="flex flex-col gap-2">
          <p className="text-blue-700 text-lg">Products</p>
          <hr className="my-2 sm:hidden md:block" />
          {props.productCheckouted.map((product: any) => (
            <>
              <div className="flex gap-2">
                <Image
                  src={product.product.image}
                  alt={product.product.name}
                  width={100}
                  height={100}
                  className="aspect-square sm:max-w-20 sm:max-h-20"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm">
                    {product.product.name.length > 26
                      ? `${product.product.name.substring(0, 26)}...`
                      : product.product.name}
                  </p>
                  <p className="text-sm">
                    Harga : {convertIDR(product.product.price)}
                  </p>
                  <p className="text-sm">Quantity : {product.qty}</p>
                  <p className="text-sm">
                    {convertIDR(product.product.price * product.qty)}
                  </p>
                </div>
              </div>
              <hr className="w-full h-[1px] bg-gray-100" />
            </>
          ))}
          <div className="flex gap-4 w-full items-center">
            <p className="w-1/4 max-sm:text-sm">Message : </p>
            <input
              type="text"
              className="py-2 px-2 w-3/4 rounded border border-gray-300"
              placeholder="(Optional)"
            />
          </div>
          <hr className="w-full h-[1px] bg-gray-100" />
          <p className="text-lg sm:text-sm">
            Total Price : {convertIDR(props.totalPrice)}
          </p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="text-blue-700 text-lg">Produk Yang Dipesan</td>
              <td className="text-center">Harga</td>
              <td className="text-center">Jumlah</td>
              <td className="text-center">Total</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <hr className="my-4 w-full" />
              </td>
            </tr>
          </thead>
          <tbody className="text-center">
            {props.productCheckouted.map((product: any) => (
              <tr className="py-4">
                <td className="flex gap-4 items-center my-1">
                  <Image
                    src={product.product.image}
                    alt={product.product.name}
                    width={100}
                    height={100}
                    className="aspect-square"
                  />
                  <p>{product.product.name}</p>
                </td>
                <td>{convertIDR(product.product.price)}</td>
                <td>{product.qty}</td>
                <td>{convertIDR(product.product.price * product.qty)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}>
                <hr className="my-4 w-full" />
              </td>
            </tr>

            <tr>
              <td colSpan={3} className="text-start">
                <div className="flex gap-4 items-center">
                  <p>Message : </p>
                  <input
                    type="text"
                    className="py-2 px-2 w-96 rounded border border-gray-300"
                    placeholder="(Optional)"
                  />
                </div>
              </td>
              <td>
                <p>{convertIDR(props.totalPrice)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}