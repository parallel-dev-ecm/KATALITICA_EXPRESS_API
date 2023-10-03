// compañias.controller.mjs
import { getConnection } from "../api/connection";
import { Request, TYPES } from "tedious";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import queries from "../api/queries";

// Define a type for the row object
type RowData = {
  [key: string]: any;
};

const table = "[Generales].[Companias]";

export const getCompany = async (req: ExpressRequest, res: ExpressResponse) => {
  const connection = await getConnection();
  const jsonArray: RowData[] = [];

  connection.on("connect", (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      res
        .status(500)
        .json({ error: "Internal Server Error - Database Connection" });
      return;
    }

    const query = queries.getAllCompanies(table); // Check that this matches your table name

    console.log("Executing query:", query); // Log the query being executed

    var request = new Request(query, function (err) {
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
      const row: RowData = {};
      columns.forEach(function (column) {
        row[column.metadata.colName] = column.value;
      });
      jsonArray.push(row);
    });

    request.on("doneProc", function (rowCount) {
      if (rowCount === 0) {
        console.log("No rows returned");
        res.status(404).json({ error: "No data found" });
      } else {
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
};
export const createNewCompany = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  const {
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
  } = req.body;
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

  const hasEmptyOrNullValue = Object.values(inputData).some(
    (value) => value === null || value === ""
  );
  if (hasEmptyOrNullValue) {
    return res.status(400).json({ msg: "Bad request. Please fill all forms" });
  } else {
    const pool = await getConnection();

    pool.on("connect", (err) => {
      if (err) {
        console.error("Error connecting to the database:", err.message);
        res
          .status(500)
          .json({ error: "Internal Server Error - Database Connection" });
        return;
      }

      const query = queries.insertIntoCompania(table);

      console.log("Executing query:", query); // Log the query being executed

      var request = new Request(query, function (err) {
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
        } else {
          res.json("Added Row");
        }
      });

      request.on("requestCompleted", () => {
        pool.close();
      });
      request.addParameter("clave_compania", TYPES.VarChar, clave_compania);
      request.addParameter("rfc", TYPES.VarChar, rfc);
      request.addParameter("razon_social", TYPES.VarChar, razon_social);
      request.addParameter("nombre_corto", TYPES.VarChar, nombre_corto);
      request.addParameter("nombre_largo", TYPES.VarChar, nombre_largo);
      request.addParameter("calle", TYPES.VarChar, calle);
      request.addParameter("colonia", TYPES.VarChar, colonia);
      request.addParameter("estado", TYPES.VarChar, estado);
      request.addParameter(
        "codigo_postal",
        TYPES.SmallInt,
        parseInt(codigo_postal, 10)
      );
      request.addParameter("contacto_persona", TYPES.VarChar, contacto_persona);
      request.addParameter("telefono", TYPES.SmallInt, parseInt(telefono, 10));

      pool.execSql(request);
    });
  }
};
export const getCompanyById = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  const pool = await getConnection();
  const { id } = req.params;
  const jsonArray: RowData[] = [];

  pool.on("connect", (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      res
        .status(500)
        .json({ error: "Internal Server Error - Database Connection" });
      return;
    }

    const query = queries.getCompanyById(table);

    console.log("Executing query:", query); // Log the query being executed

    var request = new Request(query, function (err) {
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
      const row: RowData = {};
      columns.forEach(function (column) {
        row[column.metadata.colName] = column.value;
      });
      jsonArray.push(row);
    });

    request.on("doneProc", function (rowCount) {
      if (rowCount === 0) {
        console.log("No rows returned");
        res.status(404).json({ error: "No data found" });
      } else {
        const responseData = {
          data: jsonArray,
        };
        res.json(responseData);
      }
    });

    request.on("requestCompleted", () => {
      pool.close();
    });

    request.addParameter("Id", TYPES.VarChar, id);
    pool.execSql(request);
  });
};

export const deleteCompanyById = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  const pool = await getConnection();
  const { id } = req.params;

  pool.on("connect", (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      res
        .status(500)
        .json({ error: "Internal Server Error - Database Connection" });
      return;
    }

    const query = queries.deleteCompanyById(table);

    console.log("Executing query:", query); // Log the query being executed

    var request = new Request(query, function (err) {
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
      } else {
        res.send(`Succesfully deleted from ${table} row with id: ${id}`);
      }
    });

    request.on("requestCompleted", () => {
      pool.close();
    });

    request.addParameter("Id", TYPES.VarChar, id);
    pool.execSql(request);
  });
};

export const updateCompanyById = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  const {
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
  } = req.body;
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

  const hasEmptyOrNullValue = Object.values(inputData).some(
    (value) => value === null || value === ""
  );
  if (hasEmptyOrNullValue) {
    return res.status(400).json({ msg: "Bad request. Please fill all forms" });
  } else {
    const pool = await getConnection();

    pool.on("connect", (err) => {
      if (err) {
        console.error("Error connecting to the database:", err.message);
        res
          .status(500)
          .json({ error: "Internal Server Error - Database Connection" });
        return;
      }

      const query = queries.updateCompanyById(table);

      console.log("Executing query:", query); // Log the query being executed

      var request = new Request(query, function (err) {
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
        } else {
          res.json(inputData);
        }
      });

      request.on("requestCompleted", () => {
        pool.close();
      });
      request.addParameter("clave_compania", TYPES.VarChar, clave_compania);
      request.addParameter("rfc", TYPES.VarChar, rfc);
      request.addParameter("razon_social", TYPES.VarChar, razon_social);
      request.addParameter("nombre_corto", TYPES.VarChar, nombre_corto);
      request.addParameter("nombre_largo", TYPES.VarChar, nombre_largo);
      request.addParameter("calle", TYPES.VarChar, calle);
      request.addParameter("colonia", TYPES.VarChar, colonia);
      request.addParameter("estado", TYPES.VarChar, estado);
      request.addParameter(
        "codigo_postal",
        TYPES.SmallInt,
        parseInt(codigo_postal, 10)
      );
      request.addParameter("contacto_persona", TYPES.VarChar, contacto_persona);
      request.addParameter("telefono", TYPES.SmallInt, parseInt(telefono, 10));
      request.addParameter("Id", TYPES.VarChar, id);

      pool.execSql(request);
    });
  }
};
