import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { Media } from '@/payload-types';

type Props = {
    thumbnail?: Media | null | undefined;
    title: string | null | undefined;
    description: string | null | undefined;
};

const VolunteerRoleCard = ({ thumbnail, title, description }: Props) => {
    return (
        <div>
            {thumbnail && typeof thumbnail !== 'string' && (
                <ImageMedia
                    resource={thumbnail}
                    alt={thumbnail?.alt || 'Volunteer Role Thumbnail'}
                    size="(min-width: 1281px) 33vw, (min-width: 769px) 50vw, 100vw"
                />
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default VolunteerRoleCard;
