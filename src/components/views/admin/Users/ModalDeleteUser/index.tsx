import Button from "@/components/elements/button";
import { ThemeContext } from "@/components/elements/contextAPI";
import ModalDelete from "@/components/fragments/ModalDelete";
import userServices from "@/services/user";
import { useContext } from "react";

type propTypes = {
  cancelButton: () => void
  setModalDeleted: () => void
  id: string,
  setUsersData: ({}) => void
  session: any
}

const ModalDeleteUser = (props: propTypes) => {
  const theme = useContext(ThemeContext);
  const { cancelButton, setModalDeleted, id, setUsersData, session } = props;

  const handleSubmit = async () => {
    const result = await userServices.deleteUser(id, session.data?.accessToken);
    if (result.status === 200) {
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      setModalDeleted();
      theme?.setToaster({
        variant: "success",
        message: "Berhasil Menghapus User",
      });
    }
  };
  
  return (
    <div>
      <ModalDelete>
        <Button
          type="button"
          onClick={cancelButton}
          className="bg-blue-500 hover:bg-blue-600 rounded-md px-4"
        >
          Batal
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="bg-red-500 hover:bg-red-600 rounded-md px-4"
        >
          Hapus
        </Button>
      </ModalDelete>
    </div>
  );
};

export default ModalDeleteUser;
