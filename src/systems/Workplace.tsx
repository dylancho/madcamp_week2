import { Accessor, createEffect, createSignal, Setter } from "solid-js"
import { Size } from "../property/Size";

// 0: empty, 1: obstacle, 2: start, 3: end, -1: eraser
export type elementType = 0 | 1 | 2 | 3 | -1 | 4 | 5;

class WorkplaceSys {  
    showPlayPopup: Accessor<boolean>
    setShowPlayPopup: Setter<boolean>

    isSaveEnabled: Accessor<boolean>
    setIsSaveEnabled: Setter<boolean>

    workingWorld: Accessor<number[]>
    setWorkingWorld: Setter<number[]>

    selectedType: Accessor<elementType>
    setSelectedType: Setter<elementType>

    curMapName: Accessor<string>
    setCurMapName: Setter<string>

    constructor() {
        ([this.showPlayPopup, this.setShowPlayPopup] = createSignal<boolean>(false)),
        ([this.isSaveEnabled, this.setIsSaveEnabled] = createSignal<boolean>(false)),
        ([this.workingWorld, this.setWorkingWorld] = createSignal<number[]>(Array(Size.world.col * Size.world.row).fill(0))),
        ([this.selectedType, this.setSelectedType] = createSignal<elementType>(0)),
        ([this.curMapName, this.setCurMapName] = createSignal<string>("이름없는 지도"))
    }

    handleCellClick = (index: number) => {
        const newWorkingWorld = [... this.workingWorld()];
        const currentType = this.selectedType();
    
        // Handle eraser functionality
        if (currentType === -1) {
          newWorkingWorld[index] = 0; // Clear the cell
        } else {
          // Ensure only one start and end location
          if (currentType === 2 && newWorkingWorld.includes(2))
            return alert("Only one starting location allowed!");
          if (currentType === 3 && newWorkingWorld.includes(3))
            return alert("Only one end location allowed!");
    
          // Update the cell type
          newWorkingWorld[index] = currentType;
        }
    
        this.setIsSaveEnabled(false);
        this.setWorkingWorld(newWorkingWorld);
      };
}

export const workplaceSys = new WorkplaceSys()