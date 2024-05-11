import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import MemberLayout from "@/components/layouts/MemberLayout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalUpdatePassword from "./ModalUpdatePassword";
import ModalUpdateProfile from "./ModalUpdateProfile";
import AvatarProfile from "./Avatar";
import { User } from "@/types";

type propTypes = {
  profile: User;
  setProfile: Dispatch<SetStateAction<User>>;
  session: any;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const MemberProfileView = (props: propTypes) => {
  const { profile, setProfile, session, setToaster } = props;
  const [profileData, setProfileData] = useState({ ...profile });
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  return (
    <>
      <MemberLayout>
        <div className="flex gap-4 mt-4">
          <AvatarProfile
            profile={profile}
            setProfile={setProfile}
            profileData={profileData}
            session={session}
            setToaster={setToaster}
          />
          <div className="w-[75%] shadow rounded-md p-4">
            <p className="place-self-start text-xl mb-2">Profile</p>
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                type="text"
                defaultValue={profileData.username}
                name="username"
                disable={true}
                className="bg-zinc-100"
              />
              <Input
                label="Email"
                type="email"
                defaultValue={profileData.email}
                name="email"
                disable={true}
                className="bg-zinc-100"
              />
              <Input
                label="Telephone"
                type="number"
                defaultValue={profileData.phone}
                name="phone"
                className="bg-zinc-100"
                disable={true}
              />
              <Input
                label="Role"
                type="text"
                defaultValue={profileData.role}
                name="role"
                className="bg-zinc-100"
                disable={true}
              />
              <Input
                label="Password"
                type="password"
                defaultValue={profileData.password?.slice(0, 16)}
                name="password"
                className="bg-zinc-100"
                disable={true}
              />
              <div className="flex gap-4 place-content-end">
                <Button
                  type="button"
                  onClick={() => setEditPassword(true)}
                  disable={profileData.type === "google"}
                  className={`${
                    profileData.type === "google"
                      ? "opacity-70"
                      : "hover:bg-blue-600 "
                  } bg-blue-500 rounded w-40`}
                >
                  Ubah Password
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditProfile(true)}
                  className="bg-blue-500 hover:bg-blue-600 rounded w-40"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MemberLayout>
      {editPassword && (
        <ModalUpdatePassword
          profile={profileData}
          session={session}
          setEditPassword={setEditPassword}
          setErrorPassword={setErrorPassword}
          errorPassword={errorPassword}
          setToaster={setToaster}
        />
      )}
      {editProfile && (
        <ModalUpdateProfile
          profile={profileData}
          setProfileData={setProfileData}
          session={session}
          setEditProfile={setEditProfile}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default MemberProfileView;
