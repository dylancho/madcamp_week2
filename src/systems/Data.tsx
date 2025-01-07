import {
  Accessor,
  createEffect,
  createResource,
  createSignal,
  onMount,
  Setter,
} from "solid-js";
import { links } from "../property/Link";
import { JsonValue } from "@prisma/client/runtime/library";
import { createStore, SetStoreFunction } from "solid-js/store";
import { menuNavigatorSys } from "./MenuNavigator";

export interface accountType {
  email: string;
  name: string;
  passward: string;
}

interface userType {
  id: number;
  email: string;
  name: string;
  passward: string;
  createdAt: Date;
  keys: string[];
  map: mapType[];
}

export interface mapType {
  name: string;
  id: number;
  createdAt: Date;
  creatorId: number;
  rating: number;
  config: number[];
}

class DataSys {
  curCreatingAccount: accountType;
  setCurCreatingAccount: SetStoreFunction<accountType>;

  curUser: userType;
  setCurUser: SetStoreFunction<userType>;

  numMaps: Accessor<number>;
  setNumMaps: Setter<number>;

  numMyMaps: Accessor<number>;
  setNumMyMaps: Setter<number>;

  constructor() {
    ([this.curCreatingAccount, this.setCurCreatingAccount] =
      createStore<accountType>({
        email: "",
        name: "",
        passward: "",
      })),
      ([this.curUser, this.setCurUser] = createStore<userType>({
        id: -1,
        email: "",
        name: "",
        passward: "",
        createdAt: new Date(),
        keys: [],
        map: [],
      })),
      ([this.numMaps, this.setNumMaps] = createSignal<number>(15)),
      ([this.numMyMaps, this.setNumMyMaps] = createSignal<number>(4)),
      onMount(() => {
        const savedUser = localStorage.getItem("curUser");
        const initialUser: userType = savedUser
          ? this.deserializeUser(JSON.parse(savedUser))
          : {
              id: -1,
              email: "",
              name: "",
              passward: "",
              createdAt: new Date(),
              keys: [],
              map: [],
            };

        [this.curUser, this.setCurUser] = createStore<userType>(initialUser);
      });
    // Update localStorage whenever curState changes
    createEffect(() => {
      localStorage.setItem("curUser", JSON.stringify(this.curUser)); // ?
    });
  }

  fetchUsers = async () => {
    const response = await fetch(links.serverAddress + "/users");
    return response.json();
  };

  addUser = async () => {
    await fetch(links.serverAddress + "/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.curCreatingAccount),
    });
  };

  getUser = async (email: string) => {
    const response = await fetch(links.serverAddress + "/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return response.json();
  };

  getUserList = () => {
    const [users] = createResource(this.fetchUsers);

    return (
      <ul>
        {users()?.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    );
  };

  // Signin function
  addSignedUser = async () => {
    if (await this.varifyInputs()) {
      console.log("insufficient information");
      window.location.href = links.localhost + "/signin";
    }

    const foundUser = await fetch(links.serverAddress + "/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: this.curCreatingAccount.email }),
    }).then((res) => res.json());
    console.log(foundUser);
    if (foundUser != null) {
      console.log("email already exist! :", this.curCreatingAccount.email);
      window.location.href = links.localhost + "/signin";
    } else {
      this.addUser();
      menuNavigatorSys.setCurState("LogedIn");
      window.location.href = links.localhost + "/";
    }
  };

  // Login function
  getUserLogedin = async () => {
    const foundUser = await this.getUser(this.curCreatingAccount.email);

    if (foundUser != null) {
      console.log("login success:", foundUser);
      menuNavigatorSys.setCurState("LogedIn");
      this.setCurUser("id", foundUser.id);
      this.setCurUser("email", foundUser.email);
      this.setCurUser("passward", foundUser.passward);
      this.setCurUser("name", foundUser.name);
      this.setCurUser("createdAt", foundUser.createdAt);
      console.log("info stored:", this.curUser.name);
      window.location.href = links.localhost + "/";
    } else {
      console.log("login failed");
      window.location.href = links.localhost + "/login";
    }
  };

  getKakaoUser = async () => {
    window.location.href = "http://localhost:4242/auth/kakao";
  };

  getKakaoUserLogedIn = async () => {
    const query = new URLSearchParams(window.location.search);
    const email = query.get("email");

    const foundUser = await this.getUser(email ? email : "");

    if (foundUser != null) {
      console.log("login success:", foundUser);
      menuNavigatorSys.setCurState("LogedIn");
      this.setCurUser("id", foundUser.id);
      this.setCurUser("email", foundUser.email);
      this.setCurUser("passward", foundUser.passward);
      this.setCurUser("name", foundUser.name);
      this.setCurUser("createdAt", foundUser.createdAt);
      console.log("info stored:", this.curUser.name);
    }
  };

  getMaps = async () => {
    try {
      const response = await fetch(links.serverAddress + "/maps");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching maps:", error);
      return [];
    }
  };

  putKeys = async (email, keys) => {
    try {
      const response = await fetch(links.serverAddress + "/putKeys", {
        method: "PUT", // Use the PUT method for updates
        headers: {
          "Content-Type": "application/json", // Ensure JSON payload is sent
        },
        body: JSON.stringify({ email, keys }), // Include email and keys in the request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json(); // Parse the JSON response
    } catch (error) {
      console.error("Error updating keys:", error);
      return null;
    }
  };

  postGrid = async (grid: number[]) => {
    const mapData = {
      name: this.curUser.name, // Replace with the logged-in user's name
      creatorId: this.curUser.id, // Replace with the logged-in user's unique ID
      config: grid, // The current grid data
    };

    try {
      const response = await fetch("http://localhost:4242/save/maps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mapData), // Properly stringify the mapData object
      });
      console.log(JSON.stringify(mapData));

      if (!response.ok) {
        throw new Error("Failed to save map");
      }

      const result = await response.json();
      console.log("Map saved successfully:", result);
      alert("Map saved successfully!");
    } catch (error) {
      console.error("Error saving map:", error);
      alert("Failed to save map. Please try again.");
    }
  };

  // ## utility functions ## //
  varifyInputs = () => {
    const { email, passward, name } = this.curCreatingAccount;
    return !email || !passward || !name;
  };

  // Function to deserialize user data
  deserializeUser(data: any): userType {
    return {
      ...data,
      createdAt: new Date(data.createdAt), // Convert string back to Date
    };
  }
}

export const dataSys = new DataSys();
