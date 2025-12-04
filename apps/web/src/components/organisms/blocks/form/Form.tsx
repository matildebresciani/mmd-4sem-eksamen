// import { getCachedEntryById } from '@/lib/data/payload/get-cached-entry-by-id';
// import type { BC } from '@/lib/types/block-props';
// import { cn } from '@/lib/utilities/ui';
// import type { Form as FormProps } from '@/payload-types';
// import BaseBlock from '../base-block/BaseBlock';
// import FormClient from './Form.client';

// const FormBlock: BC<FormProps> = async ({ block, locale }) => {
//     const { layout, heading, description, form } = block;

//     const dynamicForm = await getCachedEntryById({
//         collection: 'dynamic-forms',
//         id: typeof form === 'string' ? form : form?.id,
//         locale,
//     });

//     //TODO: Style variabler på form fields skal nok opdateres (farver, padding, border-radius etc.)

//     return (
//         <BaseBlock>
//             <div className="oakgrid">
//                 <div
//                     className={cn(
//                         layout === 'one-column' && 'col-span-12 mb-4',
//                         layout === 'two-columns' && 'col-span-12 md:col-span-5',
//                     )}
//                 >
//                     {description && <p>{description}</p>}
//                 </div>
//                 {dynamicForm && <FormClient form={dynamicForm} />}
//             </div>
//         </BaseBlock>
//     );
// };

// export default FormBlock;
