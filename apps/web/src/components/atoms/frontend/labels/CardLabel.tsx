type Props = {
    label: string | null | undefined;
};

const CardLabel = ({ label }: Props) => {
    return (
        //TODO: Baggrundsfarve baseret på artikel type
        <div className="p-xs text-fg-on-color bg-bg-red flex items-center">
            <span className="label-text uppercase">{label}</span>
        </div>
    );
};

export default CardLabel;
