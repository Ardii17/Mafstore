import { Dispatch, SetStateAction } from "react";

export type User = {
  username?: string;
  email?: string;
  phone?: string;
  role?: "admin" | "member";
  password?: string;
  image?: string;
  id?: string | any;
  createdAt?: Date;
  updatedAt?: Date;
  type?: string;
};

export type Product = {
  id?: string | any;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ToasterTypes = {
  toaster?: {
    variant?: string;
    message?: string;
  };
  setToaster: Dispatch<SetStateAction<{}>>;
};

export type AddressTypes = {
  addressLine: string;
  phone: string;
  receipment: string;
  note: string;
  isMain: boolean;
};

export type ProvinsiTypes = {
  id: number;
  nama: string;
};

export type KotaTypes = {
  id: number;
  id_kota: string;
  nama: string;
};
