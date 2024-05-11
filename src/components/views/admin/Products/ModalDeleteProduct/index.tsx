import Button from "@/components/elements/button";
import ModalDelete from "@/components/fragments/ModalDelete";
import productsServices from "@/services/products";
import userServices from "@/services/user";
import { Product } from "@/types";
import { Dispatch, SetStateAction } from "react";

type propTypes = {
  cancelButton: () => void;
  setModalDelete: Dispatch<SetStateAction<boolean>>;
  id: string;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalDeleteProduct = (props: propTypes) => {
  const {
    cancelButton,
    setModalDelete,
    id,
    setProductsData,
    setToaster,
    session,
  } = props;

  const handleSubmit = async () => {
    try {
      const result = await productsServices.deleteProduct(
        id,
        session.data?.accessToken
      );
      if (result.status === 200) {
        const { data } = await productsServices.getAllProducts();
        setProductsData(data.data);
        setModalDelete(false);
        setToaster({
          variant: "success",
          message: "Berhasil Menghapus Product",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ModalDelete>
        <Button
          type="button"
          onClick={cancelButton}
          className="bg-blue-700 hover:bg-blue-800 rounded-md px-4"
        >
          Batal
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 rounded-md px-4"
        >
          Hapus
        </Button>
      </ModalDelete>
    </div>
  );
};

export default ModalDeleteProduct;
