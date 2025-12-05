import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { Volunteer } from '@/payload-types';

type Props = {
    author: Volunteer | string | null | undefined;
};

const AuthorCard = ({ author }: Props) => {
    if (!author || typeof author === 'string') {
        return null;
    }
    return (
        <div className="p-m flex gap-s border w-full md:w-fit md:py-spacing-m md:px-section-xs justify-center">
            {author.profilePicture && (
                <div
                    style={{ width: '112px', height: '95px', position: 'relative' }}
                    className="overflow-hidden aspect-square"
                >
                    <ImageMedia
                        fill
                        alt={author?.name || 'Author Image'}
                        imgClassName="object-cover"
                        resource={author.profilePicture}
                    />
                </div>
            )}
            <div className="flex flex-col items-left justify-center gap-xs">
                <span>{author.name}</span>
                {author.email && <span>{author.email}</span>}
            </div>
        </div>
    );
};

export default AuthorCard;
