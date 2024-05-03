import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import ModalUpdate from "@/components/fragments/ModalUpdate";
import userServices from "@/services/user";
import { FormEvent } from "react";

type types = {
  profile: any;
  session: any;
  setEditPassword: any;
  setErrorPassword: any;
  errorPassword: string;
  setToaster: any;
};

const ModalUpdatePassword = (props: types) => {
  const {
    profile,
    session,
    setEditPassword,
    setErrorPassword,
    errorPassword,
    setToaster,
  } = props;
  const handleEditPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target as HTMLFormElement;
    const data = {
      password: form.newPassword.value,
      oldPassword: form.oldPassword.value,
      encryptPassword: profile.password,
    };
    if (form.newPassword.value === form.newConfirmPassword.value) {
      try {
        const result = await userServices.updateProfile(
          profile.id,
          data,
          session.data?.accessToken
        );

        if (result.status === 200) {
          setEditPassword(false);
          setErrorPassword("");
          setToaster({
            variant: "success",
            message: "Berhasil Merubah Password",
          });
        }
      } catch (error) {
        setErrorPassword("Password sebelumnya salah");
      }
    } else {
      setErrorPassword("Password baru tidak sesuai");
    }
  };

  return (
    <ModalUpdate
      modalTitle="Ubah Password"
      onClose={() => setEditPassword(false)}
    >
      <form className="flex flex-col gap-4" onSubmit={handleEditPassword}>
        <Input
          label="Password Sebelumnya"
          type="password"
          name="oldPassword"
          className="bg-zinc-100 border"
        />
        <Input
          label="Password Baru"
          type="password"
          name="newPassword"
          className="bg-zinc-100 border"
        />
        <Input
          label="Konfirmasi Password Baru"
          type="password"
          name="newConfirmPassword"
          className="bg-zinc-100 border"
        />
        <p className="text-sm text-red-500">
          {errorPassword ? errorPassword : ""}
        </p>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded-md w-32 place-self-end"
        >
          Ubah Password
        </Button>
      </form>
    </ModalUpdate>
  );
};

export default ModalUpdatePassword;
