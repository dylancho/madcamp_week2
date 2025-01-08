import { Component, createEffect, createSignal } from "solid-js";
import { css } from "@emotion/css";
import SideNavigator from "../components/SideNavigator";
import PlayPage from "../layouts/PlaySection";
import WorkplaceSection from "../layouts/workplaceSection";

const WorkplacePageStyle = css({
  display: "flex",
  flexDirection: "row",
});

const WorkplacePage: Component = () => {

  return (
    <div class={WorkplacePageStyle}>
      <WorkplaceSection/>
      <SideNavigator />
    </div>
  );
};

export default WorkplacePage;
