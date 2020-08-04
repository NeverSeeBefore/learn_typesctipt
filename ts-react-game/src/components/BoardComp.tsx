import { ChessType } from "../types/enums";
import { ChessComp } from "./ChessComp";
import React from "react";
import "./BoardComp.css"


interface Iprops {
    chesses: ChessType[]
    isGameOver?: Boolean
    onClick?: (index: number) => void
}

const BoardComp: React.FC<Iprops> = function (props) {
    const isGameOver = !props.isGameOver;
    const list = props.chesses.map((type, i) => (<ChessComp type={type} key={i} onClick={() => {
        if (props.onClick && isGameOver) {
            props.onClick(i);
        }
    }}></ChessComp>));
    return (
        <div className="board">
            {list}
        </div>
    )
}
BoardComp.defaultProps = {
    isGameOver: false
}

export { BoardComp };