import { css } from "@emotion/css";
import { Component, createSignal } from "solid-js";
import { Size } from "../property/Size";
import WorkplaceMenuSection from "./workplaceMenuSection";
import MapGrid from "../components/MapGrid";
import { workplaceSys } from "../systems/Workplace";
import { Dialog } from "../components/Dialog";
<<<<<<< HEAD
import { dataSys } from "../systems/Data";
=======
import PlaySection from "./PlaySection";
>>>>>>> 9b0ce34b69a58a377239cfdd58e976ee130390b2

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
<<<<<<< HEAD
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
=======
    // flex
    // position
    // scale
    boxSizing: 'border-box',
    width: '50%',
    height: Size.ui.mapElementButtonH,
    // text
    fontSize: Size.font.login,
    // color
    // space
    padding: Size.space.s,
    // other
    border: '1px solid transparent',
    ":hover": {
        boxSizing: 'border-box',
        border: '1px solid',
        borderRadius: Size.radius.m,
    }
})
>>>>>>> 9b0ce34b69a58a377239cfdd58e976ee130390b2

const TestScaleStyle = css({
  alignItems: "center",
  justifyContent: "center",
  // scale
  width: "90%",
  height: "80%",
  padding: Size.space.edge,
});

const WorkplaceSection: Component = () => {
<<<<<<< HEAD
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
=======
    return (
        <div class={WorkplaceSectionStyle}>
            <input class={MainTitleStyle}
                   value={workplaceSys.curMapName()}
                   oninput={(e) => workplaceSys.setCurMapName(e.currentTarget.value)}>이름없는 지도</input>
            <WorkplaceMenuSection />
            <MapGrid />
            <Dialog isOpen={workplaceSys.showPlayPopup}
                    setIsOpen={workplaceSys.setShowPlayPopup}
                    title=""
                    customStyle={TestScaleStyle}>
                <PlaySection isInPopup={true} />
            </Dialog>
        </div>
    )
}
>>>>>>> 9b0ce34b69a58a377239cfdd58e976ee130390b2

export default WorkplaceSection;
