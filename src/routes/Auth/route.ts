import express, { Request, Response } from "express";
import { db } from "../../config/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  // Login with bcrypt and jwt

  const { email, passowrd } = req.body;

  try {
    const user = await db.users.findFirst({
      where: {
        email: email,
      },
    });

    const match = await bcrypt.compare(passowrd, user?.password || "");

    const token = jwt.sign(
      { id: user?.id, email: user?.email, role: user?.type },
      String(process.env.JWT_SECRET)
    );

    if (match) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          token: token,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Login failed",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      data: null,
    });
  }
});
