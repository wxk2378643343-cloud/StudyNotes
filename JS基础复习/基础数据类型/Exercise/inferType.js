function inferType(value) {
    const result = {
        type: '',           // 基本类型
        subType: '',        // 细分类型
        isNullable: false,  // 是否为 null / undefined
        isPrimitive: false,// 是否为原始类型
        isCallable: false, // 是否可调用
        isIterable: false, // 是否可迭代
    };

    // 1. null / undefined
    if (value === null || value === undefined) {
        result.type = String(value);
        result.isNullable = true;
        result.isPrimitive = true;
        return result;
    }

    // 2. 基本 typeof 判断
    const basicType = typeof value;
    result.type = basicType;

    // 3. 是否为原始类型
    result.isPrimitive = (
        basicType !== 'object' &&
        basicType !== 'function'
    );

    // 4. 是否可调用
    result.isCallable = basicType === 'function';

    // 5. 子类型判断（object / function）
    const tag = Object.prototype.toString.call(value);

    switch (tag) {
        case '[object Array]':
            result.subType = 'Array';
            break;
        case '[object Date]':
            result.subType = 'Date';
            break;
        case '[object RegExp]':
            result.subType = 'RegExp';
            break;
        case '[object Map]':
            result.subType = 'Map';
            break;
        case '[object Set]':
            result.subType = 'Set';
            break;
        case '[object GeneratorFunction]':
            result.subType = 'GeneratorFunction';
            break;
        case '[object AsyncFunction]':
            result.subType = 'AsyncFunction';
            break;
        case '[object Function]':
            result.subType = 'Function';
            break;
        default:
            result.subType = 'Object';
    }

    // 6. 是否可迭代
    result.isIterable = typeof value[Symbol.iterator] === 'function';

    return result;
}
// 测试
console.log(inferType([]));
console.log(inferType(new Date()));
console.log(inferType(function*(){}));