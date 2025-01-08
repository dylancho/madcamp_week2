import { css } from "@emotion/css";
import { Component, createEffect, createSignal, Match, Switch } from "solid-js";
import { workplaceSys } from "../systems/Workplace";
import { Size } from "../property/Size";
import { Color } from "../property/Color";
import { BlockEnd, BlockEraser, BlockFloor, BlockObstacle, BlockStart, BlockTurtle } from "./Icons";

const MapContainerStyle = css({
    // flex
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // position
    // scale
    // text
    // color
    backgroundColor: Color.grayLight,
    // space
    // other
    borderRadius: Size.radius.m,
})

const MapGridWrapperStyle = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: 'content-box',
    height: "100%",
    padding: Size.space.s,
    aspectRatio: `${Size.world.col} / ${Size.world.row}`,
});

const MapGridStyle = css({
    justifyItems: 'center',
    alignItems: 'center',
    // grid
    display: "grid",
    gridTemplateColumns: `repeat(${Size.world.col}, 1fr)`, // 20 columns
    gridTemplateRows: `repeat(${Size.world.row}, 1fr)`, // 10 rows
    // position
    // scale
    width: "100%",
    // text
    // color
    // space
    // other
});

const cellStyle = (cell: number) => { return css({
    // flex
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // position
    // scale
    width: "100%",
    aspectRatio: 1,
    // text
    fontSize: "1.5vh",
    // color
    backgroundColor: 'white',
    // space
    // other
    cursor: "pointer",
    border: "1px solid #ccc",
})};

const MapGrid: Component = () => {
    return (
        <div id="map-container" class={MapContainerStyle}>
            <div class={MapGridWrapperStyle}>
                <div class={MapGridStyle}>
                    {workplaceSys.workingWorld().map((cell, index) => (
                        <div class={cellStyle(cell)}
                            onClick={() => workplaceSys.handleCellClick(index)}>
                                <Switch>
                                    <Match when={cell === 1}>
                                        <BlockObstacle></BlockObstacle>
                                    </Match>
                                    <Match when={cell === 2}>
                                        <BlockStart></BlockStart>
                                    </Match>
                                    <Match when={cell === 3}>
                                        <BlockEnd></BlockEnd>
                                    </Match>
                                    <Match when={cell === 4}>
                                        <BlockFloor></BlockFloor>
                                    </Match>
                                    <Match when={cell === 5}>
                                        <BlockTurtle></BlockTurtle>
                                    </Match>
                                    <Match when={cell === 6}>
                                        <BlockEraser></BlockEraser>
                                    </Match>
                                </Switch>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MapGrid