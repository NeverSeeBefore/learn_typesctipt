/**
 * 有一个马戏团 动物    包括 狮子 老虎 猴子 狗
 * 共有特行 介绍自己
 */

/**-------------------------- */
/**接口代表具有能力 */
export interface IFireShow {
    singleFire(): void
    doubleFire(): void
}
export interface IWisdomShow {
    suanshuti(): void
    tiaowu(): void
}
export interface IBalanceShow {
    dumuqiao(): void
    zougangsi(): void
}
/**-------------------------- */

export abstract class Animal {
    abstract type: string;
    constructor(
        public name: string,
        public age: number
    ) {

    }
    sayHello() {
        console.log(`大家好， 我是${this.type}, 我叫${this.name}, 今年${this.age}岁！`);
    }
}
/**------------------------------ */
export class Lion extends Animal implements IFireShow{
    type = "狮子";

    singleFire() {
        console.log(`${this.name} 穿越了单火圈`)
    }

    doubleFire() {
        console.log(`${this.name} 穿越了双火圈`)
    }
}
export class Tigger extends Animal implements IFireShow{
    type = "老虎";

    singleFire() {
        console.log(`${this.name} 穿越了单火圈`)
    }
    doubleFire() {
        console.log(`${this.name} 穿越了双火圈`)
    }
    
}
export class Monkey extends Animal implements IBalanceShow{
    type = "猴子";

    zougangsi() {
        console.log(`${this.name} 进行了走钢丝表演`)
    }

    dumuqiao() {
        console.log(`${this.name} 进行了独木桥表演`)
    }
}
export class Dog extends Animal implements IWisdomShow{
    type = "狗";

    suanshuti() {
        console.log(`${this.name} 计算了算术题`)
    }

    tiaowu() {
        console.log(`${this.name} 表演了一段舞蹈`)
    }
}
/**-------------------------- */
const animal: Animal[] = [
    new Lion("王富贵", 12),
    new Tigger("坤坤", 21),
    new Monkey("小六", 1000),
    new Dog("旺财", 5),
    new Dog("花花", 3)
]

// 1. 所有动物打招呼
// animal.forEach( a => a.sayHello());

// 2. 所有会火圈表演的动物进行火圈表演

function hasFireShow(ani: object): ani is IFireShow{ // 判断ani 是不是 IFireShow
    if((ani as IFireShow).singleFire && (ani as IFireShow).doubleFire){
    // if((ani as unknown as IFireShow).singleFire && (ani as unknown as IFireShow).doubleFire){
        return true;
    }
    return false;
}
animal.forEach(a => {
    if(hasFireShow(a)){
        a.singleFire();
        a.doubleFire();
    }
});
// 3. 所有会智慧表演的动物进行智慧表演
function hasWisdomShow(ani: object): ani is IWisdomShow{
    if((ani as IWisdomShow).suanshuti && (ani as IWisdomShow).tiaowu){
        return true;
    }
    return false;
}
animal.forEach(a => {
    if(hasWisdomShow(a)){
        a.tiaowu();
        a.suanshuti();
    }
})

/**
 * 接口可以继承类
 * 表示具备类的所有特性
 */

class A {
    a1: string = ''
    a2: string = ''
    a3: string = ''
}
class B {
    b1: string = ''
    b2: string = ''
    b3: string = ''
}

interface C extends A, B {};

const c: C = {
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: ''
}