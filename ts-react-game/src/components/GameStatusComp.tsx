import { GameStatus, ChessType } from "../types/enums";
import React from "react";
import "./GameStatusComp.css"

interface Iprops {
    status: GameStatus,
    next: ChessType.red | ChessType.black,
    handleRestart?: () => void
}

export function GameStatusComp({ status, next, handleRestart }: Iprops) {
    let content: JSX.Element = <div className="base box equal">平局</div>;
    if (status === GameStatus.gaming) {
        if (next === ChessType.red) {
            content = <div className="base box red">红方落子</div>
        } else if (next === ChessType.black) {
            content = <div className="base box black">黑方落子</div>
        }
    } else if (status === GameStatus.blackWin) {
        content = <div className="base win black">黑方胜</div>
    } else if (status === GameStatus.redWin) {
        content = <div className="base win red">红方胜</div>
    }
    return (
        <>
            <div className="status">
                {content}
            </div>
            <div className="restart" style={{display: status === GameStatus.gaming ? "none" : 'block'}} onClick={() => {
                if(handleRestart){
                    handleRestart();
                }
            }}>重新开始</div>
        </>
    )
}