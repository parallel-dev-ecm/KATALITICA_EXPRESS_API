import express from "express";
import config from "./config";
import compañiaRoutes from "./routes/compañias.routes";

const app = express();
//Settings
app.set("port", config.port);
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compañiaRoutes);

export default app;
