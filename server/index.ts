import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { accountType } from "../src/systems/Data";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const prisma = new PrismaClient();

const KAKAO_CLIENT_ID = "5dc16f5630ecc658d6e41449c09125ac";
const KAKAO_REDIRECT_URI = "http://localhost:4242/auth/kakao/callback";

app.use(cors());
app.use(express.json());

// Sample route
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      Map: true, // include the realted Map for each user
    },
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

    res
      .status(201)
      .json({
        message: "User added successfully :" + newUser.name,
        user: newUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "[Error] An error occurred while adding the user" });
  }
});

app.post("/getUser", async (req, res) => {
  try {
    const { email, passward } = req.body;

    const foundUser = await prisma.user.findFirst({
      where: {
        email: email,
        passward: passward,
      },
    });

    res.status(200).json(foundUser);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "[Error] An error occurred while looking for the user",
      });
  }
});

app.post("/getUserByID", async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    res.status(200).json(foundUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "[Error] An error occurred while checking the email" });
  }
});

app.get("/auth/kakao", (req, res) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoAuthUrl);
});

app.get("/auth/kakao/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: KAKAO_REDIRECT_URI,
          code,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { id, kakao_account } = userInfoResponse.data;

    // Check for existing user or create a new one
    let user = await prisma.user.findFirst({
      where: { email: kakao_account.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: kakao_account.email,
          name: kakao_account.profile.nickname,
          passward: `kakao-${id}`, // Placeholder password for Kakao users
        },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error during Kakao Login:",
        error.response?.data || error.message
      );
      res
        .status(500)
        .json({
          message: "Kakao Login failed 1",
          error: error.response?.data || error.message,
        });
    } else if (error instanceof Error) {
      console.error("Generic error during Kakao Login:", error.message);
      res
        .status(500)
        .json({ message: "Kakao Login failed 2", error: error.message });
    } else {
      console.error("Unknown error during Kakao Login:", error);
      res
        .status(500)
        .json({ message: "Kakao Login failed 3", error: "Unknown error" });
    }
  }
});

app.listen(4242, () => {
  console.log("Server running on http://localhost:4242");
});
