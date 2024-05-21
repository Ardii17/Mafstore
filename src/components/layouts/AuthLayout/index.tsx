import Link from "next/link";

type propTypes = {
  title: string;
  link: string;
  linkText: string;
  children: React.ReactNode;
};

const AuthLayout = (props: propTypes) => {
  const { title, link, linkText, children } = props;
  return (
    <div className="w-full h-screen px-20 max-sm:px-4 max-md:px-48 flex items-center justify-center gap-20 bg-slate-200">
      <img src="../../Random/BackgroundAuth.png" className="h-96 md:hidden max-sm:hidden" />
      <div className="w-2/5 md:w-full max-sm:w-full border-2 border-white shadow-lg rounded-xl h-auto p-4 flex items-center flex-col gap-3">
        <p className="text-2xl mb-8">{title}</p>
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
