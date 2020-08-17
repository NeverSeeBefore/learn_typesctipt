import { Square } from "../Square";
import $ from "jquery";
import { IViewer } from "../types";
import PageConfig from "./PageConfig";

/**
 * 显示小方块到页面上
 * _dom         要显示的dom对象（小方块）
 * _isRemove    是否已经移除（移除就不会再显示）
 * square       小方块数据
 * container    容器
 */
export class SquarePageViewer implements IViewer {
    private _dom?: JQuery<HTMLElement>
    private _isRemove: boolean = false;

    constructor(
        private square: Square,
        private container: JQuery<HTMLElement>
    ){}

    show(): void {
        if(!this._dom){
            this._dom = $('<div>').css({
                position: "absolute",
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: "1px solid #ccc",
                boxSizing: "border-box"
            }).appendTo(this.container)
        }
        this._dom.css({
            left: this.square.point.x * PageConfig.SquareSize.width,
            top: this.square.point.y * PageConfig.SquareSize.height,
            backgroundColor: this.square.color
        })
    }

    remove(): void {
        this._dom?.remove();
        this._isRemove = true;
    }
}