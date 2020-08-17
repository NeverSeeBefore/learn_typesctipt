import { GameStatus, Direction, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { Rules } from "./Rules";
import GameConfig from "../GameConfig";
import { Square } from "./Square";
import { timers } from "jquery";

/**
 *
 * _gameStatus      游戏状态
 * _curTeris        当前操作的方块
 * _nextTeris       下一个方块
 * _timer           下落计时器
 * _duration        下落时间
 * _exits           当前游戏中已存在的方块
 * _score           分数
 */
export class Game {
    private _gameStatus: GameStatus = GameStatus.init;
    private _curTeris?: SquareGroup;
    private _nextTeris: SquareGroup;
    private _timer?: number;
    private _duration: number;
    private _exits: Square[] = [];
    private _score: number = 0;

    public get gameStatus() :GameStatus  {
        return this._gameStatus;
    }

    public set score(v : number) {
        this._score = v;
        this._viewer.showScore(v);
        const level = GameConfig.levels.filter(it => it.score <= v).pop()!;
        if(level.duration === this._duration){
            return
        }else{
            this._duration = level.duration;
            clearInterval(this._timer);
            this._timer = undefined;
            this.autoDrop();
        }
    }
    public get score() {
        return this._score;
    }


    constructor(private _viewer: GameViewer) {
        this._duration = GameConfig.levels[0].duration;
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this.createNext();
        this._viewer.init(this);
    }

    private init() {
        this._exits.forEach(sq => {
            sq.viewer?.remove();
        })
        this._exits = [];
        this._nextTeris.squares.forEach(sq => sq.viewer?.remove());
        this._duration = GameConfig.levels[0].duration;
        this.createNext();
        this._curTeris = undefined;
        this.score = 0;
    }

    private createNext() {
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this.resetCenterPoint(GameConfig.naxtSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }

    /**
     * 开始游戏
     */
    start() {
        if (this._gameStatus === GameStatus.playing) {
            return;
        }
        if (this._gameStatus === GameStatus.over) {
            this.init();
        }
        this._gameStatus = GameStatus.playing;
        // 自由下落
        !this._curTeris && this.switchTeris();
        this.autoDrop();
        this._viewer.onGameStart();
    }

    pause() {
        if (this._gameStatus !== GameStatus.playing) return;
        this._gameStatus = GameStatus.pause;
        clearInterval(this._timer);
        this._timer = undefined;
        this._viewer.onGamePause();
    }

    moveTop() {
        if (this._gameStatus === GameStatus.playing) {
            this._curTeris && Rules.move(this._curTeris, Direction.top, this._exits);
        }
    }
    moveLeft() {
        if (this._gameStatus === GameStatus.playing) {
            this._curTeris && Rules.move(this._curTeris, Direction.left, this._exits);
        }
    }
    moveRight() {
        if (this._gameStatus === GameStatus.playing) {
            this._curTeris && Rules.move(this._curTeris, Direction.right, this._exits);
        }
    }
    moveDown() {
        if (this._gameStatus === GameStatus.playing) {
            this._curTeris && Rules.moveDirectly(this._curTeris, Direction.down, this._exits);
            this.hitBottom();
        }
    }


    rotate() {
        if (this._gameStatus === GameStatus.playing) {
            this._curTeris && Rules.rotate(this._curTeris, this._exits);
        }
    }

    // 触底
    private hitBottom() {
        this._exits.push(...this._curTeris!.squares);
        const num = Rules.deleteSquare(this._exits);
        this.addScore(num);
        this.switchTeris();
    }

    /**
     * 切换方块
     */
    private switchTeris() {
        this._curTeris = this._nextTeris;
        this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris);
        // 如果方块出现的位置已经不能放置，说明游戏结束了
        if (!Rules.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exits)) {
            this._gameStatus = GameStatus.over;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGameOver();
            return;
        }
        this.createNext();
        this._viewer.switch(this._curTeris);
    }

    /**
     * 自由下落
     */

    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) return;
        this._timer = setInterval(() => {
            if (this._curTeris) {
                const flag = Rules.move(this._curTeris, Direction.down, this._exits);
                if (!flag) {
                    this.hitBottom();
                }
            }
        }, this._duration)
    }

    /**
     * resetCenterPoint
     */
    private resetCenterPoint(width: number, teris: SquareGroup) {
        const x = Math.ceil(width / 2);
        let y = 0;
        teris.centerPoint = { x, y }
        while (teris.squares.some(it => it.point.y < 0)) {
            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1
            }
        }
        while (teris.squares.every(it => it.point.y >= 1)) {
            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y - 1
            }
        }
    }
    private addScore(lineNumber: number) {
        switch (lineNumber) {
            case 0:
                return;
            case 1:
                this.score += 10;
                break;
            case 2:
                this.score += lineNumber * 20;
                break;
            case 3:
                this.score += lineNumber * 30;
                break;
            case 4:
                this.score += lineNumber * 40;
                break;
            case 4:
                this.score += lineNumber * 50;
                break;
            default:
                this.score += lineNumber * 60;
                break;
        }
    }
}