import "dotenv/config";

import { createPool } from "mysql2/promise";

export const connection = createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    port: parseInt(`${process.env.MYSQLPORT}`),
    database: process.env.MYSQLDATABASE,
});