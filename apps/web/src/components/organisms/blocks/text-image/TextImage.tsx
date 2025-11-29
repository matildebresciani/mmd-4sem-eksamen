
import DynamicButton from '@/components/atoms/frontend/buttons/DynamicButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import RichText from '@/components/molecules/admin/RichText';
import type { BC } from '@/lib/types/block-props';
import { cn } from '@/lib/utilities/ui';
import type { TextImage as TextImageProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';
import React from 'react';


const TextImageBlock: BC<TextImageProps> = ({ block, locale }) => {
  const { order, image, richText, addLink, link, addBgColor, heading, mode } = block;

  return (
    <BaseBlock className={cn(addBgColor && 'bg-bg-highlight text-white')}>
      <div className="oakgrid py-[var(--padding-m)] gap-[3rem] md:py-[var(--padding-l)] lg:py-[var(--padding-xl)]">
        <div
          className={cn(
            'col-span-12 relative min-h-[400px] lg:sticky top-6 lg:col-span-6 xl:col-span-5',
            order === 'image-right' && 'xl:col-start-8',
          )}
        >
            
        {mode === 'addImageSingle' && (
          <div className="w-full lg:absolute lg:h-auto">
            <div className="relative w-full h-full overflow-hidden">
              <span className="absolute inset-0 halftone pointer-events-none z-10" aria-hidden="true" />
              <span className="absolute inset-0 overlay_black pointer-events-none z-20" aria-hidden="true" />

              <ImageMedia
                resource={image}
                className="absolute inset-0 w-full h-full object-cover z-0"
                imgClassName="w-full h-full object-cover"
              />
            </div>
          </div>)}

        
        {mode === 'addImageDuplication' && (
        <div>
          <div className="absolute bottom-10 top-0 left-0 lg:bottom-[unset] lg:h-auto w-[85%] z-0">
            <div className="relative w-full h-full overflow-hidden">
              <span className="absolute inset-0 halftone pointer-events-none z-10" aria-hidden="true" />
              <span className="absolute inset-0 overlay_red pointer-events-none z-20" aria-hidden="true" />
              <ImageMedia
                resource={image}
                className="absolute inset-0 w-full h-full object-cover z-0"
                imgClassName="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="absolute bottom-0 top-10 right-0 lg:bottom-[unset] lg:h-auto w-[85%] z-1">
            <div className="relative w-full h-full overflow-hidden">
              <span className="absolute inset-0 halftone pointer-events-none z-10" aria-hidden="true" />
              <span className="absolute inset-0 overlay_black pointer-events-none z-20" aria-hidden="true" />

              <ImageMedia
                resource={image}
                className="absolute inset-0 w-full h-full object-cover z-0"
                imgClassName="w-full h-full object-cover"
              />
            </div>
          </div>
          </div>)}

        {mode === 'addCard' && (
          <div className="lg:absolute lg:place-self-end">
                Insert article here
          </div>)}

        </div>

        <div
          className={cn(
            'col-span-12 lg:col-span-6',
            order === 'image-right' && 'lg:order-first',
            order === 'image-left' && 'xl:col-start-7 xl:col-span-5',
          )}
        >
          {heading && <h3 className="uppercase">{heading}</h3>}
          {richText && <RichText data={richText} className='mx-0'/>}
          {addLink && <DynamicButton link={link} locale={locale} className="md:mt-10" />}
        </div>
      </div>
    </BaseBlock>
  );
};

export default TextImageBlock;
