const FormInput = (props: Props) => {
    return (
        <div>
            <div className="text-sm font-bold text-gray-300 tracking-wide">{props.label}</div>
            <input 
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
            />
            {props.error && <p className="text-sm text-red-600 opacity-80 mt-3">{props.error}</p>}
        </div>
    )
}

type Props = {
    name: string,
    label: string,
    type: string,
    placeholder?: string
    error?: string | undefined
}

export default FormInput;