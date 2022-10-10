import { useContext } from "react";
import { Login } from "../components/Login";
import { AuthContext } from "./AuthContext";

interface IChildren { children: JSX.Element };

export function RequireAuth({ children }: IChildren) {
    const { user } = useContext(AuthContext);

    if(!user) {
        return  <Login />  
    };

    return children;
}