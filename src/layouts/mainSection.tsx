import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Size } from "../property/Size";
import MainMenuSection from "./mainMenuSection";
import { dataSys } from "../systems/Data";
import { Color } from "../property/Color";
import { MapDisplay } from "../components/MapDisplay";
import { MapDialog } from "../components/Dialog";
import { dialogSys } from "../systems/DialogControl";

const MainSectionStyle = css({
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

const MainTitleStyle = css({
    // flex
    // position
    // scale
    // text
    fontSize: Size.font.main,
    fontWeight:"bold",
    // color
    color: Color.main,
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

const MainSection: Component = () => {
    return (
        <div class={MainSectionStyle}>
            <div class={MainTitleStyle}>Nupzukis Free</div>
            <MainMenuSection></MainMenuSection>
            <div class={NumMapLabelStyle}>전체 {dataSys.numMaps()}개</div>
            <div onclick={() => dialogSys.setIsMapDialogOpen(true)}>
                <MapDisplay height={64 + 75 + Size.space.edge} page="main"/>
            </div>
            <MapDialog />
        </div>
    )
}

export default MainSection;