import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import { uploadImage } from "@/lib/firebase/services";
import userServices from "@/services/user";
import { User } from "@/types";
import Image from "next/image";
import { FormEvent, useContext, useState } from "react";

type propTypes = {
  profileData: User;
  setProfile: ({}) => void;
  profile: User;
  session: any;
};

const AvatarProfile = (props: propTypes) => {
  const theme = useContext(ThemeContext);
  const { profileData, session, setProfile, profile } = props;
  const [changeImage, setChangeImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const handleSubmitPicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const file = form.picture?.files[0];
    const nameFile = "profile." + file.name.split(".")[1];
    setLoading(true);
    if (file) {
      uploadImage(
        profileData.id,
        nameFile,
        "users",
        file,
        async (status: boolean, pictureUrl: string) => {
          const data = {
            image: pictureUrl,
          };

          if (status) {
            const result = await userServices.updateProfile(
              data,
              session.data?.accessToken
            );

            if (result.status === 200) {
              setProfile({ ...profile, image: pictureUrl });
              setLoading(false);
              theme?.setToaster({
                variant: "success",
                message: "Berhasil Merubah Avatar",
              });
            } else {
              setLoading(true);
              theme?.setToaster({
                variant: "failed",
                message: "Gagal Merubah Avatar",
              });
            }
          } else {
            setLoading(true);
          }
        }
      );
      setChangeImage(file);
    }
    setChangeImage(undefined);
  };

  return (
    <div className="w-[25%] shadow h-auto rounded-md p-4 flex flex-col gap-4 items-center">
      <p className="place-self-start text-xl mb-2">Avatar</p>
      {profileData.image ? (
        <Image
          src={profileData.image}
          alt="image"
          width={200}
          height={200}
          className="rounded-full max-h-[200px] max-w-[200px] object-cover"
        />
      ) : (
        <p className="text-3xl px-16 py-14 bg-zinc-400 rounded-full">
          {profileData.username?.slice(0, 1)}
        </p>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleSubmitPicture}>
        <div className="bg-zinc-200 p-2 rounded">
          <label
            htmlFor="picture"
            className="text-sm cursor-pointer text-center"
          >
            {changeImage ? (
              <p>{changeImage.name}</p>
            ) : (
              <p>Upload a new image, Larger will be resized automaticaly</p>
            )}
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            className="hidden"
            onChange={(e: any) => {
              e.preventDefault();
              setChangeImage(e.currentTarget.files[0]);
            }}
          />
        </div>
        <Button
          type="submit"
          disable={changeImage ? false : true}
          className={`${
            changeImage ? "hover:bg-blue-600" : "opacity-70 cursor-default"
          } bg-blue-500 rounded px-3`}
        >
          {loading ? "Uploading..." : "Change Image"}
        </Button>
      </form>
    </div>
  );
};

export default AvatarProfile;
