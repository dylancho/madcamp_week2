import { css } from "@emotion/css";
import { Component, For } from "solid-js";
import { Size } from "../property/Size";
import { Color } from "../property/Color";

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
    rowGap: Size.space.l,
    columnGap: 120,
    // other
})

const KeySetStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position
    // scale
    width: Size.ui.keySetW,
    height: Size.ui.textboxH,
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
    fontSize: Size.font.m,
    fontWeight: 'bold',
    textAlign: 'left',
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
    fontSize: Size.font.m,
    textAlign: 'center',
    // color
    backgroundColor: Color.gray,
    // space
    // other
    borderRadius: Size.radius.m,
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
        <div class={KeySetGridStyle}>
            <For each={Array.from({length: 8})}>{(_, i) =>
                <KeySet label={`조작 ${i()}`} key={"a"}></KeySet>
            }</For>
        </div>
    )
}

export default KeySetGrid