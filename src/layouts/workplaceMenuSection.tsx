import { css } from "@emotion/css";
import { Component, createEffect} from "solid-js";
import { workplaceSys } from "../systems/Workplace";
import PlayPage from "../pages/PlayPage";
import { Size } from "../property/Size";
import MapElementButton from "../components/MapElementButton";
import { MapTestButton } from "../components/Button";
import { dataSys } from "../systems/Data";

const toolbarStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position
    // scale
    height: Size.ui.mapElementButtonH,
    // text
    // color
    // space
    margin: `${Size.space.l}px 0`,
    // other
});

const LeftMenuStyle = css({
    // flex
    display: 'flex',
    justifyContent: 'start',
    // position
    // scale
    // text
    // color
    // space
    gap: Size.space.s,
    // other
});

const RightMenuStyle = css({
    // flex
    display: 'flex',
    justifyContent: 'start',
    // position
    // scale
    // text
    // color
    // space
    gap: Size.space.l,
    // other
});

const DemoStyle = css({
    // flex
    // position
    position: 'fixed',
    top: "0",
    left: "0",
    // scale
    width: "100%",
    height: "100%",
    // text
    // color
    // space
    // other
})

const WorkplaceMenuSection: Component = () => {
    createEffect(() => {
        console.log(workplaceSys.isSaveEnabled());
    })
    return (
        <>
        <div class={toolbarStyle}>
            <div class={LeftMenuStyle}>
                <MapElementButton element={0}>Empty</MapElementButton>
                <MapElementButton element={1}>Obstacle</MapElementButton>
                <MapElementButton element={2}>Start</MapElementButton>
                <MapElementButton element={3}>End</MapElementButton>
                <MapElementButton element={4}>Floor</MapElementButton>
                <MapElementButton element={-1}>Eraser</MapElementButton>
            </div>
            <div class={RightMenuStyle}>
                <MapTestButton func={() => workplaceSys.setShowPlayPopup(true)}>
                    Play
                </MapTestButton>
                <MapTestButton func={() => dataSys.postGrid(workplaceSys.grid())}
                               activated={workplaceSys.isSaveEnabled}>
                    Save
                </MapTestButton>
            </div>
        </div>
            {workplaceSys.showPlayPopup() && (
                <div style={DemoStyle}>
                    <PlayPage
                        grid={workplaceSys.grid()}
                        closePopup={() => workplaceSys.setShowPlayPopup(false)}
                        enableSave={() => workplaceSys.setIsSaveEnabled(true)} />
                </div>
            )}
        </>
    )
}

export default WorkplaceMenuSection;