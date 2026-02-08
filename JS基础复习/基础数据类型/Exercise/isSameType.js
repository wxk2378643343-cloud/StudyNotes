/**
 * 判断两个值是否类型相同（包括深层对象）
 */
function isSameType(a, b) {
    return Object.prototype.toString.call(a) === Object.prototype.toString.call(b);
}

// 测试用例
console.log(isSameType(1, 2));              // true
console.log(isSameType(1, '1'));            // false
console.log(isSameType([], []));            // true
console.log(isSameType({a:1}, {b:2}));      // true
console.log(isSameType(null, undefined));   // false