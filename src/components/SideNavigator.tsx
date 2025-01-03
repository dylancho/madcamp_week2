import { css } from "@emotion/css";
import { Component, For, onMount } from "solid-js";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import MenuIcon from "./MenuIcon";

type stateType = "LogedOut" | "LogedIn" | "Playing";

const SideNavigatorStyle = css({
    // flex
    // position
    // scale
    width: Size.navigator.width,
    height: "100vh",
    // text
    // color
    backgroundColor: Color.grayLight,
    // space
    // other
})

const menus = {
    "LogedOut": ["login", "help", "setting"],
    "LogedIn": ["myContent", "help", "setting", "logout"],
    "Playing": ["quit", "myContent", "help", "setting", "logout"]
}

const SideNavigator: Component<{state: stateType}> = ({state}) => {

    return (
        <div class={SideNavigatorStyle}>
            <For each={menus[state]}>{(menu, _) =>
                <MenuIcon menu={menu}></MenuIcon>
            }</For>
        </div>
    )
}

export default SideNavigator;