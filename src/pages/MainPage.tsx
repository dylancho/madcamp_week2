import { Component, createEffect } from "solid-js";
import { css } from "@emotion/css"
import SideNavigator from "../components/SideNavigator";
import MainSection from "../layouts/mainSection";
import { dataSys } from "../systems/Data";

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
    createEffect(() => dataSys.getKakaoUserLogedIn())

    return (
        <div class={MainPageStyle}>
            <MainSection/>
            <SideNavigator/>
        </div>
    );
}

export default MainPage