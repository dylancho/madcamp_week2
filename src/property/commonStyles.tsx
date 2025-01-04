import { css } from "@emotion/css";
import { Size } from "./Size";
import { Color } from "./Color";

export const TextboxStyle = css({
    // flex
    // position
    // scale
    height: Size.ui.textboxH,
    // text
    fontSize: '1.1rem',
    // color
    backgroundColor: 'white',
    // space
    paddingLeft: Size.space.m,
    paddingRight: Size.space.m,
    // other
    border: "solid 1px",
    borderColor: Color.gray,
    borderRadius: Size.radius.m,
})

export const ButtonStyle = css({
    // flex
    // position
    // scale
    height: Size.ui.buttonH,
    // text
    fontSize: Size.font.m,
    textAlign: 'center',
    fontWeight: 'bold',
    // color
    color: 'white',
    backgroundColor: Color.main,
    // space
    // other
    border: 'none',
    borderRadius: Size.radius.m,
    ":hover": {
      filter: 'brightness(1.12)',
    },
})