class Usr {
    @required       //装饰器
    @range(3,5)
    @description("账号")
    loginId?: string;    // 3至5个字符

    loginPws?: string;  // 6-12个字符
    age?: number;       // 1-100之间
    gender?: "男" | "女";
}

const user = new Usr();

class Article {
    title?: string; //3至5个字符
}

/**
 * 统一验证函数
 *
 */
function validate(obj: Object) {
    for(const key in obj){
        const val = (obj as any)[key];

    }
}