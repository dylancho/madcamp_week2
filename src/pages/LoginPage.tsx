import { Component, onMount } from "solid-js";
import { css } from "@emotion/css";
import { AccountTextbox } from "../components/Textbox";
import { dataSys } from "../systems/Data";
import { links } from "../property/Link";

const LoginPageStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const buttonStyle = css({
  backgroundColor: "aqua",
  ":hover": { filter: "brightness(1.12)" },
});

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
            <p>로그인</p>
            <p>이메일</p>
            <AccountTextbox message={"something@mail.com"} field="email"></AccountTextbox>
            <p>비밀번호</p>
            <AccountTextbox message={"비밀번호"} field="passward"></AccountTextbox>

      <button class={buttonStyle} onClick={dataSys.getUserLogedin}>
        Log in
      </button>
      <button
        class={buttonStyle}
        onClick={() => (window.location.href = links.localhost + "/signin")}
      >
        Go to Sign-up Page
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
};

export default LoginPage;
