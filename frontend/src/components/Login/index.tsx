import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./style.scss";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);

    async function newLogin(e: FormEvent) {
        e.preventDefault();
        if(email && password) {
            await login(email, password);
        }
    }

    return (
        <form>
            <label>
                Email: 
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite seu e-mail..." />
            </label>

            <label>
                Senha:
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite sua senha..." />
            </label>
            <div>
                <button onClick={newLogin} type="submit">Log In</button>
                <Link to="/register">
                    <button>Registrar</button>
                </Link>
            </div>
        </form>
    )
}