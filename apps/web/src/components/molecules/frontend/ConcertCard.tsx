import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import type { Concert } from '@/payload-types';

type Props = {
    concert: Concert;
    index?: number;
};

const ConcertCard = ({ concert, index }: Props) => {
    // index er 0-baseret: index % 2 === 0 => "even" (her: blå). index % 2 === 1 => "odd" (her: rød)
    const overlayColor =
        typeof index === 'number' ? (index % 2 === 0 ? 'var(--bg-highlight)' : 'var(--bg-red)') : 'var(--bg-highlight)';

    return (
        <div className="flex flex-col md:flex-row md:first:border-t md:first:border-solid md:first:border-base md:first:w-full md:border-b md:border-solid md:border-base w-full">
            {concert?.featuredImage && (
                <div className="relative overflow-hidden aspect-[3/1] w-full border border-solid border-base md:border-none md:aspect-square md:w-[183px] group">
                    <ImageMedia
                        fill
                        alt={concert?.artist || 'Concert Image'}
                        resource={concert?.featuredImage}
                        imgClassName="object-cover w-full h-full filter grayscale"
                        size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                    />
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundColor: overlayColor, opacity: 0.5 }}
                    />{' '}
                </div>
            )}

            <div className="flex flex-col md:flex-row md:pl-m py-m md:items-center w-full justify-between gap-s">
                <div className="flex flex-col gap-1 md:gap-s ">
                    <p>{formatDateTime(concert.date, 'dot')}</p>
                    <div>
                        <h4 className="pb-xs uppercase">{concert.artist}</h4>
                        {concert.support && <p>+ Support: {concert.support}</p>}
                    </div>
                    <p>
                        {concert.venue}, {concert.city}
                    </p>
                </div>
                {concert.ticketLink && (
                    <BaseButton
                        className="h-fit text-nowrap self-center mb-m"
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
