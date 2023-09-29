"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
// "201.131.21.32"
const tedious_1 = require("tedious");
const config = {
    server: "201.131.21.32",
    authentication: {
        type: "default",
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PSWD, // Update me
        },
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: false,
        database: process.env.DB_NAME, // Update me
    },
};
//
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new tedious_1.Connection(config);
        pool.on("connect", (err) => {
            if (err) {
                console.error(`Connection error: ${err.message}`);
            }
            else {
                console.log("Connected");
            }
        });
        pool.connect();
        return pool;
    });
}
exports.getConnection = getConnection;
