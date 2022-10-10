import { useContext, useState } from "react";
import { Circle, CircleWavy, CircleWavyCheck } from "phosphor-react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../Button";
import { GroupButton } from "../GroupButton";
import "./style.scss";

export function AddGroup() {
    const { add, user } = useContext(AuthContext);

    const [color, setColor] = useState("ffffff");
    const [clicked, setClicked] = useState(false);
    const [task, setTask] = useState("");

    let clickedId = 0;

    async function handleNewTask() {
        const id = `${user?.id_users}`;

        if(clicked === true) {
            clickedId = 1;
        } else if(clicked === false) {
            clickedId = 0;
        }
        
        if(task) {
            await add(task, color, clickedId, id);
            setTask("");
        }



    }

    return (
        <div className="add_group">
            <div className="title">
                {
                    clicked ?
                    <CircleWavyCheck 
                        onClick={() => setClicked(!clicked)} 
                        size={30} 
                        color={`#${color}`} 
                        weight="fill"
                        style={{cursor: "pointer"}}
                    />
                    :
                    <CircleWavy 
                        onClick={() => setClicked(!clicked)} 
                        size={30} 
                        color={`#${color}`} 
                        weight="fill"
                        style={{cursor: "pointer"}}
                    />
                }
                <textarea
                    value={task} 
                    onChange={(e) => setTask(e.target.value)} 
                    placeholder="Type your task..." 
                    className="title_size"
                />
            </div>
            <div className="colors">
                <Circle size={40} weight="fill" color="#ff0000" onClick={() => setColor("ff0000")} />
                <Circle size={40} weight="fill" color="#ff8a00" onClick={() => setColor("ff8a00")} />
                <Circle size={40} weight="fill" color="#00b112" onClick={() => setColor("00b112")} />
                <Circle size={40} weight="fill" color="#00b2ff" onClick={() => setColor("00b2ff")} />
                <Circle size={40} weight="fill" color="#ad00ff" onClick={() => setColor("ad00ff")} />
                <Circle size={40} weight="fill" color="#ffffff" onClick={() => setColor("ffffff")} />
            </div>
            <div>
                <GroupButton>
                    <Button onClick={handleNewTask} title="Add" background="blue" />
                </GroupButton>
            </div>
        </div>
    )
}