type ButtonPropsType = {
    title: string
    onClick:()=> void
    disabled?: boolean
}

export const Button = ({title, ...rest}: ButtonPropsType) => {
    return (
        <button {...rest}>{title}</button>
    )
}
