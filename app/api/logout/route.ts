import { successResponse } from "@/lib/auth";
import { clearAuthCookie } from "@/lib/cookies"

export const POST = async() => {
    await clearAuthCookie();

    return successResponse({});
}