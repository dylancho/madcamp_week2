import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { accountType } from "../src/systems/Data";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Sample route
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      Map: true, // include the realted Map for each user
    }
  });
  res.json(users);
});

app.post("/addUser", async (req, res) => {
  try {
    const { email, name, passward }: accountType = req.body;
    console.log(email, name, passward);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        passward,
      },
    });

    res.status(201).json({ message: "User added successfully :" + newUser.name, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "[Error] An error occurred while adding the user"});
  }
})

app.post("/getUser",  async (req, res) => {
  try {
    const { email, passward } = req.body;

    const foundUser = await prisma.user.findFirst({
      where: {
        email: email,
        passward: passward
      },
    })
    
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ message: "[Error] An error occurred while looking for the user"});
  }
})

app.post("/getUserByID",  async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await prisma.user.findFirst({
      where: {
        email: email
      },
    })
    
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ message: "[Error] An error occurred while checking the email"});
  }
})

app.listen(4242, () => {
  console.log("Server running on http://localhost:4242");
});
