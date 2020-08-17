import "reflect-metadata";
import { IsNotEmpty, validate, Length, MinLength, Min } from 'class-validator';

class RegUser {

    @IsNotEmpty({message: "账号不允许为空"})
    @Length(5, 12, {message: "账号长度5-12"})
    @MinLength(5, {message: "账号最短5个字符"})
    loginId?: string;
    loginPwd?: string;

    @Min(0, {message: "年龄最小值为0"})
    age?: number;
    gender?: "男" | " 女";
}

const post = new RegUser();

validate(post).then(err => {
    console.log(err);
})