import { createResource } from "solid-js";
import { links } from "../property/Link"
import { JsonValue } from "@prisma/client/runtime/library";
import { createStore, SetStoreFunction } from "solid-js/store";

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

    constructor() {
        ([this.curCreatingAccount, this.setCurCreatingAccount] = createStore<accountType>({email: "", name: "", passward: ""}))
    }

    fetchUsers = async () => {
        const response = await fetch(links.serverAddress + '/users');
        return response.json();
    };

    addUser = async () => {
        await fetch(links.serverAddress + '/addUser',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.curCreatingAccount)
        });
        window.location.href = links.localhost + "/"
        console.log("addUser() called")
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
}

export const dataSys = new DataSys()