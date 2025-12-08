'use client';

import { submitForm } from '@/app/actions/dynamic-form-submit';
import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
import { generateZodFromForm } from '@/lib/schemas/forms';
import type { DynamicForm } from '@/payload-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useTransition } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DynamicFormField from './DynamicFormField';

type FormValues = {
    [key: string]: Record<string, unknown>;
};

type Props = {
    form: DynamicForm;
};

const FormClient = ({ form }: Props) => {
    const [isPending, startTransition] = useTransition();

    const dynamicSchema = useMemo(() => generateZodFromForm(form?.sections), [form]);

    const methods = useForm({ resolver: zodResolver(dynamicSchema), mode: 'onBlur' });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        // Validate with Zod before building FormData
        const parsedData = dynamicSchema.safeParse(data);
        if (!parsedData.success) {
            // Find first file error and show its message
            const fileError = parsedData.error.errors.find(
                (e) =>
                    (e.path?.length && typeof e.message === 'string' && e.message.includes('Filtypen')) ||
                    e.message?.includes('størrelse') ||
                    e.message?.includes('maksimalt'),
            );
            toast.error(fileError?.message || '');
            return;
        }
        // Build FormData, handling multiple files per key
        const formData = new FormData();
        const parsedValues = parsedData.data as Record<string, unknown>;
        for (const key in parsedValues) {
            const value = parsedValues[key];
            if (value instanceof FileList) {
                Array.from(value).forEach((file) => {
                    formData.append(key, file);
                });
            } else if (typeof value === 'string' || value instanceof Blob) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        }
        startTransition(async () => {
            if (!form || typeof form !== 'object') {
                console.error('Form definition mangler');
                return;
            }
            console.log('CALLING SERVER ACTION submitForm:', submitForm);
            try {
                await submitForm(formData, form.id);
                toast.success('');
                methods.reset();
                console.log('Formen blev sendt!');
            } catch (error) {
                console.error('Fejl ved afsendelse:', error);
                toast.error('Der opstod en fejl ved afsendelse af formularen. Prøv igen senere.');
            }
        });
    };
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="col-span-12 md:col-span-6 md:col-start-7 grid grid-cols-1 md:grid-cols-subgrid"
            >
                {form.sections?.map((section, idx) => (
                    <div
                        key={section.sectionTitle || idx}
                        className="col-span-1 md:col-span-6 mb-16 grid grid-cols-subgrid space-y-l"
                    >
                        {section.sectionTitle && <h5 className="col-span-6 mb-4">{section.sectionTitle}</h5>}
                        {section.inputs?.map((field) => {
                            return <DynamicFormField key={field.id} field={field} />;
                        })}
                    </div>
                ))}
                <div className="col-span-1 md:col-span-6 flex justify-end">
                    <BaseButton
                        type="submit"
                        variant="secondary"
                        title={form.submitButtonLabel || 'Indsend formular'}
                    />
                </div>
            </form>
        </FormProvider>
    );
};

export default FormClient;
