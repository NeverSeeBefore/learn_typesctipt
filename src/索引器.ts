const obj = {
    name: 'barbecue',
    age: 22,
    "my-pid": "33443"
}

for(const key in obj){
    console.log(key, obj[key])
}

class User {
    [prop: number]: any // 索引器，属性是字符串，值是any
    constructor (
        public name: string,
        public age: number,
    ){}
    sayHello() {
        console.log('hello');
    }
}
const u = new User("aa", 2);
u['age'] = 123; // 类贝莱就有的属性
u['pid'] = 'weqwq'; // 类没有的属性
u[0] = 'weqwq'; // 类没有的属性

// 索引器的作用         严格检查下实现动态添加类成员