import { formatVolunteerRole } from '@/lib/utilities/format-volunteer-role';
import type { Volunteer } from '@/payload-types';

type Props = {
    volunteer?: Volunteer;
};

const VolunteerSmall = ({ volunteer }: Props) => {
    const role = formatVolunteerRole(volunteer);

    return (
        <div>
            <p>{volunteer?.displayName || volunteer?.volunteerName}</p>
            {role && <span>{role}</span>}
        </div>
    );
};

export default VolunteerSmall;
