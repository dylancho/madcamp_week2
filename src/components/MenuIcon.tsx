import { css } from "@emotion/css";
import { Component } from "solid-js";
import { menuNavigatorSys, menuType } from "../systems/MenuNavigator";
import { Size } from "../property/Size";
import { Color } from "../property/Color";

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
    gap: Size.space.s,
    // other
    ":hover": {
        cursor: "pointer",
    },
    "span": {
        // flex
        // position
        // scale
        // text
        fontSize: Size.font.xs,
        fontWeight: "bold",
        // color
        fontcolor: Color.grayDark,
        // space
        // other
    }
})

const menuKR = {
    "login": "로그인",
    "logout": "로그아웃",
    "help": "도움말",
    "setting": "키설정",
    "quit": "나가기",
    "mycontent": "내파일"
}

const MenuIcon: Component<{menu: menuType}> = ({menu}) => {

    return (
        <div class={MenuIconStyle} onclick={() => menuNavigatorSys.routePage(menu)}>
            <img src={`/ic_${menu}.svg`} alt={menu}></img>
            <span>{menuKR[menu]}</span>
        </div>
    )
}

export default MenuIcon;