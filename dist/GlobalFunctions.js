"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tedious_1 = require("tedious");
// Function to execute SQL query
const executeSQL = (connection, sqlQuery, callback) => {
    const results = [];
    // Create a new request object with the SQL query
    const request = new tedious_1.Request(sqlQuery, (err) => {
        if (err) {
            callback(err);
        }
        else {
            // SQL query executed successfully, pass the results to the callback
            callback(null, results);
        }
    });
    // Process each row of the result set
    request.on("row", (columns) => {
        const row = {
            rfc: "",
            razonSocial: "",
            nombreCorto: "",
            nombreLargo: "",
            calle: "",
            colonia: "",
            estado: "",
            codigoPostal: 0,
            contactoPersona: "",
            telefono: 0,
        };
        // Iterate through the columns and add them to the row object
        columns.forEach((column) => {
            // Map the column names to the corresponding properties in the Company object
            if (column.metadata) {
                switch (column.metadata.colName) {
                    case "rfc":
                        row.rfc = column.value;
                        break;
                    case "razonSocial":
                        row.razonSocial = column.value;
                        break;
                    case "nombreCorto":
                        row.nombreCorto = column.value;
                        break;
                    case "nombreLargo":
                        row.nombreLargo = column.value;
                        break;
                    case "calle":
                        row.calle = column.value;
                        break;
                    case "colonia":
                        row.colonia = column.value;
                        break;
                    case "estado":
                        row.estado = column.value;
                        break;
                    case "codigoPostal":
                        row.codigoPostal = column.value;
                        break;
                    case "contactoPersona":
                        row.contactoPersona = column.value;
                        break;
                    case "telefono":
                        row.telefono = column.value;
                        break;
                    // Add cases for other properties
                }
            }
        });
        results.push(row);
    });
    // Handle any errors that occur during the request
    request.on("error", (err) => {
        callback(err);
    });
    // Execute the SQL query using the connection
    connection.execSql(request);
};
exports.default = executeSQL;
