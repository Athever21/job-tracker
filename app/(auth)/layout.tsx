import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthLayout = async({ children }: PropsWithChildren) => {
    const user = await getUser();

    if (user) redirect('/');

    return(
        <>
            {children}
        </>
    )
}

export default AuthLayout;