import { css } from "@emotion/css";
import { Component, createEffect} from "solid-js";
import { workplaceSys } from "../systems/Workplace";
import { Size } from "../property/Size";
import MapElementButton from "../components/MapElementButton";
import { dataSys } from "../systems/Data";
import { ButtonStyle } from "../property/commonStyles";
import { Color } from "../property/Color";
import { IcRun, IcUpload } from "../components/Icons";

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

const WorkplaceMenuSection: Component = () => {
    createEffect(() => {
        console.log('showPlayPopup', workplaceSys.showPlayPopup());
        console.log('isSaveEnabled', workplaceSys.isSaveEnabled());
    })
    return (
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
                <button class={ButtonStyle(Size.ui.mapTestButtonW)}
                        onClick={() => workplaceSys.setShowPlayPopup(true)}>
                    <IcRun />
                </button>
                <button class={`${ButtonStyle(Size.ui.mapTestButtonW)}
                                ${css({backgroundColor: workplaceSys.isSaveEnabled()? Color.main : Color.grayDark})}`}
                        onClick={() => dataSys.postGrid(workplaceSys.workingWorld())}
                        disabled={!workplaceSys.isSaveEnabled()}>
                    <IcUpload />
                </button>
            </div>
        </div>
    )
}

export default WorkplaceMenuSection;