import { css } from "@emotion/css";
import { Size } from "./Size";
import { Color } from "./Color";

export const TextboxStyle = (wid: number | string = Size.ui.LoginW) => {
  return css({
    // flex
    // position
    // scale
    boxSizing: "border-box",
    width: wid,
    height: Size.ui.textboxH,
    // text
    fontSize: Size.font.xs,
    // color
    backgroundColor: "white",
    // space
    paddingLeft: Size.space.m,
    paddingRight: Size.space.m,
    // other
    border: "solid 1px",
    borderColor: Color.gray,
    borderRadius: Size.radius.m,
  });
};

export const ButtonStyle = (wid?: number | string) => {
  return css({
    // flex
    // position
    // scale
    width: wid,
    height: Size.ui.buttonH,
    // text
    fontSize: Size.font.m,
    textAlign: "center",
    fontWeight: "bold",
    // color
    color: "white",
    backgroundColor: Color.main,
    // space
    // other
    border: "none",
    borderRadius: Size.radius.m,
    cursor: "pointer",
    ":hover": {
      filter: "brightness(1.12)",
    },
  });
};

export const LoginTitleStyle = css({
  // flex
  // position
  // scale
  // text
  fontSize: Size.font.login,
  fontWeight: "bold",
  // color
  // space
  marginTop: 108,
  marginBottom: 80,
  // other
});

export const LoginLabelStyle = css({
  // flex
  // position
  textAlign: "left",
  // scale
  width: Size.ui.LoginW,
  // text
  fontSize: Size.font.m,
  fontWeight: "bold",
  // color
  // space
  marginTop: Size.space.l,
  marginBottom: Size.space.s,
  // other
});

export const ErrorGlowStyle = css({
  border: "2px solid red", // Red border
  boxShadow: "0 0 8px red", // Red glow effect
  transition: "box-shadow 0.3s ease", // Smooth transition
});

export const OverlayStyle = css({
  // flex
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // position
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  // scale
  width: "100vw",
  height: "100vh",
  // text
  // color
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  // space
  // other
});

export const MapGridStyle = css({
  display: "grid",
  gridTemplateColumns: `repeat(${Size.world.col}, 1fr)`,
  gridTemplateRows: `repeat(${Size.world.row}, 1fr)`,
  gap: "1px",
  width: "100%",
  height: "100%",
  backgroundColor: Color.grayLight,
});

export const CellStyle = (cellType: number) => {
  let bgColor = "#fff";
  if (cellType === 1) bgColor = "green"; // Obstacle
  else if (cellType === 2) bgColor = "#00ff00"; // Start
  else if (cellType === 3) bgColor = "#ffff00"; // End
  else if (cellType === 4) bgColor = "orange";
  else if (cellType === 5) bgColor = "red";
  return css({
    backgroundColor: bgColor,
    width: "100%",
    height: "100%",
  });
};
