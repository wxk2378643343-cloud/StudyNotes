/**
 * 实现判断是否为空值的函数
 * 空值定义：null, undefined, '', [], {}, NaN, 0, false
 */
function isEmpty(value) {
    // null / undefined
    if (value == null) return true;

    // string
    if (typeof value === 'string') {
        return value === '';
    }

    // number
    if (typeof value === 'number') {
        return value === 0 || Number.isNaN(value);
    }

    // boolean
    if (typeof value === 'boolean') {
        return value === false;
    }

    // array
    if (Array.isArray(value)) {
        return value.length === 0;
    }

    // object
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
}


// 测试用例
console.log(isEmpty(null));        // true
console.log(isEmpty(undefined));   // true
console.log(isEmpty(''));          // true
console.log(isEmpty([]));          // true
console.log(isEmpty({}));          // true
console.log(isEmpty(0));           // true
console.log(isEmpty(false));       // true
console.log(isEmpty(' '));         // false
console.log(isEmpty([1]));         // false
console.log(isEmpty({a: 1}));      // false