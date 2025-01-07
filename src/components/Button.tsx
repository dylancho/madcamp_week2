import { css } from "@emotion/css";
import { Component, JSXElement } from "solid-js";
import { Size } from "../property/Size";
import { ButtonStyle } from "../property/commonStyles";
import { links } from "../property/Link";

const MakeProjectButtonStyle = css({
    justifySelf: 'end',
    boxShadow: "0 0 4px 4px rgba(0, 0, 100, 0.1)",
})

export const MakeProjectButton: Component<{children: JSXElement}> = ({children}) => {
    return (
        <button class={`${ButtonStyle(Size.ui.makeProjectW)} ${MakeProjectButtonStyle}`}
                onClick={() => window.location.href = links.localhost + "/workplace"}>
            {children}
        </button>
    )
}

export const PlayButton: Component<{children: JSXElement}> = ({children}) => {
    return (
        <button class={`${ButtonStyle('100%')}`}
                onClick={() => window.location.href = links.localhost + "/play"}>
            {children}
        </button>
    )
}