import { links } from "../property/Link"

class MenuNavigatorSys {
    routePage = (menu: string) => {
        switch (menu) {
            case "login":
                window.location.href = links.localhost + "/login"
                break;
            default:
                break;
        }
    }
}

export const menuNavigatorSys = new MenuNavigatorSys()