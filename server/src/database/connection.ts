import "dotenv/config";

import { createPool } from "mysql2/promise";

export const connection = createPool({
    host: process.env.REACT_APP_HOST,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    database: process.env.REACT_APP_DATABASE
});