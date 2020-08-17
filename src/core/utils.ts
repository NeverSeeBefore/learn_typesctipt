import { Point } from "./types";

/**
 * 获取随机数，无法取到最大值
 * @param min
 * @param max
 */
export function getRandom(min: number, max: number) {
    const desc = max - min;
    return Math.floor(Math.random() * desc + min);
}

/**
 * 判断是否为Point
 */

export function isPoint(obj: any): obj is Point {
    if (typeof obj.x === "undefined") {
        return false;
    }
    return true;
}