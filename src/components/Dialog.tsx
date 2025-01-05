import { css } from "@emotion/css";
import { Accessor, Component, JSXElement, onCleanup, Setter, Show } from "solid-js";
import { Color } from "../property/Color";
import { Size } from "../property/Size";
import { controlSys } from "../systems/Control";

const OverlayStyle = css({
    // flex
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    // position
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    // scale
    width: '100vw',
    height: '100vh',
    // text
    // color
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // space
    // other
})

const DialogStyle = css({
    // flex
    // position
    position: 'relative',
    // scale
    width: '80%',
    height: '60%',
    // text
    // color
    backgroundColor: 'white',
    // space
    padding: Size.space.edge,
    // other
    borderRadius: Size.radius.m,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
})

export const Dialog: Component<{isOpen: Accessor<boolean>,
                         setIsOpen: Setter<boolean>,
                         children: JSXElement}> = ({isOpen, setIsOpen, children}) => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key == "Escape") {
            setIsOpen(false);
        }
    }

    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => document.removeEventListener("keydown", handleKeyDown));

    return (
        <Show when={isOpen()}>
            <div class={OverlayStyle} onclick={(e) => {
                if (e.target == e.currentTarget) { setIsOpen(false); }
            }}>
                <div class={DialogStyle}>{children}</div>
            </div>
        </Show>
    )      
}

export const MapDialog: Component = () => {
    return (
        <Dialog isOpen={controlSys.isMapDialogOpen}
                setIsOpen={controlSys.setIsMapDialogOpen}>
            <p>this is map dialog.</p>
        </Dialog>
    )
}

export const HelpDialog: Component = () => {
    return (
        <Dialog isOpen={controlSys.isHelpDialogOpen}
                setIsOpen={controlSys.setIsHelpDialogOpen}>
            <p>this is help dialog.</p>
        </Dialog>
    )
}

export const SettingDialog: Component = () => {
    return (
        <Dialog isOpen={controlSys.isSettingDialogOpen}
                setIsOpen={controlSys.setIsSettingDialogOpen}>
            <p>this is setting dialog.</p>
        </Dialog>
    )
}