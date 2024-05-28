import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type proptypes = {
  favorite: [];
  cartsData: any;
  handleUpdateProduct: (
    type: string,
    i: number,
    value?: number
  ) => Promise<void>;
  handleFavorite: (type: string, productId: string) => void;
};

export default function ProductsSection(props: proptypes) {
  return (
    <div className="flex flex-col gap-2">
      {props.cartsData.length > 0 ? (
        props.cartsData.map((item: any, index: number) => (
          <div key={item.product.id}>
            <div className="flex gap-4">
              <Image
                src={item.product.image}
                alt="Product"
                width={200}
                height={200}
                className="rounded aspect-square object-cover max-sm:max-w-20 max-sm:max-h-20"
              />
              <div className="flex justify-between flex-col w-full max-sm:text-sm">
                <div className="w-full flex flex-col">
                  <div className="flex justify-between">
                    <p className="md:text-lg">{item.product.name}</p>
                    <p className="md:text-lg hidden">
                      {convertIDR(item.product.price)}
                    </p>
                  </div>
                  <p className="opacity-70 max-sm:hidden">
                    {item.product.category}
                  </p>
                  <div className="flex gap-4 py-2 items-center">
                    <p>Size</p>
                    <select
                      name="size"
                      id="size"
                      defaultValue={item.size}
                      className="px-4 bg-gray-100 py-1"
                      onChange={(e: any) =>
                        props.handleUpdateProduct("size", index, e.target.value)
                      }
                    >
                      {item.product.stock.map(
                        (
                          stock: {
                            size: string;
                            qty: string;
                          },
                          index: number
                        ) => (
                          <option key={index} value={stock.size}>
                            {stock.size}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="flex gap-4 items-center max-sm:hidden">
                    <p>Quantity</p>
                    <div className="flex">
                      <button
                        onClick={() =>
                          item.qty > 1
                            ? props.handleUpdateProduct(
                                "qty",
                                index,
                                item.qty - 1
                              )
                            : null
                        }
                      >
                        <i className="bx bx-minus px-2 text-xl border-y-2 border-s-2 border-gray-200" />
                      </button>
                      <input
                        type="number"
                        className="ps-4 min-w-12 max-w-20 text-center w-auto border-2 border-gray-200"
                        value={item.qty}
                        disabled
                      />
                      <button
                        onClick={() =>
                          props.handleUpdateProduct("qty", index, item.qty + 1)
                        }
                      >
                        <i className="bx bx-plus px-2 text-xl border-y-2 border-e-2 border-gray-200" />
                      </button>
                    </div>
                  </div>
                  <div className="md:hidden flex justify-between w-full items-center">
                    <p className="opacity-70">
                      {convertIDR(item.product.price * item.qty)}
                    </p>
                    <div className="flex">
                      <button
                        onClick={() =>
                          item.qty > 1
                            ? props.handleUpdateProduct(
                                "qty",
                                index,
                                item.qty - 1
                              )
                            : null
                        }
                      >
                        <i className="bx bx-minus border-2 p-1 border-gray-200" />
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center border-2 border-gray-200 ps-4"
                        value={item.qty}
                        disabled
                      />
                      <button
                        onClick={() =>
                          props.handleUpdateProduct("qty", index, item.qty + 1)
                        }
                      >
                        <i className="bx bx-plus border-2 p-1 border-gray-200" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 max-sm:hidden">
                  <i
                    className={`bx ${
                      props.favorite?.find(
                        (i: { id: string }) => i.id === item.product.id
                      )
                        ? "bxs-heart text-red-600"
                        : "bx-heart"
                    } bx-heart text-2xl cursor-pointer`}
                    onClick={() =>
                      props.favorite?.find(
                        (i: { id: string }) => i.id === item.product.id
                      )
                        ? props.handleFavorite("delete", item.product.id)
                        : props.handleFavorite("add", item.product.id)
                    }
                  />
                  <i
                    className="bx bx-trash text-2xl cursor-pointer"
                    onClick={() =>
                      props.handleUpdateProduct("delete", item.product.id)
                    }
                  />
                </div>
              </div>
            </div>
            <hr className="my-4 h-[1px] bg-gray-200" />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center gap-4 justify-center min-h-[30rem]">
          <Image
            src="/./Random/emptycart.jpg"
            alt="Empty"
            width={300}
            height={300}
          />
          <p className="text-3xl text-gray-400">Carts Empty</p>
        </div>
      )}
    </div>
  );
}
