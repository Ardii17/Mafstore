import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import Input from "@/components/elements/input";
import Progress from "@/components/elements/progress";
import AuthLayout from "@/components/layouts/AuthLayout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function Home() {
  const theme = useContext(ThemeContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const callbackUrl: any = router.query.callbackUrl || "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = e.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email.value,
        password: formData.password.value,
        callbackUrl: callbackUrl,
      });

      if (!res?.error) {
        setLoading(false);
        formData.reset();
        theme?.setToaster({
          variant: "success",
          message: "Berhasil Masuk Akun",
        });
        router.push(callbackUrl);
      } else {
        setLoading(false);
        setError("Email atau password salah");
      }
    } catch (error) {
      setError("Email atau password salaha");
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Masuk Akun Mafstore"
      linkText="Belum punya akun? Daftar "
      link="/auth/signup"
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <Input label="Email" type="email" name="email" required />
        <Input label="Password" type="password" name="password" required />
        <span className="text-red-500 w-full">{error ? error : ""}</span>
        <Button type="submit">
          {loading ? (
            <div className="w-full justify-center items-center">
              <Progress />
            </div>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
      <hr className="border border-slate-300 w-full" />
      <Button
        type="button"
        onClick={() => signIn("google", { redirect: false, callbackUrl })}
        className="w-full bg-blue-700 text-white rounded-lg py-2 flex gap-2 items-center justify-center hover:bg-blue-800"
      >
        <i className="bx bxl-google text-xl" /> Masuk dengan Google
      </Button>
    </AuthLayout>
  );
}
