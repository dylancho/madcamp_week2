import { css } from "@emotion/css";
import { Component, For, onMount } from "solid-js";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import MenuIcon from "./MenuIcon";
import { menuNavigatorSys, menuType, stateType } from "../systems/MenuNavigator";
import { links } from "../property/Link";
import { Dialog, HelpDialog, MapDialog, SettingDialog } from "../components/Dialog";
import { dataSys } from "../systems/Data";

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
    boxShadow: '5px 0px 10px 10px rgba(0, 0, 0, 0.1)',
})

const LogoStyle = css({
    // flex
    // position
    // scale
    width: 64,
    height: 64,
    // text
    // color
    // space
    margin: 20,
    // other
    transition: "transform 0.5s ease-in-out",
    ":hover": {
        cursor: "pointer",
        transform: "scale(1.05)",
    },
})

const menus: Record<stateType, menuType[]> = {
    "LogedOut": ["login", "help", "setting"],
    "LogedIn": ["mycontent", "help", "setting", "logout"],
    "Playing": ["quit", "mycontent", "help", "setting", "logout"]
}

const SideNavigator: Component = () => {
    onMount(() => {
        const fetchUser = async() => {
            const keySet = await dataSys.getUser(dataSys.curUser.email);
            if (keySet){
                dataSys.setCurUser('keys', keySet.keys);
            }
        }
        fetchUser();
        console.log('key load', dataSys.curUser);
    })

    return (
        <>
        <div class={SideNavigatorStyle}>
            <img src="/ic_logo_banner.svg" class={LogoStyle} onClick={() => window.location.href = links.localhost + "/"}></img>
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