/**
 * 实现一个类型转换器类
 */
class TypeConverter {
    // 转换为字符串
    static toString(value) {
        /* 你的代码 */
        return String(value);
    }

    // 转换为数字
    static toNumber(value) { /* 你的代码 */
     if (typeof value === "number")  return value;
     return Number(value)
    }

    // 转换为布尔值
    static toBoolean(value) { /* 你的代码 */
        return Boolean(value);
    }

    // 转换为数组
    static toArray(value) {
        if (value == null) return [];
        if (Array.isArray(value)) return value;
        return [value];
    }
}

// 测试用例
console.log(TypeConverter.toString(123));      // "123"
console.log(TypeConverter.toNumber("456"));    // 456
console.log(TypeConverter.toBoolean(1));       // true
console.log(TypeConverter.toArray("abc"));     // ["abc"]