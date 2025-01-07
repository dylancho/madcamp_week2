import { Component, onMount, onCleanup, createEffect, For } from "solid-js";
import { gameplaySys, Rect, twoDimScaleType } from "../systems/Gameplay";
import { css } from "@emotion/css";
import { Color } from "../property/Color";
import { workplaceSys } from "../systems/Workplace";

const PlayPageStyle = css({
  // flex
  display: "flex",
  flexDirection: "column",
  // position
  position: "relative",
  // scale
  width: "100vw",
  height: "100vh",
  // text
  // color
  // space
  // other
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const StageStyle = css({
  position: "absolute",
  left: `${gameplaySys.leftWall}vh`,
  bottom: `${gameplaySys.groundLevel}vh`, // Adjust for grid alignment
  width: `${gameplaySys.rightWall - gameplaySys.leftWall}vh`,
  height: `${gameplaySys.ceilingLevel - gameplaySys.groundLevel}vh`,
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
  `,
  backgroundSize: "5vh 5vh", // Grid size
  backgroundPosition: "0 100%", // Align grid to the bottom-left
  backgroundColor: "#ffffff", // Game area background color
  border: "2px solid black", // Boundary box border
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
    width: "5vh",
    height: "5vh",
    backgroundColor: color,
  });
};

const IndicatorStyle = css({
  position: "absolute",
  top: "10px",
  left: "10px",
  color: "black",
  backgroundColor: "white",
  padding: "5px",
  borderRadius: "5px",
});

// PlayPage Component
const PlayPage: Component<{
  grid: number[];
  closePopup: () => void;
  enableSave: () => void;
}> = ({ grid, closePopup, enableSave }) => {
  createEffect(() => {
    console.log(workplaceSys.grid());
    if (gameplaySys.isSuccess()) {
      gameplaySys.setIsSuccess(false);
      closePopup(); // Close the popup
      enableSave(); // Enable the Save button
    }
  });

  onMount(() => {
    window.addEventListener("keydown", gameplaySys.handleKeyDown);
    window.addEventListener("keyup", gameplaySys.handleKeyUp);

    const parsedObstacles: Rect[] = [];
    const parsedFloors: Rect[] = [];

    grid.forEach((cell, index) => {
      const col = index % 30;
      const row = Math.floor(index / 30);

      if (cell === 1) {
        parsedObstacles.push({
          x: col * 5,
          y: 70 - row * 5,
          width: 5,
          height: 5,
        });
      } else if (cell === 2) {
        gameplaySys.setStartPos({ x: col * 5, y: 70 - row * 5 });
        gameplaySys.setPosition("x", gameplaySys.startPos.x);
        gameplaySys.setPosition("y", gameplaySys.startPos.y);
      } else if (cell === 3) {
        gameplaySys.setEndPos({ x: col * 5, y: 70 - row * 5 });
      } else if (cell === 4) {
        parsedFloors.push({
          x: col * 5,
          y: 70 - row * 5,
          width: 5,
          height: 5,
        });
      }
    });

    gameplaySys.setObstacles(parsedObstacles);
    gameplaySys.setFloors(parsedFloors);

    gameplaySys.animationFrameId = requestAnimationFrame(
      gameplaySys.updatePosition
    );

    return () => {
      window.removeEventListener("keydown", gameplaySys.handleKeyDown);
      window.removeEventListener("keyup", gameplaySys.handleKeyUp);
    };
  });

  onCleanup(() => {
    cancelAnimationFrame(gameplaySys.animationFrameId);
    gameplaySys.animationFrameId = 0;
  });

  return (
    <div class={PlayPageStyle}>
      {/* Game Area */}
      <div class={StageStyle}>
        {/* Obstacles */}
        <For each={gameplaySys.obstacles}>
          {(obs, __) => <div class={TileStyle(obs, "green")}></div>}
        </For>
        {/* Floors */}
        <div>
          {gameplaySys.floors.map((fls) => (
            <div class={TileStyle(fls, "orange")}></div>
          ))}
        </div>
        {/* Endpoint */}
        <div class={CharacterStyle(gameplaySys.endPos, "yellow")}></div>
        {/* Character */}
        <div class={CharacterStyle(gameplaySys.position, Color.main)}></div>
      </div>

      {/* Mode Indicator */}
      <div class={IndicatorStyle}>
        Mode: {gameplaySys.is3DMode() ? "3D-like" : "2D"}
        <br />
        {"You died " + gameplaySys.deathCnt() + " times"}
      </div>
    </div>
  );
};

export default PlayPage;
