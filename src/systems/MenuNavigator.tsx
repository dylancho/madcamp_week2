import { Accessor, createEffect, createSignal, Setter } from "solid-js";
import { links } from "../property/Link"

export type stateType = "LogedOut" | "LogedIn" | "Playing";

class MenuNavigatorSys {
    curState: Accessor<stateType>
    setCurState: Setter<stateType>

    constructor() {
        const initialState = localStorage.getItem("curState") as stateType || "LogedOut";
        ([this.curState, this.setCurState] = createSignal<stateType>(initialState))
        
        // Update localStorage whenever curState changes
        createEffect(() => {
            localStorage.setItem("curState", this.curState());
        });
    }

    routePage = (menu: string) => {
        switch (menu) {
            case "login":
                window.location.href = links.localhost + "/login"
                break;
            case "logout":
                this.setCurState("LogedOut");
                window.location.href = links.localhost + "/"
                break;
            default:
                break;
        }
    }
}

export const menuNavigatorSys = new MenuNavigatorSys()