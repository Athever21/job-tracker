import { cookies } from 'next/headers';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function setAuthCookie(token: string) {
    const cookieOptions = {
        name: TOKEN_NAME,
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: MAX_AGE,
    };

    (await cookies()).set(cookieOptions);
}

export async function getAuthCookie() {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_NAME)?.value || null;
}

export async function clearAuthCookie() {
    (await cookies()).delete(TOKEN_NAME);
}
