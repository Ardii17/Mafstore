import instance from "@/lib/axios/instance";

const productsServices = {
  getAllProducts: () => instance.get("/api/products"),
  getDetailProduct: (id: string) => instance.get(`/api/products/${id}`),
  addProduct: (data: any, token: string) =>
    instance.post("/api/products/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteProduct: (id: string, token: string) =>
    instance.delete(`/api/products/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  editProduct: (id: string, data: any, token: string) =>
    instance.put(
      `/api/products/products/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
};

export default productsServices;
