import { useState } from "react";
import { ITask } from "../types/Task";
import { IUser } from "../types/User";
import { useApi } from "../useHooks";
import { AuthContext } from "./AuthContext";

interface IChildren { children: JSX.Element };

export function AuthProvider({ children }: IChildren) {
    const [task, setTask] = useState<ITask[] | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    const api = useApi();

    async function add(task: string, color: string, clicked: number, id_users: string) {
        await api.add(task, color, clicked, id_users);
    }

    async function showTask(id_users: string) {
        const data = await api.showTask(id_users);

        if(data) {
            setTask(data);
        }

        return data;
    }

    async function register(name: string, email: string, password: string) {
        await api.register(name, email, password);
    } 

    async function login(email: string, password: string) {
        const data = await api.login(email, password);

        if(data) {
            setUser(data);
        }

        return data;
    }

    async function deleteTask(id_tasks: number) {
        await api.deleteTask(id_tasks);
    }

    async function patchTaskTask(task: string, id_tasks: number) {
        await api.patchTasksTask(task, id_tasks);
    }

    async function patchTaskClicked(clicked: number, id_tasks: number) {
        await api.patchTasksClicked(clicked, id_tasks);
    }

    return (
        <AuthContext.Provider value={{add, showTask, register, login, deleteTask, patchTaskTask, patchTaskClicked,task, user}}>
            {children}
        </AuthContext.Provider>
    )
}