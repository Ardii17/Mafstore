import Button from "@/components/elements/button";
import TD from "@/components/elements/tableData";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModelUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import userServices from "@/services/user";

type types = {
  users: any[];
};

const AdminUsersView = (props: types) => {
  const { users } = props;
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<any>([]);
  const [updatedUser, setUpdatedUser] = useState<any>([]);
  const [deleteUser, setDeleteUser] = useState("");

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className="p-4 w-full">
          <p className="text-xl mb-4">Users Management</p>
          <table className="w-full min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <TD>No</TD>
                <TD>Name</TD>
                <TD>Email</TD>
                <TD>Phone</TD>
                <TD>Role</TD>
                <TD>Action</TD>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: any, index: number) => (
                <tr key={index} className={index % 2 ? "bg-gray-100" : ""}>
                  <TD>{index + 1}</TD>
                  <TD>{user.username}</TD>
                  <TD>{user.email}</TD>
                  <TD>{user.phone}</TD>
                  <TD>{user.role}</TD>
                  <TD>
                    <div className="flex gap-2 items-center justify-center">
                      <Button
                        type="button"
                        onClick={() => setUpdatedUser(user)}
                        className="bg-blue-500 hover:bg-blue-600 px-2 flex items-center rounded"
                      >
                        <i className="bx bxs-edit" />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 px-2 flex items-center rounded"
                      >
                        <i className="bx bxs-trash" />
                      </Button>
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUsersData={setUsersData}
          setUpdatedUser={() => setUpdatedUser({})}
        />
      )}
      {deleteUser && (
        <ModalDeleteUser
          cancelButton={() => setDeleteUser("")}
          setModalDeleted={() => setDeleteUser("")}
          setUsersData={setUsersData}
          id={deleteUser}
        />
      )}
    </>
  );
};

export default AdminUsersView;
