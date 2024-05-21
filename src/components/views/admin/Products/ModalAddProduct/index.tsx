import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import Input from "@/components/elements/input";
import Select from "@/components/elements/select";
import ModalUpdate from "@/components/fragments/ModalUpdate";
import { uploadImage } from "@/lib/firebase/services";
import productsServices from "@/services/products";
import { Product } from "@/types";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

type propTypes = {
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
};

const ModalAddProduct = (props: propTypes) => {
  const theme = useContext(ThemeContext);
  const { setModalAddProduct, setProducts } = props;
  const session: any = useSession();
  const [stock, setStock] = useState([
    {
      size: "",
      qty: 0,
    },
  ]);

  const handleStock = (
    e: ChangeEvent<HTMLFormElement>,
    index: number,
    type: string
  ) => {
    e.preventDefault();
    const newStock: any = [...stock];
    newStock[index][type] = e.target.value;
    setStock(newStock);
  };

  const uploadFile = (id: string, form: any) => {
    const file = form.image?.files[0];
    const newName = "product." + file.name.split(".")[1];

    if (file) {
      uploadImage(
        id,
        newName,
        "products",
        file,
        async (status: boolean, downloadURL: string) => {
          if (status) {
            const data = {
              image: downloadURL,
            };

            try {
              const result = await productsServices.editProduct(
                id,
                data,
                session?.data.accessToken
              );

              if (result.status === 200) {
                form.reset();
                setModalAddProduct(false);
                theme?.setToaster({
                  variant: "success",
                  message: "Berhasil Menambah Product",
                });
                const { data } = await productsServices.getAllProducts();
                setProducts(data.data);
              }
            } catch (error) {
              theme?.setToaster({
                variant: "failed",
                message: "Gagal Menambahkan Product at Upload Image",
              });
              console.log(error);
            }
          }
        }
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target as HTMLFormElement;
    const data = {
      image: "",
      name: form.name.value,
      status: form.status.value,
      category: form.category.value,
      price: form.price.value,
      stock,
    };

    const result = await productsServices.addProduct(
      data,
      session?.data.accessToken
    );

    if (result.status === 200) {
      uploadFile(result.data.data.id, form);
    } else {
      theme?.setToaster({
        variant: "failed",
        message: "Gagal Menambahkan Product",
      });
    }
  };

  return (
    <ModalUpdate
      modalTitle="Add Product"
      onClose={() => setModalAddProduct(false)}
      className="w-auto"
    >
      <form className="flex flex-col gap-4 box-border" onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          className="bg-zinc-100 border"
          required
        />
        <Select
          name="category"
          label="Category"
          options={[
            {
              label: "Men",
              value: "Men",
            },
            {
              label: "Women",
              value: "Women",
            },
          ]}
        />
        <Select
          name="status"
          label="Status Product"
          options={[
            {
              label: "Release",
              value: "Release",
            },
            {
              label: "Not Release",
              value: "Not Release",
            },
          ]}
        />
        <Input
          label="Price"
          type="number"
          name="price"
          required
          className="bg-zinc-100 border"
        />
        <label htmlFor="stock">Stock</label>
        {stock.map((stok: { size: string; qty: number }, index: number) => (
          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="size">Size</label>
              <input
                type="number"
                name="size"
                className="bg-zinc-100 border py-2 rounded-lg w-full px-2"
                onChange={(e: any) => handleStock(e, index, "size")}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="qty">Quantity</label>
              <input
                type="number"
                name="size"
                className="bg-zinc-100 border py-2 rounded-lg px-2"
                onChange={(e: any) => handleStock(e, index, "qty")}
                required
              />
            </div>
          </div>
        ))}
        <label htmlFor="image">Image</label>
        <input type="file" name="image" required />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="bg-blue-700 hover:bg-blue-800 rounded-md w-32 place-self-end"
            onClick={() => setStock([...stock, { size: "", qty: 0 }])}
          >
            Add Stock
          </Button>
          <Button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 rounded-md w-32 place-self-end"
          >
            Add Product
          </Button>
        </div>
      </form>
    </ModalUpdate>
  );
};

export default ModalAddProduct;
