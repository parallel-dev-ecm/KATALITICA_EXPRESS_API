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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyById = exports.deleteCompanyById = exports.getCompanyById = exports.createNewCompany = exports.getCompany = void 0;
// compañias.controller.mjs
const connection_1 = require("../db/connection");
const tedious_1 = require("tedious");
const queries_1 = __importDefault(require("../db/queries"));
const table = "[Generales].[Companias]";
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, connection_1.getConnection)();
    const jsonArray = [];
    connection.on("connect", (err) => {
        if (err) {
            console.error("Error connecting to the database:", err.message);
            res
                .status(500)
                .json({ error: "Internal Server Error - Database Connection" });
            return;
        }
        const query = queries_1.default.getAllCompanies(table); // Check that this matches your table name
        console.log("Executing query:", query); // Log the query being executed
        var request = new tedious_1.Request(query, function (err) {
            if (err) {
                console.error("Error executing SQL request:", err.message);
                res.status(500).json({ error: "Internal Server Error - SQL Request" });
                return;
            }
        });
        request.on("error", function (err) {
            console.error("Error executing SQL request:", err.message);
            res.status(500).json({
                error: "Internal Server Error - SQL Request",
                sqlError: err.message,
            });
        });
        request.on("row", function (columns) {
            const row = {};
            columns.forEach(function (column) {
                row[column.metadata.colName] = column.value;
            });
            jsonArray.push(row);
        });
        request.on("doneProc", function (rowCount) {
            if (rowCount === 0) {
                console.log("No rows returned");
                res.status(404).json({ error: "No data found" });
            }
            else {
                const responseData = {
                    data: jsonArray,
                };
                res.json(responseData);
            }
        });
        request.on("requestCompleted", () => {
            connection.close();
        });
        connection.execSql(request);
    });
});
exports.getCompany = getCompany;
const createNewCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clave_compania, rfc, razon_social, nombre_corto, nombre_largo, calle, colonia, estado, codigo_postal, contacto_persona, telefono, } = req.body;
    const inputData = {
        clave_compania,
        rfc,
        razon_social,
        nombre_corto,
        nombre_largo,
        calle,
        colonia,
        estado,
        codigo_postal,
        contacto_persona,
        telefono,
    };
    const hasEmptyOrNullValue = Object.values(inputData).some((value) => value === null || value === "");
    if (hasEmptyOrNullValue) {
        return res.status(400).json({ msg: "Bad request. Please fill all forms" });
    }
    else {
        const pool = yield (0, connection_1.getConnection)();
        pool.on("connect", (err) => {
            if (err) {
                console.error("Error connecting to the database:", err.message);
                res
                    .status(500)
                    .json({ error: "Internal Server Error - Database Connection" });
                return;
            }
            const query = queries_1.default.insertIntoCompania(table);
            console.log("Executing query:", query); // Log the query being executed
            var request = new tedious_1.Request(query, function (err) {
                if (err) {
                    console.error("Error executing SQL request:", err.message);
                    res
                        .status(500)
                        .json({ error: "Internal Server Error - SQL Request" });
                    return;
                }
            });
            request.on("error", function (err) {
                console.error("Error executing SQL request:", err.message);
                res.status(500).json({
                    error: "Internal Server Error - SQL Request",
                    sqlError: err.message,
                });
            });
            request.on("doneProc", function (rowCount) {
                if (rowCount === 0) {
                    console.log("No rows returned");
                    res.status(404).json({ error: "No data found" });
                }
                else {
                    res.json("Added Row");
                }
            });
            request.on("requestCompleted", () => {
                pool.close();
            });
            request.addParameter("clave_compania", tedious_1.TYPES.VarChar, clave_compania);
            request.addParameter("rfc", tedious_1.TYPES.VarChar, rfc);
            request.addParameter("razon_social", tedious_1.TYPES.VarChar, razon_social);
            request.addParameter("nombre_corto", tedious_1.TYPES.VarChar, nombre_corto);
            request.addParameter("nombre_largo", tedious_1.TYPES.VarChar, nombre_largo);
            request.addParameter("calle", tedious_1.TYPES.VarChar, calle);
            request.addParameter("colonia", tedious_1.TYPES.VarChar, colonia);
            request.addParameter("estado", tedious_1.TYPES.VarChar, estado);
            request.addParameter("codigo_postal", tedious_1.TYPES.SmallInt, parseInt(codigo_postal, 10));
            request.addParameter("contacto_persona", tedious_1.TYPES.VarChar, contacto_persona);
            request.addParameter("telefono", tedious_1.TYPES.SmallInt, parseInt(telefono, 10));
            pool.execSql(request);
        });
    }
});
exports.createNewCompany = createNewCompany;
const getCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.getConnection)();
    const { id } = req.params;
    const jsonArray = [];
    pool.on("connect", (err) => {
        if (err) {
            console.error("Error connecting to the database:", err.message);
            res
                .status(500)
                .json({ error: "Internal Server Error - Database Connection" });
            return;
        }
        const query = queries_1.default.getCompanyById(table);
        console.log("Executing query:", query); // Log the query being executed
        var request = new tedious_1.Request(query, function (err) {
            if (err) {
                console.error("Error executing SQL request:", err.message);
                res.status(500).json({ error: "Internal Server Error - SQL Request" });
                return;
            }
        });
        request.on("error", function (err) {
            console.error("Error executing SQL request:", err.message);
            res.status(500).json({
                error: "Internal Server Error - SQL Request",
                sqlError: err.message,
            });
        });
        request.on("row", function (columns) {
            const row = {};
            columns.forEach(function (column) {
                row[column.metadata.colName] = column.value;
            });
            jsonArray.push(row);
        });
        request.on("doneProc", function (rowCount) {
            if (rowCount === 0) {
                console.log("No rows returned");
                res.status(404).json({ error: "No data found" });
            }
            else {
                const responseData = {
                    data: jsonArray,
                };
                res.json(responseData);
            }
        });
        request.on("requestCompleted", () => {
            pool.close();
        });
        request.addParameter("Id", tedious_1.TYPES.VarChar, id);
        pool.execSql(request);
    });
});
exports.getCompanyById = getCompanyById;
const deleteCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, connection_1.getConnection)();
    const { id } = req.params;
    pool.on("connect", (err) => {
        if (err) {
            console.error("Error connecting to the database:", err.message);
            res
                .status(500)
                .json({ error: "Internal Server Error - Database Connection" });
            return;
        }
        const query = queries_1.default.deleteCompanyById(table);
        console.log("Executing query:", query); // Log the query being executed
        var request = new tedious_1.Request(query, function (err) {
            if (err) {
                console.error("Error executing SQL request:", err.message);
                res.status(500).json({ error: "Internal Server Error - SQL Request" });
                return;
            }
        });
        request.on("error", function (err) {
            console.error("Error executing SQL request:", err.message);
            res.status(500).json({
                error: "Internal Server Error - SQL Request",
                sqlError: err.message,
            });
        });
        request.on("doneProc", function (rowCount) {
            if (rowCount === 0) {
                console.log("No rows returned");
                res.status(404).json({ error: "No data found" });
            }
            else {
                res.send(`Succesfully deleted from ${table} row with id: ${id}`);
            }
        });
        request.on("requestCompleted", () => {
            pool.close();
        });
        request.addParameter("Id", tedious_1.TYPES.VarChar, id);
        pool.execSql(request);
    });
});
exports.deleteCompanyById = deleteCompanyById;
const updateCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clave_compania, rfc, razon_social, nombre_corto, nombre_largo, calle, colonia, estado, codigo_postal, contacto_persona, telefono, } = req.body;
    const inputData = {
        clave_compania,
        rfc,
        razon_social,
        nombre_corto,
        nombre_largo,
        calle,
        colonia,
        estado,
        codigo_postal,
        contacto_persona,
        telefono,
    };
    const { id } = req.params;
    const hasEmptyOrNullValue = Object.values(inputData).some((value) => value === null || value === "");
    if (hasEmptyOrNullValue) {
        return res.status(400).json({ msg: "Bad request. Please fill all forms" });
    }
    else {
        const pool = yield (0, connection_1.getConnection)();
        pool.on("connect", (err) => {
            if (err) {
                console.error("Error connecting to the database:", err.message);
                res
                    .status(500)
                    .json({ error: "Internal Server Error - Database Connection" });
                return;
            }
            const query = queries_1.default.updateCompanyById(table);
            console.log("Executing query:", query); // Log the query being executed
            var request = new tedious_1.Request(query, function (err) {
                if (err) {
                    console.error("Error executing SQL request:", err.message);
                    res
                        .status(500)
                        .json({ error: "Internal Server Error - SQL Request" });
                    return;
                }
            });
            request.on("error", function (err) {
                console.error("Error executing SQL request:", err.message);
                res.status(500).json({
                    error: "Internal Server Error - SQL Request",
                    sqlError: err.message,
                });
            });
            request.on("doneProc", function (rowCount) {
                if (rowCount === 0) {
                    console.log("No rows returned");
                    res.status(404).json({ error: "No data found" });
                }
                else {
                    res.json(inputData);
                }
            });
            request.on("requestCompleted", () => {
                pool.close();
            });
            request.addParameter("clave_compania", tedious_1.TYPES.VarChar, clave_compania);
            request.addParameter("rfc", tedious_1.TYPES.VarChar, rfc);
            request.addParameter("razon_social", tedious_1.TYPES.VarChar, razon_social);
            request.addParameter("nombre_corto", tedious_1.TYPES.VarChar, nombre_corto);
            request.addParameter("nombre_largo", tedious_1.TYPES.VarChar, nombre_largo);
            request.addParameter("calle", tedious_1.TYPES.VarChar, calle);
            request.addParameter("colonia", tedious_1.TYPES.VarChar, colonia);
            request.addParameter("estado", tedious_1.TYPES.VarChar, estado);
            request.addParameter("codigo_postal", tedious_1.TYPES.SmallInt, parseInt(codigo_postal, 10));
            request.addParameter("contacto_persona", tedious_1.TYPES.VarChar, contacto_persona);
            request.addParameter("telefono", tedious_1.TYPES.SmallInt, parseInt(telefono, 10));
            request.addParameter("Id", tedious_1.TYPES.VarChar, id);
            pool.execSql(request);
        });
    }
});
exports.updateCompanyById = updateCompanyById;
