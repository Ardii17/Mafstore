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
      className = "bg-blue-500 hover:bg-blue-600",
      children,
    } = props;
    return (
      <button
        type={type}
        onClick={onClick}
        className={`w-full text-white rounded-lg py-2 ${className}`}
      >
        {children}
      </button>
    );
}