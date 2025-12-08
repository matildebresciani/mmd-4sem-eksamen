import VolunteerCard from '@/components/molecules/frontend/volunteer-cards/VolunteerCard';
import type { BC } from '@/lib/types/block-props';
import type { MainTeam as MainTeamProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const MainTeamBlock: BC<MainTeamProps> = ({ block, locale }) => {
    const { heading, mainVolunteers } = block;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12">
                    {heading && <h2 className="">{heading}</h2>}
                    <div>
                        {mainVolunteers?.map((volunteer) => {
                            if (typeof volunteer === 'string') return null;
                            return <VolunteerCard key={volunteer.id} volunteer={volunteer} />;
                        })}
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default MainTeamBlock;
