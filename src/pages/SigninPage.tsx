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

const SigninPage: Component = () => {
    return (
        <>
        <p>This is signin page.</p>
        <button class={buttonStyle}
                onClick={() => window.location.href = links.localhost + "/"}>
                    go to main page
        </button>
        </>
    );
}

export default SigninPage