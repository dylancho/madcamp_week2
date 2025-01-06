import { css } from "@emotion/css";
import { Component, For } from "solid-js";
import { Size } from "../property/Size";
import { Color } from "../property/Color";

const KeySetContainerStyle = css({
    // flex
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const KeySetGridStyle = css({
    // grids
    display: 'grid',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridAutoFlow: 'column',
    // position
    // scale
    // text
    // color
    // space
    rowGap: Size.space.edge,
    columnGap: 120,
    // other
})

const KeySetStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // position
    // scale
    width: Size.ui.keySetW,
    height: Size.ui.keySetH,
    // text
    // color
    // space
    // other
})

const KeySetLabelStyle = css({
    // flex
    // position
    // scale
    height: '100%',
    // text
    fontSize: Size.font.l,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 1.5,
    // color
    // space
    // other
})

const KeySetBoxStyle = css({
    // flex
    // position
    // scale
    width: Size.ui.keySetBoxW,
    height: '100%',
    // text
    fontSize: Size.font.l,
    textAlign: 'center',
    lineHeight: 1.5,
    // color
    backgroundColor: Color.gray,
    // space
    // other
    borderRadius: Size.radius.m,
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
})

const KeySet: Component<{label: string, key: string}> = ({label, key}) => {
    return (
        <div class={KeySetStyle}>
            <div class={KeySetLabelStyle}>{label}</div>
            <div class={KeySetBoxStyle}>{key}</div>
        </div>
    )
}

const KeySetGrid: Component = () => {
    return (
        <div class={KeySetContainerStyle}>
            <div class={KeySetGridStyle}>
                <For each={Array.from({length: 8})}>{(_, i) =>
                    <KeySet label={`조작 ${i()}`} key={"a"}></KeySet>
                }</For>
            </div>
        </div>
    )
}

export default KeySetGrid