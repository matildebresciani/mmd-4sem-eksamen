import ConcertCard from '@/components/molecules/frontend/ConcertCard';
import type { Concert } from '@/payload-types';

type Props = {
    concerts: Concert[];
    className?: string;
};

const ConcertsList = ({ concerts, className }: Props) => {
    // 1) Filtrer til kun fremtidige koncerter
    // const now = new Date();
    // const upcoming = concerts.filter((c) => new Date(c.date) >= now);

    // MIDlertidig: inkluder ALLE koncerter
    const upcoming = concerts;

    // 2) Gruppér efter måned
    const groupedByMonth = upcoming.reduce((acc: Record<string, Concert[]>, concert) => {
        const date = new Date(concert.date);

        const monthName = date.toLocaleDateString('da-DK', {
            month: 'long',
            year: 'numeric',
        });

        if (!acc[monthName]) acc[monthName] = [];
        acc[monthName].push(concert);

        return acc;
    }, {});

    // Global tæller på tværs af grupper
    let globalIndex = 0;

    // 3) Render gruppe for gruppe
    return (
        <div className={className}>
            {Object.entries(groupedByMonth).map(([month, concerts]) => (
                <div key={month} className="oakgrid">
                    <h3 className="col-span-12 md:col-span-3 text-center uppercase md:text-start mb-section-xs md:mb-0 w-fit">
                        {month}
                    </h3>

                    <div className="col-span-12 md:col-start-5 md:col-span-8 w-full gap-y-m">
                        {concerts.map((concert) => {
                            const idx = globalIndex++;
                            return <ConcertCard key={concert.id} concert={concert} index={idx} />;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConcertsList;
