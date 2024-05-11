import AdminUsersView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const AdminUsersPage = (props: propTypes) => {
  const { setToaster } = props;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAlluser = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAlluser();
  }, []);

  return (
    <>
      <AdminUsersView users={users} setToaster={setToaster} />
    </>
  );
};

export default AdminUsersPage;
