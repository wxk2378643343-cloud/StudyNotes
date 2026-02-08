/**
 * 实现安全的类型转换函数
 * 转换失败返回默认值
 */
function safeConvert(value, targetType, defaultValue) {
    if (typeof value === targetType) return value

    switch (targetType) {
        case 'string':
            return String(value)

        case 'number': {
            const num = Number(value)
            return Number.isNaN(num) ? defaultValue : num
        }

        case 'boolean':
            return Boolean(value)

        default:
            return defaultValue
    }
}


// 测试用例
console.log(safeConvert('123', 'number', 0));     // 123
console.log(safeConvert('abc', 'number', 0));     // 0
console.log(safeConvert(123, 'string', ''));      // "123"
console.log(safeConvert(null, 'boolean', false)); // false