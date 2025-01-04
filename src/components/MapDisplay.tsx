import { css } from "@emotion/css";
import { Component, For } from "solid-js";
import { Size } from "../property/Size";
import { dataSys } from "../systems/Data";
import { Color } from "../property/Color";

const MapDisplayStyle = css({
    // grid
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${Size.ui.mapDisplayW}px, 1fr))`,
    gap: Size.space.m,
    // position
    // scale
    width: '100%',
    height: `calc(100vh - ${128 + 2 * Size.space.edge + Size.ui.buttonH + 85}px)`,
    // text
    // color
    // space
    marginTop: Size.space.m,
    // other
    overflow: 'auto',
    '::-webkit-scrollbar': {
      width: '0px',
      
    }
})

const MapCardStyle = css({
    // flex
    // position
    // scale
    width: '100%',
    aspectRatio: '16 / 9',
    // text
    // color
    backgroundColor: Color.grayLight,
    // space
    // other
    borderRadius: Size.radius.m,
    cursor: "pointer",
})

export const MapDisplay: Component = () => {
    return (
        <div class={MapDisplayStyle}>
            <For each={Array.from({length: dataSys.numMaps()})}>{(_, i) =>
                <div class={MapCardStyle}></div>
            }</For>
        </div>
    )
}