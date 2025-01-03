import { Component } from "solid-js";
import { links } from "../property/Link";
import { css } from "@emotion/css";

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
        <>
        <p>This is login page.</p>
        <button class={buttonStyle}
                onClick={() => window.location.href = links.localhost + "/signin"}>
                    go to signin page
        </button>
        </>
    );
}

export default LoginPage