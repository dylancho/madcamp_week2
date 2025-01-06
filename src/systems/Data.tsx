import { Accessor, createEffect, createResource, createSignal, onMount, Setter } from "solid-js";
import { links } from "../property/Link"
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
    map: mapType[];
}

interface mapType {
    name: string;
    id: number;
    createdAt: Date;
    creatorId: number;
    rating: number;
    config: JsonValue;
}

class DataSys {
    curCreatingAccount: accountType
    setCurCreatingAccount: SetStoreFunction<accountType>

    curUser: userType
    setCurUser: SetStoreFunction<userType>

    numMaps: Accessor<number>
    setNumMaps: Setter<number>

    numMyMaps: Accessor<number>
    setNumMyMaps: Setter<number>


    constructor() {
        ([this.curCreatingAccount, this.setCurCreatingAccount] = createStore<accountType>({
            email: "",
            name: "",
            passward: ""
        })),
        ([this.curUser, this.setCurUser] = createStore<userType>({
            id: -1,
            email: '',
            name: '',
            passward: '',
            createdAt: new Date(),
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
                  email: '',
                  name: '',
                  passward: '',
                  createdAt: new Date(),
                  map: [],
                };
        
            [this.curUser, this.setCurUser] = createStore<userType>(initialUser);
        })
        // Update localStorage whenever curState changes
        createEffect(() => {
            localStorage.setItem("curUser", JSON.stringify(this.curUser)); // ?
        });
    }

    fetchUsers = async () => {
        const response = await fetch(links.serverAddress + '/users');
        return response.json()
    };

    addUser = async () => {
        await fetch(links.serverAddress + '/addUser',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.curCreatingAccount)
        });
    }

    getUser = async (email: string) => {
        const response = await fetch(links.serverAddress + '/getUser', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email})
        });
        return response.json()
    }

    getKakaoUser = async () => {
        const response = await fetch(links.serverAddress + '/auth/kakao');
        return response.json()
    }

    getUserList = () => {
        const [users] = createResource(this.fetchUsers);

        return(
            <ul>
                {users()?.map(user => (
                    <li>{user.name}</li>
                ))}
            </ul>
        )
    }

    // Signin function
    addSignedUser = async () => {
        if (await this.varifyInputs()) {
            console.log("insufficient information");
            window.location.href = links.localhost + "/signin"
        }

        const foundUser = await fetch(links.serverAddress + '/getUser', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: this.curCreatingAccount.email})
        }).then(res => res.json())
        console.log(foundUser)
        if (foundUser != null) {
            console.log("email already exist! :", this.curCreatingAccount.email);
            window.location.href = links.localhost + "/signin"
        } else {
            this.addUser();
            menuNavigatorSys.setCurState("LogedIn");
            window.location.href = links.localhost + "/"
        }
    }

    // Login function
    getUserLogedin = async () => {
        const foundUser = await this.getUser(this.curCreatingAccount.email, this.curCreatingAccount.passward);
        
        if (foundUser != null) {
            console.log("login success:", foundUser);
            menuNavigatorSys.setCurState("LogedIn");
            this.setCurUser("id", foundUser.id);
            this.setCurUser("email", foundUser.email);
            this.setCurUser("passward", foundUser.passward);
            this.setCurUser("name", foundUser.name);
            this.setCurUser("createdAt", foundUser.createdAt);
            console.log("info stored:", this.curUser.name);
            window.location.href = links.localhost + "/"
        } else {
            console.log("login failed");
            window.location.href = links.localhost + "/login"
        }
    }

    // Login function (kakao)
    getKakaoUserLogedin = async () => {
        const foundUser = await this.getKakaoUser();

        if (foundUser != null) {
            console.log("login success:", foundUser);
            menuNavigatorSys.setCurState("LogedIn");
            this.setCurUser("id", foundUser.id);
            this.setCurUser("email", foundUser.email);
            this.setCurUser("passward", foundUser.passward);
            this.setCurUser("name", foundUser.name);
            this.setCurUser("createdAt", foundUser.createdAt);
            console.log("info stored:", this.curUser.name);
            window.location.href = links.localhost + "/"
        } else {
            console.log("login failed");
            window.location.href = links.localhost + "/login"
        }
    }

    getKakaoUser = async () => {
        window.location.href = "http://localhost:4242/auth/kakao";
    }

    getKakaoUserLogedIn = async () => {
        const query = new URLSearchParams(window.location.search);
        const email = query.get("email");

        const foundUser = await this.getUser(email? email : "");
        
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
    }

    // ## utility functions ## //
    varifyInputs = () => {
        const {email, passward, name} = this.curCreatingAccount;
        return !email || !passward || !name
    }

    // Function to deserialize user data
    deserializeUser(data: any): userType {
        return {
        ...data,
        createdAt: new Date(data.createdAt), // Convert string back to Date
        };
    }
}

export const dataSys = new DataSys()