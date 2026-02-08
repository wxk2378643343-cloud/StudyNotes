function toPrimitive(val) {
    if (typeof val !== 'object' || val === null) return val

    const value = val.valueOf()
    if (typeof value !== 'object') return value

    return val.toString()
}

/**
 * 预测任意两个值使用 == 比较的结果
 */
function predictEqual(a, b) {
    // null / undefined
    if (
        (a === null && b === undefined) ||
        (a === undefined && b === null)
    ) {
        return true
    }

    // 类型相同
    if (typeof a === typeof b) {
        return a === b
    }

    // Boolean → Number
    if (typeof a === 'boolean') {
        return predictEqual(Number(a), b)
    }
    if (typeof b === 'boolean') {
        return predictEqual(a, Number(b))
    }

    // String ↔ Number
    if (typeof a === 'string' && typeof b === 'number') {
        return predictEqual(Number(a), b)
    }
    if (typeof a === 'number' && typeof b === 'string') {
        return predictEqual(a, Number(b))
    }

    // Object → Primitive（关键修复点）
    if (typeof a === 'object' && a !== null) {
        return predictEqual(toPrimitive(a), b)
    }
    if (typeof b === 'object' && b !== null) {
        return predictEqual(a, toPrimitive(b))
    }

    return false
}

// 测试用例
console.log(predictEqual(null, undefined));  // true
console.log(predictEqual(1, '1'));           // true
console.log(predictEqual([], ''));           // true