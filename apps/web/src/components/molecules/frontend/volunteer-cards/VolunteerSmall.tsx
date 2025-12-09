import { formatVolunteerRole } from '@/lib/utilities/format-volunteer-role';
import type { Volunteer } from '@/payload-types';

type Props = {
    volunteer?: Volunteer;
};

const VolunteerSmall = ({ volunteer }: Props) => {
    const role = formatVolunteerRole(volunteer);

    return (
        <div className="pt-m">
            <h5 className="text-heading-sm uppercase pb-xs pl-xs">
                {volunteer?.displayName || volunteer?.volunteerName}
            </h5>
            {role && <span className="italic pl-xs">{role}</span>}
            <span className="block border-b border-solid border-base w-full pt-s pb-s" />
        </div>
    );
};

export default VolunteerSmall;
