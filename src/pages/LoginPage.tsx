import { Component, onMount } from "solid-js";
import { css } from "@emotion/css";
import { AccountTextbox } from "../components/Textbox";
import { dataSys } from "../systems/Data";
import { ButtonStyle, LoginLabelStyle, LoginTitleStyle } from "../property/commonStyles";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import { links } from "../property/Link";

const LoginPageStyle = css({
    // flex
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // position
    // scale
    // text
    // color
    // space
    // other
})

const buttonStyle = css({
    // flex
    // position
    // scale
    // text
    textDecoration: 'underline',
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

const kakaoButtonStyle = css({
    backgroundColor: "#FEE500",
    color: "#000",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  });

const LoginPage: Component = () => {
  onMount(() => {
    dataSys.setCurCreatingAccount({
      email: "",
      passward: "",
      name: "",
    });
  });

    return (
        <div class={LoginPageStyle}>
            <p class={LoginTitleStyle}>로그인</p>
            
            <p class={LoginLabelStyle}>이메일</p>
            <AccountTextbox message={"something@mail.com"} field="email"></AccountTextbox>
            
            <p class={LoginLabelStyle}>비밀번호</p>
            <AccountTextbox message={"비밀번호"} field="passward"></AccountTextbox>

            <button class={`${ButtonStyle(Size.ui.LoginW)} ${css({marginTop: Size.space.xl})}`}
                    onClick={dataSys.getUserLogedin}>
                        로그인
            </button>
            <button class={buttonStyle}
                    onClick={() => window.location.href = links.localhost + "/signin"}>
                        회원가입
            </button>
            {/* Kakao Login Button */}
            <button
                class={kakaoButtonStyle}
                onClick={() => {
                window.location.href = "http://localhost:4242/auth/kakao";
                }}
            >
                Login with Kakao
            </button>
        </div>
    );
}
