import { css } from "@emotion/css";
import { Component, For, onMount } from "solid-js";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import { menuNavigatorSys } from "../systems/MenuNavigator";

const MenuIconStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // position
    // scale
    // text
    // color
    // space
    // other
    ":hover": {
        cursor: "pointer",
    }
})

const MenuIcon: Component<{menu: string}> = ({menu}) => {

    return (
        <div class={MenuIconStyle} onclick={() => menuNavigatorSys.routePage(menu)}>
            <img src={`/ic_${menu}.svg`} alt={menu}></img>
            <span>{menu}</span>
        </div>
    )
}

export default MenuIcon;