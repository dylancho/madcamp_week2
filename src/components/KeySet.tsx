import { css } from "@emotion/css";
import { Component, For, createSignal } from "solid-js";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import { dataSys } from "../systems/Data";

const KeySetContainerStyle = css({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const KeySetGridStyle = css({
  display: "grid",
  gridTemplateRows: "repeat(4, 1fr)",
  gridAutoFlow: "column",
  rowGap: Size.space.edge,
  columnGap: 120,
});

const KeySetStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: Size.ui.keySetW,
  height: Size.ui.keySetH,
});

const KeySetLabelStyle = css({
  height: "100%",
  fontSize: Size.font.m,
  textShadow: `1px 1px 2px ${Color.grayLight}`,
  textAlign: "left",
  lineHeight: 2.5,
});

const KeySetBoxStyle = css({
  width: Size.ui.keySetBoxW,
  height: "100%",
  fontSize: Size.font.l,
  textAlign: "center",
  lineHeight: 1.5,
  backgroundColor: Color.gray,
  borderRadius: Size.radius.m,
  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
  cursor: "pointer", // Add pointer cursor to indicate clickability
  overflow: 'clip',
});

const CapturingStyle = css({
  backgroundColor: Color.grayDark, // Change color to indicate active capturing
});

type KeySetGridProps = {
  keyBindings: string[]; // Array of key bindings
  onKeyChange: (index: number, newKey: string) => void; // Callback for key change
};

const KeySet: Component<{
  label: string;
  keyValue: string;
  onKeyChange: (newKey: string) => void;
}> = (props) => {
  const [capturing, setCapturing] = createSignal<boolean>(false);

  const handleKeyDownOnce = (e: KeyboardEvent) => {
    e.preventDefault();
    const pressedKey = e.key;
    setCapturing(false);
    props.onKeyChange(pressedKey);
    document.removeEventListener("keydown", handleKeyDownOnce);
  };

  const startCapturing = () => {
    if (capturing()) return;
    setCapturing(!capturing());
    document.addEventListener("keydown", handleKeyDownOnce, { once: true });
  };

  return (
    <div class={KeySetStyle}>
      <div class={KeySetLabelStyle}>{props.label}</div>
      <div
        class={`${KeySetBoxStyle} ${capturing() ? CapturingStyle : ""}`}
        onClick={startCapturing}
      >
        {capturing() ? "..." : props.keyValue}
      </div>
    </div>
  );
};

const KeySetGrid: Component<KeySetGridProps> = () => {
  const [keyBindings, setKeyBindings] = createSignal(
    ["오른쪽", "왼쪽", "아래쪽", "위쪽", "2D 전환", "3D 전환"].map((label, index) => ({
      label, // Use the predefined labels
      keyValue: dataSys.curUser.keys[index] || "A", // Use dataSys.curUser.key if available, default to "A"
    }))
  );

  const handleKeyChange = (index: number, newKey: string) => {
    setKeyBindings((prev) =>
      prev.map((binding, i) =>
        i === index ? { ...binding, keyValue: newKey } : binding
      )
    );

    const keyBindingsList = keyBindings().map((e: any) => e.keyValue);
    dataSys.putKeys(dataSys.curUser.email, keyBindingsList);
  };

  return (
    <div class={KeySetContainerStyle}>
      <div class={KeySetGridStyle}>
        <For each={keyBindings()}>
          {(binding, i) => (
            <KeySet
              label={binding.label}
              keyValue={binding.keyValue}
              onKeyChange={(newKey) => handleKeyChange(i(), newKey)}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default KeySetGrid;
