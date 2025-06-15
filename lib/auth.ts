import { NextRequest } from "next/server";
import { z, ZodSchema } from "zod";
import { getAuthCookie } from "./cookies";
import { verifyJwt } from "./jwt";
import { findUserByEmail } from "@/service/user";
import { User } from "@/models/User";

export function errorResponse(message: string, status: number = 400, details?: any) {
    return new Response(JSON.stringify({ success: false, error: message, details }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

export function successResponse<T>(data: T, status: number = 200) {
    return new Response(JSON.stringify({ ...data, success: true }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function parseJsonBody<T extends ZodSchema>(
    req: NextRequest,
    schema: T
): Promise<
    | { success: true; data: z.infer<T> }
    | { success: false; error: Response }
> {
    let json;
    try {
        json = await req.json();
    } catch {
        return { success: false, error: errorResponse('Invalid JSON', 400) };
    }

    const result = schema.safeParse(json);

    if (!result.success) {
        return {
            success: false,
            error: errorResponse('Validation failed', 400, {
                issues: result.error.issues,
            }),
        };
    }

    return { success: true, data: result.data };
}

export async function getUser(): Promise<User | null> {
    const token = await getAuthCookie();
    if (!token) return null;

    const tokenPayload = verifyJwt(token);
    if (!tokenPayload) return null;

    const user = await findUserByEmail(tokenPayload.email);
    if (!user) return null;

    return {
        email: user.email,
        name: user.name
    };
}