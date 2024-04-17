import instance from "@/lib/axios/instance";

const authServices = {
  registerAccount: (data: any) => instance.post("/api/register", data),
};

export default authServices;
