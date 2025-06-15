'use server';

import { clearAuthCookie } from "@/lib/cookies";
import { safeAction } from "@/utils/safeAction";
import { redirect } from "next/navigation";

export const logoutAction = safeAction(async (_: any, __: FormData) => {
    await clearAuthCookie();

    redirect('/signin');
})