import express, { Request, Response } from "express";
import cors from "cors";

import { connection } from "./database/connection";

const server = express();
const connect = connection;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());


// => USER

server.post("/add-user", async(req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const query_user = "INSERT INTO `my_annotations`.`my_user` (name, email, password) VALUES (?, ?, ?)";
    const new_user = await connect.query(query_user, [name, email, password]);

    res.json(new_user[0]);
});

server.post("/my-user", async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const query_user = "SELECT * FROM my_user WHERE email = ? AND password = ?";
    const user = await connect.query(query_user, [email, password]);

    res.json(user[0]);
});


// => TASK

server.post("/add-task", async(req: Request, res: Response) => {
    const { id_users, email, task, color, clicked } = req.body;

    const query_verify =  "SELECT * FROM my_user WHERE email = ?";
    const verify = await connect.query(query_verify, [email]);
    if(verify[0].toString().length === 0) {
        const query_task = "INSERT INTO `my_annotations`.`my_task` (task, color, clicked, id_users) VALUES (?, ?, ?, ?)"
        const new_task = await connect.query(query_task, [task, color, clicked, id_users]);

        res.json(new_task[0]);
    }
});

server.post("/my-tasks", async(req: Request, res: Response) => {
    const { id_users } = req.body;
    const query_task = "SELECT * FROM my_task WHERE id_users = ?";
    const task = await connect.query(query_task, [id_users]);
    
    res.json(task[0]);
});

server.patch("/patch-tasks-task", async(req: Request, res: Response) => {
    const { id_tasks, task } = req.body;

    const query_task = "UPDATE `my_annotations`.`my_task` SET task = ? WHERE id_tasks = ?";
    const put_task = await connect.query(query_task, [task, id_tasks]);

    res.json(put_task[0]);
});

server.patch("/patch-tasks-clicked", async(req: Request, res: Response) => {
    const { id_tasks, clicked } = req.body;

    const query_task = "UPDATE `my_annotations`.`my_task` SET clicked = ? WHERE id_tasks = ?";
    const put_task = await connect.query(query_task, [clicked, id_tasks]);

    res.json(put_task[0]);
});

server.delete("/delete-task", async(req: Request, res: Response) => {
    const { id_tasks } = req.body;  
    const query_delete = "DELETE FROM my_task WHERE id_tasks = ?";
    const task = await connect.query(query_delete, [id_tasks]);
        
    res.json(task);
});


// => CREATE TABLES

server.get("/create-task-table", async (req: Request, res: Response) => {
    const query_table = "CREATE TABLE IF NOT EXISTS `my_annotations`.`my_task` (`id_tasks` INT NOT NULL AUTO_INCREMENT, `task` VARCHAR(300), `color` VARCHAR(7), `clicked` TINYINT, `id_users` VARCHAR(9), PRIMARY KEY (`id_tasks`))";
    const created = await connect.query(query_table);

    res.json(created);
});

server.get("/create-user-table", async (req: Request, res: Response) => {
    const query_table = "CREATE TABLE IF NOT EXISTS `my_annotations`.`my_user` (`id_users` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `email` VARCHAR(25), `password` VARCHAR(8), PRIMARY KEY (`id_users`))";
    const created = await connect.query(query_table);

    res.json(created);
});


// => Server

server.listen(4000, () => {
    console.log("Server running at port 4000, 👌");
});