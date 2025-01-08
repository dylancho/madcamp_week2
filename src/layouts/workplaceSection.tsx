import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Size } from "../property/Size";
import WorkplaceMenuSection from "./workplaceMenuSection";
import MapGrid from "../components/MapGrid";
import { workplaceSys } from "../systems/Workplace";
import PlayPage from "../pages/PlayPage";
import { Dialog } from "../components/Dialog";

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
    boxSizing: 'border-box',
    width: '50%',
    height: Size.ui.mapElementButtonH,
    // text
    fontSize: Size.font.login,
    // color
    // space
    padding: Size.space.s,
    // other
    border: '1px solid transparent',
    ":hover": {
        boxSizing: 'border-box',
        border: '1px solid',
        borderRadius: Size.radius.m,
    }
})

const TestScaleStyle = css({
    alignItems: 'center',
    justifyContent: 'center',
    // scale
    width: "90%",
    height: "80%",
    padding: Size.space.edge,
})

const WorkplaceSection: Component = () => {
    return (
        <div class={WorkplaceSectionStyle}>
            <input class={MainTitleStyle}
                   value={workplaceSys.curMapName()}
                   oninput={(e) => workplaceSys.setCurMapName(e.currentTarget.value)}>이름없는 지도</input>
            <WorkplaceMenuSection />
            <MapGrid />
            <Dialog isOpen={workplaceSys.showPlayPopup}
                    setIsOpen={workplaceSys.setShowPlayPopup}
                    title=""
                    customStyle={TestScaleStyle}>
                <PlayPage
                    closePopup={() => workplaceSys.setShowPlayPopup(false)}
                    enableSave={() => workplaceSys.setIsSaveEnabled(true)} />
            </Dialog>
        </div>
    )
}

export default WorkplaceSection;