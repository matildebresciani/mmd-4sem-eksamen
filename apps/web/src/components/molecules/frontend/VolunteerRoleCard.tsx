import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { Media } from '@/payload-types';

type Props = {
    thumbnail?: Media | null | undefined;
    title: string | null | undefined;
    description: string | null | undefined;
};

const VolunteerRoleCard = ({ thumbnail, title, description }: Props) => {
    return (
        <div className="flex flex-col md:flex-row border border-solid border-base max-w-[590px]">
            {thumbnail && typeof thumbnail !== 'string' && (
                <ImageMedia
                    resource={thumbnail}
                    alt={thumbnail?.alt || 'Volunteer Role Thumbnail'}
                    size="(min-width: 1281px) 33vw, (min-width: 769px) 50vw, 100vw"
                    imgClassName="w-full h-full object-cover md:max-w-[285px] lg:w-[50%]"
                />
            )}
            <div className="flex flex-col p-s gap-s border-l border-solid border-base md:max-w-[305px]">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default VolunteerRoleCard;
