import { child } from "firebase/database";

type propTypes = {
  children: React.ReactNode;
  className?: string;
  rowspan?: number;
  colspan?: number;
};

const TD = (props: propTypes) => {
  const { children, className, rowspan, colspan } = props;
  return (
    <td
      className={`text-center py-1 ${className}`}
      rowSpan={rowspan}
      colSpan={colspan}
    >
      {children}
    </td>
  );
};

export default TD;
