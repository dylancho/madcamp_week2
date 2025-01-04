import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Size } from "../property/Size";
import { TextboxStyle } from "../property/commonStyles";
import { Color } from "../property/Color";

const SearchDropStyle = css({
    // flex
    display: 'flex',
    alignItems: 'center',
    // position
    // scale
    width: Size.ui.dropW,
    // text
    color: Color.grayDark,
    // color
    // space
    marginLeft: Size.space.l,
    // other
})

export const SearchDrop: Component = () => {
    return (
        <div class={`${TextboxStyle} ${SearchDropStyle}`}>최신순</div>
    )
}