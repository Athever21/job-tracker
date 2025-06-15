import { NextRequest } from "next/server"
import prisma from '@/lib/prisma';
import { withApiHandler } from "@/utils/withApiHandler";
import { loginSchem } from "@/schemas/login";
import { errorResponse, parseJsonBody, successResponse } from "@/lib/auth";
import argon2 from 'argon2';
import { signJwt } from "@/lib/jwt";
import { setAuthCookie } from "@/lib/cookies";
import { loginUser } from "@/service/user";

export const POST = withApiHandler(async (req: NextRequest) => {
    const parsed = await parseJsonBody(req, loginSchem);

    if (!parsed.success) return parsed.error;

    const { email, password } = parsed.data;

    const user = await loginUser(email, password);
    if (!user) return errorResponse('User doesn\'t exists', 400);

    const jwt = signJwt({ email, userId: user.id });
    await setAuthCookie(jwt);

    return successResponse({});
})