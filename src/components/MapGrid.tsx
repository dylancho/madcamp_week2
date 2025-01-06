import { css } from "@emotion/css";
import { Component } from "solid-js";
import { workplaceSys } from "../systems/Workplace";

const MapGridStyle = css({
    justifySelf: 'end',
})

const gridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(30, 5vh)", // 30 columns
  gridTemplateRows: "repeat(15, 5vh)", // 15 rows
  gap: "1px",
  backgroundColor: "#ddd",
});

const cellStyle = css({
  width: "5vh",
  height: "5vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5vh",
  cursor: "pointer",
});

const MapGrid: Component = () => {
    return (
        <div class={gridStyle}>
        {workplaceSys.grid().map((cell, index) => (
            <div
            class={cellStyle}
            style={{
                "background-color":
                cell === 1
                    ? "green"
                    : cell === 2
                    ? "#00ff00"
                    : cell === 3
                    ? "#ffff00"
                    : cell === 4
                    ? "#FFA500"
                    : "#fff",
                border: "1px solid #ccc",
            }}
            onClick={() => workplaceSys.handleCellClick(index)}
            >
            {cell === 2 ? "S" : cell === 3 ? "E" : ""}
            </div>
        ))}
    </div>
    )
}

export default MapGrid