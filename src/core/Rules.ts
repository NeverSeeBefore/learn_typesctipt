import { Square } from "./Square";
import { Shape, Point, Direction } from "./types";
import GameConfig from "../GameConfig";
import { SquareGroup } from "./SquareGroup";
import { isPoint } from "./utils";
import { IgnorePlugin } from "webpack";


/**
 * 提供一系列函数，控制规则
 */
export class Rules {
    /**
     * 判断某个形状的方块是否能移动到目标位置
     */
    static canIMove(shape: Shape, targetPoint: Point, exits: Square[]): boolean {
        // 计算每个小方块的目标位置
        const targetSquarePoints: Point[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y,
            }
        })
        // 边界判断
        let overlap = targetSquarePoints.some(p => p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1);
        if (overlap) {
            return false;
        }
        // 触碰已存在方块
        overlap = targetSquarePoints.some(p => exits.some(it => it.point.x === p.x && it.point.y === p.y))
        return !overlap;
    }

    static move(teris: SquareGroup, targetPoint: Point, exits: Square[]): boolean
    static move(teris: SquareGroup, direction: Direction, exits: Square[]): boolean
    static move(teris: SquareGroup, targetPointOrDirection: Point | Direction, exits: Square[]): boolean {
        // 判断传入的是目标点还是方向
        if (isPoint(targetPointOrDirection)) {
            const targetPoint: Point = targetPointOrDirection;
            if (this.canIMove(teris.shape, targetPoint, exits)) {
                teris.centerPoint = targetPoint;
                return true;
            }
        } else {
            const direction = targetPointOrDirection;
            let targetPoint: Point;
            switch (direction) {
                case Direction.down:
                    targetPoint = {
                        x: teris.centerPoint.x,
                        y: teris.centerPoint.y + 1
                    }
                    break;
                case Direction.left:
                    targetPoint = {
                        x: teris.centerPoint.x - 1,
                        y: teris.centerPoint.y
                    }
                    break;
                case Direction.right:
                    targetPoint = {
                        x: teris.centerPoint.x + 1,
                        y: teris.centerPoint.y
                    }
                    break;
                case Direction.top:
                    targetPoint = {
                        x: teris.centerPoint.x,
                        y: teris.centerPoint.y - 1
                    }
                    break;
            }
            return this.move(teris, targetPoint, exits);
        }
        return false
    }

    /**
     * 沿方向移动到底
     * @param teris
     * @param direction
     */
    static moveDirectly(teris: SquareGroup, direction: Direction, exits: Square[]) {
        while (this.move(teris, direction, exits)) { }
    }

    static rotate(teris: SquareGroup, exits: Square[]) {
        const newShape = teris.afterRotateShape();
        if (this.canIMove(newShape, teris.centerPoint, exits)) {
            teris.rotate();
            return true;
        }
        return false;
    }

    /**
     * 从已存在的方块中找到要消除的方块，返回值是消除的行数
     * @param exits
     */
    static deleteSquare(exits: Square[]): number {
        const ys = exits.map(sq => sq.point.y);
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);
        let num = 0;
        for (let i = minY; i <= maxY; i++) {
            if (this.deleteLine(exits, i)) {
                num++;
            }
        }
        return num;
    }

    private static deleteLine(exits: Square[], y: number): boolean {
        const oneLineSquares = exits.filter(sq => sq.point.y === y);
        if (oneLineSquares.length === GameConfig.panelSize.width) {
            oneLineSquares.forEach(sq => {
                sq.viewer?.remove()
                const index = exits.indexOf(sq);
                exits.splice(index, 1);
            });
            exits
                .filter(sq => sq.point.y < y)
                .forEach(sq => sq.point = { x: sq.point.x, y: sq.point.y + 1 });
            return true;
        }
        return false;
    }

}



// Rules.canIMove()