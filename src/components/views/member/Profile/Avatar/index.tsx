import Button from "@/components/elements/button";
import { uploadImage } from "@/lib/firebase/services";
import userServices from "@/services/user";
import Image from "next/image";
import { useState } from "react";

type types = {
  profileData: any;
  session: any;
  setProfile: any;
  profile: any;
  setToaster: any;
};

const AvatarProfile = (props: types) => {
  const { profileData, session, setProfile, profile, setToaster } = props;
  const [changeImage, setChangeImage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const handleSubmitPicture = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    setLoading(true);
    if (file) {
      uploadImage(
        profileData.id,
        file,
        async (status: boolean, pictureUrl: string) => {
          const data = {
            image: pictureUrl,
          };

          if (status) {
            const result = await userServices.updateProfile(
              profileData.id,
              data,
              session.data?.accessToken
            );

            if (result.status === 200) {
              setProfile({ ...profile, image: pictureUrl });
              setLoading(false);
              setToaster({
                variant: "success",
                message: "Berhasil Merubah Avatar",
              });
            } else {
              setLoading(true);
              setToaster({
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
    setChangeImage(null);
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
          className="rounded-full"
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
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer rounded px-3"
        >
          {loading ? "Uploading..." : "Change Image"}
        </Button>
      </form>
    </div>
  );
};

export default AvatarProfile;
