import { css } from "@emotion/css";
import { Component, JSXElement, Match, Switch } from "solid-js";
import { elementType, workplaceSys } from "../systems/Workplace";
import { Color } from "../property/Color";
import { Size } from "../property/Size";
import { BlockEnd, BlockEraser, BlockFloor, BlockObstacle, BlockStart, BlockTurtle } from "./Icons";


const MapElementButtonStyle = (isSelected: boolean) => { return css({
    // flex
    // position
    // scale
    width: Size.ui.mapElementButtonW,
    height: Size.ui.mapElementButtonH,
    // text
    // color
    // space
    padding: 0,
    backgroundColor: isSelected? Color.main : 'transparent',
    color: isSelected? 'white' : 'black',
    // other
    borderRadius: Size.radius.m,
    border: `3px dashed ${isSelected? Color.main : Color.grayDark}`
  })};

const MapElementButton: Component<{ element: elementType, children: JSXElement }> = ({element, children}) => {
    return (
        <button class={MapElementButtonStyle(workplaceSys.selectedType() === element)}
                onClick={() => workplaceSys.setSelectedType(element)}>
                <BlockImage element={element} />
        </button>
    )
}

export const BlockImage: Component<{element: elementType}> = ({element}) => {
    return (
        <Switch>
        <Match when={element === 1}>
            <BlockObstacle></BlockObstacle>
        </Match>
        <Match when={element === 2}>
            <BlockStart></BlockStart>
        </Match>
        <Match when={element === 3}>
            <BlockEnd></BlockEnd>
        </Match>
        <Match when={element === 4}>
            <BlockFloor></BlockFloor>
        </Match>
        <Match when={element === 5}>
            <BlockTurtle></BlockTurtle>
        </Match>
        <Match when={element === 6}>
            <BlockEraser></BlockEraser>
        </Match>
    </Switch>
    )
}

export default MapElementButton