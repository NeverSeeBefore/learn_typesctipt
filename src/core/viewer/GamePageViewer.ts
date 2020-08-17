import { GameViewer, GameStatus } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery"
import { Game } from "../Game";
import GameConfig from "../../GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer {
    private nextDom = $("#next");
    private panelDom = $("#panel");
    private scoreDom = $("#score");
    private msgDom = $("#msg");

    showNext(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, this.nextDom);
        })
    }
    switch(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer?.remove();
            sq.viewer = new SquarePageViewer(sq, this.panelDom)
        })
    }
    init(game: Game): void {
        // 设置宽高
        this.panelDom.css({
            width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
            height: GameConfig.panelSize.height * PageConfig.SquareSize.height,
        })
        this.nextDom.css({
            width: GameConfig.naxtSize.width * PageConfig.SquareSize.width,
            height: GameConfig.naxtSize.height * PageConfig.SquareSize.height,
        })
        // 注册事件
        $(document).keydown(e => {
            switch (e.keyCode) {
                case 37:
                    game.moveLeft()
                    break;
                case 38:
                    game.rotate();
                    break;
                case 39:
                    game.moveRight();
                    break;
                case 40:
                    game.moveDown();
                    break;
                case 32:    // 空格
                    if(game.gameStatus === GameStatus.playing){
                        game.pause();
                    }else{
                        game.start();
                    }
                default:
                    break;
            }
        })
    }
    showScore(score: number): void {
        this.scoreDom.text(score);
    }
    onGamePause(): void {
        this.msgDom.text("暂停")
        this.msgDom.css({
            display: 'flex',
            color: '#fff'
        })
    }
    onGameStart(): void {
        this.msgDom.hide();
    }
    onGameOver(): void {
        this.msgDom.text("游戏结束")
        this.msgDom.css({
            display: 'flex',
            color: 'red'
        })
    }

}