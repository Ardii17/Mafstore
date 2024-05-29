import instance from "@/lib/axios/instance";
import { AddressTypes } from "@/types";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),

  updateUser: (id: string, data: any, token: string) =>
    instance.put(
      `/api/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: (token: string) =>
    instance.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProfile: (data: any, token: string) =>
    instance.put(
      `/api/users/profile`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  getCarts: (token: string) =>
    instance.get("/api/users/carts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateCarts: (data: any, token: string) =>
    instance.put(
      `/api/users/carts`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  getFavorite: (token: string) =>
    instance.get("/api/users/favorite", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateFavorite: (data: any, token: string) =>
    instance.put(
      "/api/users/favorite",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  getAddress: (token: string) =>
    instance.get("/api/users/address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateAddress: (token: string, data: any) =>
    instance.put(
      "/api/users/address",
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
};

export default userServices;
