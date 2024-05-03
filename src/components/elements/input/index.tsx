type types = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  disable?: boolean;
  onChange?: any;
};

export default function Input(props: types) {
    const { label, type, name, placeholder, className, defaultValue, disable, onChange } =
      props;
    return (
      <div className="flex flex-col w-full gap-1">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`py-2 px-3 rounded-lg ${className}`}
          value={defaultValue}
          disabled={disable}
          onChange={onChange}
        />
      </div>
    );
}