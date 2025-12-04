import type { BC } from '@/lib/types/block-props';
import type { VolunteerRoles as VolunteerRolesProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const VolunteerRolesBlock: BC<VolunteerRolesProps> = ({ block, locale }) => {
    const {} = block;

    return <BaseBlock></BaseBlock>;
};

export default VolunteerRolesBlock;
