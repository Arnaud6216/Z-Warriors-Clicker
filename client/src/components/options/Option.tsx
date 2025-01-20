interface OptionProps {
  label: string;
  isAvailable: boolean;
  onClick: () => void;
  className: string;
  title: string;
}

const Option = ({
  label,
  isAvailable,
  onClick,
  className,
  title,
}: OptionProps) => {
  return (
    <li>
      <button
        type="button"
        className={className}
        onClick={onClick}
        disabled={!isAvailable}
        title={title}
      >
        {label}
      </button>
    </li>
  );
};

export default Option;
