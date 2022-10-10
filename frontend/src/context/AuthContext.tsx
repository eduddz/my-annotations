import { createContext } from "react";
import { ITask } from "../types/Task";
import { IUser } from "../types/User";

export type AuthContextType = {
    add: (
        task: string,
        color: string,
        clicked: number,
        id_users: string
    ) => {};
    showTask: (
        id_users: string
    ) => {};
    register: (
        name: string,
        email: string,
        password: string
    ) => {};
    login: (
        email: string,
        password: string
    ) => {};
    deleteTask: (
        id_tasks: number
    ) => {};
    patchTaskTask: (
        task: string,
        id_tasks: number
    ) => {};
    patchTaskClicked: (
        clicked: number,
        id_tasks: number
    ) => {};
    task: ITask[] | null;
    user: IUser | null;
};

export const AuthContext = createContext<AuthContextType>(null!);