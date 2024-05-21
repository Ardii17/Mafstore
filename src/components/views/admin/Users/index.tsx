import Button from "@/components/elements/button";
import TD from "@/components/elements/tableData";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useContext, useEffect, useState } from "react";
import ModalUpdateUser from "./ModelUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { useSession } from "next-auth/react";
import { User } from "@/types";
import { ThemeContext } from "@/components/elements/contextAPI";
import { useRouter } from "next/router";

type propTypes = {
  users: User[];
};

const AdminUsersView = (props: propTypes) => {
  const theme = useContext(ThemeContext);
  const { users } = props;
  const { push } = useRouter();
  const [usersData, setUsersData] = useState<any>([]);
  const [updatedUser, setUpdatedUser] = useState<any>([]);
  const [deleteUser, setDeleteUser] = useState("");
  const [searched, setSearched] = useState("");
  const session: any = useSession();

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  useEffect(() => {
    if (searched) {
      const newProducts = usersData.filter((user: any) =>
        user.username.toLowerCase().includes(searched.toLowerCase())
      );
      setUsersData(newProducts);
    } else {
      setUsersData(users);
    }
  }, [searched]);

  return (
    <>
      <AdminLayout>
        <div className="p-4 w-full">
          <div className="flex gap-2 mb-2 items-center">
            <button onClick={() => push("/")}>
              <i className="bx bx-left-arrow-alt py-1 px-2 rounded bg-blue-700 text-white text-2xl" />
            </button>
            <p className="text-lg bg-blue-700 py-[6px] px-4 rounded text-white">
              Products Management
            </p>
          </div>
          <div className="relative mb-4 float-end">
            <i className="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-xl" />
            <input
              type="text"
              name="search"
              placeholder="Search user"
              className="bg-gray-200 rounded-full py-2 ps-12 pe-4"
              onChange={(e: any) => setSearched(e.target.value)}
            />
          </div>
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
                        className="bg-blue-700 hover:bg-blue-800 px-2 flex items-center rounded"
                      >
                        <i className="bx bxs-edit" />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setDeleteUser(user.id)}
                        className="bg-red-600 hover:bg-red-700 px-2 flex items-center rounded"
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
          session={session}
        />
      )}
      {deleteUser && (
        <ModalDeleteUser
          cancelButton={() => setDeleteUser("")}
          setModalDeleted={() => setDeleteUser("")}
          setUsersData={setUsersData}
          id={deleteUser}
          session={session}
        />
      )}
    </>
  );
};

export default AdminUsersView;
