import { Component } from "solid-js"
import { Color } from "../property/Color"
import { dialogSys } from "../systems/DialogControl"
import { Size } from "../property/Size"
import { css } from "@emotion/css"

export const IcRun: Component = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             height="32"
             width="32"
             viewBox="0 0 40 36"
             fill="white">
            <path d="M37.11,18.64L6.22.8c-1-.58-2.26.14-2.26,1.3v35.66c0,1.16,1.26,1.88,2.26,1.3l30.89-17.83c1-.58,1-2.03,0-2.61Z"/>
        </svg>
    )
}

export const IcUpload: Component = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             height="36"
             width="36"
             viewBox="0 0 40 36"
             fill="white">
            <path d="M7.68,15.76h7.02v11.48c0,.98.82,1.79,1.79,1.79h7.02c.98,0,1.85-.82,1.85-1.79v-11.48h7.02c.92,0,1.2-.49.54-1.2L21.28,2.97c-.33-.38-.82-.6-1.31-.6s-.92.22-1.25.6L7.14,14.56c-.65.71-.44,1.2.54,1.2h0ZM.5,23.86v12.4c0,.54.27.87.87.87h37.21c.6,0,.92-.33.92-.87v-12.4c0-.54-.44-.98-.92-.98h-3.54c-.49,0-.92.49-.92.98v7.89H5.83v-7.89c0-.54-.38-.98-.87-.98H1.37c-.49,0-.87.49-.87.98Z"/>
        </svg>
    )
}

export const IcHelp: Component = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
            viewBox="0 0 40 40"
            fill={Color.main}>
          <path d="M18.91,28.77c-2.23,0-4.04-1.81-4.04-4.04v-2.02c0-2.89,2.07-5.43,5.04-6.18,1.79-.46,3.03-2.06,3.03-3.91,0-2.23-1.81-4.04-4.04-4.04-1.16,0-2.26.5-3.03,1.37-1.48,1.67-4.03,1.83-5.7.35-1.67-1.48-1.83-4.03-.35-5.7C12.12,1.99,15.43.5,18.91.5c6.68,0,12.11,5.43,12.11,12.12,0,5.18-3.27,9.73-8.08,11.43v.69c0,2.23-1.81,4.04-4.04,4.04Z"/>
          <path d="M18.95,39.76c-2.23,0-4.06-1.81-4.06-4.04s1.79-4.04,4.02-4.04h.04c2.23,0,4.04,1.81,4.04,4.04s-1.81,4.04-4.04,4.04Z"/>
        </svg>
    )
}

export const IcLogin: Component = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
            viewBox="0 0 40 40"
            fill={Color.main}>
        <path d="M21.85,38.07h10.65c2.02,0,3.71-.71,5.02-2.08,1.31-1.31,2.13-3.06,2.13-5.02V9.63c0-1.97-.82-3.71-2.13-5.02s-3.06-2.08-5.02-2.08h-10.65v4.48h10.65c1.53,0,2.67,1.15,2.67,2.62v21.35c0,1.47-1.15,2.67-2.67,2.67h-10.65v4.42h0ZM.5,16.07v8.52c0,.98.82,1.8,1.8,1.8h9.94v6.72c0,.6.27,1.09.82,1.36.22.05.49.05.6.05.38,0,.71-.11.98-.38l12.83-12.83c.49-.49.44-1.47,0-2.02L14.64,6.52c-.44-.44-.98-.49-1.58-.33-.55.27-.82.71-.82,1.31v6.77H2.3c-.98,0-1.8.82-1.8,1.8h0Z"/>
        </svg>
    )
}

export const IcLogout: Component = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
            viewBox="0 0 40 40"
            fill={Color.main}>
        <path d="M18.5,38.27v-4.47s-10.77,0-10.77,0c-1.55,0-2.7-1.21-2.7-2.7V9.51c0-1.49,1.16-2.65,2.7-2.65h10.77s0-4.53,0-4.53H7.73c-1.99,0-3.75.77-5.08,2.1S.5,7.52.5,9.51v21.59c0,1.99.83,3.75,2.15,5.08,1.32,1.38,3.04,2.1,5.08,2.1h10.77s0,0,0,0ZM11.83,16.02v8.61c0,.99.83,1.82,1.82,1.82h10.05v6.79c0,.61.28,1.1.83,1.38.22.05.5.05.61.05.39,0,.72-.11.99-.39l12.97-12.97c.5-.5.44-1.49,0-2.04l-12.97-12.92c-.44-.44-.99-.5-1.6-.33-.55.28-.83.72-.83,1.32v6.85h-10.05c-.99,0-1.82.83-1.82,1.82h0Z"/>
        </svg>
    )
}

export const IcMycontent: Component = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
            viewBox="0 0 40 40"
            fill={Color.main}>
        <path d="M.5,4h14.69l7.34,7.34h17.13v24.48H.5V4Z"/>
        </svg>
    )
}

export const IcSetting: Component = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
            viewBox="0 0 40 40"
            fill={Color.main}>
        <path class="cls-1" d="M23.83,1.61c.17.33.21.75.3,1.6.16,1.6.24,2.4.57,2.84.42.56,1.11.84,1.81.75.55-.07,1.17-.58,2.41-1.6.66-.54.99-.81,1.34-.92.45-.14.93-.12,1.37.07.34.15.64.45,1.24,1.05l1.74,1.74c.6.6.9.9,1.05,1.24.19.43.21.92.07,1.37-.11.35-.38.68-.92,1.34-1.02,1.24-1.53,1.86-1.6,2.41-.09.69.19,1.38.75,1.81.44.33,1.24.41,2.84.57.84.08,1.27.13,1.6.3.42.22.74.58.92,1.01.14.35.14.77.14,1.62v2.46c0,.85,0,1.27-.14,1.62-.17.44-.5.8-.92,1.01-.33.17-.75.21-1.6.3h0c-1.6.16-2.4.24-2.84.57-.56.42-.84,1.11-.75,1.81.07.55.58,1.17,1.6,2.41.54.66.81.98.92,1.34.14.45.12.93-.07,1.37-.15.34-.45.64-1.05,1.24l-1.74,1.74c-.6.6-.9.9-1.24,1.05-.43.19-.92.21-1.37.07-.35-.11-.68-.38-1.34-.92h0c-1.24-1.02-1.86-1.53-2.41-1.6-.69-.09-1.38.19-1.81.75-.33.44-.41,1.24-.57,2.84-.08.84-.13,1.27-.3,1.6-.22.42-.58.74-1.01.92-.35.14-.77.14-1.62.14h-2.46c-.85,0-1.27,0-1.62-.14-.44-.17-.8-.5-1.01-.92-.17-.33-.21-.75-.3-1.6-.16-1.6-.24-2.4-.57-2.84-.42-.56-1.11-.84-1.81-.75-.55.07-1.17.58-2.41,1.6h0c-.66.54-.99.81-1.34.92-.45.14-.93.12-1.37-.07-.34-.15-.64-.45-1.24-1.05l-1.74-1.74c-.6-.6-.9-.9-1.05-1.24-.19-.43-.21-.92-.07-1.37.11-.35.38-.68.92-1.34,1.02-1.24,1.53-1.86,1.6-2.41.09-.69-.19-1.38-.75-1.81-.44-.33-1.24-.41-2.84-.57-.84-.08-1.27-.13-1.6-.3-.42-.22-.74-.58-.92-1.01-.14-.35-.14-.77-.14-1.62v-2.46c0-.85,0-1.27.14-1.62.17-.44.5-.8.92-1.01.33-.17.75-.21,1.6-.3h0c1.6-.16,2.4-.24,2.84-.57.56-.42.84-1.11.75-1.81-.07-.55-.58-1.17-1.6-2.41-.54-.66-.81-.99-.92-1.34-.14-.45-.12-.93.07-1.37.15-.34.45-.64,1.05-1.24l1.74-1.74h0c.6-.6.9-.9,1.24-1.05.43-.19.92-.21,1.37-.07.35.11.68.38,1.34.92,1.24,1.02,1.86,1.53,2.41,1.6.69.09,1.38-.19,1.81-.75.33-.44.41-1.24.57-2.84.08-.84.13-1.27.3-1.6.22-.42.58-.75,1.01-.92.34-.14.77-.14,1.62-.14h2.46c.85,0,1.27,0,1.62.14.44.17.8.5,1.01.92ZM19.97,27.82c4.3,0,7.79-3.49,7.79-7.79s-3.49-7.79-7.79-7.79-7.79,3.49-7.79,7.79,3.49,7.79,7.79,7.79Z"/>
        </svg>
    )
}

const LikeStyle = css({
    cursor: 'pointer',
    transition: "transform 0.2s ease-in-out",
    ":hover": {
      transform: "scale(1.01)",
    },
    ":active": {
        transform: "scale(0.95)",
    },
})

export const IcLikeY: Component = () => {
    return (
        <div class={LikeStyle} onclick={() => dialogSys.setIsLike(false)}>
            <svg xmlns="http://www.w3.org/2000/svg"
            height='108'
            width='108'
            viewBox="0 0 40 40">
                <path fill="#ff6a6a" d="M20,8.96c-3.51-4.09-9.37-5.35-13.77-1.61-4.4,3.74-5.02,10-1.56,14.43,2.87,3.68,11.56,11.45,14.4,13.96.32.28.48.42.66.48.16.05.34.05.5,0,.19-.06.34-.2.66-.48,2.85-2.51,11.53-10.28,14.4-13.96,3.45-4.43,2.91-10.73-1.56-14.43-4.47-3.7-10.24-2.48-13.74,1.61Z"/>
                <path d="M19.99,38.21c-.27,0-.54-.04-.81-.12-.6-.18-.99-.52-1.4-.88-3.44-3.03-11.74-10.49-14.65-14.22C1.14,20.44.23,17.28.57,14.11c.34-3.18,1.9-6.11,4.4-8.24,2.49-2.12,5.61-3.04,8.76-2.58,2.28.33,4.44,1.35,6.27,2.92,1.82-1.56,3.97-2.58,6.23-2.9,3.12-.45,6.23.45,8.76,2.55,2.54,2.11,4.12,5.04,4.45,8.25.32,3.17-.6,6.33-2.59,8.88-2.91,3.73-11.22,11.19-14.65,14.22-.41.36-.8.71-1.4.88-.26.08-.54.12-.81.12ZM12.12,7.07c-1.56,0-3.16.53-4.62,1.77-3.58,3.05-4.13,8.1-1.29,11.75,2.66,3.42,10.79,10.71,13.78,13.37,2.99-2.65,11.12-9.95,13.78-13.37,2.88-3.7,2.34-8.74-1.27-11.73-3.95-3.27-8.48-1.58-11.02,1.38-.37.43-.91.68-1.48.68s-1.11-.25-1.48-.68c-1.62-1.88-3.97-3.17-6.4-3.17Z"/>
            </svg>
        </div>
    )
}

export const IcLikeN: Component = () => {
    return (
        <div class={LikeStyle} onclick={() => dialogSys.setIsLike(true)}>
            <svg xmlns="http://www.w3.org/2000/svg"
            height='108'
            width='108'
            viewBox="0 0 40 40">
                <path fill="#b3b3b3" d="M20,8.96c-3.51-4.09-9.37-5.35-13.77-1.61-4.4,3.74-5.02,10-1.56,14.43,2.87,3.68,11.56,11.45,14.4,13.96.32.28.48.42.66.48.16.05.34.05.5,0,.19-.06.34-.2.66-.48,2.85-2.51,11.53-10.28,14.4-13.96,3.45-4.43,2.91-10.73-1.56-14.43-4.47-3.7-10.24-2.48-13.74,1.61Z"/>
                <path d="M19.99,38.21c-.27,0-.54-.04-.81-.12-.6-.18-.99-.52-1.4-.88-3.44-3.03-11.74-10.49-14.65-14.22C1.14,20.44.23,17.28.57,14.11c.34-3.18,1.9-6.11,4.4-8.24,2.49-2.12,5.61-3.04,8.76-2.58,2.28.33,4.44,1.35,6.27,2.92,1.82-1.56,3.97-2.58,6.23-2.9,3.12-.45,6.23.45,8.76,2.55,2.54,2.11,4.12,5.04,4.45,8.25.32,3.17-.6,6.33-2.59,8.88-2.91,3.73-11.22,11.19-14.65,14.22-.41.36-.8.71-1.4.88-.26.08-.54.12-.81.12ZM12.12,7.07c-1.56,0-3.16.53-4.62,1.77-3.58,3.05-4.13,8.1-1.29,11.75,2.66,3.42,10.79,10.71,13.78,13.37,2.99-2.65,11.12-9.95,13.78-13.37,2.88-3.7,2.34-8.74-1.27-11.73-3.95-3.27-8.48-1.58-11.02,1.38-.37.43-.91.68-1.48.68s-1.11-.25-1.48-.68c-1.62-1.88-3.97-3.17-6.4-3.17Z"/>
            </svg>
        </div>
    )
}

export const BlockStart: Component = () => {
    return (
        <svg id="_레이어_3" data-name="레이어 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
        <rect fill="#2088ca" x=".2" y=".2" width="160" height="160"/>
        <g>
            <circle fill="#fff" cx="39.2" cy="84.2" r="20"/>
            <circle cx="39.2" cy="84.2" r="13"/>
        </g>
        <g>
            <circle fill="#fff" cx="122.2" cy="84.2" r="20"/>
            <circle cx="122.2" cy="84.2" r="13"/>
        </g>
        </svg>
    )
}

export const BlockEnd: Component = () => {
    return (
        <svg id="_레이어_3" data-name="레이어 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
        <path fill="#ff8f1f" d="M15.6,12.07v137.99c0,1.59,1.29,2.88,2.88,2.88h13.41c1.59,0,2.88-1.29,2.88-2.88v-51.74c0-1.59,1.29-2.88,2.88-2.88h21.9c8.68,0,17,3.45,23.14,9.58h0c6.14,6.14,14.46,9.58,23.14,9.58h35.58c4.62,0,8.37-3.75,8.37-8.37V36.73c0-4.62-3.75-8.37-8.37-8.37h-35.58c-8.68,0-17-3.45-23.14-9.58h0c-6.14-6.14-14.46-9.58-23.14-9.58H18.48c-1.59,0-2.88,1.29-2.88,2.88Z"/>
        </svg>
    )
}

export const BlockFloor: Component = () => {
    return (
        <svg id="_레이어_3" data-name="레이어 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
        <rect fill="#c93300" x=".2" y=".2" width="160" height="160"/>
        <polygon fill="#861f00" points="180.2 107.2 20.2 160.2 180.5 160.2 180.2 107.2"/>
        <polygon fill="#db862b" points="-21.5 53.2 138.5 .2 -21.8 .2 -21.5 53.2"/>
        </svg>
    )
}

export const BlockObstacle: Component = () => {
    return (
        <svg id="_레이어_3" data-name="레이어 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
        <rect fill="#ff3f65" x=".2" y=".2" width="160" height="160"/>
        <polygon fill="#dc004a" points="180.2 107.2 20.2 160.2 180.5 160.2 180.2 107.2"/>
        <polygon fill="#ff7395" points="-19.5 53.2 140.5 .2 -19.8 .2 -19.5 53.2"/>
        <path fill="none"
              stroke="#e6e6e6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={8}
              d="M68.4,108.62v14.88M88.25,118.54v4.96M122.97,78.85v4.96c0,10.96-8.89,19.85-19.85,19.85v19.85h-49.61v-19.85c-10.96,0-19.85-8.89-19.85-19.85v-4.96c0-24.66,19.99-44.65,44.65-44.65s44.65,19.99,44.65,44.65ZM68.4,71.41c0,5.48-4.44,9.92-9.92,9.92s-9.92-4.44-9.92-9.92,4.44-9.92,9.92-9.92,9.92,4.44,9.92,9.92ZM108.09,71.41c0,5.48-4.44,9.92-9.92,9.92s-9.92-4.44-9.92-9.92,4.44-9.92,9.92-9.92,9.92,4.44,9.92,9.92Z"/>
        </svg>
    )
}

export const BlockTurtle: Component = () => {
    return (
        <svg id="_레이어_3" data-name="레이어 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
        <rect fill="#646464" x=".2" y=".2" width="160" height="160"/>
        <g>
            <path fill="#fff" d="M101.66,87.05c.13.31.25.62.39.92,4.86,9.92,16.84,14.02,26.76,9.15,9.92-4.86,14.02-16.84,9.15-26.76-.15-.3-.32-.58-.49-.88l-35.82,17.56Z"/>
            <path d="M107.95,83.97c.12.31.25.62.39.92,3.16,6.45,10.95,9.11,17.4,5.95,6.45-3.16,9.11-10.95,5.95-17.4-.15-.3-.32-.59-.49-.88l-23.25,11.4Z"/>
        </g>
        <g>
            <path fill="#fff" d="M57.02,87.05c-.13.31-.25.62-.39.92-4.86,9.92-16.84,14.02-26.76,9.15-9.92-4.86-14.02-16.84-9.15-26.76.15-.3.32-.58.49-.88l35.82,17.56Z"/>
            <path d="M50.74,83.97c-.12.31-.25.62-.39.92-3.16,6.45-10.95,9.11-17.4,5.95-6.45-3.16-9.11-10.95-5.95-17.4.15-.3.32-.59.49-.88l23.25,11.4Z"/>
        </g>
        </svg>
    )
}

export const BlockEraser: Component = () => {
    return (
        <svg id="_레이어_3" data-name="레이어 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
        <path d="M71.42,25.29c13.75-13.75,20.62-20.62,29.16-20.62s15.41,6.87,29.16,20.62c13.75,13.75,20.62,20.62,20.62,29.16s-6.87,15.41-20.62,29.16l-34.52,34.52-58.32-58.32,34.52-34.52Z"/>
        <path d="M28.17,68.53l58.32,58.32-5.36,5.36c-3.11,3.11-5.87,5.87-8.37,8.27h77.59c3.41,0,6.17,2.76,6.17,6.17s-2.76,6.17-6.17,6.17H51.59c-8.36-.21-15.23-7.08-28.77-20.62-13.75-13.75-20.62-20.62-20.62-29.16s6.87-15.41,20.62-29.16l5.36-5.36Z"/>
        </svg>
    )
}