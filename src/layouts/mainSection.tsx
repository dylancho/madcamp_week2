import { css } from "@emotion/css";
import { Component } from "solid-js";
import { links } from "../property/Link";

const MainSectionStyle = css({
    // flex
    flex: 1,
    // position
    // scale
    height: "100vh",
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


const MainSection: Component = () => {
    return (
        <div class={MainSectionStyle}>
            <h1>Main Title</h1>
            <button class={buttonStyle}
                    onClick={() => window.location.href = links.localhost + "/login"}>
                        go to login page
            </button>
        </div>
    )
}

export default MainSection;