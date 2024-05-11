import LandingViews from "@/components/views/landing";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <LandingViews />
    </div>
  );
}
