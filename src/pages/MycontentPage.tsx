import { Component, onMount } from "solid-js";
import MyContentSection from "../layouts/myContentSection";
import SideNavigator from "../components/SideNavigator";
import { css } from "@emotion/css";
import { dataSys } from "../systems/Data";

const MainPageStyle = css({
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

const MycontentPage: Component = () => {
    onMount(async () => {
        await dataSys
          .getMapsAmountByEmail(dataSys.curUser.email)
          .then((res) => dataSys.setNumMyMaps(res.mapCount));
      });
    return (
        <div class={MainPageStyle}>
            <MyContentSection/>
            <SideNavigator/>
        </div>
    );
}

export default MycontentPage