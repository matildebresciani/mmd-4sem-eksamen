import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { Volunteer } from '@/payload-types';

type Props = {
    author: Volunteer | string | null | undefined;
};

const AuthorCard = ({ author }: Props) => {
    if (!author || typeof author === 'string') {
        return null;
    }

    const picture = author.profilePicture;
    const populatedPicture = picture && typeof picture !== 'string' ? picture : null;

    return (
        <div className="p-m flex gap-s border w-full md:w-fit">
            {populatedPicture && (
                <div className="relative overflow-hidden w-full h-full aspect-square">
                    <ImageMedia
                        fill
                        fallbackAlt={author?.volunteerName || 'Author Image'}
                        imgClassName="object-cover w-full h-full"
                        resource={populatedPicture}
                        size="75px"
                    />
                </div>
            )}
            <div className="flex flex-col items-left justify-center gap-xs">
                <span>{author.volunteerName}</span>
                {author.email && <span>{author.email}</span>}
            </div>
        </div>
    );
};

export default AuthorCard;
