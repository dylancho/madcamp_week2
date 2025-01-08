import { css } from "@emotion/css";
import { Accessor, Component, JSXElement, onCleanup, Setter, Show, createSignal, createResource, } from "solid-js";
import { Size } from "../property/Size";
import { dialogSys } from "../systems/DialogControl";
import KeySetGrid from "./KeySet";
import { dataSys } from "../systems/Data";
import MapInfoSection from "../layouts/mapInfoSection";
import { OverlayStyle } from "../property/commonStyles";
import { gameplaySys } from "../systems/Gameplay";
import { Color } from "../property/Color";
import { IcLikeN, IcLikeY } from "./Icons";
import { links } from "../property/Link";

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

const ClearDialogTitleStyle = css({
  // flex
  alignSelf: 'center',
  // text
  fontSize: Size.font.main,
  fontWeight: "bold",
  // color
  color: Color.main,
  // space
  marginBottom: Size.space.xl,
  // other
})

const ClearDialogmessageStyle = css({
  // flex
  alignSelf: 'center',
  // text
  fontSize: Size.font.l,
  fontWeight: "bold",
  // color
  color: 'black',
  // space
  // other
})

const ClearDialogLikeStyle = css({
  // flex
  alignSelf: 'center',
  // text
  fontSize: Size.font.l,
  fontWeight: "bold",
  // color
  color: 'black',
  // space
  // other
})

const buttonStyle = css({
  // flex
  // position
  // scale
  // text
  textDecoration: 'underline',
  fontSize: Size.font.m,
  fontColor: Color.gray,
  // color
  backgroundColor: 'transparent',
  // space
  marginTop: Size.space.l,
  // other
  border: 'none',
  cursor: 'pointer',

  ":hover": {
      filter: 'brightness(1.12)',
  }
})

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
        <Dialog isOpen={dialogSys.isMapDialogOpen}
                setIsOpen={dialogSys.setIsMapDialogOpen}
                title="">
            <div class={DialogTitleStyle}>{dataSys.curMap.name}</div>
            <MapInfoSection />
        </Dialog>
    )
}

export const HelpDialog: Component = () => {
  return (
    <Dialog
      isOpen={dialogSys.isHelpDialogOpen}
      setIsOpen={dialogSys.setIsHelpDialogOpen}
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
      isOpen={dialogSys.isSettingDialogOpen}
      setIsOpen={dialogSys.setIsSettingDialogOpen}
      title="키 설정"
    >
      <KeySetGrid keyBindings={keyBindings()} onKeyChange={handleKeysChange} />
    </Dialog>
  );
};

export const ClearDialog: Component = () => {
  return (
    <Show when={gameplaySys.isSuccess()}>
      <div class={OverlayStyle}>
        <div class={`${DialogStyle} ${css({gap: Size.space.xl})}`}>
          <div class={ClearDialogTitleStyle}>성공!</div>
          <div class={ClearDialogmessageStyle}>마음에 들었다면 좋아요를 눌러주세요!</div>
          <div class={ClearDialogLikeStyle}>
            <Show when={dialogSys.isLike()} fallback={
              <IcLikeN />
            }>
              <IcLikeY />
            </Show>
          </div>
          <button class={buttonStyle}
                  onClick={() => dataSys.increaseRating(dataSys.curMap.id)}>
              메인으로 돌아가기
          </button>
        </div>
      </div>
    </Show>
  )      
}