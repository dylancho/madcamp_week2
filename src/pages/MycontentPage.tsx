import { Component } from "solid-js";
import MyContentSection from "../layouts/myContentSection";
import SideNavigator from "../components/SideNavigator";
import { css } from "@emotion/css";

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

const MycontentPage: Component = () => {
    return (
        <div class={MainPageStyle}>
            <MyContentSection/>
            <SideNavigator/>
        </div>
    );
}

export default MycontentPage