import { ReactNode } from "react";
import "./style.scss";

interface IButtons {
    children: ReactNode;
}

export function GroupButton({ children }: IButtons) {
    return (
        <div className="group_button">
            {children}
        </div>
    )
}