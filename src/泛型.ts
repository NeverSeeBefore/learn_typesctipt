import { table } from "console";

function take<T>(arr: T[], n: number): T[] {
    return arr;
}
// 默认泛型类型
function take2<T = number>(arr: T[], n: number): T[] {
    return arr;
}

const result = take<number>([], 3);

// 泛型作用于 类型别名
type callback<T> = (n: T, i: number) => Boolean;

// 作用于类
class ArrayHelper<T, K> {
    constructor(private arr: T[]) { }
    take(n: number): T[] {

        return [];
    }
    private getRandom(min: number, max: number): number {
        const dec = max - min;
        return Math.floor(Math.random() * dec + max);
    }

    shuffle() {
        for (let i = 0; i < this.arr.length; i++) {
            const targetIndex = this.getRandom(0, this.arr.length);
            const temp = this.arr[i];
            this.arr[i] = this.arr[targetIndex];
            this.arr[targetIndex] = temp;
        }
    }
    fun(n: K) { }
}

// 泛型约束
interface hasNameProperty{
    name: string
}
interface hasAgeProperty{
    age: number
}
/**
 * 将对象的每个属性的首字母大写，并返回
 */

function nameToUpperCase<T extends hasNameProperty>(obj: T):T {
    obj.name = obj.name.split(" ").map(s => s[0].toUpperCase + s.substr(1)).join(" ");
    return obj;
}
const o = {
    name: 'kavin yuan',
    age: 22,
    gender: '男'
}

const newO = nameToUpperCase(o);
console.log(newO);

