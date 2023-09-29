import app from "./app";
import { getCompany } from "./controllers/compañias.controller";

app.listen(app.get("port"));
console.log("Server on port + " + app.get("port"));
