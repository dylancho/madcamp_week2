import { Component, onMount } from "solid-js";
import { css } from "@emotion/css";
import { AccountTextbox } from "../components/Textbox";
import { dataSys } from "../systems/Data";

const SigninPageStyle = css({
    // flex
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // position
    // scale
    // text
    // color
    // space
    // other
})

const buttonStyle = css({
    // flex
    // position
    // scale
    // text
    // color
    backgroundColor: 'aqua',
    // space
    // other
    ":hover": {
        filter: 'brightness(1.12)',
    }
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
            <p>회원가입</p>
            <p>이메일</p>
            <AccountTextbox message={"something@mail.com"} field="email"></AccountTextbox>
            <p>비밀번호</p>
            <AccountTextbox message={"비밀번호"} field="passward"></AccountTextbox>
            <p>이름</p>
            <AccountTextbox message={"이름"} field="name"></AccountTextbox>

            <button class={buttonStyle}
                    onClick={() => dataSys.addSignedUser()}>
                        Sign in
            </button>
        </div>
    );
}

export default SigninPage