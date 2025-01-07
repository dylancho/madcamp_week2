import { css } from "@emotion/css";
import { Component, Show } from "solid-js";
import { Size } from "../property/Size";
import WorkplaceMenuSection from "./workplaceMenuSection";
import MapGrid from "../components/MapGrid";
import { workplaceSys } from "../systems/Workplace";
import PlayPage from "../pages/PlayPage";
import { OverlayStyle } from "../property/commonStyles";
import { Dialog } from "../components/Dialog";
import { gameplaySys } from "../systems/Gameplay";

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

const TestScaleStyle = css({
    // scale
    width: "90%",
    height: "70%",
})

const WorkplaceSection: Component = () => {
    return (
        <div class={WorkplaceSectionStyle}>
            <div class={MainTitleStyle}>이름없는 지도</div>
            <WorkplaceMenuSection />
            <MapGrid />
            <Dialog isOpen={workplaceSys.showPlayPopup}
                    setIsOpen={workplaceSys.setShowPlayPopup}
                    title=""
                    scale={TestScaleStyle}>
                <PlayPage
                    grid={workplaceSys.grid()}
                    closePopup={() => workplaceSys.setShowPlayPopup(false)}
                    enableSave={() => workplaceSys.setIsSaveEnabled(true)} />
            </Dialog>
        </div>
    )
}

export default WorkplaceSection;