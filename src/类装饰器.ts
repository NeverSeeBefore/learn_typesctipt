// class Usr {
//     @required       //装饰器
//     @range(3,5)
//     @description("账号")
//     loginId?: string;    // 3至5个字符

//     loginPws?: string;  // 6-12个字符
//     age?: number;       // 1-100之间
//     gender?: "男" | "女";
// }

// const user = new Usr();

// class Article {
//     title?: string; //3至5个字符
// }

// /**
//  * 统一验证函数
//  *
//  */
// function validate(obj: Object) {
//     for(const key in obj){
//         const val = (obj as any)[key];

//     }
// }



// /**
//  * 
//  * @param target 约束为类 new (参数) => object
//  */
// function test(target: new (...args:any[]) => object){
//     return class B extends A {

//     }
// }
// class C {

// }

// @test
// class A {
//     constructor(public prop1: string){

//     }
// }

// const a = new A('1');
// console.log(a);
// console.log(new A('2'))


// type constructor = new (...args: any[]) =>object;

// function test(str: string) {
//     return function (target: constructor) {

//     }
// }

// @test('aaa')
// class A {
//     prop1: string;
//     constructor(prop1: string) {
//         this.prop1 = prop1;
//     }
// }

type constructor = new (...args: any[]) => object;

function d1() {
    console.log('d1');
    return function (target: constructor) {
        console.log('d1 decorate');
        
    }
}

function d2() {
    console.log('d2');
    return function (target: constructor) {
        console.log('d2 decorate');

    }
}


@d1()
@d2()
class A {
    prop1: string;
    constructor(prop1: string) {
        this.prop1 = prop1;
    }
}