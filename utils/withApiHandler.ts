import { NextRequest } from 'next/server';
import { errorResponse } from '../lib/auth';

type Handler = (req: NextRequest) => Promise<Response>;

export function withApiHandler(handler: Handler): Handler {
    return async (req: NextRequest): Promise<Response> => {
        try {
            return await handler(req);
        } catch (err) {
            console.error('API Error:', err);
            return errorResponse('Internal Server Error', 500);
        }
    };
}
