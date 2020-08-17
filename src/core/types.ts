import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";

export interface Point {
    readonly x: number,     // 只读，防止绕过set 直接对x或y修改
    readonly y: number
}

export interface IViewer {
    show(): void    // 显示
    remove(): void  // 移除
}

/**
 * 小方块组合形状
 */
export type Shape = Point[]


/**
 * 移动方向
 */
export enum Direction {
    left,
    right,
    down,
    top
}

/**
 * 游戏状态
 */
export enum GameStatus {
    init,
    playing,
    pause,
    over
}

/**
 * 
 */

export interface GameViewer {
    showNext(teris: SquareGroup): void;
    switch(teris: SquareGroup): void;
    init(game: Game): void;
    showScore(score: number): void;
    onGamePause(): void;
    onGameStart(): void;
    onGameOver(): void;
}