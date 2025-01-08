import { css } from "@emotion/css";
import { Component, Show } from "solid-js";
import { SearchTextbox } from "../components/Textbox";
import { SearchDrop } from "../components/SearchDrop";
import { MakeProjectButton } from "../components/Button";
import { menuNavigatorSys } from "../systems/MenuNavigator";

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
            </div>
            <Show when={menuNavigatorSys.curState() == "LogedIn"}>
                <MakeProjectButton>프로젝트 만들기</MakeProjectButton>
            </Show>
        </div>
    )
}

export default MainMenuSection;