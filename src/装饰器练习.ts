import { isRegExp } from "util";

function classDescriptor(description: string){
    return function (target: new ()=>object){
        target.prototype.$classDescription = description;
    }
}


function propDescriptor(description: string){
    return function (target: any, propName: string){
        if(!target.prototype.$propDescription){
            target.prototype.$propDescription = [];
        }
        target.prototype.$propDescription.push({
            propName,
            description
        })
    }
}


// @classDescriptor("用户")
class User {
    // @propDescriptor("账号")
    loginId?: string;
    // @propDescriptor("密码")
    loginPwd?: string;
}

function printObj(obj:any){
    if(obj.$classDescription){
        console.log(obj.$classDescription);
    }else {
        console.log(obj.__proto__.constructor.name)
    }
    if(!obj.$propDescription){
        obj.$propDescription = []
    }
    for(const key in obj){
        if(obj.hasOwnProperty(key)){
            const prop = obj.$propDescription.find((p:any) => p.propName === key);
            if(prop){
                console.log(`\t${prop.description}: ${obj[key]}`)
            }else{
                console.log(`\t${key}: ${obj[key]}`)
            }
        }
    }
}



const u = new User();
u.loginId = 'login id'
u.loginPwd = 'login password'



printObj(u);
console.log(u)
