import { child } from "firebase/database";

type types = {
  children: React.ReactNode;
  className?: string;
};

const TD = (props: types) => {
  const { children, className } = props;
  return <td className={`text-center py-1 ${className}`}>{children}</td>;
};

export default TD;
