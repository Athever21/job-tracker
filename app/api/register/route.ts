import { NextRequest } from "next/server"
import prisma from '@/lib/prisma';
import argon2 from 'argon2';
import { errorResponse, parseJsonBody, successResponse } from "@/lib/auth";
import { registerSchema } from "@/schemas/register";
import { formatZodError } from "@/utils/zod";
import { withApiHandler } from "@/utils/withApiHandler";

export const POST = withApiHandler(async (req: NextRequest) => {
    const parsed = await parseJsonBody(req, registerSchema);

    if (!parsed.success) return parsed.error;

    const { email, name, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return errorResponse("User already exists", 409);

    const hashed = await argon2.hash(password);

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashed
        }
    });

    return successResponse({});
});