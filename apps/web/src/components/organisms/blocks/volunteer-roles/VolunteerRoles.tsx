import VolunteerRoleCard from '@/components/molecules/frontend/VolunteerRoleCard';
import type { BC } from '@/lib/types/block-props';
import type { VolunteerRoles as VolunteerRolesProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const VolunteerRolesBlock: BC<VolunteerRolesProps> = ({ block }) => {
    const { heading, roles } = block;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12">
                    <h2>{heading}</h2>
                    {roles.map((role) => (
                        <VolunteerRoleCard
                            key={role.id}
                            thumbnail={typeof role.roleThumbnail === 'string' ? undefined : role.roleThumbnail}
                            title={role?.volunteerRole}
                            description={role?.roleDescription}
                        />
                    ))}
                </div>
            </div>
        </BaseBlock>
    );
};

export default VolunteerRolesBlock;
