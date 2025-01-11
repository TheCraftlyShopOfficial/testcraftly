import { NextResponse, NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import * as crypto from 'crypto-js';

// ...

export async function POST(req: NextRequest) {
    // ...
    try {
        // ... (your existing try block code)
    } catch (error: any) { // Type the error as any or Error
        console.error("Full Error Object:", error);

        if (axios.isAxiosError(error)) { // Check if it's an Axios error
            const axiosError = error as AxiosError; // Type assertion
            console.error("Axios Error Message:", axiosError.message);
            console.error("Axios Error Stack:", axiosError.stack);

            if (axiosError.response) {
                console.error("PhonePe API Error Response Data:", JSON.stringify(axiosError.response.data, null, 2));
                return NextResponse.json(axiosError.response.data, { status: axiosError.response.status });
            }
        } else if (error instanceof Error) {
            console.error("Standard Error Message:", error.message);
            console.error("Standard Error Stack:", error.stack);
        }
        else {
            console.error("Unknown Error:", error);
        }

        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}