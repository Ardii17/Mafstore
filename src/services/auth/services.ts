import bcrypt from "bcrypt";
import { addData, retrieveDataByField } from "@/lib/firebase/services";

// Fungsi untuk menjalankan proses pendaftaran akun
export async function signUp(
  userData: {
    username: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    await addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

// Fungsi untuk pengecekan apakah akun sudah terdaftar untuk melakukan proses login
export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

// Fungsi untuk melakukan login dengan metode Google
export async function loginWithGoogle(
  data: { email: string; role?: string },
  callback: Function
) {
  const user = await retrieveDataByField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    await addData("users", data, (result: boolean) => {
      callback(result);
    });
  }
}
