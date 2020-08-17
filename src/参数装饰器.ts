class MyMath {
    sum(
        a: number,
        @test b: number
    ) {
        return a + b;
    }
}

function test(target: any, method: string, index: number) {
    console.log(target, method, index);

}