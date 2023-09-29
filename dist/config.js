"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const port = parseInt(process.env.PORT || "1000", 10);
console.log(process.env.HELLO);
exports.default = {
    port,
};
