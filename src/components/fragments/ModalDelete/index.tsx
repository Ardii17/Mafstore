import Button from "@/components/elements/button";

const ModalDelete = (props: { children : React.ReactNode}) => {
    const { children } = props;
  return (
    <div
      className="flex w-screen h-screen z-50 fixed items-center justify-center top-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="w-1/4 h-auto bg-white p-4 rounded">
        <p className="text-xl mb-4">Delete User</p>
        <p className="mb-4">Apakah kamu yakin ingin menghapus pengguna ini?</p>
        <div className="flex gap-4 justify-end">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
