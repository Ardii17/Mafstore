import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import Input from "@/components/elements/input";
import ModalUpdate from "@/components/fragments/ModalUpdate";
import userServices from "@/services/user";
import { User } from "@/types";
import { FormEvent, useContext } from "react";

type propTypes = {
  profile: User;
  setEditPassword: (boolean: boolean) => void;
  setErrorPassword: (string: string) => void;
  errorPassword: string;
  session: any;
};

const ModalUpdatePassword = (props: propTypes) => {
  const {
    profile,
    session,
    setEditPassword,
    setErrorPassword,
    errorPassword,
  } = props;
  const theme = useContext(ThemeContext);

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
          data,
          session.data?.accessToken
        );

        if (result.status === 200) {
          setEditPassword(false);
          setErrorPassword("");
          theme?.setToaster({
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
          required
        />
        <Input
          label="Password Baru"
          type="password"
          name="newPassword"
          className="bg-zinc-100 border"
          required
        />
        <Input
          label="Konfirmasi Password Baru"
          type="password"
          name="newConfirmPassword"
          className="bg-zinc-100 border"
          required
        />
        <p className="text-sm text-red-500">
          {errorPassword ? errorPassword : ""}
        </p>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded w-32 place-self-end"
        >
          Ubah Password
        </Button>
      </form>
    </ModalUpdate>
  );
};

export default ModalUpdatePassword;
