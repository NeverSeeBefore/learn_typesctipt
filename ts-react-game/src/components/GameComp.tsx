import React from 'react';
import { ChessType, GameStatus } from '../types/enums';
import { BoardComp } from './BoardComp';
import { GameStatusComp } from './GameStatusComp';

interface Istate {
    chesses: ChessType[],
    gameStatus: GameStatus,
    nextChess: ChessType.red | ChessType.black
}

/**
 * 维护游戏数据
 */

export class GameComp extends React.Component<{}, Istate>{

    state: Istate = {
        chesses: [],
        gameStatus: GameStatus.gaming,
        nextChess: ChessType.black
    }

    componentDidMount() {
        this.init();
    }

    init() {
        const arr: ChessType[] = [];
        for (let i = 0; i < 9; i++) {
            arr.push(ChessType.none);
        }
        this.setState({
            chesses: arr,
            gameStatus: GameStatus.gaming,
            nextChess: ChessType.black
        })
    }

    handleClick(index: number) {
        console.log(index);
        const chesses = [...this.state.chesses];
        chesses[index] = this.state.nextChess;
        this.setState(prevState => ({
            chesses,
            nextChess: prevState.nextChess === ChessType.black ? ChessType.red : ChessType.black,
            gameStatus: this.getStatus(chesses, index)
        }))
    }

    getStatus(chesses: ChessType[], index: number): GameStatus {
        // 判断是否有一方获得胜利
        const horMin = Math.floor(index / 3) * 3;
        const verMin = index % 3;
        if (
            ((chesses[horMin] === chesses[horMin + 1]) && (chesses[horMin] === chesses[horMin + 2]))
            || ((chesses[verMin] === chesses[verMin + 3]) && (chesses[verMin] === chesses[verMin + 6]))
            || ((chesses[0] === chesses[4]) && (chesses[0] === chesses[8]) && (chesses[0] !== ChessType.none))
            || ((chesses[2] === chesses[4]) && (chesses[2] === chesses[6]) && (chesses[2] !== ChessType.none))
        ) {
            if (chesses[index] === ChessType.red) {
                return GameStatus.redWin;
            } else if (chesses[index] === ChessType.black) {
                return GameStatus.blackWin;
            }
        }
        // 判断是否平局
        if (!chesses.includes(ChessType.none)) {
            return GameStatus.equal;
        }
        // 游戏还需继续
        return GameStatus.gaming;
    }

    render() {
        return (
            <>
                <GameStatusComp status={this.state.gameStatus} next={this.state.nextChess} handleRestart={this.init.bind(this)}></GameStatusComp>
                <BoardComp
                    chesses={this.state.chesses}
                    isGameOver={this.state.gameStatus !== GameStatus.gaming}
                    onClick={this.handleClick.bind(this)}
                ></BoardComp>
            </>
        )
    }
}
