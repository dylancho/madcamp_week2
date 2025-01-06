import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Size } from "../property/Size";
import WorkplaceMenuSection from "./workplaceMenuSection";
import MapGrid from "../components/MapGrid";

const WorkplaceSectionStyle = css({
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
    fontSize: Size.font.login,
    fontWeight: "bold",
    // color
    // space
    // other
})

const WorkplaceSection: Component = () => {
    return (
        <div class={WorkplaceSectionStyle}>
            <div class={MainTitleStyle}>이름없는 지도</div>
                <WorkplaceMenuSection />
                <MapGrid />
        </div>
    )
}

export default WorkplaceSection;