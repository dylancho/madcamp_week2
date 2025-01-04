import { Component } from "solid-js";
import { links } from "../property/Link";
import { css } from "@emotion/css";
import Textbox from "../components/Textbox";

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
    return (
        <div class={SigninPageStyle}>
            <p>회원가입</p>
            <p>아이디</p>
            <Textbox message={"아이디"}></Textbox>
            <p>비밀번호</p>
            <Textbox message={"비밀번호"}></Textbox>
            <p>이름</p>
            <Textbox message={"이름"}></Textbox>

            <button class={buttonStyle}
                    onClick={() => window.location.href = links.localhost + "/"}>
                        Sign in
            </button>
        </div>
    );
}

export default SigninPage