import { Component } from "solid-js";
import { links } from "../property/Link";
import { css } from "@emotion/css";
import Textbox from "../components/Textbox";

const LoginPageStyle = css({
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

const LoginPage: Component = () => {
    return (
        <div class={LoginPageStyle}>
            <p>로그인</p>
            <p>아이디</p>
            <Textbox message={"아이디"}></Textbox>
            <p>비밀번호</p>
            <Textbox message={"비밀번호"}></Textbox>

            <button class={buttonStyle}
                    onClick={() => window.location.href = links.localhost + "/signin"}>
                        Log in
            </button>
            <button class={buttonStyle}
                    onClick={() => window.location.href = links.localhost + "/signin"}>
                        go to signin page
            </button>
        </div>
    );
}

export default LoginPage