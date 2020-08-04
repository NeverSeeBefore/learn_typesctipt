enum gender {
    Male = "男",
    Female = "女"
}
enum gender2 {
    male,
    female
}
interface Person {
    gender: gender,
    name?: string 
}
const people:Person = {
    gender: gender.Male,
    name: 'xx'
}