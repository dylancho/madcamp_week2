import { Component, onMount } from "solid-js";
import { css } from "@emotion/css";
import { AccountTextbox } from "../components/Textbox";
import { dataSys } from "../systems/Data";
import { ButtonStyle, LoginLabelStyle, LoginTitleStyle } from "../property/commonStyles";
import { Size } from "../property/Size";

const SigninPageStyle = css({
    // flex
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    // position
    // scale
    // text
    // color
    // space
    // other
})

const SigninPage: Component = () => {
    onMount(() => {
        dataSys.setCurCreatingAccount({
            "email": "",
            "passward": "",
            "name": ""
        });
    })

    return (
        <div class={SigninPageStyle}>
            <p class={LoginTitleStyle}>회원가입</p>

            <p class={LoginLabelStyle}>이메일</p>
            <AccountTextbox message={"something@mail.com"} field="email"></AccountTextbox>

            <p class={LoginLabelStyle}>비밀번호</p>
            <AccountTextbox message={"비밀번호"} field="passward"></AccountTextbox>

            <p class={LoginLabelStyle}>이름</p>
            <AccountTextbox message={"이름"} field="name"></AccountTextbox>

            <button class={`${ButtonStyle(Size.ui.LoginW)} ${css({marginTop: Size.space.xl})}`} onClick={() => dataSys.addSignedUser()}>
                회원가입
            </button>
        </div>
    );
}

export default SigninPage