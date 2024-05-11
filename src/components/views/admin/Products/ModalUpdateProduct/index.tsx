import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import Select from "@/components/elements/select";
import ModalUpdate from "@/components/fragments/ModalUpdate";
import { uploadImage } from "@/lib/firebase/services";
import productsServices from "@/services/products";
import { Product } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  updatedProduct: Product | any;
  setModalUpdateProduct: Dispatch<SetStateAction<boolean>>;
};

const ModalUpdateProduct = (props: propTypes) => {
  const { setToaster, setModalUpdateProduct, updatedProduct, setProducts } =
    props;
  const session: any = useSession();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [stock, setStock] = useState(updatedProduct.stock);

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

  const updateProduct = async (
    file: string = updatedProduct.image,
    form: any
  ) => {
    const dataProduct = {
      image: file ?? updatedProduct.image,
      name: form.name.value,
      status: form.status.value,
      category: form.category.value,
      price: form.price.value,
      stock,
    };

    const result = await productsServices.editProduct(
      updatedProduct.id,
      dataProduct,
      session?.data.accessToken
    );

    if (result.status === 200) {
      setToaster({
        variant: "success",
        message: "Sukses Mengupdate Product",
      });
      const { data } = await productsServices.getAllProducts();
      setProducts(data.data);
    } else {
      setToaster({
        variant: "failed",
        message: "Gagal Menambahkan Product",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target as HTMLFormElement;
    const file = form.image?.files[0];

    if (file) {
      const newName = "product." + file.name.split(".")[1];
      uploadImage(
        updatedProduct.id,
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
                updatedProduct.id,
                data,
                session?.data.accessToken
              );

              if (result.status === 200) {
                form.reset();
                updateProduct(downloadURL, form);
              }
            } catch (error) {
              setToaster({
                variant: "failed",
                message: "Gagal Menambahkan Product at Upload Image",
              });
              console.log(error);
            }
          }
        }
      );
    } else {
      updateProduct(file, form);
    }
  };

  return (
    <ModalUpdate
      modalTitle="Add Product"
      onClose={() => setModalUpdateProduct(false)}
      className="w-auto"
    >
      <form className="flex flex-col gap-4 box-border" onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          className="bg-zinc-100 border"
          defaultValue={updatedProduct.name}
        />
        <Select
          name="category"
          label="Category"
          defaultValue={updatedProduct.category}
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
          defaultValue={updatedProduct.status}
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
          defaultValue={updatedProduct.price}
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
                defaultValue={stok.size}
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
                defaultValue={stok.qty}
                onChange={(e: any) => handleStock(e, index, "qty")}
                required
              />
            </div>
          </div>
        ))}
        <label htmlFor="image">Image</label>
        <div className="flex gap-8 h-auto">
          <Image
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt="Image"
            width={100}
            height={100}
            className="rounded aspect-square object-cover"
          />
          <label
            htmlFor="image"
            className="max-w-full w-full p-4 bg-gray-100 cursor-pointer flex items-center rounded justify-center min-h-full"
          >
            {uploadedImage ? <p>{uploadedImage.name}</p> : "Upload a new image"}
          </label>
          <input
            type="file"
            name="image"
            className="hidden"
            id="image"
            onChange={(e: any) => setUploadedImage(e.target.files[0])}
          />
        </div>
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
            Upload Product
          </Button>
        </div>
      </form>
    </ModalUpdate>
  );
};

export default ModalUpdateProduct;
