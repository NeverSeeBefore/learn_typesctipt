// type User = {
//     name: string
//     age: number
// }


// interface User {
//     name: string,
//     age: number
// }

// 约束对象
// let u: User = {
//     name: 'sfdsa',
//     age: 18,
// }
// 约束函数
interface User {
    name: string,
    age: number,
    sayHello(): void,
    sayHello: () => void
}

let u: User = {
    name: 'sfdsa',
    age: 18,
    sayHello: () => { return 'acb' }
}

//---------
// type Condition = (n: number) => boolean;
interface Condition{
    (n: number) : boolean
}

function sum(numbers: number[], callback: Condition) {
    let s = 0;
    numbers.forEach(n => {
        if (callback(n)) {
            s += n;
        }
    })
    return s;
}

function filter(n: number): boolean {
    return n % 2 === 0;
}
console.log(sum([1, 2, 3, 4, 5], filter));


// 约束类
// type A = {
//     T1: string
// }

// type B = {
//     T2: number,
// }

// type C = {
//     T3: boolean,
//     T1: number
// } & A & B

// let variable: C = {
//     T1: 11,
//     T2: 11,
//     T3: false
// }

// interface A {
//     T1: string
// }
// interface B {
//     T2: number
// }
// interface C extends A, B{
//     T3: boolean
// }
// let variable: C = {
//     T1: 'abc',
//     T2: 111,
//     T3: false
// }

interface Duck {
    sound: "嘎嘎嘎",
    swim(): void
}

let person = {
    name: "伪装成鸭子的人",
    age: 11,
    sound: "嘎嘎嘎" as "嘎嘎嘎",
    swim(){
        console.log("正在游泳，并发出了" + this.sound + "的声音")
    }
}

let duck: Duck = person;
// 鸭子辩形法  子结构辩形法
// 判断是不是一个鸭子，只需要判断它是否具有鸭子的属性即可
// 判断一个对象是不是这个类型，只需要判断是否具有类型要求的属性即可
