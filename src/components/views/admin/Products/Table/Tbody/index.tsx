import Button from "@/components/elements/button";
import TD from "@/components/elements/tableData";
import { Product } from "@/types";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type propTypes = {
  productsData: Product[]
  setEditProduct: Dispatch<SetStateAction<{}>>;
  idProduct: Dispatch<SetStateAction<string>>;
  setModalDelete: Dispatch<SetStateAction<boolean>>;
};

const Tbody = (props: propTypes) => {
  const { productsData, setModalDelete, idProduct, setEditProduct } = props;

  return (
    <tbody>
      {productsData.length > 1 &&
        productsData.map((product: any, index: number) => (
          <>
            <tr key={index} className={"border-t-2 border-gray-200"}>
              <TD rowspan={product.stock.length}>{index + 1}</TD>
              <TD rowspan={product.stock.length}>
                <Image
                  src={product.image}
                  alt="Coba"
                  width={100}
                  height={100}
                  className="object-cover mx-auto aspect-square"
                />
              </TD>
              <TD rowspan={product.stock.length}>{product.name}</TD>
              <TD rowspan={product.stock.length}>{product.category}</TD>
              <TD rowspan={product.stock.length}>
                {convertIDR(product.price)}
              </TD>
              <TD>{product.stock[0].size}</TD>
              <TD>{product.stock[0].qty}</TD>
              <TD rowspan={product.stock.length}>
                <div className="flex gap-2 items-center justify-center">
                  <Button
                    type="button"
                    className="bg-blue-700 hover:bg-blue-800 px-2 flex items-center rounded"
                    onClick={() => setEditProduct(product)}
                  >
                    <i className="bx bxs-edit" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setModalDelete(true);
                      idProduct(product.id);
                    }}
                    className="bg-red-700 hover:bg-red-800 px-2 flex items-center rounded"
                  >
                    <i className="bx bxs-trash" />
                  </Button>
                </div>
              </TD>
            </tr>
            {product.stock.map(
              (stock: { size: string; qty: string }, index: number) => (
                <>
                  {index > 0 && (
                    <tr key={index}>
                      <TD key={index}>{stock.size}</TD>
                      <TD key={index}>{stock.qty}</TD>
                    </tr>
                  )}
                </>
              )
            )}
          </>
        ))}
    </tbody>
  );
};

export default Tbody;
