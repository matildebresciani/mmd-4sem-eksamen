import DynamicButton from '@/components/atoms/frontend/buttons/DynamicButton';
import VolunteerCard from '@/components/molecules/frontend/volunteer-cards/VolunteerCard';
import type { BC } from '@/lib/types/block-props';
import type { VolunteersTeam as VolunteersTeamProps } from '@/payload-types';
import { Divide } from 'lucide-react';
import BaseBlock from '../base-block/BaseBlock';

const VolunteersTeamBlock: BC<VolunteersTeamProps> = ({ block, locale }) => {
    const { volunteersTeam, addLink, footerText, link } = block;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12">
                    <div>
                        {volunteersTeam?.map((volunteer) => {
                            if (typeof volunteer === 'string') return null;
                            return <VolunteerCard key={volunteer.id} volunteer={volunteer} variant="small" />;
                        })}
                    </div>
                    {addLink && link && (
                        <div>
                            {footerText && <p>{footerText}</p>}
                            <DynamicButton link={link} />
                        </div>
                    )}
                </div>
            </div>
        </BaseBlock>
    );
};

export default VolunteersTeamBlock;
