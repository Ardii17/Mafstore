import MemberLayout from "@/components/layouts/MemberLayout";
import { useRouter } from "next/router";

const MemberDashboardView = () => {
  const { push } = useRouter();

  return (
    <>
      <MemberLayout>
        <div className="flex gap-2 mb-2 items-center">
          <button onClick={() => push("/")}>
            <i className="bx bx-left-arrow-alt py-1 px-2 rounded bg-blue-700 text-white text-2xl" />
          </button>
          <p className="text-lg bg-blue-700 py-[6px] px-4 rounded text-white">
            Dashboard
          </p>
        </div>
      </MemberLayout>
    </>
  );
};

export default MemberDashboardView;
