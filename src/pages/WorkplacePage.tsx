import { Component, createEffect, createSignal } from "solid-js";
import { css } from "@emotion/css";
import SideNavigator from "../components/SideNavigator";
import PlayPage from "./PlayPage";

const WorkplacePageStyle = css({
  display: "flex",
  flexDirection: "row",
});

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

const toolbarStyle = css({
  display: "flex",
  gap: "10px",
  padding: "10px",
  backgroundColor: "#f0f0f0",
  borderBottom: "1px solid #ccc",
});

const selectedStyle = css({
  backgroundColor: "#007bff",
  color: "#fff",
});

const WorkplacePage: Component = () => {
  const [showPlayPopup, setShowPlayPopup] = createSignal(false);
  const [isSaveEnabled, setIsSaveEnabled] = createSignal(false);

  const handlePlay = () => {
    setShowPlayPopup(true); // Open the popup
  };

  const handleClosePopup = () => setShowPlayPopup(false);
  const enableSave = () => setIsSaveEnabled(true);

  const [grid, setGrid] = createSignal(Array(450).fill(0)); // 30x15 grid as a list
  const [selectedType, setSelectedType] = createSignal<0 | 1 | 2 | 3 | -1>(0); // 0: empty, 1: obstacle, 2: start, 3: end, -1: eraser

  const handleCellClick = (index: number) => {
    const newGrid = [...grid()];
    const currentType = selectedType();

    // Handle eraser functionality
    if (currentType === -1) {
      newGrid[index] = 0; // Clear the cell
    } else {
      // Ensure only one start and end location
      if (currentType === 2 && newGrid.includes(2))
        return alert("Only one starting location allowed!");
      if (currentType === 3 && newGrid.includes(3))
        return alert("Only one end location allowed!");

      // Update the cell type
      newGrid[index] = currentType;
    }

    setIsSaveEnabled(false);
    setGrid(newGrid);
  };

  return (
    <div class={WorkplacePageStyle}>
      <div style={{ flex: 1 }}>
        {/* Toolbar for selecting the element type */}
        <div class={toolbarStyle}>
          <button
            class={`${selectedType() === 0 ? selectedStyle : ""}`}
            onClick={() => setSelectedType(0)}
          >
            Empty
          </button>
          <button
            class={`${selectedType() === 1 ? selectedStyle : ""}`}
            onClick={() => setSelectedType(1)}
          >
            Obstacle
          </button>
          <button
            class={`${selectedType() === 2 ? selectedStyle : ""}`}
            onClick={() => setSelectedType(2)}
          >
            Start
          </button>
          <button
            class={`${selectedType() === 3 ? selectedStyle : ""}`}
            onClick={() => setSelectedType(3)}
          >
            End
          </button>
          <button
            class={`${selectedType() === -1 ? selectedStyle : ""}`}
            onClick={() => setSelectedType(-1)}
          >
            Eraser
          </button>
          <button onClick={handlePlay}>Play</button>
          <button disabled={!isSaveEnabled()}>Save</button>
          {showPlayPopup() && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            >
              <PlayPage
              
                grid={grid()}
                closePopup={handleClosePopup}
                enableSave={enableSave}
              />
            </div>
          )}
        </div>

        {/* Grid */}
        <div class={gridStyle}>
          {grid().map((cell, index) => (
            <div
              class={cellStyle}
              style={{
                "background-color":
                  cell === 1
                    ? "#000"
                    : cell === 2
                    ? "#00ff00"
                    : cell === 3
                    ? "#ffff00"
                    : "#fff",
                border: "1px solid #ccc",
              }}
              onClick={() => handleCellClick(index)}
            >
              {cell === 2 ? "S" : cell === 3 ? "E" : ""}
            </div>
          ))}
        </div>
      </div>
      <SideNavigator />
    </div>
  );
};

export default WorkplacePage;
