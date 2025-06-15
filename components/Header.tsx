'use client';

import { logoutAction } from "@/actions/logout"
import { User } from "@/models/User"
import { useActionState } from "react"

const Header = ({ user }: Props) => {
    const [_, formAction] = useActionState(logoutAction, null);

    return(
        <header className="w-screen flex bg-zinc-900 justify-between p-2 items-center">
            <h1 className="text-4xl font-semibold">Job Tracker</h1>
            <div className="flex gap-4 items-center">
                <p>{user.email}</p>
                <form action={formAction}>
                    <button className="p-2 cursor-pointer bg-amber-800 hover:bg-amber-700" type="submit">signout</button>
                </form>
            </div>
        </header>
    )
}

type Props = {
    user: User
}

export default Header;