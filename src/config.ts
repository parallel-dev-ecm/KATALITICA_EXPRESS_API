import { config } from "dotenv";

config();

const port: number = parseInt(process.env.PORT || "1000", 10);
console.log(process.env.HELLO);

export default {
  port,
};
