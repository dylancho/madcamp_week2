<<<<<<< HEAD
import { Component, onMount, onCleanup, createEffect, For, on } from "solid-js";
import { gameplaySys, Rect, Turt, twoDimScaleType } from "../systems/Gameplay";
import { css } from "@emotion/css";
import { Color } from "../property/Color";
import { workplaceSys } from "../systems/Workplace";
import { Size } from "../property/Size";

const PlayPageStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: Size.space.s,
});

const StageWrapperStyle = css({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const StageStyle = css({
  position: "absolute",
  width: `${gameplaySys.rightWall - gameplaySys.leftWall}vh`,
  height: `${gameplaySys.ceilingLevel - gameplaySys.groundLevel}vh`,
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
  `,
  backgroundSize: `${Size.world.block}vh ${Size.world.block}vh`, // Grid size
  backgroundColor: "white", // Game area background color
  border: `3px solid ${Color.mainDark}`,
});

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

const CharacterStyle = (item: twoDimScaleType, color: string) => {
  return css({
    position: "absolute",
    left: `${item.x}vh`,
    bottom: `${item.y}vh`,
    width: `${Size.world.block}vh`,
    height: `${Size.world.block}vh`,
    backgroundColor: color,
  });
};

const IndicatorStyle = css({
  color: "black",
  backgroundColor: "white",
  padding: "5px",
  borderRadius: "5px",
});

// PlayPage Component
const PlayPage: Component<{
  closePopup: () => void;
  enableSave: () => void;
}> = ({ closePopup, enableSave }) => {
  let playPageRef: HTMLDivElement | undefined;
  onMount(() => {});

  createEffect(() => {
    if (gameplaySys.isSuccess()) {
      gameplaySys.setIsSuccess(false);
      closePopup(); // Close the popup
      enableSave(); // Enable the Save button
    }
  });

  createEffect(
    on(workplaceSys.showPlayPopup, () => {
      if (workplaceSys.showPlayPopup()) {
        gameplaySys.setTurtles(() => []); // Clear turtles array
        console.log(workplaceSys.workingWorld());
        gameplaySys.setWorld(workplaceSys.workingWorld());
        gameplaySys.fetchUserKeys();

        window.addEventListener("keydown", gameplaySys.handleKeyDown);
        window.addEventListener("keyup", gameplaySys.handleKeyUp);
        

        gameplaySys.world.forEach((cell, index) => {
          const col = index % Size.world.col;
          const row = Math.floor(index / Size.world.col);

          const posX = col * Size.world.block;
          const posY = (Size.world.row - row - 1) * Size.world.block;

          const curPos: twoDimScaleType = {
            x: posX,
            y: posY,
          };

          const curRect: Rect = {
            x: posX,
            y: posY,
            width: Size.world.block,
            height: Size.world.block,
          };

          const curTurt: Turt = {
            x: posX,
            y: posY,
            width: Size.world.block,
            height: Size.world.block,
            fall: 0,
            direction: 1,
          };

          if (cell === 1) {
            // obstacle
            gameplaySys.setObstacles((prev) => [...prev, curRect]);
          } else if (cell === 2) {
            // start
            gameplaySys.setPosition(curPos);
          } else if (cell === 3) {
            // end
            gameplaySys.setEndPos(curPos);
          } else if (cell === 4) {
            // floor
            gameplaySys.setFloors((prev) => [...prev, curRect]);
          } else if (cell === 5) {
            // turtle
            gameplaySys.setTurtles((prev) => [...prev, curTurt]);
          }
        });

        gameplaySys.animationFrameId = requestAnimationFrame(
          gameplaySys.updatePosition
        );

        return () => {
          window.removeEventListener("keydown", gameplaySys.handleKeyDown);
          window.removeEventListener("keyup", gameplaySys.handleKeyUp);
        };
      } else {
        cancelAnimationFrame(gameplaySys.animationFrameId);
        gameplaySys.animationFrameId = 0;
      }
    })
  );

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
    window.addEventListener("resize", resizePlayPage);

    onCleanup(() => {
      window.removeEventListener("resize", resizePlayPage);
    });
  });

  return (
    <div class={PlayPageStyle} ref={playPageRef}>
      {/* Game Area */}
      <div class={StageWrapperStyle}>
        <div class={StageStyle}>
          {/* Obstacles */}
          <For each={gameplaySys.obstacles}>
            {(obs, _) => <div class={TileStyle(obs, "green")}></div>}
          </For>
          {/* Floors */}
          <For each={gameplaySys.floors}>
            {(fls, _) => <div class={TileStyle(fls, "orange")}></div>}
          </For>
          y{/* Turtles */}
          <For each={gameplaySys.turtles}>
            {(tts, _) => <div class={TileStyle(tts, "red")}></div>}
          </For>
          {/* Endpoint */}
          <div class={CharacterStyle(gameplaySys.endPos, "yellow")}></div>
          {/* Character */}
          <div class={CharacterStyle(gameplaySys.position, Color.main)}></div>
=======
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
>>>>>>> 9b0ce34b69a58a377239cfdd58e976ee130390b2
        </div>
    );
}

export default PlayPage