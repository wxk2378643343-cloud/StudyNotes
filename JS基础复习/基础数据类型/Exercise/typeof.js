function typeOf(value) {
  // 你的代码
    return Object.prototype.toString.call(value).match(/\[object (.*)\]/)[1].toLowerCase()
}

// 测试用例
console.log(typeOf(null));          // "null"
console.log(typeOf(undefined));     // "undefined"
console.log(typeOf(123));           // "number"
console.log(typeOf('abc'));         // "string"
console.log(typeOf(true));          // "boolean"
console.log(typeOf(Symbol('s')));   // "symbol"
console.log(typeOf(10n));           // "bigint"
console.log(typeOf({}));            // "object"
console.log(typeOf([]));            // "array"
console.log(typeOf(function(){}));  // "function"
console.log(typeOf(new Date()));    // "date"
console.log(typeOf(/regex/));       // "regexp"
console.log(typeOf(new Map()));     // "map"
console.log(typeOf(new Set()));     // "set"