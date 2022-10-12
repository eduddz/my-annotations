"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
require("dotenv/config");
const promise_1 = require("mysql2/promise");
exports.connection = (0, promise_1.createPool)({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    port: parseInt(`${process.env.MYSQLPORT}`),
    database: process.env.MYSQLDATABASE,
});
