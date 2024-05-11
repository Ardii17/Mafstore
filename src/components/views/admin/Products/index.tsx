import Button from "@/components/elements/button";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ModalAddProduct from "./ModalAddProduct";
import Thead from "./Table/Thead";
import Tbody from "./Table/Tbody";
import ModalDeleteProduct from "./ModalDeleteProduct";
import { useSession } from "next-auth/react";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { Product } from "@/types";

type propTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const AdminProductsView = (props: propTypes) => {
  const { products, setToaster } = props;
  const [ModalDelete, setModalDelete] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [idProduct, setIdProduct] = useState<string>("");
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(Boolean);
  const [searched, setSearched] = useState("");
  const session: any = useSession();

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  useEffect(() => {
    if (searched) {
      const newProducts = productsData.filter((product: Product) =>
        product.name.toLowerCase().includes(searched.toLowerCase())
      );
      setProductsData(newProducts);
    } else {
      setProductsData(products);
    }
  }, [searched]);

  return (
    <>
      <AdminLayout>
        <div className="p-4 w-full">
          <p className="text-xl mb-2">Products Management</p>
          <div className="w-full flex justify-between">
            <Button
              type="button"
              className="rounded bg-blue-700 hover:bg-blue-800 px-4 flex items-center gap-2"
              onClick={() => setModalAddProduct(true)}
            >
              <i className="bx bx-plus font-bold" /> Add Product
            </Button>
            <div className="relative">
              <i className="bx bx-search absolute left-4  top-1/2 -translate-y-1/2 text-xl" />
              <input
                type="text"
                name="search"
                placeholder="Search product"
                className="bg-gray-200 rounded-full py-2 ps-12 pe-4"
                onChange={(e: any) => setSearched(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full min-w-full rounded shadow mt-4">
            <Thead />
            <Tbody
              setEditProduct={setUpdatedProduct}
              idProduct={setIdProduct}
              productsData={productsData}
              setModalDelete={setModalDelete}
            />
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setToaster={setToaster}
          setModalAddProduct={setModalAddProduct}
          setProducts={setProductsData}
        />
      )}
      {ModalDelete && (
        <ModalDeleteProduct
          cancelButton={() => setModalDelete(false)}
          setModalDelete={setModalDelete}
          id={idProduct}
          setProductsData={setProductsData}
          setToaster={setToaster}
          session={session}
        />
      )}
      {Object.keys(updatedProduct).length > 0 && <ModalUpdateProduct setProducts={setProductsData} updatedProduct={updatedProduct} setToaster={setToaster} setModalUpdateProduct={() => setUpdatedProduct({})} />}
    </>
  );
};

export default AdminProductsView;
