type propTypes = {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  disable?: boolean;
  onChange?: any;
  required?: boolean;
};

export default function Input(props: propTypes) {
  const {
    label,
    type,
    name,
    placeholder,
    className,
    defaultValue,
    disable,
    onChange,
    required,
  } = props;
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`py-2 px-3 ${className} rounded-lg`}
        defaultValue={defaultValue}
        disabled={disable}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
