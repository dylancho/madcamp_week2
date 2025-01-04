import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Size } from "../property/Size";
import { SearchTextbox } from "../components/Textbox";
import { SearchDrop } from "../components/SearchDrop";
import { MakeProjectButton } from "../components/Button";

const MainMenuSectionStyle = css({
    // flex
    display: 'flex',
    flexdirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // space
    marginTop: 64,
    marginBottom: 24,
})

const MainMenuSection: Component = () => {
    return (
        <div class={MainMenuSectionStyle}>
            <div class={css({display: 'flex'})}>
                <SearchTextbox message={"검색"}></SearchTextbox>
                <SearchDrop></SearchDrop>
            </div>
            <MakeProjectButton>프로젝트 만들기</MakeProjectButton>
        </div>
    )
}

export default MainMenuSection;