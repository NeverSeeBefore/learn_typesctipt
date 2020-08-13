export class Tank {
    name: string = 'tank'
    sayHello(){
        console.log("坦克");
    }
}

export class PlayerTank extends Tank {
    name: string = "玩家坦克"
    sayHello(){
        console.log("玩家坦克")
    }
}

export class EnrmyTank extends Tank {
    name: string = "敌方坦克"
    sayHello() {
        console.log("敌方坦克")
    }
}

let p = new PlayerTank();
p.sayHello()


abstract class Chess {
    x: number = 0;
    y: number = 0;

    abstract readonly name: string;
    abstract move(targetX: number, targetY: number): boolean;
}
class Horse extends Chess {
    readonly name: string = "马";
    move(targetX: number, targetY: number):boolean {
        return false
    };
}

abstract class Soldrer extends Chess {
    readonly name: string;
    constructor(){
        super();
        this.name = "兵";
    }
}