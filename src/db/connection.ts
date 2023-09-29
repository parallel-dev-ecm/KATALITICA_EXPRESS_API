// "201.131.21.32"
import { Connection, ConnectionConfig, Request, TYPES } from "tedious";

const config: ConnectionConfig = {
  server: "201.131.21.32", // Update me
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER, // Update me
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

export async function getConnection(): Promise<Connection> {
  const pool = new Connection(config);
  pool.on("connect", (err) => {
    if (err) {
      console.error(`Connection error: ${err.message}`);
    } else {
      console.log("Connected");
    }
  });

  pool.connect();
  return pool;
}
