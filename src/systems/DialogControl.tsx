import { Accessor, createSignal, Setter } from "solid-js";

class DialogSys {
    isMapDialogOpen: Accessor<boolean>
    setIsMapDialogOpen: Setter<boolean>
    
    isHelpDialogOpen: Accessor<boolean>
    setIsHelpDialogOpen: Setter<boolean>

    isSettingDialogOpen: Accessor<boolean>
    setIsSettingDialogOpen: Setter<boolean>

    isLike: Accessor<boolean>
    setIsLike: Setter<boolean>

    constructor() {
        ([this.isMapDialogOpen, this.setIsMapDialogOpen] = createSignal<boolean>(false)),
        ([this.isHelpDialogOpen, this.setIsHelpDialogOpen] = createSignal<boolean>(false)),
        ([this.isSettingDialogOpen, this.setIsSettingDialogOpen] = createSignal<boolean>(false)),
        ([this.isLike, this.setIsLike] = createSignal<boolean>(false))
    }
}

export const dialogSys = new DialogSys()