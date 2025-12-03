'use server';

import { defaultLocale } from '@/i18n/localized-collections';
import { generateZodFromForm } from '@/lib/schemas/forms';
import type { DynamicForm } from '@/payload-types';
import { type Result, err, ok } from 'neverthrow';
import { initPayload } from '../config';
import { getCachedEntryById } from '../data/payload/get-cached-entry-by-id';
import { getCachedOptions } from '../data/payload/get-cached-options';

const getHtmlEntriesAndAttachments = async (formData: FormData) => {
    const htmlEntries = new Map<string, string[]>();
    const attachments: { filename: string; content: Buffer }[] = [];

    for (const [key, value] of formData.entries()) {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

        let entryArr = htmlEntries.get(formattedKey);
        if (!entryArr) {
            entryArr = [];
            htmlEntries.set(formattedKey, entryArr);
        }

        if (value instanceof File) {
            const buffer = Buffer.from(await value.arrayBuffer());
            attachments.push({
                filename: value.name,
                content: buffer,
            });
            entryArr.push(value.name);
        } else {
            entryArr.push(String(value));
        }
    }

    return { htmlEntries, attachments };
};

export async function submitForm(
    formData: FormData,
    formId: DynamicForm['id'],
): Promise<Result<{ success: boolean; data: unknown }, Error>> {
    const payload = await initPayload();
    const options = await getCachedOptions(defaultLocale);
    const emailFromCompanyDetails = options?.companyDetails?.email;

    if (!formId) return err(new Error('Form id mangler'));
    const formConfig = await getCachedEntryById({ collection: 'dynamic-forms', id: formId });
    if (!formConfig) return err(new Error('Form config mangler'));

    const recipientEmail = formConfig?.recipientEmail || emailFromCompanyDetails;
    const emailSubject = formConfig?.emailSubject || 'Ny henvendelse fra kontaktformular';

    // Server-side Zod validation
    const serverSchema = generateZodFromForm(formConfig?.sections);
    if (serverSchema) {
        //FileList is not available on the server, so we need to convert "FileList" to "File[]"
        const obj: Record<string, unknown> = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                if (!obj[key]) obj[key] = [];
                (obj[key] as File[]).push(value);
            } else {
                obj[key] = value;
            }
        }
        for (const k in obj) {
            if (Array.isArray(obj[k])) {
                if (typeof globalThis.DataTransfer !== 'undefined') {
                    const dt = new globalThis.DataTransfer();
                    (obj[k] as File[]).forEach((f: File) => dt.items.add(f));
                    obj[k] = dt.files;
                }
            }
        }
        const parsed = serverSchema.safeParse(obj);
        if (!parsed.success) {
            return err(new Error(parsed.error.errors[0]?.message || 'Validering fejlede på serveren'));
        }
    }

    const { htmlEntries, attachments } = await getHtmlEntriesAndAttachments(formData);

    const messageBodyHtml = Array.from(htmlEntries.entries())
        .map(([key, values]) => {
            const formattedValue = values.join('<br>');
            return `
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9; vertical-align: top;">
                        ${key}
                    </td>
                    <td style="padding: 8px; border: 1px solid #ddd;">
                        ${formattedValue}
                    </td>
                </tr>
            `;
        })
        .join('');

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #000;">${emailSubject}</h1>
            <p>Du har modtaget følgende data:</p>
            <table style="width: fit-content; border-collapse: collapse; margin-top: 16px;">
                <thead>
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left; background-color: #f0f0f0;">Felt</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left; background-color: #f0f0f0;">Værdi</th>
                    </tr>
                </thead>
                <tbody>
                    ${messageBodyHtml}
                </tbody>
            </table>
        </div>
    `;

    try {
        const email = await payload.sendEmail({
            to: recipientEmail,
            subject: emailSubject,
            html: htmlContent,
            attachments: attachments,
        });

        console.log('Email sent:', email);
        return ok({ success: true, data: email });
    } catch (error) {
        console.error('Fejl ved afsendelse af email:', error);
        return err(new Error('Kunne ikke sende e-mail.'));
    }
}
