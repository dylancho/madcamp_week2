import { Component, onMount } from "solid-js";
import { links } from "../property/Link";
import { css } from "@emotion/css";
import { AccountTextbox } from "../components/Textbox";
import { dataSys } from "../systems/Data";

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
    onMount(() => {
        dataSys.setCurCreatingAccount({
            "email": "",
            "passward": "",
            "name": ""
        });
    })

    return (
        <div class={LoginPageStyle}>
            <p>로그인</p>
            <p>이메일</p>
            <AccountTextbox message={"something@mail.com"} field="email"></AccountTextbox>
            <p>비밀번호</p>
            <AccountTextbox message={"비밀번호"} field="passward"></AccountTextbox>

            <button class={buttonStyle}
                    onClick={dataSys.getUserLogedin}>
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