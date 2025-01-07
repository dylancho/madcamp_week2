import { css } from "@emotion/css";
import { Component, Match, Switch } from "solid-js";
import { menuNavigatorSys, menuType } from "../systems/MenuNavigator";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import { IcHelp, IcLogin, IcLogout, IcMycontent, IcSetting } from "./Icons";

const MenuIconStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // position
    // scale
    width: '80%',
    // text
    // color
    // space
    gap: Size.space.s,
    // other
    transition: "transform 0.2s ease-in-out",
    ":hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
    },
    ":active": {
        transform: "scale(0.95)",
    },
    "span": {
        // flex
        // position
        // scale
        // text
        fontSize: Size.font.xs,
        fontWeight: "bold",
        // color
        color: Color.mainDark,
        // space
        // other
    }
})

const menuKR = {
    "login": "로그인",
    "logout": "로그아웃",
    "help": "도움말",
    "setting": "키 설정",
    "quit": "나가기",
    "mycontent": "내 파일"
}

const MenuIcon: Component<{menu: menuType}> = ({menu}) => {

    return (
        <div class={MenuIconStyle} onclick={() => menuNavigatorSys.routePage(menu)}>
            <Switch>
                <Match when={menu === "login"}>
                    <IcLogin/>
                </Match>
                <Match when={menu === "logout"}>
                    <IcLogout/>
                </Match>
                <Match when={menu === "help"}>
                    <IcHelp/>
                </Match>
                <Match when={menu === "setting"}>
                    <IcSetting/>
                </Match>
                <Match when={menu === "mycontent"}>
                    <IcMycontent/>
                </Match>
            </Switch>
            <span>{menuKR[menu]}</span>
        </div>
    )
}

export default MenuIcon;