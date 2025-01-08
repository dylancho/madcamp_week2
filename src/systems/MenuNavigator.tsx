import { Accessor, createEffect, createSignal, Setter } from "solid-js";
import { links } from "../property/Link"
import { dataSys } from "./Data";
import { dialogSys } from "./DialogControl";

export type stateType = "LogedOut" | "LogedIn" | "Playing";
export type menuType = "login" | "logout" | "help" | "setting" | "quit" | "mycontent";

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
                dataSys.setCurUser(
                    {
                        id: -1,
                        email: '',
                        name: '',
                        passward: '',
                        createdAt: new Date(),
                        map: [],
                    }
                );
                window.location.href = links.localhost + "/"
                break;
            case "mycontent":
                window.location.href = links.localhost + '/mycontent'
                break;
            case "help":
                dialogSys.setIsHelpDialogOpen(true);
                break;
            case "setting":
                dialogSys.setIsSettingDialogOpen(true);
                break;
            default:
                break;
        }
    }
}

export const menuNavigatorSys = new MenuNavigatorSys()