import { css } from "@emotion/css";
import { Component, For, createResource } from "solid-js";
import { Size } from "../property/Size";
import { dataSys } from "../systems/Data";
import { Color } from "../property/Color";
import { controlSys } from "../systems/Control";

const MapDisplayStyle = (height: number) => {
  return css({
    // grid
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(${Size.ui.mapDisplayW}px, 1fr))`,
    gap: Size.space.m,
    // position
    // scale
    boxSizing: "border-box",
    width: "100%",
    height: `calc(100vh - ${
      Size.space.edge + 64 + Size.ui.buttonH + height
    }px)`,
    // text
    // color
    // space
    marginTop: Size.space.m,
    padding: Size.space.xs,
    // other
    overflow: "auto",
    "::-webkit-scrollbar": {
      width: "0px",
    },
  });
};

const MapCardStyle = css({
  // flex
  // position
  // scale
  width: "100%",
  aspectRatio: "16 / 9",
  // text
  // color
  backgroundColor: Color.grayLight,
  // space
  // other
  borderRadius: Size.radius.m,
  cursor: "pointer",
  boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.1)",
});

const MapGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(30, 1fr)", // 30 columns
  gridTemplateRows: "repeat(15, 1fr)", // 15 rows
  gap: "1px",
  width: "100%",
  height: "100%",
  backgroundColor: Color.grayLight,
});

const CellStyle = (cellType: number) => {
  let bgColor = "#fff";
  if (cellType === 1) bgColor = "green"; // Obstacle
  else if (cellType === 2) bgColor = "#00ff00"; // Start
  else if (cellType === 3) bgColor = "#ffff00"; // End
  else if (cellType === 4) bgColor = "orange";
  return css({
    backgroundColor: bgColor,
    width: "100%",
    height: "100%",
  });
};

export const MapDisplay: Component<{ height: number; amount: number }> = ({
  height,
  amount,
}) => {
  const [maps] = createResource(() =>
    dataSys
      .getMaps()
      .then((fetchedMaps) => fetchedMaps.map((map) => map.config))
  );
  return (
    <div class={MapDisplayStyle(height)}>
      <For each={maps()}>
        {(config) => (
          <div class={MapCardStyle}>
            <div class={MapGridStyle}>
              <For each={config}>
                {(cell) => <div class={CellStyle(cell)}></div>}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
