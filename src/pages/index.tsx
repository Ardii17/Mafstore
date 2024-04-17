import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <p>Hai</p>
      <button type="button" onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
        Logout
      </button>
    </div>
  );
}
