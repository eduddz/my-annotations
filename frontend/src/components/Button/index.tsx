import "./style.scss";

interface IButton {
    title: string;
    background: string;
    marginLeft?: "0" | "16px";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({title, background, marginLeft, onClick}: IButton) {
    return (
        <button style={{background: background, marginLeft: marginLeft}} onClick={onClick}>{title}</button>
    )
}