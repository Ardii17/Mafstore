import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import AuthLayout from "@/components/layouts/AuthLayout";
import authServices from "@/services/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export default function Home({ setToaster }: { setToaster: Dispatch<SetStateAction<{}>> }) {
  const [loading, setLoading] = useState(Boolean);
  const [error, setError] = useState("");
  const router = useRouter();
  const callbackUrl: any = router.query.callbackUrl || "/";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = e.target as HTMLFormElement;
    setLoading(true);
    const data = {
      username: formData.username.value,
      email: formData.email.value,
      phone: formData.phone.value,
      password: formData.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        formData.reset();
        setToaster({
          variant: "success",
          message: "Berhasil Daftar Akun",
        });
        setLoading(false);
        router.push("/auth/signin");
      }
    } catch (error) {
      setLoading(false);
      setError("Email sudah terdaftar");
    }
  }

  return (
    <AuthLayout
      title="Daftar Akun"
      linkText="Sudah punya akun? Masuk "
      link="/auth/signin"
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <Input label="Username" type="text" name="username" required />
        <Input label="Email" type="email" name="email" required />
        <Input label="Nomor Telepon" type="number" name="phone" required />
        <Input label="Password" type="password" name="password" required />
        <span className="text-red-500 w-full">{error ? error : ""}</span>
        <Button type="submit">{loading ? "Loading..." : "Daftar"}</Button>
      </form>
      <hr className="border border-slate-300 w-full" />
      <button
        type="button"
        onClick={() => signIn("google", { redirect: false, callbackUrl })}
        className="w-full bg-blue-500 text-white rounded-lg py-2 flex gap-2 items-center justify-center hover:bg-blue-600"
      >
        <i className="bx bxl-google text-xl"></i> Masuk dengan Google
      </button>
    </AuthLayout>
  );
}
