'use server';

import prisma from "@/lib/prisma";
import { registerSchema } from "@/schemas/register";
import { safeAction } from "@/utils/safeAction";
import { formatZodError } from "@/utils/zod";
import argon2 from 'argon2';

export const registerAction = safeAction(async (_: any, formData: FormData): Promise<RegisterActionState> => {
    const raw = {
        email: formData.get('email') || "",
        password: formData.get('password') || "",
        name: formData.get('name') || ""
    };

    const parsed = registerSchema.safeParse(raw);

    if (!parsed.success) return formatZodError(parsed.error);
    const { email, name, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { email: "User already exists"};

    const hashed = await argon2.hash(password);

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashed
        }
    });

    return { success: true };
})

export type RegisterActionState = {
    success?: boolean,
    email?: string,
    name?: string,
    password?: string,
    error?: string
}