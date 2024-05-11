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
