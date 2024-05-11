import MemberProfileView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const MemberProfilePage = (props: propTypes) => {
  const { setToaster } = props;
  const [profile, setProfile] = useState({});
  const session: any = useSession();
  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);

  return (
    <>
      <MemberProfileView
        profile={profile}
        setProfile={setProfile}
        session={session}
        setToaster={setToaster}
      />
    </>
  );
};

export default MemberProfilePage;
