import express from "express";
import { db } from "./config/database";
import appRouter from "./app";

const app = express();
app.use(express.json());
const port = 5000;

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use("/app/api", appRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

declare global {
  interface BigInt {
      toJSON(): Number;
  }
}

BigInt.prototype.toJSON = function () { return Number(this) }
