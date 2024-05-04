import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import ModalUpdate from "@/components/fragments/ModalUpdate";
import userServices from "@/services/user";
import { User } from "@/types";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

type types = {
  profile: User;
  setEditProfile: (boolean: boolean) => void;
  setProfileData: ({}) => void;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
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
          onChange={(e: ChangeEvent<HTMLFormElement>) =>
            setUsername(e.target.value)
          }
        />
        <Input
          label="Email"
          type="email"
          name="email"
          defaultValue={email}
          className="bg-zinc-100 border"
          onChange={(e: ChangeEvent<HTMLFormElement>) =>
            setEmail(e.target.value)
          }
          disable
        />
        <Input
          label="Telephone"
          type="number"
          name="phone"
          defaultValue={phone}
          className="bg-zinc-100 border"
          onChange={(e: ChangeEvent<HTMLFormElement>) =>
            setPhone(e.target.value)
          }
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
            className={`${
              username !== profile.username || phone !== profile.phone
                ? "hover:bg-blue-600"
                : "opacity-70 cursor-default"
            } bg-blue-500 rounded-md w-32 place-self-end`}
          >
            Ubah Profile
          </Button>
        </div>
      </form>
    </ModalUpdate>
  );
};

export default ModalUpdateProfile;
