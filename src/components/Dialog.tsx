import { css } from "@emotion/css";
import { Accessor, Component, JSXElement, onCleanup, Setter, Show } from "solid-js";
import { Color } from "../property/Color";
import { Size } from "../property/Size";
import { controlSys } from "../systems/Control";
import KeySetGrid from "./KeySet";

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
    padding: `${Size.space.dialog}px ${Size.space.edge}px`,
    // other
    borderRadius: Size.radius.l,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
})

const DialogTitleStyle = css({
    // flex
    // position
    // scale
    // text
    fontSize: Size.font.login,
    fontWeight: 'bold',
    // color
    // space
    marginBottom: Size.space.xl,
    // other
})

export const Dialog: Component<{isOpen: Accessor<boolean>,
                         setIsOpen: Setter<boolean>,
                         title: string,
                         children: JSXElement}> = ({isOpen, setIsOpen, title, children}) => {
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
                <div class={DialogStyle}>
                    <div class={DialogTitleStyle}>{title}</div>
                    {children}
                </div>
            </div>
        </Show>
    )      
}

export const MapDialog: Component = () => {
    return (
        <Dialog isOpen={controlSys.isMapDialogOpen}
                setIsOpen={controlSys.setIsMapDialogOpen}
                title="지도 이름">
            <p>this is map dialog.</p>
        </Dialog>
    )
}

export const HelpDialog: Component = () => {
    return (
        <Dialog isOpen={controlSys.isHelpDialogOpen}
                setIsOpen={controlSys.setIsHelpDialogOpen}
                title="환영합니다!">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..</p>
        </Dialog>
    )
}

export const SettingDialog: Component = () => {
    return (
        <Dialog isOpen={controlSys.isSettingDialogOpen}
                setIsOpen={controlSys.setIsSettingDialogOpen}
                title="키 설정">
            <KeySetGrid></KeySetGrid>
        </Dialog>
    )
}