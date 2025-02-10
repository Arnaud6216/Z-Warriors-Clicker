import type { OptionProps } from "../../types/vite-env";

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
