import "reflect-metadata";
import { plainToClass, Type } from 'class-transformer';

class User {

    loginId?: string;
    loginPwd?: string;
    @Type(() => Number)
    age?: number;
    gender?: "男" | " 女";
    getGender() {
        console.log(this.gender);
    }
}
// import axios from 'axios';
// axios.get("https://...").then(resp => resp.data).then(data => {consle.log(data)})
const data = {
    loginId: '12313123',
    loginPwd: 'abcdefg',
    age: 18,
    gender: "男"
}

const u = plainToClass(User, data);
u.getGender();


const data2 = [{
    loginId: '12313123',
    loginPwd: 'abcdefg',
    age: 18,
    gender: "男"
}, {
    loginId: '12313123',
    loginPwd: 'abcdefg',
    age: 18,
    gender: "男"
}]
const us = plainToClass(User, data2);
us[0].getGender();
