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
        <div className="flex flex-col border border-base text-fg-base bg-bg-base">
            {populatedPicture && (
                <div className="relative overflow-hidden w-full aspect-square max-h-[304px]">
                    <ImageMedia
                        fill
                        fallbackAlt={volunteer?.volunteerName || 'Author Image'}
                        imgClassName="object-cover w-full h-full"
                        resource={populatedPicture}
                        size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                    />
                </div>
            )}
            <div className="p-s flex flex-col hyphens-auto">
                <h5 className="heading-lg uppercase">{volunteer?.displayName || volunteer?.volunteerName}</h5>
                {role && <span className="italic pt-xs body-md">{role}</span>}
                {volunteer?.email && <span className="pt-s body-sm">{volunteer?.email}</span>}
            </div>
        </div>
    );
};

export default VolunteerMain;
