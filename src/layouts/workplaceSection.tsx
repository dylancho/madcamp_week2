import { css } from "@emotion/css";
import { Component, createSignal } from "solid-js";
import { Size } from "../property/Size";
import WorkplaceMenuSection from "./workplaceMenuSection";
import MapGrid from "../components/MapGrid";
import { workplaceSys } from "../systems/Workplace";
import PlayPage from "../pages/PlayPage";
import { Dialog } from "../components/Dialog";
import { dataSys } from "../systems/Data";

const WorkplaceSectionStyle = css({
  // flex
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  flex: 1,
  // position
  // scale
  // text
  // color
  // space
  margin: Size.space.edge,
  // other
});

const MainTitleStyle = css({
  // flex
  // position
  // scale
  // text
  fontSize: Size.font.login,
  fontWeight: "bold",
  // color
  // space
  // other
});

const TestScaleStyle = css({
  alignItems: "center",
  justifyContent: "center",
  // scale
  width: "90%",
  height: "80%",
  padding: Size.space.edge,
});

const WorkplaceSection: Component = () => {
  const [mapName, setMapName] = createSignal(dataSys.curUser.name);
  const handleNameChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setMapName(target.value);
    dataSys.setCurMap("name", mapName());
  };
  return (
    <div class={WorkplaceSectionStyle}>
      {/* Input for map name */}
      <input
        type="text"
        class={MainTitleStyle}
        value={mapName()} // Bind input value to mapName
        onInput={handleNameChange} // Update mapName on user input
        placeholder="Enter map name"
      />
      <WorkplaceMenuSection />
      <MapGrid />
      <Dialog
        isOpen={workplaceSys.showPlayPopup}
        setIsOpen={workplaceSys.setShowPlayPopup}
        title=""
        customStyle={TestScaleStyle}
      >
        <PlayPage
          closePopup={() => workplaceSys.setShowPlayPopup(false)}
          enableSave={() => workplaceSys.setIsSaveEnabled(true)}
        />
      </Dialog>
    </div>
  );
};

export default WorkplaceSection;
