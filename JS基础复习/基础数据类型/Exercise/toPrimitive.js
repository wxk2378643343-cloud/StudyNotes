/**
 * 实现对象到基本类型的转换
 * hint: "number", "string", "default"
 */
function toPrimitive(obj, hint) {
    // 1. 如果本来就是基本类型，直接返回
    if (obj === null) return obj;
    if (typeof obj !== 'object') return obj;

    // 2. 转字符串
    if (hint === 'string') {
        // 先 toString
        if (typeof obj.toString === 'function') {
            const r1 = obj.toString();
            if (r1 === null || typeof r1 !== 'object') {
                return r1;
            }
        }

        // 再 valueOf
        if (typeof obj.valueOf === 'function') {
            const r2 = obj.valueOf();
            if (r2 === null || typeof r2 !== 'object') {
                return r2;
            }
        }
    }

    // 3. 转数字 / default
    else {
        // 先 valueOf
        if (typeof obj.valueOf === 'function') {
            const r1 = obj.valueOf();
            if (r1 === null || typeof r1 !== 'object') {
                return r1;
            }
        }

        // 再 toString
        if (typeof obj.toString === 'function') {
            const r2 = obj.toString();
            if (r2 === null || typeof r2 !== 'object') {
                return r2;
            }
        }
    }

    // 4. 都不行就报错
    throw new TypeError('Cannot convert object to primitive value');
}


// 测试用例
const obj = {
    valueOf() { return 42; },
    toString() { return 'hello'; }
};
console.log(toPrimitive(obj, 'number'));  // 42
console.log(toPrimitive(obj, 'string'));  // "hello"