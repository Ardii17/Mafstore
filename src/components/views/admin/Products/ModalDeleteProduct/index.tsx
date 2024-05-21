import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import ModalDelete from "@/components/fragments/ModalDelete";
import productsServices from "@/services/products";
import { Product } from "@/types";
import { Dispatch, SetStateAction, useContext } from "react";

type propTypes = {
  cancelButton: () => void;
  setModalDelete: Dispatch<SetStateAction<boolean>>;
  id: string;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  session: any;
};

const ModalDeleteProduct = (props: propTypes) => {
  const theme = useContext(ThemeContext);
  const {
    cancelButton,
    setModalDelete,
    id,
    setProductsData,
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
        theme?.setToaster({
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
