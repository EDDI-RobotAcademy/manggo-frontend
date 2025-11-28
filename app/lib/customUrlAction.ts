'use server';

import { cookies } from "next/headers";

export async function createSummaryFromUrlAction(prevState: any, formData: FormData) {

    // formData가 FormData가 아닐 수 있습니다
    if (!(formData instanceof FormData)) {
        return {
            summaryResult: null,
            error: { detail: 'FormData 오류' },
            isSubmitting: false,
        };
    }

    const url = formData.get('url');

    if (!url) {
        console.log('URL이 제공되지 않았습니다.');
        return {
            summaryResult: null,
            error: { detail: 'URL이 제공되지 않았습니다.' },
            isSubmitting: false,
        };
    }

    const cookieStore = cookies();
    const sessionId = (await cookieStore).get('session_id')?.value;

    try {
        const checkURL = new URL(url as string);
    } catch (error) {
        return {
            summaryResult: null,
            error: { detail: 'URL 오류' },
            isSubmitting: false,
        };
    }



    const API_ENDPOINT = `${process.env.API_BASE_URL}/custom-news/url`;

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `session_id=${sessionId}`,
            },
            body: JSON.stringify({ url: url }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return errorData;
        }

        const summaryResult = await response.json();

        console.log(summaryResult)

        return {
            summaryResult: summaryResult,
            error: null,
            isSubmitting: false,
        };

    } catch (error) {
        return {
            summaryResult: null,
            error: { detail: '요약 처리 중 오류 발생' },
            isSubmitting: false,
        };
    }
}