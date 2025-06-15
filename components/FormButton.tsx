import { PropsWithChildren } from "react";

const FormButton = ({ children, type}: Props ) => {
    return (
        <>
            <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg cursor-pointer"
                    type={type}
            >
                {children}
            </button>
        </>
    )
}

type Props = PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>;

export default FormButton;