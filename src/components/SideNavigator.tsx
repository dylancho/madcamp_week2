import { css } from "@emotion/css";
import { Component, For, onMount } from "solid-js";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import MenuIcon from "./MenuIcon";
import { menuNavigatorSys, menuType, stateType } from "../systems/MenuNavigator";

const SideNavigatorStyle = css({
    // flex
    display: "flex",
    flexDirection: "column",
    // position
    // scale
    width: Size.navigator.width,
    height: "100vh",
    // text
    // color
    backgroundColor: Color.grayLight,
    // space
    gap: Size.space.xl,
    // other
})

const LogoStyle = css({
    // flex
    // position
    // scale
    width: 60,
    height: 60,
    // text
    // color
    backgroundColor: Color.grayDark,
    // space
    margin: 20,
    // other
})

const menus: Record<stateType, menuType[]> = {
    "LogedOut": ["login", "help", "setting"],
    "LogedIn": ["mycontent", "help", "setting", "logout"],
    "Playing": ["quit", "mycontent", "help", "setting", "logout"]
}

const SideNavigator: Component = () => {

    return (
        <div class={SideNavigatorStyle}>
            <div class={LogoStyle}></div>
            <For each={menus[menuNavigatorSys.curState()]}>{(menu, _) =>
                <MenuIcon menu={menu}></MenuIcon>
            }</For>
        </div>
    )
}

export default SideNavigator;