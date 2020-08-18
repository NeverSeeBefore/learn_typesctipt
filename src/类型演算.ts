import { type } from "os";

const x = "asdf";
let y: typeof x = 'asdf';
class U {
    loginId?: string;
    loginPwd?: string;
}
function create(cls: typeof U): U {
    return new cls();
}

// const u = create(U);

// const u = new U();
// const u2 = u;

const A = U;
const u = new A()

function printUserProperty(obj: U, prop: keyof U) {
    console.log(obj[prop]);
}

interface IUser {
    loginId?: string
    loginPwd?: number
}

// 属性和值只要是字符串就行
// type Obj = {
//     [prop: string]: string
// }

// 属性名在联合类型中取值
// type Obj = {
//     [prop in 'loginId' | 'loginPwd']: string
// }

type Obj = {
    [prop in keyof IUser]: string
}

// 属性名取自IUser，属性值来自IUser中还属性要求的类型
type Obj2 = {
    [prop in keyof IUser]: IUser[prop]
}

type Obj3 = {
    readonly [prop in keyof IUser]: IUser[prop]
}

const us: Obj = {
    loginId: 'a',
    loginPwd: 'b'
}

// 所有属性可选
type Partial<T> = {
    [p in keyof T]?: T[p]
}
// 所有属性只读
type Readonly<T> = {
    readonly [p in keyof T]?: T[p]
}
type Str<T, Y> = {
    readonly [p in keyof T]?: Y
}

let aaa: Exclude<"a"|"b"|"c", "a">;
let aab: NonNullable<string|null|undefined>;
let aab: InstanceType<string|null|undefined>;
