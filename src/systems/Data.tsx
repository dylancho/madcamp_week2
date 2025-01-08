import {
  Accessor,
  createEffect,
  createResource,
  createSignal,
  onMount,
  Setter,
} from "solid-js";
import { links } from "../property/Link";
import { createStore, SetStoreFunction } from "solid-js/store";
import { menuNavigatorSys } from "./MenuNavigator";
import { workplaceSys } from "./Workplace";

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
  creatorEmail: string;
  rating: number;
  config: number[];
}

class DataSys {
  curCreatingAccount: accountType;
  setCurCreatingAccount: SetStoreFunction<accountType>;

  searchQuery: Accessor<string>;
  setSearchQuery: Setter<string>;

  curUser: userType;
  setCurUser: SetStoreFunction<userType>;

  curMap: mapType;
  setCurMap: SetStoreFunction<mapType>;

  numMaps: Accessor<number>;
  setNumMaps: Setter<number>;

  numMyMaps: Accessor<number>;
  setNumMyMaps: Setter<number>;

  mapCreator: Accessor<string>;
  setMapCreator: Setter<string>;

  mapDate: Accessor<string>;
  setMapDate: Setter<string>;

  emailError: Accessor<boolean>;
  setEmailError: Setter<boolean>;

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
        keys: ["keyRight", "keyLeft", "keyDown", "keyUp", "2", "3"],
        map: [],
      })),
      ([this.curMap, this.setCurMap] = createStore<mapType>({
        name: "",
        id: -1,
        createdAt: new Date(),
        creatorEmail: "",
        rating: 0.0,
        config: [],
      })),
      ([this.numMaps, this.setNumMaps] = createSignal<number>(0)),
      ([this.numMyMaps, this.setNumMyMaps] = createSignal<number>(0)),
      ([this.mapCreator, this.setMapCreator] = createSignal<string>("")),
      ([this.mapDate, this.setMapDate] = createSignal<string>("")),
      ([this.emailError, this.setEmailError] = createSignal<boolean>(false)),
      ([this.searchQuery, this.setSearchQuery] = createSignal<string>("")),
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
              keys: ["keyRight", "keyLeft", "keyDown", "keyUp", "2", "3"],
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
    const response = await fetch(links.serverAddress + "/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.curCreatingAccount),
    });
    return response.json();
  };

  getUser = async (email: string) => {
    const response = await fetch(links.serverAddress + "/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return response.json();
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

    if (foundUser != null) {
      console.log("email already exist! :", this.curCreatingAccount.email);
      this.setEmailError(true);
      setTimeout(() => {
        window.location.href = links.localhost + "/signin";
      }, 1000); // Delay by 100 milliseconds
    } else {
      this.setEmailError(false);
      this.addUser()
        .then((res) => dataSys.setCurUser(res.user))
        .then(() => menuNavigatorSys.setCurState("LogedIn"))
        .then(() => {
          window.location.href = links.localhost + "/";
        });
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

  getMapById = async (id: number) => {
    try {
      const response = await fetch(links.serverAddress + "/map/id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching maps:", error);
      return [];
    }
  };

  getMapsByEmail = async (email: string) => {
    try {
      const response = await fetch(links.serverAddress + "/maps/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching maps:", error);
      return [];
    }
  };

  getMapsAmount = async () => {
    const response = await fetch(links.serverAddress + "/maps/amount");
    return response.json();
  };

  getMapsAmountByEmail = async (email: string) => {
    const response = await fetch(links.serverAddress + "/maps/amount/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return response.json();
  };

  putKeys = async (email: string, keys: string[]) => {
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
      name: workplaceSys.curMapName(),
      creatorEmail: this.curUser.email, // Replace with the logged-in user's unique ID
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
