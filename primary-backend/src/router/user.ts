import { Router } from "express";
import { authMiddleware } from "../middleware";
import { signInSchema, singUpSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
const router = Router();

router.post("/signup", async (req, res) => {
    console.log("signup")
  const body = req.body;
  const parsedData = singUpSchema.safeParse(body);
 
  if (!parsedData.success) {
    console.log(parsedData.error)
    return res.status(411).json({
      message: " Incorrect input",
    });
  }
  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });
  if (userExists) {
    return res.status(403).json({
      message: " User already exists",
    });
  }
  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });
  return res.json({
    message: " Please verify your account",
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = signInSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(411).json({
      message: " Incorrect input",
    });
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });
  if (!user) {
    return res.status(403).json({
      message: " wrong credentials",
    });
  }
  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );
  res.json({
    token: token,
  });
});

router.get("/", authMiddleware, async(req, res) => {
//   @ts-ignore
    const id = req.id;
    const user = await  prismaClient.user.findFirst({
        where:{
            id
        },
        select:{
            name: true,
            email:true
        }
    })
    return res.json([
        user
    ])
});

export const userRouter = router;
