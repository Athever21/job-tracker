'use client';

import { loginAction } from "@/actions/login";
import { useActionState } from "react";
import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import Link from "next/link";

const SignIn = () => {
    const [state, formAction] = useActionState(loginAction, {});

    console.log(state);

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-black gap-2">
            <div className="bg-gray-900 text-amber-300 p-6 w-4/12 rounded flex flex-col gap-2 shadow shadow-indigo-500">
                <h2 className="w-full text-center text-2xl mb-2">Sign In</h2>
                <form action={formAction} className="flex flex-col gap-10">
                    <FormInput name="email" label="Email" type="email" error={(state as any).email} />
                    <FormInput name="password" label="Password" type="password" error={(state as any).password} />
                    <FormButton>Sign In</FormButton>
                </form>
                {state?.error && <p className="w-full text-center mt-4 text-red-500 text-xl">{state.error}</p>}
            </div>
            <p className="text-sm mt-2 text-gray-200">
                Not having an account?
                <Link
                    href="/signup" className="text-sky-500 pl-2 underline hover:text-sky-400"
                >Sign Up</Link></p>
        </div>
    )
}

export default SignIn;