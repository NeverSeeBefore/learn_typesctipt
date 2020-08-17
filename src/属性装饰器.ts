function enumerable(target: any, propname: string) {
    // console.log(target === A.prototype, propname);
    console.log(target)
    if (!target.__props) {
        target.__props = [];
    }
    target.__props.push(propname);
}
// 这样也行 返回的函数如果满足装饰器条件也行
// function d () {
//     return function (target: any, propname: string) {

//     }
// }

class A {

    @enumerable
    prop1?: string;

    @enumerable
    static prop2?: string;
}

console.log((A.prototype as any).__props)