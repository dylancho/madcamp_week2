import { Accessor, createEffect, createSignal, Setter } from "solid-js"
import { Size } from "../property/Size";

// 0: empty, 1: obstacle, 2: start, 3: end, -1: eraser
export type elementType = 0 | 1 | 2 | 3 | -1 | 4;

class WorkplaceSys {
    showPlayPopup: Accessor<boolean>
    setShowPlayPopup: Setter<boolean>

    isSaveEnabled: Accessor<boolean>
    setIsSaveEnabled: Setter<boolean>

    grid: Accessor<number[]>
    setGrid: Setter<number[]>

    selectedType: Accessor<elementType>
    setSelectedType: Setter<elementType>

    constructor() {
        ([this.showPlayPopup, this.setShowPlayPopup] = createSignal<boolean>(false)),
        ([this.isSaveEnabled, this.setIsSaveEnabled] = createSignal<boolean>(false)),
        ([this.grid, this.setGrid] = createSignal<number[]>(Array(Size.world.col * Size.world.row).fill(0))),
        ([this.selectedType, this.setSelectedType] = createSignal<elementType>(0))
      }

    handleCellClick = (index: number) => {
        const newGrid = [... this.grid()];
        const currentType = this.selectedType();
    
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
    
        this.setIsSaveEnabled(false);
        this.setGrid(newGrid);
      };
}

export const workplaceSys = new WorkplaceSys()