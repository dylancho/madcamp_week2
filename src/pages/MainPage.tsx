import { Component } from "solid-js";
import { css } from "@emotion/css"
import SideNavigator from "../components/SideNavigator";
import MainSection from "../layouts/mainSection";

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
            <MainSection></MainSection>
            <SideNavigator state="LogedOut"></SideNavigator>
        </div>
    );
}

export default MainPage