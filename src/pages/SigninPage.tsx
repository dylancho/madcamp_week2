import { Component, onMount } from "solid-js";
import { css } from "@emotion/css";
import Textbox from "../components/Textbox";
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
            <Textbox message={"something@mail.com"} field="email"></Textbox>
            <p>비밀번호</p>
            <Textbox message={"비밀번호"} field="passward"></Textbox>
            <p>이름</p>
            <Textbox message={"이름"} field="name"></Textbox>

            <button class={buttonStyle}
                    onClick={() => dataSys.varifyEmail()}>
                        Sign in
            </button>
        </div>
    );
}

export default SigninPage