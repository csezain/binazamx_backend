import express from "express";
import { db } from "./config/database";

const app = express.Router();

app.get("/", async (req, res) => {
  console.log("before");

  const users = await db.users.findMany({
    take: 10,
  });

  res.status(200).json({
    message: "Hello, TypeScript Node Express!",
    result: users,
  });
});

export default app;
