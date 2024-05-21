import AdminLayout from "@/components/layouts/AdminLayout";
import { useRouter } from "next/router";

const AdminDashboardView = () => {
  const { push } = useRouter();

  return (
    <>
      <AdminLayout>
        <div className="p-4">
          <div className="flex gap-2 mb-2 items-center">
            <button onClick={() => push("/")}>
              <i className="bx bx-left-arrow-alt py-1 px-2 rounded bg-blue-700 text-white text-2xl" />
            </button>
            <p className="text-lg bg-blue-700 py-[6px] px-4 rounded text-white">
              Dashboard
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardView;
