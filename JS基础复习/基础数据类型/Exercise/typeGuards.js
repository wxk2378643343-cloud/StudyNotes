/**
 * 实现一组 TypeScript 风格的类型守卫函数
 */
function isString(value) {
    /* 你的代码 */
    return typeof value === 'string';
}
function isNumber(value) {
    /* 你的代码 */
    return typeof value === 'number' && !Number.isNaN(value);
}
function isArray(value) {
    /* 你的代码 */
    return Array.isArray(value);
}
function isObject(value) {
    /**
     * 什么才叫「纯对象（Plain Object）」？
     *
     * 工程里通常的定义是：
     *
     * 用 {} / new Object() / Object.create(null) 创建
     *
     * 原型是 Object.prototype 或 null
     *
     * 不携带业务原型、不携带行为语义
     *
     * 用来承载数据（JSON / 配置 / 参数）
     */
    /* 你的代码 */
    if (value === null || typeof value !== 'object') return false
    const proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
}
function isFunction(value) {
    /* 你的代码 */
    return typeof value === 'function';
}
function isNull(value) {
    return value === null;
}
function isUndefined(value) {
    /* 你的代码 */
    return  value === 'undefined';
}
function isNullOrUndefined(value) {
    return value == null;
}

// 要求：准确、高效、边界情况处理完善