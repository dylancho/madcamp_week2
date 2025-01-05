import { css } from "@emotion/css";
import { Component, For } from "solid-js";
import { Size } from "../property/Size";
import { dataSys } from "../systems/Data";
import { Color } from "../property/Color";

const MapDisplayStyle = (height: number) => { return css({
    // grid
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${Size.ui.mapDisplayW}px, 1fr))`,
    gap: Size.space.m,
    // position
    // scale
    boxSizing: 'border-box',
    width: '100%',
    height: `calc(100vh - ${(Size.space.edge + 64 + Size.ui.buttonH + height)}px)`,
    // text
    // color
    // space
    marginTop: Size.space.m,
    padding: Size.space.xs,
    // other
    overflow: 'auto',
    '::-webkit-scrollbar': {
      width: '0px',
      
    }
})}

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
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.1)',
})

export const MapDisplay: Component<{height: number, amount: number}> = ({height, amount}) => {
    return (
        <div class={MapDisplayStyle(height)}>
            <For each={Array.from({length: amount})}>{(_, i) =>
                <div class={MapCardStyle}></div>
            }</For>
        </div>
    )
}