import { Square } from "./Square";
import { Shape, Point } from "./types";

/**
 * 小方块组合类
 * _squares         小方块数组，不能发生变化
 * -isClock         旋转方向，顺时针还是逆时针
 */
export class SquareGroup {
    // private _squares: ReadonlyArray<Square>; //相同写法
    private _squares: readonly Square[];
    protected _isClock: boolean = true;

    public get squares() {
        return this._squares
    }

    public get shape() {
        return this._shape
    }

    public get centerPoint(): Point {
        return this._centerPoint
    }


    public set centerPoint(v: Point) {
        this._centerPoint = v;

        this.setSquarePoint();
    }


    constructor(
        private _shape: Shape,
        private _centerPoint: Point,
        private _color: string
    ) {
        // 设置小方块数组
        const arr: Square[] = [];
        this._shape.forEach(p => {
            const sq = new Square();
            sq.color = this._color;
            arr.push(sq);
        })
        this._squares = arr;
        this.setSquarePoint();
    }


    // 根据当前形状计算新对形状
    afterRotateShape(): Shape {
        if (this._isClock) {
            return this._shape.map(p => {
                const newPoint: Point = {
                    x: -p.y,
                    y: p.x
                }
                return newPoint;
            })
        } else {
            return this._shape.map(p => ({ x: p.y, y: -p.x }))
        }
    }

    rotate() {
        const newShape = this.afterRotateShape();
        this._shape = newShape;
        this.setSquarePoint();
    }

    // 根据中心点坐标，设置每一个小方块位置
    private setSquarePoint() {
        // 设置小方块数组
        this._shape.forEach((p, i) => {
            this.squares[i].point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }
        })
    }
}