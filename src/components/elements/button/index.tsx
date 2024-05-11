type propTypes = {
  type: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disable?: boolean;
};

export default function Button(props: propTypes) {
  const {
    type,
    onClick,
    className = "bg-blue-700 hover:bg-blue-800 rounded-lg w-full",
    children,
    disable,
  } = props;
  return (
    <button
      type={type}
      disabled={disable}
      onClick={onClick}
      className={`text-white py-2 ${className}`}
    >
      {children}
    </button>
  );
}
