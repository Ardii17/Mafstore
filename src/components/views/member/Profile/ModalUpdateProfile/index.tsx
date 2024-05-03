import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import ModalUpdate from "@/components/fragments/ModalUpdate";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

type types = {
  profile: any;
  setEditProfile: any;
  session: any;
  setProfileData: any;
  setToaster: any;
};

const ModalUpdateProfile = (props: types) => {
  const { profile, setEditProfile, session, setProfileData, setToaster } =
    props;
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  const handleEditProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username,
      email,
      phone,
    };

    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setEditProfile(false);
      const { data } = await userServices.getProfile(session.data?.accessToken);
      setProfileData(data.data);
      setToaster({
        variant: "success",
        message: "Berhasil Merubah Profile",
      });
    }
  };
  return (
    <ModalUpdate
      modalTitle="Update Profile"
      onClose={() => setEditProfile(false)}
    >
      <form className="flex flex-col gap-4" onSubmit={handleEditProfile}>
        <Input
          label="Username"
          type="text"
          name="username"
          defaultValue={username}
          className="bg-zinc-100 border"
          onChange={(e: any) => setUsername(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          defaultValue={email}
          className="bg-zinc-100 border"
          onChange={(e: any) => setEmail(e.target.value)}
          disable
        />
        <Input
          label="Telephone"
          type="number"
          name="phone"
          defaultValue={phone}
          className="bg-zinc-100 border"
          onChange={(e: any) => setPhone(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={() => setEditProfile(false)}
            className="bg-blue-500 hover:bg-blue-600 rounded-md w-32 place-self-end"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disable={
              username !== profile.username || phone !== profile.phone
                ? false
                : true
            }
            className="bg-blue-500 hover:bg-blue-600 rounded-md w-32 place-self-end"
          >
            Ubah Profile
          </Button>
        </div>
      </form>
    </ModalUpdate>
  );
};

export default ModalUpdateProfile;
