import { Component, createEffect, onMount } from "solid-js";
import { css } from "@emotion/css"
import SideNavigator from "../components/SideNavigator";
import { dataSys } from "../systems/Data";
import PlaySection from "../layouts/PlaySection";

const PlayPageStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'row',
    // position
    // scale
    // text
    // color
    // space
    // other
})

const PlayPage: Component = () => {
    onMount(async () => {
        await dataSys
          .getMapsAmount()
          .then((res) => dataSys.setNumMaps(res.mapCount));
      });
    createEffect(() => dataSys.getKakaoUserLogedIn())

    return (
        <div class={PlayPageStyle}>
            <PlaySection isInPopup={false} />
            <SideNavigator/>
        </div>
    );
}

export default PlayPage