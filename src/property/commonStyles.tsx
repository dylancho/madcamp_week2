import { css } from "@emotion/css";
import { Size } from "./Size";
import { Color } from "./Color";

export const TextboxStyle = (wid: number | string = Size.ui.LoginW) => { return css({
    // flex
    // position
    // scale
    boxSizing: 'border-box',
    width: wid,
    height: Size.ui.textboxH,
    // text
    fontSize: Size.font.xs,
    // color
    backgroundColor: 'white',
    // space
    paddingLeft: Size.space.m,
    paddingRight: Size.space.m,
    // other
    border: "solid 1px",
    borderColor: Color.gray,
    borderRadius: Size.radius.m,
})}

export const ButtonStyle = (wid?: number | string) => { return css({
    // flex
    // position
    // scale
    width: wid,
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
    cursor: 'pointer',
    ":hover": {
      filter: 'brightness(1.12)',
    },
})}

export const LoginTitleStyle = css({
    // flex
    // position
    // scale
    // text
    fontSize: Size.font.login,
    fontWeight: 'bold',
    // color
    // space
    marginTop: 108,
    marginBottom: 80,
    // other
})

export const LoginLabelStyle = css(({
    // flex
    // position
    textAlign: 'left',
    // scale
    width: Size.ui.LoginW,
    // text
    fontSize: Size.font.m,
    fontWeight: 'bold',
    // color
    // space
    marginTop: Size.space.l,
    marginBottom: Size.space.s,
    // other
}))