import { css } from "@emotion/css";
import { Accessor, Component, JSXElement, onCleanup, Setter, Show, createSignal, createResource, } from "solid-js";
import { Size } from "../property/Size";
import { controlSys } from "../systems/Control";
import KeySetGrid from "./KeySet";
import { dataSys } from "../systems/Data";
import MapInfoSection from "../layouts/mapInfoSection";
import { OverlayStyle } from "../property/commonStyles";

const DialogStyle = css({
  // flex
  display: "flex",
  flexDirection: "column",
  // position
  position: "relative",
  // scale
  width: "80%",
  height: "60%",
  // text
  // color
  backgroundColor: "white",
  // space
  padding: `${Size.space.dialog}px ${Size.space.edge}px`,
  // other
  borderRadius: Size.radius.l,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const DialogTitleStyle = css({
  // flex
  // position
  // scale
  // text
  fontSize: Size.font.login,
  fontWeight: "bold",
  // color
  // space
  marginBottom: Size.space.xl,
  // other
});

export const Dialog: Component<{isOpen: Accessor<boolean>,
                         setIsOpen: Setter<boolean>,
                         title: string,
                         customStyle?: string,
                         children: JSXElement}> = ({isOpen, setIsOpen, title, customStyle, children}) => {

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
                <div class={`${DialogStyle} ${customStyle? customStyle: ""}`}>
                    <Show when={title !== ""}>
                        <div class={DialogTitleStyle}>{title}</div>
                    </Show>
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
                title="">
            <div class={DialogTitleStyle}>{dataSys.curMap.name}</div>
            <MapInfoSection />
        </Dialog>
    )
}

export const HelpDialog: Component = () => {
  return (
    <Dialog
      isOpen={controlSys.isHelpDialogOpen}
      setIsOpen={controlSys.setIsHelpDialogOpen}
      title="환영합니다!"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum..
      </p>
    </Dialog>
  );
};

export const SettingDialog: Component = () => {
  // Resource to fetch current keys
  const [keyBindings, setKeyBindings] = createSignal<string[]>([
    "KeyRight",
    "KeyLeft",
    "KeyDown",
    "KeyUp",
    "2",
    "3",
  ]);

  // Handler to update keys on the backend
  const handleKeysChange = (index: number, newKey: string) => {
    const updatedKeys = [...keyBindings()];
    updatedKeys[index] = newKey;
    setKeyBindings(updatedKeys);

    // Optionally send the updated keys to the backend
    dataSys.putKeys(dataSys.curUser.email, updatedKeys);
  };

  return (
    <Dialog
      isOpen={controlSys.isSettingDialogOpen}
      setIsOpen={controlSys.setIsSettingDialogOpen}
      title="키 설정"
    >
      <KeySetGrid keyBindings={keyBindings()} onKeyChange={handleKeysChange} />
    </Dialog>
  );
};

export const ClearDialog: Component<{
  isOpen: Accessor<boolean>,
  customStyle?: string,
  children: JSXElement}> = ({isOpen, customStyle, children}) => {

  return (
    <Show when={isOpen()}>
      <div class={OverlayStyle}>
        <div class={`${DialogStyle} ${customStyle? customStyle: ""}`}>
          {children}
        </div>
      </div>
    </Show>
  )      
}