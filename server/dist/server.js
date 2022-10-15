"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./database/connection");
const server = (0, express_1.default)();
const connect = connection_1.connection;
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cors_1.default)());
// => USER
server.post("/add-user", async (req, res) => {
    const { name, email, password } = req.body;
    const query_user = "INSERT INTO my_user (name, email, password) VALUES (?, ?, ?)";
    const new_user = await connect.query(query_user, [name, email, password]);
    res.json(new_user[0]);
});
server.post("/my-user", async (req, res) => {
    const { email, password } = req.body;
    const query_user = "SELECT * FROM my_user WHERE email = ? AND password = ?";
    const user = await connect.query(query_user, [email, password]);
    res.json(user[0]);
});
// => TASK
server.post("/add-task", async (req, res) => {
    const { id_users, email, task, color, clicked } = req.body;
    const query_verify = "SELECT * FROM my_user WHERE email = ?";
    const verify = await connect.query(query_verify, [email]);
    if (verify[0].toString().length === 0) {
        const query_task = "INSERT INTO `my_annotations`.`my_task` (task, color, clicked, id_users) VALUES (?, ?, ?, ?)";
        const new_task = await connect.query(query_task, [task, color, clicked, id_users]);
        res.json(new_task[0]);
    }
});
server.post("/my-tasks", async (req, res) => {
    const { id_users } = req.body;
    const query_task = "SELECT * FROM my_task WHERE id_users = ?";
    const task = await connect.query(query_task, [id_users]);
    res.json(task[0]);
});
server.patch("/patch-tasks-task", async (req, res) => {
    const { id_tasks, task } = req.body;
    const query_task = "UPDATE my_task SET task = ? WHERE id_tasks = ?";
    const put_task = await connect.query(query_task, [task, id_tasks]);
    res.json(put_task[0]);
});
server.patch("/patch-tasks-clicked", async (req, res) => {
    const { id_tasks, clicked } = req.body;
    const query_task = "UPDATE my_task SET clicked = ? WHERE id_tasks = ?";
    const put_task = await connect.query(query_task, [clicked, id_tasks]);
    res.json(put_task[0]);
});
server.delete("/delete-task", async (req, res) => {
    const { id_tasks } = req.body;
    const query_delete = "DELETE FROM my_task WHERE id_tasks = ?";
    const task = await connect.query(query_delete, [id_tasks]);
    res.json(task);
});
server.get("/teste", async (req, res) => {
    res.json({ "message": "oi" });
});
// => CREATE TABLES
server.get("/create-task-table", async (req, res) => {
    const query_table = "CREATE TABLE IF NOT EXISTS my_task (`id_tasks` INT NOT NULL AUTO_INCREMENT, `task` VARCHAR(300), `color` VARCHAR(7), `clicked` TINYINT, `id_users` VARCHAR(9), PRIMARY KEY (`id_tasks`))";
    const created = await connect.query(query_table);
    res.json(created);
});
server.get("/create-user-table", async (req, res) => {
    const query_table = "CREATE TABLE IF NOT EXISTS my_user (`id_users` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(50), `email` VARCHAR(25), `password` VARCHAR(8), PRIMARY KEY (`id_users`))";
    const created = await connect.query(query_table);
    res.json(created);
});
// => Server
server.listen(process.env.PORT || 3333, () => {
    console.log("Server running at port " + process.env.PORT + ", 👌");
});
