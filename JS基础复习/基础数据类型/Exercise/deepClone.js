/**
 * 实现一个支持所有类型的深拷贝函数
 * 要求：正确处理循环引用、特殊对象（Date、RegExp等）
 */
function deepClone(value, hash = new WeakMap()) {
    // 原始类型直接返回
    if (value === null || typeof value !== 'object') {
        return value;
    }

    // 循环引用检测
    if (hash.has(value)) {
        return hash.get(value);
    }

    // 获取准确类型
    const type = Object.prototype.toString.call(value);

    // 特殊对象处理
    const specialConstructors = {
        '[object Date]': () => new Date(value),
        '[object RegExp]': () => new RegExp(value.source, value.flags),
        '[object Error]': () => new Error(value.message),
        '[object Function]': () => value, // 函数一般不拷贝
    };

    if (specialConstructors[type]) {
        return specialConstructors[type]();
    }

    // Map 处理
    if (value instanceof Map) {
        const map = new Map();
        hash.set(value, map);
        value.forEach((v, k) => {
            map.set(deepClone(k, hash), deepClone(v, hash));
        });
        return map;
    }

    // Set 处理
    if (value instanceof Set) {
        const set = new Set();
        hash.set(value, set);
        value.forEach(v => set.add(deepClone(v, hash)));
        return set;
    }

    // 数组处理
    if (Array.isArray(value)) {
        const arr = [];
        hash.set(value, arr);
        value.forEach((item, i) => {
            arr[i] = deepClone(item, hash);
        });
        return arr;
    }

    // 普通对象处理
    const cloneObj = Object.create(Object.getPrototypeOf(value));
    hash.set(value, cloneObj);

    // 使用 Reflect.ownKeys 同时获取 Symbol 和字符串属性
    Reflect.ownKeys(value).forEach(key => {
        cloneObj[key] = deepClone(value[key], hash);
    });

    return cloneObj;
}

// 测试用例
const obj = {
    num: 1,
    str: 'hello',
    bool: true,
    nil: null,
    undef: undefined,
    sym: Symbol('s'),
    bigint: 10n,
    arr: [1, 2, 3],
    date: new Date(),
    reg: /test/g,
    map: new Map([['key', 'value']]),
    set: new Set([1, 2, 3]),
};
obj.self = obj; // 循环引用

const cloned = deepClone(obj);
console.log(cloned === obj);        // false
console.log(cloned.self === cloned); // true