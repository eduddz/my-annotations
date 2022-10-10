import { SignOut } from "phosphor-react";
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext";

import "./style.scss";

export function Profile() {
    const { user, task, showTask } = useContext(AuthContext);

    useEffect(() => {
        async function show() {
            await showTask(`${user?.id_users}`);
        } show();
    }, [task]);

    function logOut() {
        document.location.reload();
    }

    return (
        <div className="profile">
            <div>
                <p>Olá, <strong>{user?.name}</strong>!
                </p>
                <SignOut 
                    size={32} 
                    color="#fff" 
                    weight="bold"
                    onClick={() => logOut()}
                    style={{cursor: "pointer"}}
                />
            </div>
            <div>
                <p>Você tem {task?.length} tarefas criadas</p>
            </div>
        </div>
    )
}