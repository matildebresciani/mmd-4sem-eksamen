import DynamicButton from '@/components/atoms/frontend/buttons/DynamicButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { BC } from '@/lib/types/block-props';
import { cn } from '@/lib/utilities/ui';
import type { TextImage as TextImageProps } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import React from 'react';
import BaseBlock from '../base-block/BaseBlock';

const TextImageBlock: BC<TextImageProps> = ({ block, locale }) => {
    const { order, image, richText, addLink, link, addBgColor, heading, mode } = block;

    return (
        <BaseBlock
            classNameOuter={cn(addBgColor && 'bg-bg-highlight text-fg-on-color !py-xl mb-section-xs md:mb-section-m')}
        >
            <div className="oakgrid pb-section-m relative gap-m">
                {/* Images */}
                <div className={cn('col-span-12 lg:col-span-6 relative', order === 'image-right' && 'lg:col-start-6')}>
                    {mode === 'addImageSingle' && (
                        <div className="w-full h-auto lg:absolute lg:inset-0">
                            <div className="w-full h-full overflow-hidden">
                                <ImageMedia
                                    resource={image}
                                    className="w-full h-auto lg:inset-0 object-cover"
                                    imgClassName="w-full h-full object-cover aspect-[4/3] filter grayscale"
                                />
                            </div>
                        </div>
                    )}

                    {mode === 'addImageDuplication' && (
                        <div className="col-span-12 relative w-full max-w-[591px] max-h-[407px] mx-auto grid grid-cols-3 grid-rows-3 gap-0 overflow-hidden">
                            {/* Bagerste billede */}
                            <div className="group col-start-1 col-span-2 row-start-1 row-span-2 elative overflow-hidden">
                                <ImageMedia resource={image} imgClassName="w-full h-full object-cover aspect-[4/3]" />
                                {/* Overlay */}
                                <div
                                    className={cn(
                                        'absolute inset-0 pointer-events-none mix-blend-screen bg-overlay-red',
                                    )}
                                />
                            </div>

                            {/* Forreste billede */}
                            <div className="col-start-2 col-span-2 row-start-2 row-span-2 elative overflow-hidden">
                                <ImageMedia
                                    resource={image}
                                    imgClassName="w-full h-full object-cover aspect-[4/3] filter grayscale"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Text + Button */}
                <div
                    className={cn(
                        'col-span-12 lg:col-span-5 flex flex-col gap-4',
                        order === 'image-right' && 'lg:order-first',
                    )}
                >
                    {heading && <h3 className="uppercase">{heading}</h3>}
                    {richText && <RichText data={richText} className="mx-0" />}
                    {addLink && <DynamicButton link={link} locale={locale} className="w-fit" />}
                </div>
            </div>

            {/* <div className="oakgrid pb-section-m">
                <div
                    className={cn(
                        'col-span-12 relative lg:sticky top-6 lg:col-span-6',
                        order === 'image-right' && 'lg:col-start-6',
                    )}
                >
                    {mode === 'addImageSingle' && (
                        <div className="w-full lg:absolute lg:h-auto">
                            <div className="relative w-full h-full overflow-hidden">
                                <span
                                    className="absolute inset-0 halftone pointer-events-none z-10"
                                    aria-hidden="true"
                                />
                                <span
                                    className="absolute inset-0 overlay_black pointer-events-none z-20"
                                    aria-hidden="true"
                                />

                                <ImageMedia
                                    resource={image}
                                    className="absolute inset-0 w-full h-full object-cover z-0"
                                    imgClassName="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {mode === 'addImageDuplication' && (
                        <div>
                            <div className="absolute bottom-10 top-0 left-0 lg:bottom-[unset] lg:h-auto w-[85%] z-0 ">
                                <div className="relative w-full h-full overflow-hidden max-w-[488px]">
                                    <span
                                        className="absolute inset-0 halftone pointer-events-none z-10"
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="absolute inset-0 overlay_red pointer-events-none z-20"
                                        aria-hidden="true"
                                    />
                                    <ImageMedia
                                        resource={image}
                                        className="absolute inset-0 w-full h-full object-cover z-0 "
                                        imgClassName="w-full h-full object-cover aspect-[4/3]"
                                    />
                                </div>
                            </div>

                            <div className="absolute bottom-0 top-10 right-0 lg:bottom-[unset] lg:h-auto w-[85%] z-1">
                                <div className="relative w-full h-full overflow-hidden max-w-[488px]">
                                    <span
                                        className="absolute inset-0 halftone pointer-events-none z-10"
                                        aria-hidden="true"
                                    />
                                    <span
                                        className="absolute inset-0 overlay_black pointer-events-none z-20"
                                        aria-hidden="true"
                                    />

                                    <ImageMedia
                                        resource={image}
                                        className="absolute inset-0 w-full h-full object-cover z-0 "
                                        imgClassName="w-full h-full object-cover aspect-[4/3]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'addCard' && <div className="lg:absolute lg:place-self-end">Insert article here</div>}
                </div>

                <div
                    className={cn(
                        'col-span-12 lg:col-span-5 flex flex-col gap-(--spacing-s)',
                        order === 'image-right' && 'lg:order-first',
                        order === 'image-left' && 'xl:col-start-7 xl:col-span-5',
                    )}
                >
                    {heading && <h3 className="uppercase">{heading}</h3>}
                    {richText && <RichText data={richText} className="mx-0" />}
                    {addLink && <DynamicButton link={link} locale={locale} className="w-fit" />}
                </div>
            </div> */}
        </BaseBlock>
    );
};

export default TextImageBlock;
