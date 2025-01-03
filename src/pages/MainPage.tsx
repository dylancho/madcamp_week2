import { Component } from "solid-js";
import { css } from "@emotion/css"
import { links } from "../property/Link";

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

const MainPage: Component = () => {
    return (
        <>
        <p>This is main page.</p>
        <button class={buttonStyle}
                onClick={() => window.location.href = links.localhost + "/login"}>
                    go to login page
        </button>
        </>
    );
}

export default MainPage