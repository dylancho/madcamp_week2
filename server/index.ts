import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { accountType, dataSys, mapType } from "../src/systems/Data";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const prisma = new PrismaClient();

const CLIENT_DOMAIN = "http://localhost:3000";
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

app.get("/maps", async (req, res) => {
  try {
    const maps = await prisma.map.findMany();
    res.json(maps);
  } catch (error) {
    console.error("Error fetching maps:", error);
    res.status(500).json({ error: "Failed to fetch maps" });
  }
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

    res.status(201).json({
      message: "User added successfully :" + newUser.name,
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "[Error] An error occurred while adding the user" });
  }
});

app.put("/putKeys", async (req, res) => {
  try {
    const { email, keys } = req.body; // Extract email and keys from request body
    // Update the user's keys
    const updatedUser = await prisma.user.update({
      where: {
        email: email
      }, // Filter by email
      data: {
        keys : keys,
      }, // Update the keys field
    });

    res.json({
      message: "Keys updated successfully",
      updatedKeys: updatedUser.keys
    });
  } catch (error) {
    console.error("Error updating keys:", error);
  }
});

app.post("/getUser", async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({
      message: "[Error] An error occurred while looking for the user",
    });
  }
});

app.post("/save/maps", async (req, res) => {
  try {
    const { name, creatorEmail, config }: mapType = req.body;
    // Create a new map in the database
    const newMap = await prisma.map.create({
      data: {
        name,
        config,
        creator: {
          connect: {
            email: creatorEmail // Connect to the existing user
          },
        },
      },
    });

    res.status(201).json({
      message: "Map added successfully: " + newMap.name,
      map: newMap,
    });
  } catch (error) {
    console.error("[Error] Failed to add map:", error);
    res
      .status(500)
      .json({ message: "[Error] An error occurred while adding the map" });
  }
});

app.get("/auth/kakao", (req, res) => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  res.redirect(kakaoAuthUrl);
});

app.get("/auth/kakao/callback", async (req, res) => {
  const { code } = req.query;
  try {
    // 1. get the acess token
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

    // 2. get the user information
    const userInfoResponse = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { id, kakao_account } = userInfoResponse.data;

    // 3. check for existing user or create a new one
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

    const redirectUrl = `${CLIENT_DOMAIN}/?email=${encodeURIComponent(
      user.email
    )}`;
    res.redirect(redirectUrl);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error during Kakao Login:",
        error.response?.data || error.message
      );
      res.status(500).json({
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
