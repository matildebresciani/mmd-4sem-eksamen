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
        <div className="p-m flex gap-s border w-full md:w-fit">
            {author.profilePicture && (
                <div className="relative overflow-hidden w-full h-full aspect-square">
                    <ImageMedia
                        fill
                        alt={author?.name || 'Author Image'}
                        imgClassName="object-cover w-full h-full"
                        resource={author.profilePicture}
                        size="100px"
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
