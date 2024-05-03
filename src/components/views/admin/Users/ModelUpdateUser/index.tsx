import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import Select from "@/components/elements/select";
import ModalUpdate from "@/components/fragments/ModalUpdate";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { setUsersData, updatedUser, setUpdatedUser, setToaster } = props;
  const [loading, setLoading] = useState(false);
  const session: any = useSession();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form: any = e.target as HTMLFormElement;
    setLoading(true);
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(
      updatedUser.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setUpdatedUser();
      setLoading(false);
      setToaster({
        variant: "success",
        message: "Berhasil Merubah User",
      });
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setLoading(true);
    }
  }

  return (
    <ModalUpdate
      modalTitle="Update User"
      onClose={() => {
        setUpdatedUser({});
      }}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          defaultValue={updatedUser.username}
          disable
        />
        <Input
          label="Email"
          type="email"
          name="email"
          defaultValue={updatedUser.email}
          disable
        />
        <Input
          label="Nomor Telepon"
          type="number"
          name="phone"
          defaultValue={updatedUser.phone}
          disable
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Admin", value: "admin" },
            { label: "Member", value: "member" },
          ]}
        />
        <Button
          type="submit"
          className="bg-blue-500 rounded-md hover:bg-blue-600 py-1 px-3"
        >
          {loading ? "updating..." : "update"}
        </Button>
      </form>
    </ModalUpdate>
  );
};

export default ModalUpdateUser;
