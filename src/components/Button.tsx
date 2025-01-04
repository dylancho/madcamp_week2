import { css } from "@emotion/css";
import { Component, JSXElement } from "solid-js";
import { Size } from "../property/Size";
import { ButtonStyle } from "../property/commonStyles";

const MakeProjectButtonStyle = css({
    justifySelf: 'end',
})

export const MakeProjectButton: Component<{ children: JSXElement}> = ({children}) => {
    return (
        <button class={`${ButtonStyle(Size.ui.makeProjectW)} ${MakeProjectButtonStyle}`}>{children}</button>
    )
}