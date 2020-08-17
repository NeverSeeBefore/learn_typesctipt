import { Shape, Point } from "./types";
import { getRandom } from "./utils";
import { SquareGroup } from "./SquareGroup";

export class TShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super(
            [
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ],
            _centerPoint,
            _color
        )
    }
}

export class LShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super(
            [
                { x: -2, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ],
            _centerPoint,
            _color
        )
    }
}

export class LMirrorShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super(
            [
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ],
            _centerPoint,
            _color
        )
    }
}

export class SShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super(
            [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 1 }
            ],
            _centerPoint,
            _color
        )
    }
    rotate() {
        super.rotate();
        this._isClock =  !this._isClock;
    }
}


export class SMirrorShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super(
            [
                { x: 0, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ],
            _centerPoint,
            _color
        )
    }
    rotate() {
        super.rotate();
        this._isClock =  !this._isClock;
    }
}

export class SquareShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super(
            [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ],
            _centerPoint,
            _color
        )
    }
    afterRotateShape() {
        return this.shape;
    }
}

export class LineShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super(
            [
                { x: 0, y: 0 },
                { x: -1, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ],
            _centerPoint,
            _color
        )
    }
    rotate() {
        super.rotate();
        this._isClock =  !this._isClock;
    }
}

export const TerisShapes = [
    TShape,
    SShape,
    SMirrorShape,
    LShape,
    LMirrorShape,
    LineShape,
    SquareShape,
]
export const TerisColors = [
    "red",
    "blue",
    "orange",
    "green",
    "brown",
    "white"
]

/**
 * 随机产生形状，颜色随机
 * @param centerPoint 中心点
 */
export function createTeris(centerPoint: Point) {
    let index = getRandom(0, TerisShapes.length);
    const shape = TerisShapes[index];
    index = getRandom(0, TerisColors.length);
    const color = TerisColors[index];
    return new shape(centerPoint, color);
}