interface OptionProps {
	label: string;
	isAvailable: boolean;
	onClick: () => void;
	className: string;
}

const Option = ({ label, isAvailable, onClick, className }: OptionProps) => {
	return (
		<li>
			<button
				type="button"
				className={className}
				onClick={onClick}
				disabled={!isAvailable}
			>
				{label}
			</button>
		</li>
	);
};

export default Option;
