/**
 * 实现 instanceof 运算符
 * 原理：检查右边构造函数的 prototype 是否在左边对象的原型链上
 */
function myInstanceof(left, right) {
    if (typeof left !== "object" || left === null) return false;
    // 你的代码
    let LeftPro = Object.getPrototypeOf(left);
    const rightPro = right.prototype
    while(LeftPro){
        if(LeftPro === rightPro) return true
        LeftPro = Object.getPrototypeOf(LeftPro)
    }
    return false
}

// 测试用例
console.log(myInstanceof([], Array));        // true
console.log(myInstanceof([], Object));       // true
console.log(myInstanceof({}, Array));        // false
console.log(myInstanceof(function () { }, Function)); // true
