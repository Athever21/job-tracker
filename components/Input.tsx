const Input = (props: Props) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={props.name}>{props.label}</label>
            <input id={props.name} name={props.name} type={props.type}/>
            {props.error && <p>{props.error}</p>}
        </div>
    )
}

type Props = {
    name: string,
    label: string,
    type: string,
    error?: string
}

export default Input;