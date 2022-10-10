import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./style.scss";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register } = useContext(AuthContext);

    async function newRegister() {
        if(name && email && password) {
            await register(name, email, password);
        }
    }

    return (
        <form>
            <label>
                Nome: 
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Digite seu nome..." />
            </label>
            <label>
                Email: 
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Digite seu e-mail..." />
            </label>

            <label>
                Senha:
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite sua senha..." />
            </label>
            <div>
                <button onClick={newRegister} type="submit">Registrar</button>
                <Link to="/">
                    <button>Acessar</button>
                </Link>
            </div>
        </form>
    )
}