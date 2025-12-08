type Props = {
    onClick: () => void;
    label: string;
    active?: boolean;
};

const componentName = ({ onClick, label, active }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-m py-s border border-border-base ${active ? 'bg-button-subtle' : 'bg-bg-base'}`}
        >
            {label}
        </button>
    );
};

export default componentName;
