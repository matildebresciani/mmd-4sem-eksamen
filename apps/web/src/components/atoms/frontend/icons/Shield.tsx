type Props = {
    className?: string;
};

const Shield = ({ className }: Props) => {
    return (
        <svg
            className={className}
            role="img"
            aria-label="shield"
            width="20"
            height="25"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.64594 16.5834L15.75 9.47937L14.2812 8.03125L8.70844 13.6044L5.72906 10.625L4.21875 12.1356L8.64594 16.5834ZM10 25C7.09021 24.2708 4.69615 22.5885 2.81781 19.9531C0.939271 17.3177 0 14.4167 0 11.25V3.75L10 0L20 3.75V11.25C20 14.4167 19.0607 17.3177 17.1822 19.9531C15.3039 22.5885 12.9098 24.2708 10 25Z"
                fill="#1C1B1F"
                fillOpacity="0.3"
            />
        </svg>
    );
};

export default Shield;
