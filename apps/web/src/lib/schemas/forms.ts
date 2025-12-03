import type { DynamicForm } from '@/payload-types';
import { isServer } from '@tanstack/react-query';
import { hasMinLength, isNonEmpty } from 'ts-array-length';
import z from 'zod';

type Section = NonNullable<DynamicForm['sections']>[number];
type FormInput = NonNullable<Section['inputs']>[number];

import type { ZodTypeAny } from 'zod';

export function getFileFieldSchema(input: FormInput): ZodTypeAny {
    const errorMsg = input.inputErrorMessage || 'Dette felt er påkrævet';
    const allowedTypes = Array.isArray(input.fileType)
        ? input.fileType.includes('all')
            ? null
            : input.fileType
        : null;
    const maxSizeMB = 5;
    const getFileError = (files: FileList | File[] | null | undefined, isRequired: boolean): string | null => {
        //FileList is not available on server side
        const arr =
            global.FileList && files instanceof FileList ? Array.from(files) : Array.isArray(files) ? files : [];
        if (isRequired && arr.length === 0) {
            return errorMsg;
        }
        if (!isRequired && arr.length === 0) {
            return null;
        }
        for (const file of arr) {
            if (allowedTypes) {
                const typeMap: Record<string, string[]> = {
                    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
                    pdf: ['application/pdf'],
                    word: [
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    ],
                    excel: [
                        'application/vnd.ms-excel',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    ],
                    ppt: [
                        'application/vnd.ms-powerpoint',
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    ],
                    txt: ['text/plain'],
                    zip: ['application/zip', 'application/x-zip-compressed'],
                };
                let valid = false;
                for (const t of allowedTypes) {
                    if (t === 'all') {
                        valid = true;
                    }
                    if (typeMap?.[t]?.some((mime) => file.type === mime)) {
                        valid = true;
                    }
                    if (t === 'image' && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) valid = true;
                    if (t === 'pdf' && /\.pdf$/i.test(file.name)) valid = true;
                    if (t === 'word' && /\.docx?$/i.test(file.name)) valid = true;
                    if (t === 'excel' && /\.xlsx?$/i.test(file.name)) valid = true;
                    if (t === 'ppt' && /\.pptx?$/i.test(file.name)) valid = true;
                    if (t === 'txt' && /\.txt$/i.test(file.name)) valid = true;
                    if (t === 'zip' && /\.zip$/i.test(file.name)) valid = true;
                }
                if (!valid) {
                    return `Filtypen for "${file.name}" er ikke tilladt.`;
                }
            }
            if (file.size > maxSizeMB * 1024 * 1024) {
                return `Filen "${file.name}" overstiger den maksimale størrelse på ${maxSizeMB} MB.`;
            }
        }
        return null;
    };
    const SafeFileList =
        typeof FileList !== 'undefined'
            ? z.instanceof(FileList).refine(
                  (files) => {
                      const err = getFileError(files, !!input.isRequired);
                      return !err;
                  },
                  (files) => ({
                      message: getFileError(files, !!input.isRequired) || errorMsg,
                  }),
              )
            : z.array(z.instanceof(File)).refine(
                  (files) => {
                      const err = getFileError(files, !!input.isRequired);
                      return !err;
                  },
                  (files) => ({
                      message: getFileError(files, !!input.isRequired) || errorMsg,
                  }),
              );
    return SafeFileList;
}

export const getFieldSchemaBase = ((input: FormInput) => {
    const errorMsg = input.inputErrorMessage || 'Dette felt er påkrævet';
    if (input.inputType === 'file') {
        return getFileFieldSchema(input);
    }

    switch (input.inputType) {
        case 'text':
        case 'tel':
        case 'textarea':
            if (input.isRequired) {
                return z.string().nonempty(errorMsg);
            }
            return z.string().optional();
        case 'email':
            if (input.isRequired) {
                return z.string().email('Ugyldig e-mailadresse').nonempty(errorMsg);
            }
            return z.string().email('Ugyldig e-mailadresse').or(z.literal('')).optional();
        case 'select': {
            if (input.selectOptions && isNonEmpty(input.selectOptions)) {
                const schema = z.enum(input.selectOptions?.map((option) => option.value) as [string, ...string[]], {
                    message: errorMsg,
                });
                if (input.isRequired) {
                    return schema;
                }
                return schema.or(z.literal('')).optional();
            }
            if (input.isRequired) {
                return z.string().min(1, errorMsg || 'Vælg venligst en mulighed');
            }
            return z.string().optional();
        }
    }
}) satisfies (input: FormInput) => z.ZodTypeAny;

export const getFieldSchema = (input: FormInput) => {
    const baseSchema = getFieldSchemaBase(input);
    if (!baseSchema) {
        return z.unknown();
    }
    return baseSchema;
};

export const generateZodFromForm = (sections: DynamicForm['sections']) => {
    let schema = z.object({});
    if (!sections) {
        return schema;
    }
    for (const section of sections) {
        if (!section?.inputs) continue;
        for (const input of section.inputs) {
            if (!input) continue;
            const inputSchema = getFieldSchema(input);
            if (!inputSchema) {
                continue;
            }
            schema = schema.extend({ [input.inputName]: inputSchema });
        }
    }
    return schema;
};
