import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Color } from "../property/Color";
import { Size } from "../property/Size";

const TextboxStyle = css({
    // flex
    // position
    // scale
    height: Size.input.height,
    // text
    // color
    backgroundColor: 'white',
    // space
    paddingLeft: Size.space.m,
    paddingRight: Size.space.m,
    // other
    border: "solid 1px",
    borderColor: Color.gray,
    borderRadius: Size.radius.m,
})

const Textbox: Component<{message: string}> = ({message}) => {
    return (
        <input class={TextboxStyle}
               placeholder={message}/>
    )
}

export default Textbox;