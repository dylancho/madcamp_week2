import { css } from "@emotion/css";
import { Component, createEffect } from "solid-js";
import { Size } from "../property/Size";
import MainMenuSection from "./mainMenuSection";
import { dataSys } from "../systems/Data";
import { Color } from "../property/Color";
import { MapDisplay } from "../components/MapDisplay";

const MyContentProfileSectionStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'row',
    // position
    // scale
    // text
    // color
    // space
    gap: Size.space.edge,
    marginTop: Size.space.l,
    // other
})

const MyContentProfileImageStyle = css({
    // flex
    // position
    // scale
    width: Size.ui.profileW,
    height: Size.ui.profileW,
    // text
    // color
    backgroundColor: Color.gray,
    // space
    // other
    borderRadius: Size.radius.l,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.1)',
})

const MyContentProfileTitleStyle = css({
    fontSize: Size.font.login,
    fontWeight: 'bold',
    color: 'black',
})

const MyContentProfileWrapperStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'column',
    // position
    // scale
    // text
    textAlign: 'left',
    // color
    color: Color.grayDark,
    // space
    gap: Size.space.s,
    // other
})

const MyContentProfileSection: Component = () => {
    return (
        <div class={MyContentProfileSectionStyle}>
            <img src="/img_profile.svg" class={MyContentProfileImageStyle}></img>
            <div class={MyContentProfileWrapperStyle}>
                <div class={MyContentProfileTitleStyle}>{dataSys.curUser.name}</div>
                <div>시작한 날짜 : {(new Date(dataSys.curUser.createdAt)).toLocaleDateString("ko-kR")}</div>
            </div>
        </div>
    )
}

export default MyContentProfileSection;