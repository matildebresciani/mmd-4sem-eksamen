import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatVolunteerRole } from '@/lib/utilities/format-volunteer-role';
import type { Volunteer } from '@/payload-types';

type Props = {
    volunteer?: Volunteer;
};

const VolunteerMain = ({ volunteer }: Props) => {
    const picture = volunteer?.profilePicture;
    const populatedPicture = picture && typeof picture !== 'string' ? picture : null;

    const role = formatVolunteerRole(volunteer);

    return (
        <div>
            {populatedPicture && (
                <div className="relative overflow-hidden w-full h-full aspect-square">
                    <ImageMedia
                        fill
                        alt={volunteer?.volunteerName || 'Author Image'}
                        imgClassName="object-cover w-full h-full"
                        resource={populatedPicture}
                        size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                    />
                </div>
            )}
            <p>{volunteer?.displayName || volunteer?.volunteerName}</p>
            {role && <span>{role}</span>}
            {volunteer?.email && <span>{volunteer?.email}</span>}
        </div>
    );
};

export default VolunteerMain;
