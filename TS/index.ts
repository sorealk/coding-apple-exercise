// 타입지정
let 어레이 :string[] = ['kim', 'park'];
let 오브젝트 :{ name? : string } = { name : 'kim'}
let 이름 :string | number = 'kim';

// Type alias
type Name = string | number;
let 내이름 :Name = 'kim';

function 함수(x :number) :number {
    return x * 2
} //파라미터 number, return값 number

type Member = [number, boolean];
let john :Member = [123, true];

type Member2 = {
    [key :string] : string, // 글자로 된 모든 object 속성 타입은 :string
}

let john2 : Member2 = { name : 'kim'}

class User{
    name :string;
    constructor(name :string){
        this.name = name;
    }
}