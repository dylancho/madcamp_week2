import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Size } from "../property/Size";
import MainMenuSection from "./mainMenuSection";
import { dataSys } from "../systems/Data";
import { Color } from "../property/Color";
import { MapDisplay } from "../components/MapDisplay";
import MyContentProfileSection from "./myContentProfileSection";

const MyContentSectionStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
    // position
    // scale
    // text
    // color
    // space
    margin: Size.space.edge,
    // other
})

const MyContentTitleStyle = css({
    // flex
    // position
    // scale
    // text
    fontSize: Size.font.l,
    // color
    // space
    // other
    ":hover": {
        filter: 'brightness(1.12)',
        cursor: 'default'
    }
})

const NumMapLabelStyle = css({
    // flex
    // position
    // scale
    // text
    // color
    color: Color.grayDark,
    // space
    // other
})

const MyContentSection: Component = () => {
    return (
        <div class={MyContentSectionStyle}>
            <MyContentProfileSection />
            <MainMenuSection />
            <div class={NumMapLabelStyle}>전체 {dataSys.numMyMaps()}개</div>
            <MapDisplay height={64 + Size.ui.profileW + Size.space.l + Size.space.edge}
                        page="mycontent"></MapDisplay>
        </div>
    )
}

export default MyContentSection;