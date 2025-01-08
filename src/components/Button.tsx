import { css } from "@emotion/css";
import { Component, JSXElement } from "solid-js";
import { Size } from "../property/Size";
import { ButtonStyle } from "../property/commonStyles";
import { links } from "../property/Link";
import { mapType } from "../systems/Data";

const MakeProjectButtonStyle = css({
    justifySelf: 'end',
})

export const MakeProjectButton: Component<{children: JSXElement}> = ({children}) => {
    return (
        <button class={`${ButtonStyle(Size.ui.makeProjectW)} ${MakeProjectButtonStyle}`}
                onClick={() => window.location.href = links.localhost + "/workplace"}>
            {children}
        </button>
    )
}

export const PlayButton: Component<{map: mapType, children: JSXElement}> = ({map, children}) => {
    return (
        <button class={`${ButtonStyle('100%')}`}
                onClick={() => window.location.href = links.localhost + "/play?id=" + map.id}>
            {children}
        </button>
    )
}