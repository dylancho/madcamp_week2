import { css } from "@emotion/css";
import { Component, For } from "solid-js";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import MenuIcon from "./MenuIcon";
import { menuNavigatorSys, menuType, stateType } from "../systems/MenuNavigator";
import { links } from "../property/Link";
import { Dialog, HelpDialog, MapDialog, SettingDialog } from "../components/Dialog";

const SideNavigatorStyle = css({
    // flex
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    // position
    // scale
    width: Size.navigator.width,
    height: "100vh",
    // text
    // color
    backgroundColor: Color.grayLight,
    // space
    gap: Size.space.l,
    // other
    boxShadow: '0 -2 14px 14px rgba(0, 0, 0, 0.1)',
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
    cursor: "pointer",
})

const menus: Record<stateType, menuType[]> = {
    "LogedOut": ["login", "help", "setting"],
    "LogedIn": ["mycontent", "help", "setting", "logout"],
    "Playing": ["quit", "mycontent", "help", "setting", "logout"]
}

const SideNavigator: Component = () => {

    return (
        <>
        <div class={SideNavigatorStyle}>
            <div class={LogoStyle} onClick={() => window.location.href = links.localhost + "/"}></div>
            <For each={menus[menuNavigatorSys.curState()]}>{(menu, _) =>
                <MenuIcon menu={menu}></MenuIcon>
            }</For>
        </div>
        <MapDialog/>
        <HelpDialog/>
        <SettingDialog/>
        </>
    )
}

export default SideNavigator;