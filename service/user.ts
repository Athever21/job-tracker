import prisma from "@/lib/prisma";
import argon2 from 'argon2';

export const loginUser = async(email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return null;

    const verify = await argon2.verify(user.password, password);
    if (!verify) return null;

    return user;
}

export const findUserByEmail = async(email: string) => {
    return await prisma.user.findUnique({ where: { email }});
}