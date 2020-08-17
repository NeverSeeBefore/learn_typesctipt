function enumerable (target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log(target, methodName, descriptor);
}
// 这样也行 返回的函数如果满足装饰器条件也行
// function d () {
//     return function (target: any, propname: string) {

//     }
// }

function useless (target: any, key: string, descriptor: PropertyDescriptor){
    descriptor.value = function() {
        console.log(key + '已过期');
    }
}

class A {

    @enumerable
    @useless
    method1() {

    }

    @enumerable
    static method2() {

    }
}

const a = new A();
console.log(a.method1())