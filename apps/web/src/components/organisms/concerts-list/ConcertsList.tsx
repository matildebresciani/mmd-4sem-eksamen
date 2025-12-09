import ConcertCard from '@/components/molecules/frontend/ConcertCard';
import type { Concert } from '@/payload-types';

type Props = {
    concerts: Concert[];
};

const ConcertsList = ({ concerts }: Props) => {
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

    // 3) Render gruppe for gruppe
    return (
        <div className="">
            {Object.entries(groupedByMonth).map(([month, concerts]) => (
                <div key={month} className="oakgrid">
                    <h2 className="col-span-3">{month}</h2>

                    <div className="col-start-4 col-span-9">
                        {concerts.map((concert) => (
                            <ConcertCard key={concert.id} concert={concert} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConcertsList;
