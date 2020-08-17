import 'reflect-metadata';

// 设置元数据
@Reflect.metadata("a", "一个类")
class A {
    @Reflect.metadata("prop", "一个属性")
    prop1?:string;
}

const a = new A();

// 获取元数据
// 1. 取出附着在a上的元数据a
console.log(Reflect.getMetadata('a', A));

console.log(Reflect.getMetadata('a', Object.getPrototypeOf(a).constructor));
console.log(Reflect.getMetadata('prop', a, 'prop1'));