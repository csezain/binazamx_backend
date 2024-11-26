import express from "express";
import { db } from "../../config/database";
import bcrypt from "bcryptjs";

const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
  // Login with bcrypt and jwt

  const { email, passowrd } = req.body;

  try {
    const user = await db.users.findFirst({
      where: {
        email: email,
      },
    });

    const match = bcrypt.compareSync(passowrd, user?.password || "");

    if (match) {
      res.status(200).json({
        user:{
            
        },
      });
    }
  } catch (error) {}
});
