/**
 * 判断是否为纯对象（通过 {} 或 new Object 创建）
 */
function PlainObject(obj) {
    // 你的代码
    return Object.prototype.toString.call(obj) === '[object Object]';

}

function isPlainObject(obj) {
    // 你的代码
    if( typeof obj !== 'object'  || obj == null)  return false;
    const proto = Object.getPrototypeOf(obj)
    return proto === Object.prototype || proto === null;

}

// 测试用例
console.log(isPlainObject({}));                    // true
console.log(isPlainObject(new Object()));          // true
console.log(isPlainObject(Object.create(null)));   // true
console.log(isPlainObject([]));                    // false
console.log(isPlainObject(new Date()));            // false
console.log(isPlainObject(null));                  // false
class A {}
console.log(isPlainObject(new A()));
console.log('000')
console.log(PlainObject({}));                    // true
console.log(PlainObject(new Object()));          // true
console.log(PlainObject(Object.create(null)));   // true
console.log(PlainObject([]));                    // false
console.log(PlainObject(new Date()));            // false
console.log(PlainObject(null));
console.log(PlainObject(new A()));