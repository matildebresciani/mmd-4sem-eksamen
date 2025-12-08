import type { Volunteer } from '@/payload-types';

type Props = {
    volunteer?: Volunteer;
};

const VolunteerSmall = ({ volunteer }: Props) => {
    return (
        <div>
            <p>{volunteer?.displayName || volunteer?.volunteerName}</p>
            {volunteer?.volunteerRole && <span>{volunteer?.volunteerRole}</span>}
        </div>
    );
};

export default VolunteerSmall;
