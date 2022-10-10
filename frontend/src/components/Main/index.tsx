import { CircleWavy, CircleWavyCheck, Trash } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AddGroup } from "../AddGroup";
import { Profile } from "../Profile";

import "./style.scss";

export function Main() {
    const { task, showTask, deleteTask, patchTaskTask, patchTaskClicked, user } = useContext(AuthContext);

    const [newTask, setNewTask] = useState("");
    const [id, setId] = useState<number>(0);
    const [newClicked, setNewClicked] = useState<number>(0);
    
    useEffect(() => {
        async function show() {
            await showTask(`${user?.id_users}`);
        } show();
    }, [task]);

    useEffect(() => {
        async function updateTask() {
            await patchTaskTask(newTask, id);
        } updateTask();
    }, [newTask]);

    async function updateClicked() {
        await patchTaskClicked(newClicked, id);
    } 


    async function deletetask(e: number) {
        await deleteTask(e);
    } 
 
    return (
        <main className="main">
            <Profile />
            <div className="new_card">
                    {task?.map((e, value) => (
                        <li
                            key={value}
                            className="add_group"
                        >
                            <div className="title">
                                {
                                    e.clicked === 1 ?
                                    <CircleWavyCheck 
                                        size={50} 
                                        color={`#${e.color}`} 
                                        weight="fill"
                                        onClick={() => {
                                            setNewClicked(e.clicked - 1)
                                            setId(e.id_tasks);
                                            updateClicked();
                                        }}
                                    />
                                    :
                                    <CircleWavy 
                                        size={50} 
                                        color={`#${e.color}`}
                                        onClick={() => {
                                            setNewClicked(e.clicked + 1);
                                            setId(e.id_tasks);
                                            updateClicked();
                                        }}
                                    />
                                }
                                <textarea
                                    style={e.clicked === 1 ? {textDecoration: "line-through"} : {textDecoration: "none"}}
                                    onChange={(event) => {
                                        setId(e.id_tasks);
                                        setNewTask(event.target.value);
                                    }}
                                    className="title_size"
                                >{e.task}</textarea>
                                <Trash onClick={() => deletetask(e.id_tasks)} style={{cursor: "pointer"}} size={32} color="#fff" weight="fill" />
                            </div>
                        </li>
                    ))}
                </div> 
            <AddGroup />
        </main>
    )
}