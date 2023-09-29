"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const compa_ias_routes_1 = __importDefault(require("./routes/compa\u00F1ias.routes"));
const app = (0, express_1.default)();
//Settings
app.set("port", config_1.default.port);
//middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(compa_ias_routes_1.default);
exports.default = app;
