import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import type { Concert } from '@/payload-types';

type Props = {
    concert: Concert;
};

const ConcertCard = ({ concert }: Props) => {
    return (
        <div className="flex first:border-t first:border-solid first:border-base first:w-full border-b border-solid border-base w-full">
            {concert?.featuredImage && (
                <div className="relative overflow-hidden aspect-square w-[183px]">
                    <ImageMedia
                        fill
                        alt={concert?.artist || 'Concert Image'}
                        resource={concert?.featuredImage}
                        imgClassName="object-cover w-full h-full"
                        size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                    />
                </div>
            )}

            <div className="flex pl-m py-m items-center w-full justify-between gap-s">
                <div className="flex flex-col gap-s">
                    <p>{formatDateTime(concert.date, 'dot')}</p>
                    <div>
                        <h3 className="pb-xs">{concert.artist}</h3>
                        {concert.support && <p>+ Support: {concert.support}</p>}
                    </div>
                    <p>
                        {concert.venue}, {concert.city}
                    </p>
                </div>
                {concert.ticketLink && (
                    <BaseButton
                        className="h-fit text-nowrap"
                        variant="secondary"
                        title="SE EVENT"
                        type="link"
                        openNewTab
                        href={concert.ticketLink}
                    />
                )}
            </div>
        </div>
    );
};

export default ConcertCard;
