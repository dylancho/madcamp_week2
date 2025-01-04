import { Accessor, createResource, createSignal, Setter } from "solid-js";
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

    numMaps: Accessor<number>
    setNumMaps: Setter<number>

    constructor() {
        ([this.curCreatingAccount, this.setCurCreatingAccount] = createStore<accountType>({email: "", name: "", passward: ""})),
        ([this.numMaps, this.setNumMaps] = createSignal<number>(15))
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

    getUser = async (email: string, passward: string) => {
        const response = await fetch(links.serverAddress + '/getUser', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, passward})
        });
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
        if (!(await this.varifyInputs())) {
            console.log("insufficient information");
            window.location.href = links.localhost + "/signin"
        }

        const foundUser = await fetch(links.serverAddress + '/getUserById', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: this.curCreatingAccount.email})
        })
        
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
            console.log("login success");
            menuNavigatorSys.setCurState("LogedIn");
            window.location.href = links.localhost + "/"
        } else {
            console.log("login failed");
            window.location.href = links.localhost + "/login"
        }
    }

    varifyInputs = () => {
        const {email, passward, name} = this.curCreatingAccount;
        return !email || !passward || !name
    }
}

export const dataSys = new DataSys()