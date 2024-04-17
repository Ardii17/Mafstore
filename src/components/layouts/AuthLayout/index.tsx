import Link from "next/link";

type types = {
  title: string;
  link: string;
  linkText: string;
  children: React.ReactNode;
};

const AuthLayout = (props: types) => {
  const { title, link, linkText, children } = props;
  return (
    <div className="w-full h-screen px-20 flex items-center justify-center gap-20 bg-slate-200">
      <img src="../../Random/BackgroundAuth.png" className="h-96" />
      <div className="w-2/5 border-2 border-white shadow-lg rounded-xl h-auto p-4 flex items-center flex-col gap-3">
        <p className="text-2xl">{title}</p>
        {children}
        <span className="flex gap-2 w-full">
          <p>
            {linkText}
            <Link href={link} className="text-blue-700">
              Disini
            </Link>
          </p>
        </span>
      </div>
    </div>
  );
};

export default AuthLayout;
