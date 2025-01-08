import { css } from "@emotion/css";
import { Component, JSXElement } from "solid-js";
import { elementType, workplaceSys } from "../systems/Workplace";
import { Color } from "../property/Color";
import { Size } from "../property/Size";
import { BlockEnd, BlockFloor, BlockObstacle, BlockStart, BlockTurtle } from "./Icons";


const MapElementButtonStyle = (isSelected: boolean) => { return css({
    // flex
    // position
    // scale
    width: Size.ui.mapElementButtonW,
    height: Size.ui.mapElementButtonH,
    // text
    // color
    // space
    backgroundColor: isSelected? Color.main : 'transparent',
    color: isSelected? 'white' : 'black',
    // other
    borderRadius: Size.radius.m,
    border: `3px dashed ${isSelected? Color.grayLight : Color.grayDark}`
  })};

const MapElementButton: Component<{ element: elementType, children: JSXElement }> = ({element, children}) => {
    return (
        <button class={MapElementButtonStyle(workplaceSys.selectedType() === element)}
                onClick={() => workplaceSys.setSelectedType(element)}>
            {children}
        </button>
    )
}

export default MapElementButton