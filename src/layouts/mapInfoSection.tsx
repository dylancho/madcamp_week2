import { css } from "@emotion/css";
import { Component, createEffect, For, onMount } from "solid-js";
import { Size } from "../property/Size";
import { CellStyle, MapGridStyle } from "../property/commonStyles";
import { dataSys } from "../systems/Data";
import { Color } from "../property/Color";
import { PlayButton } from "../components/Button";

const MapInfoSectionStyle = css({
    // flex
    display: 'flex',
    flexdirection: 'row',
    alignItems: 'start',
    justifyContent: 'start',
    // space
    gap: Size.space.xl,
})

const MapPreviewStyle = css({
    width: 560,
    aspectRatio: '16 / 8',
    borderRadius: Size.radius.m,
    boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.1)",
})

const MapInfoRapperStyle = css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    height: '100%',
})

const MapInfoStyle = css({
    display: 'flex',
    flexDirection: 'column',
    fontSize: Size.font.s,
    alignItems: 'start',
    gap: Size.space.m,
    marginTop: Size.space.s,
})

const MapInfoRowStyle = css({
    display: 'flex',
    flexDirection: 'row',
    gap: Size.space.m,
    color: Color.grayDark,
})

const MapInfoRowHeadStyle = css({
    fontWeight: 'bold',
    width: 90,
    color: Color.main,
})

const MapInfoSection: Component = () => {
    createEffect(() => {
        const fetchUser = async() => {
            const user = await dataSys.getUser(dataSys.curMap.creatorEmail);
            dataSys.setMapCreator(user? user.name : "");
        }
        fetchUser();

        const date = new Date(dataSys.curMap.createdAt)
        dataSys.setMapDate(`${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`)
    })

    createEffect(() => {
        console.log(dataSys.curMap.id);
    })

    return (
        <div class={MapInfoSectionStyle}>
            <div class={MapPreviewStyle}>
                <div class={MapGridStyle}>
                    <For each={dataSys.curMap.config}>
                    {(cell) => <div class={CellStyle(cell)}></div>}
                    </For>
                </div>
            </div>
            <div class={MapInfoRapperStyle}>
                <div class={MapInfoStyle}>
                    <div class={MapInfoRowStyle}>
                        <span class={MapInfoRowHeadStyle}>만든이</span>
                        <span>{dataSys.mapCreator()}</span>
                    </div>
                    <div class={MapInfoRowStyle}>
                        <span class={MapInfoRowHeadStyle}>만든 날짜</span>
                        <span>{dataSys.mapDate()}</span>
                    </div>
                    <div class={MapInfoRowStyle}>
                        <span class={MapInfoRowHeadStyle}>평점</span>
                        <span>{dataSys.curMap.rating}</span>
                    </div>
                </div>
                <PlayButton map={dataSys.curMap}>플레이</PlayButton>
            </div>
        </div>
    )
}

export default MapInfoSection;