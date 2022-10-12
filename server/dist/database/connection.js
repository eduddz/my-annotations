"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
require("dotenv/config");
const promise_1 = require("mysql2/promise");
exports.connection = (0, promise_1.createPool)({
    host: process.env.REACT_APP_HOST,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    port: parseInt(`${process.env.REACT_APP_PORT_DB}`),
    database: process.env.REACT_APP_DATABASE,
});
