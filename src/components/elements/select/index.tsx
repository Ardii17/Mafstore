type option = {
  label: string;
  value: string;
};

type propTypes = {
  label?: string;
  name: string;
  className?: string;
  defaultValue?: string;
  disable?: boolean;
  options: option[];
};

const Select = (props: propTypes) => {
  const { label, name, className, defaultValue, disable, options } = props;
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disable}
        className="py-2 px-3 rounded-md bg-gray-100"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
