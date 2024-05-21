import AdminUsersView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { useEffect, useState } from "react";


const AdminUsersPage = () => {
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
      <AdminUsersView users={users} />
    </>
  );
};

export default AdminUsersPage;
