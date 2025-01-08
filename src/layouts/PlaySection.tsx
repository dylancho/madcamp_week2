import { Component, onMount, onCleanup, createEffect, For, on, createResource, Show } from "solid-js";
import { gameplaySys, Rect, twoDimScaleType } from "../systems/Gameplay";
import { css } from "@emotion/css";
import { Color } from "../property/Color";
import { workplaceSys } from "../systems/Workplace";
import { Size } from "../property/Size";
import { dataSys } from "../systems/Data";
import { ClearDialog, Dialog } from "../components/Dialog";

const PlayPageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: Size.space.s,
});

const StageWrapperStyle = css({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
})

const StageStyle = css({
  position: "absolute",
  width: `${gameplaySys.rightWall - gameplaySys.leftWall}vh`,
  height: `${gameplaySys.ceilingLevel - gameplaySys.groundLevel}vh`,
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
  `,
  backgroundSize: `${Size.world.block}vh ${Size.world.block}vh`, // Grid size
  backgroundColor: 'white', // Game area background color
  border: `3px solid ${Color.mainDark}`,
})

const TileStyle = (item: Rect, color: string) => {
  return css({
    position: "absolute",
    left: `${item.x}vh`,
    bottom: `${item.y}vh`,
    width: `${item.width}vh`,
    height: `${item.height}vh`,
    backgroundColor: color,
  });
};

const CharacterStyle = (item: twoDimScaleType, color: string) => { return css({
  position: "absolute",
  left: `${item.x}vh`,
  bottom: `${item.y}vh`,
  width: `${Size.world.block}vh`,
  height: `${Size.world.block}vh`,
  backgroundColor: color,
})};

const IndicatorStyle = css({
  color: "black",
  backgroundColor: "white",
  padding: "5px",
  borderRadius: "5px",
});

const PlaySection: Component<{isInPopup: boolean}> = ({isInPopup}) => {
  let playPageRef: HTMLDivElement | undefined;

  // termination
  createEffect(() => {
    if (gameplaySys.isSuccess()) {

      if(isInPopup){
        workplaceSys.setShowPlayPopup(false); // Close the popup
        workplaceSys.setIsSaveEnabled(true); // Enable the Save button
      } else {
        gameplaySys.setVelocity({x: 0, y: 0})
        window.removeEventListener("keydown", gameplaySys.handleKeyDown);
        window.removeEventListener("keyup", gameplaySys.handleKeyUp);
      }
    }
  });
  
  // popup play
  createEffect(on(workplaceSys.showPlayPopup, () => {
    if (workplaceSys.showPlayPopup()){
      gameplaySys.initialize(workplaceSys.workingWorld());
    } else {
      cancelAnimationFrame(gameplaySys.animationFrameId);
      gameplaySys.animationFrameId = 0;
    }
  }));

  // page play
  onMount(async () => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    if (id) {
      const curMap = await dataSys.getMapById(Number(id))
      gameplaySys.initialize(curMap.config);
    }
  })

  // flexable resizing
  createEffect(() => {
    if (!playPageRef) return;

    const resizePlayPage = () => {
        const container = playPageRef.parentElement; // The Dialog's content wrapper
        if (!container) return;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const aspectRatio = Size.world.row / Size.world.col; // Calculate the grid's aspect ratio
        const containerRatio = containerHeight / containerWidth;

        if (containerRatio > aspectRatio) {
            // Fit horizontally
            playPageRef.style.width = `${containerWidth}px`;
            playPageRef.style.height = `${containerWidth * aspectRatio}px`;
        } else {
            // Fit vertically
            playPageRef.style.width = `${containerHeight / aspectRatio}px`;
            playPageRef.style.height = `${containerHeight}px`;
        }
    };

    // Resize on load and window resize
    resizePlayPage();
    window.addEventListener('resize', resizePlayPage);

    onCleanup(() => {
        window.removeEventListener('resize', resizePlayPage);
    });
  });

  return (
    <>
    <div class={PlayPageStyle} ref={playPageRef}>
      {/* Game Area */}
      <div class={StageWrapperStyle}>
        <div class={StageStyle}>
          {/* Obstacles */}
          <For each={gameplaySys.obstacles}>{(obs, _) => 
            <div class={TileStyle(obs, "green")}></div>
          }</For>
          {/* Floors */}
          <For each={gameplaySys.floors}>{(fls, _) => 
            <div class={TileStyle(fls, "orange")}></div>
          }</For>
          {/* Empty */}
          <For each={gameplaySys.empty}>{(ept, _) => 
            <div class={TileStyle(ept, "transparent")}></div>
          }</For>
          {/* Endpoint */}
          <div class={CharacterStyle(gameplaySys.endPos, "yellow")}></div>
          {/* Character */}
          <div class={CharacterStyle(gameplaySys.position, Color.main)}></div>
        </div>
      </div>

      {/* Mode Indicator */}
      <div class={IndicatorStyle}>
        Mode: {gameplaySys.is3DMode() ? "3D-like" : "2D"}
        <br />
        {"You died " + gameplaySys.deathCnt() + " times"}
      </div>
    </div>
    <Show when={!isInPopup}>
      <ClearDialog isOpen={gameplaySys.isSuccess}>
        성공!
      </ClearDialog>
    </Show>
    </>
  );
};

export default PlaySection;
