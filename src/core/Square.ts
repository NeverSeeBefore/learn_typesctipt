import { Point, IViewer } from "./types";

/**
 * 方块
 * _point       逻辑坐标
 * _color       颜色
 * _viewer      显示者  控制显示与移除
 */
export class Square {

    private _viewer?: IViewer
    private _point: Point = { x: 0, y: 0 }
    private _color: string = 'red'

    public set viewer(v) {
        this._viewer = v;
        this.viewer?.show();
    }


    public get viewer() {
        return this._viewer;
    }

    /**
     * getPoint
     */
    public get point() {
        return this._point;
    }

    /**
     * setPoint
     */
    public set point(value: Point) {
        this._point = value;
        this._viewer?.show();
    }

    /**
     * getColor
     */
    public get color() {
        return this._color
    }


    public set color(v: string) {
        this._color = v;
    }

}
