import { css } from "@emotion/css";
import { Component } from "solid-js";
import { Color } from "../property/Color";
import { Size } from "../property/Size";
import { accountType, dataSys } from "../systems/Data";
import { TextboxStyle, ErrorGlowStyle } from "../property/commonStyles";

const searchTextboxStyle = css({
    // flex
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // position
    // scale
    // text
    // color
    // space
    // other
})

const iconStyle = css({
    fill: Color.grayDark,
    marginRight: Size.space.m,
})

const inputStyle = css({
    fontSize: '1.1rem',
    border: 'none',
    ":focus": {
        outline: 'none',
    }
})

export const AccountTextbox: Component<{
    message: string;
    field: keyof accountType;
  }> = ({ message, field}) => {
    return (
      <input
        class={`${TextboxStyle()} ${dataSys.emailError() ? ErrorGlowStyle : ""}`} // Add ErrorGlowStyle conditionally
        placeholder={message}
        oninput={(e) => dataSys.setCurCreatingAccount(field, e.currentTarget.value)}
      />
    );
  };

export const SearchTextbox: Component<{message: string}> = ({message}) => {
    return (
        <div class={`${TextboxStyle(Size.ui.searchW)} ${searchTextboxStyle}`}>
            <svg xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    width="40"
                    viewBox="0 0 40 40"
                    class={iconStyle}>
                <path d="M37.58,38.96c-.49,0-.98-.19-1.36-.56l-8.73-8.7c-2.87,2.27-6.39,3.5-10.11,3.5-4.37,0-8.47-1.7-11.56-4.79-3.09-3.09-4.79-7.19-4.79-11.56s1.7-8.47,4.79-11.56S13.02.5,17.38.5s8.47,1.7,11.56,4.79c3.09,3.09,4.79,7.19,4.79,11.56,0,3.73-1.24,7.26-3.52,10.14l8.72,8.7c.75.75.75,1.97,0,2.72-.38.38-.87.57-1.36.57ZM17.38,4.35c-6.89,0-12.5,5.61-12.5,12.5s5.61,12.5,12.5,12.5,12.5-5.61,12.5-12.5-5.61-12.5-12.5-12.5Z"/>
            </svg>
            <input class={inputStyle}
                placeholder={message}
                oninput={(e) => {}}/>
        </div>
    )
}