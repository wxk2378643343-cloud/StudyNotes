// 创建 Symbol，用于私有属性
const _name = Symbol('name');
const _age = Symbol('age');

class PrivateData {
    constructor(name, age) {
        this[_name] = name;
        this[_age] = age;
    }

    // getter/setter
    get name() {
        return this[_name];
    }
    set name(name) {
        this[_name] = name;
    }

    get age() {
        return this[_age];
    }
    set age(age) {
        this[_age] = age;
    }
}

// 测试
const data = new PrivateData('Alice', 25);

console.log(data.name);   // "Alice"
console.log(data.age);    // 25

console.log(data._name);  // undefined
console.log(data._age);   // undefined

console.log(Object.keys(data)); // []，Symbol 属性不会被遍历
console.log(Object.getOwnPropertySymbols(data)); // [ Symbol(name), Symbol(age) ]
