import { css } from "@emotion/css";
import { Accessor, Component, JSXElement } from "solid-js";
import { Size } from "../property/Size";
import { ButtonStyle } from "../property/commonStyles";
import { links } from "../property/Link";
import { Color } from "../property/Color";

const MakeProjectButtonStyle = css({
    justifySelf: 'end',
})

const MapTestButtonStyle = (disabled: boolean) => {return css({
    backgroundColor: disabled? Color.grayDark : Color.main,
})}

export const MakeProjectButton: Component<{children: JSXElement}> = ({children}) => {
    return (
        <button class={`${ButtonStyle(Size.ui.makeProjectW)} ${MakeProjectButtonStyle}`}
                onClick={() => window.location.href = links.localhost + "/workplace"}>
            {children}
        </button>
    )
}

export const MapTestButton: Component<{func: () => {}, activated?: Accessor<boolean>, children: JSXElement}> = ({func, activated, children}) => {
    return (
        <button class={`${ButtonStyle(Size.ui.mapTestButtonW)} ${MapTestButtonStyle}`}
                disabled={activated? !activated() : false}
                onClick={func}>
            {children}
        </button>
    )
}