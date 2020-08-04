import { ChessType } from '../types/enums';
import React from 'react';
import "./ChessComp.css";

interface Iprops {
    type: ChessType,
    onClick?: () => void
}

export function ChessComp(props: Iprops) {
    let chess = null;
    if (props.type === ChessType.red) {
        chess = <div className="chess-item red"></div>
    } else if (props.type === ChessType.black) {
        chess = <div className="chess-item black"></div>
    } else {
        chess = <div className="chess-item"></div>
    }
    return (
        <>
            <div className="chess" onClick={() => {
                if (props.type === ChessType.none && props.onClick) {
                    props.onClick();
                }
            }}>
                {chess}
            </div>
        </>
    )
}