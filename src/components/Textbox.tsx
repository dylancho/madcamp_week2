import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Color } from "../property/Color";
import { Size } from "../property/Size";
import { accountType, dataSys } from "../systems/Data";

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

const AccountTextbox: Component<{message: string, field: keyof accountType }> = ({message, field}) => {
    return (
        <input class={TextboxStyle}
               placeholder={message}
               oninput={(e) => dataSys.setCurCreatingAccount(field, e.currentTarget.value)}/>
    )
}

export default AccountTextbox;