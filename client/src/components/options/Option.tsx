import type { OptionProps } from "../../types/vite-env";

const Option = ({
  label,
  isAvailable,
  onClick,
  className,
  title,
  progress,
  progressClassName,
}: OptionProps) => {
  return (
    <li>
      <button
        type="button"
        className={className}
        onClick={onClick}
        disabled={!isAvailable}
        title={title}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <span style={{ position: "relative", zIndex: 2 }}>{label}</span>
        {progress !== undefined && progress > 0 && (
          <div
            className={progressClassName || "progress-bar"}
            style={{ width: `${progress}%` }}
          />
        )}
      </button>
    </li>
  );
};

export default Option;
