import { Component } from "solid-js";
import { css } from "@emotion/css"
import SideNavigator from "../components/SideNavigator";
import MainSection from "../layouts/mainSection";
import { Dialog, HelpDialog, MapDialog, SettingDialog } from "../components/Dialog";
import { controlSys } from "../systems/Control";

const MainPageStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'row',
    // position
    // scale
    // text
    // color
    // space
    // other
})

const MainPage: Component = () => {
    return (
        <div class={MainPageStyle}>
            <MainSection/>
            <SideNavigator/>
            <MapDialog/>
            <HelpDialog/>
            <SettingDialog/>
        </div>
    );
}

export default MainPage