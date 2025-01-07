import { css } from "@emotion/css";
import { Component, For, createResource } from "solid-js";
import { Size } from "../property/Size";
import { dataSys, mapType } from "../systems/Data";
import { Color } from "../property/Color";
import { CellStyle, MapGridStyle } from "../property/commonStyles";

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
  aspectRatio: "16 / 8",
  // text
  // color
  backgroundColor: Color.grayLight,
  // space
  // other
  borderRadius: Size.radius.m,
  cursor: "pointer",
  boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.1)",
});

export const MapDisplay: Component<{ height: number }> = ({ height }) => {
  const [maps] = createResource(() =>
    dataSys
      .getMaps()
      .then((fetchedMaps) => fetchedMaps.map((map: mapType) => map))
  );

  return (
    <div class={MapDisplayStyle(height)}>
      <For each={maps()}>{(map) => (
          <div class={MapCardStyle}
               onclick={() => {
                dataSys.setCurMap('name', map.name)
                dataSys.setCurMap('id', map.id)
                dataSys.setCurMap('createdAt', map.createdAt)
                dataSys.setCurMap('creatorEmail', map.creatorEmail)
                dataSys.setCurMap('rating', map.rating)
                dataSys.setCurMap('config', map.config)
               }}>
            <div class={MapGridStyle}>
              <For each={map.config}>
                {(cell) => <div class={CellStyle(cell)}></div>}
              </For>
            </div>
          </div>
       )}</For>
    </div>
  );
};
