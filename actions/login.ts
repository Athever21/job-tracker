'use server';

import { setAuthCookie } from "@/lib/cookies";
import { signJwt } from "@/lib/jwt";
import { loginSchem } from "@/schemas/login";
import { loginUser } from "@/service/user";
import { safeAction } from "@/utils/safeAction";
import { formatZodError } from "@/utils/zod";

export const loginAction = safeAction(async (_: any, formData: FormData) => {
    const raw = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    const parsed = loginSchem.safeParse(raw);
    if (!parsed.success) return formatZodError(parsed.error);

    const { email, password } = parsed.data;

    const user = await loginUser(email, password);
    if (!user) return { error: 'User doesn\'t exists' };

    const jwt = signJwt({ email, userId: user.id });
    await setAuthCookie(jwt);

    return { success: true };
})