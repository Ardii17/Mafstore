type types = {
    type: "submit" | "button" | "reset" | undefined;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

export default function Button(props: types) {
    const {
      type,
      onClick,
      className = "bg-blue-500 hover:bg-blue-600 rounded-lg w-full",
      children,
    } = props;
    return (
      <button
        type={type}
        onClick={onClick}
        className={`text-white py-2 ${className}`}
      >
        {children}
      </button>
    );
}