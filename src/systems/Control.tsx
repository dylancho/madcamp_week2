import { Accessor, createSignal, Setter } from "solid-js";

class ControlSys {
    isDialogOpen: Accessor<boolean>
    setIsDialogOpen: Setter<boolean>

    constructor() {
        ([this.isDialogOpen, this.setIsDialogOpen] = createSignal<boolean>(false))
    }

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            this.setIsDialogOpen(false);
        }
    }
}

export const controlSys = new ControlSys()