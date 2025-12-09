import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import type { Concert } from '@/payload-types';

type Props = {
    concert: Concert;
};

const ConcertCard = ({ concert }: Props) => {
    return (
        <div>
            {/* {concert?.featuredImage && (
                <div className="relative overflow-hidden w-full aspect-square">
                    <ImageMedia
                        fill
                        alt={concert?.artist || 'Concert Image'}
                        resource={concert?.featuredImage}
                        imgClassName="object-cover w-full h-full"
                        size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                    />
                </div>
            )} */}

            <div>
                <p>{formatDateTime(concert.date, 'dot')}</p>
                <h3>{concert.artist}</h3>
                {concert.support && <p>+ Support: {concert.support}</p>}
                <p>
                    {concert.venue}, {concert.city}
                </p>
                {concert.ticketLink && <BaseButton title="SE EVENT" type="link" openNewTab href={concert.ticketLink} />}
            </div>
        </div>
    );
};

export default ConcertCard;
