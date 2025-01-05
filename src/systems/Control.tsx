import { Accessor, createSignal, Setter } from "solid-js";

class ControlSys {
    isMapDialogOpen: Accessor<boolean>
    setIsMapDialogOpen: Setter<boolean>
    
    isHelpDialogOpen: Accessor<boolean>
    setIsHelpDialogOpen: Setter<boolean>

    isSettingDialogOpen: Accessor<boolean>
    setIsSettingDialogOpen: Setter<boolean>

    constructor() {
        ([this.isMapDialogOpen, this.setIsMapDialogOpen] = createSignal<boolean>(false)),
        ([this.isHelpDialogOpen, this.setIsHelpDialogOpen] = createSignal<boolean>(false)),
        ([this.isSettingDialogOpen, this.setIsSettingDialogOpen] = createSignal<boolean>(false))
    }
}

export const controlSys = new ControlSys()