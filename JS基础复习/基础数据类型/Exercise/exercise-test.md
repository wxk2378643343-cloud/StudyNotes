# JavaScript 类型系统练习题集

## 📝 第一部分：基础概念题（20题）

### 类型分类与判断

**1-5. 判断题**

```javascript
// 判断以下说法是否正确
1. null 是对象类型 (  )
2. typeof NaN 返回 "number" (  )
3. typeof function(){} 返回 "function" (  )
4. Symbol('a') === Symbol('a') (  )
5. BigInt(10) === 10n (  )
```

**6-10. 选择题**

```javascript
// 6. typeof null 返回什么？
A. "null"
B. "object" 
C. "undefined"
D. "number"

// 7. 以下哪个不是基本类型？
A. Symbol
B. BigInt
C. Array
D. String

// 8. typeof [] 返回什么？
A. "array"
B. "object"
C. "Array"
D. "undefined"

// 9. 以下哪个判断数组的方法最准确？
A. typeof arr === 'array'
B. arr instanceof Array
C. Array.isArray(arr)
D. arr.constructor === Array

// 10. Object.prototype.toString.call(new Date()) 返回什么？
A. "[object Date]"
B. "[object Object]"
C. "Date"
D. "[Date]"
```

------

## 🔍 第二部分：代码输出题（30题）

### typeof 专项练习

```javascript
// 11-20. 写出以下代码的输出结果

console.log(typeof undefined);           // 11. ?
console.log(typeof null);                 // 12. ?
console.log(typeof true);                 // 13. ?
console.log(typeof 123);                  // 14. ?
console.log(typeof '123');                // 15. ?
console.log(typeof Symbol('id'));         // 16. ?
console.log(typeof 10n);                  // 17. ?
console.log(typeof {});                   // 18. ?
console.log(typeof []);                   // 19. ?
console.log(typeof function(){});         // 20. ?
console.log(typeof NaN);                  // 21. ?
console.log(typeof Infinity);             // 22. ?
```

### instanceof 专项练习

```javascript
// 23-30. 写出以下代码的输出结果

console.log([] instanceof Array);               // 23. ?
console.log([] instanceof Object);              // 24. ?
console.log({} instanceof Object);              // 25. ?
console.log(function(){} instanceof Function);  // 26. ?
console.log(function(){} instanceof Object);    // 27. ?

class Person {}
const p = new Person();
console.log(p instanceof Person);               // 28. ?
console.log(p instanceof Object);               // 29. ?

const obj = Object.create(null);
console.log(obj instanceof Object);             // 30. ?
```

### 类型转换专项练习

```javascript
// 31-50. 写出以下代码的输出结果

// == 比较
console.log(null == undefined);          // 31. ?
console.log(null === undefined);         // 32. ?
console.log(0 == false);                 // 33. ?
console.log('' == false);                // 34. ?
console.log('0' == false);               // 35. ?
console.log([] == false);                // 36. ?
console.log({} == false);                // 37. ?
console.log([] == ![]);                  // 38. ?

// + 运算符
console.log(1 + '2');                    // 39. ?
console.log('1' + 2);                    // 40. ?
console.log(1 + 2 + '3');                // 41. ?
console.log('1' + 2 + 3);                // 42. ?
console.log([] + []);                    // 43. ?
console.log([] + {});                    // 44. ?
console.log({} + []);                    // 45. ?
console.log({} + {});                    // 46. ?

// 其他运算符
console.log('5' - 2);                    // 47. ?
console.log('5' * '2');                  // 48. ?
console.log(true + 1);                   // 49. ?
console.log(false + 1);                  // 50. ?
```

### if 条件判断专项

```javascript
// 51-60. 判断以下值在 if 中是 true 还是 false

if (0) {}                    // 51. ?
if ('') {}                   // 52. ?
if (' ') {}                  // 53. ?
if ([]) {}                   // 54. ?
if ({}) {}                   // 55. ?
if (null) {}                 // 56. ?
if (undefined) {}            // 57. ?
if (NaN) {}                  // 58. ?
if (false) {}                // 59. ?
if ('0') {}                  // 60. ?
```

------

## 💻 第三部分：手写实现题（10题）

### 61. 手写 typeof 增强版

```javascript
/**
 * 实现一个更准确的类型判断函数
 * 要求：能准确判断所有类型，包括 null、array、date 等
 */
function typeOf(value) {
  // 你的代码
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
```

### 62. 手写 instanceof

```javascript
/**
 * 实现 instanceof 运算符
 * 原理：检查右边构造函数的 prototype 是否在左边对象的原型链上
 */
function myInstanceof(left, right) {
  // 你的代码
}

// 测试用例
console.log(myInstanceof([], Array));        // true
console.log(myInstanceof([], Object));       // true
console.log(myInstanceof({}, Array));        // false
console.log(myInstanceof(function(){}, Function)); // true
```

### 63. 实现类型转换函数 - ToPrimitive

```javascript
/**
 * 实现对象到基本类型的转换
 * hint: "number", "string", "default"
 */
function toPrimitive(obj, hint = 'default') {
  // 你的代码
}

// 测试用例
const obj = {
  valueOf() { return 42; },
  toString() { return 'hello'; }
};
console.log(toPrimitive(obj, 'number'));  // 42
console.log(toPrimitive(obj, 'string'));  // "hello"
```

### 64. 实现深度类型判断

```javascript
/**
 * 判断两个值是否类型相同（包括深层对象）
 */
function isSameType(a, b) {
  // 你的代码
}

// 测试用例
console.log(isSameType(1, 2));              // true
console.log(isSameType(1, '1'));            // false
console.log(isSameType([], []));            // true
console.log(isSameType({a:1}, {b:2}));      // true
console.log(isSameType(null, undefined));   // false
```

### 65. 实现类型转换预测器

```javascript
/**
 * 预测任意两个值使用 == 比较的结果
 */
function predictEqual(a, b) {
  // 你的代码
  // 不能直接使用 ==，要根据转换规则实现
}

// 测试用例
console.log(predictEqual(null, undefined));  // true
console.log(predictEqual(1, '1'));           // true
console.log(predictEqual([], ''));           // true
```

### 66. 实现安全的类型转换

```javascript
/**
 * 实现安全的类型转换函数
 * 转换失败返回默认值
 */
function safeConvert(value, targetType, defaultValue) {
  // 你的代码
}

// 测试用例
console.log(safeConvert('123', 'number', 0));     // 123
console.log(safeConvert('abc', 'number', 0));     // 0
console.log(safeConvert(123, 'string', ''));      // "123"
console.log(safeConvert(null, 'boolean', false)); // false
```

### 67. 手写 isPlainObject

```javascript
/**
 * 判断是否为纯对象（通过 {} 或 new Object 创建）
 */
function isPlainObject(obj) {
  // 你的代码
}

// 测试用例
console.log(isPlainObject({}));                    // true
console.log(isPlainObject(new Object()));          // true
console.log(isPlainObject(Object.create(null)));   // true
console.log(isPlainObject([]));                    // false
console.log(isPlainObject(new Date()));            // false
console.log(isPlainObject(null));                  // false
```

### 68. 实现类型守卫函数集

```javascript
/**
 * 实现一组 TypeScript 风格的类型守卫函数
 */
function isString(value) { /* 你的代码 */ }
function isNumber(value) { /* 你的代码 */ }
function isArray(value) { /* 你的代码 */ }
function isObject(value) { /* 你的代码 */ }
function isFunction(value) { /* 你的代码 */ }
function isNull(value) { /* 你的代码 */ }
function isUndefined(value) { /* 你的代码 */ }
function isNullOrUndefined(value) { /* 你的代码 */ }

// 要求：准确、高效、边界情况处理完善
```

### 69. 实现类型转换器类

```javascript
/**
 * 实现一个类型转换器类
 */
class TypeConverter {
  // 转换为字符串
  static toString(value) { /* 你的代码 */ }
  
  // 转换为数字
  static toNumber(value) { /* 你的代码 */ }
  
  // 转换为布尔值
  static toBoolean(value) { /* 你的代码 */ }
  
  // 转换为数组
  static toArray(value) { /* 你的代码 */ }
}

// 测试用例
console.log(TypeConverter.toString(123));      // "123"
console.log(TypeConverter.toNumber("456"));    // 456
console.log(TypeConverter.toBoolean(1));       // true
console.log(TypeConverter.toArray("abc"));     // ["abc"]
```

### 70. 实现复杂类型判断

```javascript
/**
 * 实现判断是否为空值的函数
 * 空值定义：null, undefined, '', [], {}, NaN, 0, false
 */
function isEmpty(value) {
  // 你的代码
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
```

------

## 🎯 第四部分：综合应用题（10题）

### 71. 类型转换陷阱分析

```javascript
// 分析以下代码，解释为什么会得到这样的结果

const a = {
  i: 1,
  toString() {
    return this.i++;
  }
};

if (a == 1 && a == 2 && a == 3) {
  console.log('成功');
}

// 问题：
// 1. 为什么会输出"成功"？
// 2. 这里涉及哪些类型转换规则？
// 3. 如何修改代码让 === 也能成功？
```

### 72. 实现类型安全的深拷贝

```javascript
/**
 * 实现一个支持所有类型的深拷贝函数
 * 要求：正确处理循环引用、特殊对象（Date、RegExp等）
 */
function deepClone(value, hash = new WeakMap()) {
  // 你的代码
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
```

### 73. 类型转换优先级问题

```javascript
// 预测以下表达式的结果，并解释原因

const result1 = [1, 2] + [3, 4];
const result2 = {} + {};
const result3 = {} + [];
const result4 = [] + {};
const result5 = [1, 2] + 3;
const result6 = 1 + [2, 3];
const result7 = true + false + true;
const result8 = 'value' + null + undefined;

// 请写出每个结果，并说明转换过程
```

### 74. 实现类型检查装饰器

```javascript
/**
 * 实现一个参数类型检查装饰器
 * 用于运行时检查函数参数类型
 */
function checkTypes(...types) {
  // 你的代码
}

// 使用示例
class Calculator {
  @checkTypes('number', 'number')
  add(a, b) {
    return a + b;
  }
  
  @checkTypes('string')
  print(message) {
    console.log(message);
  }
}

const calc = new Calculator();
calc.add(1, 2);        // 正常执行
calc.add('1', 2);      // 应该抛出类型错误
```

### 75. Symbol 类型应用

```javascript
/**
 * 使用 Symbol 实现一个私有属性系统
 */
class PrivateData {
  // 实现私有属性 _name 和 _age
  // 提供 getter/setter
  // 外部无法直接访问私有属性
}

// 测试
const data = new PrivateData();
data.name = 'Alice';
data.age = 25;
console.log(data.name);  // "Alice"
console.log(data._name); // undefined
console.log(Object.keys(data)); // []
```

### 76. BigInt 实际应用

```javascript
/**
 * 实现一个处理超大整数的计算器
 * 支持加减乘除运算
 */
class BigIntCalculator {
  static add(a, b) { /* 你的代码 */ }
  static subtract(a, b) { /* 你的代码 */ }
  static multiply(a, b) { /* 你的代码 */ }
  static divide(a, b) { /* 你的代码 */ }
}

// 测试：处理超过 Number.MAX_SAFE_INTEGER 的数字
const huge1 = '9007199254740992'; // Number.MAX_SAFE_INTEGER + 1
const huge2 = '9007199254740993';
console.log(BigIntCalculator.add(huge1, huge2));
```

### 77. 类型转换性能对比

```javascript
/**
 * 比较不同类型转换方法的性能
 * 测试：String()、toString()、'' + value
 */
function performanceTest() {
  const iterations = 1000000;
  const value = 12345;
  
  // 实现性能测试
  // 测试三种转字符串方法的耗时
  // 返回性能报告
}
```

### 78. 实现类型安全的 JSON

```javascript
/**
 * 实现支持所有 JavaScript 类型的序列化和反序列化
 * 包括 undefined, Symbol, BigInt, Function, Date, RegExp 等
 */
class SafeJSON {
  static stringify(value) {
    // 你的代码
  }
  
  static parse(str) {
    // 你的代码
  }
}

// 测试
const data = {
  undef: undefined,
  sym: Symbol('test'),
  big: 100n,
  fn: () => {},
  date: new Date(),
  reg: /test/g
};
const str = SafeJSON.stringify(data);
const parsed = SafeJSON.parse(str);
```

### 79. 类型推断系统

```javascript
/**
 * 实现一个简单的类型推断系统
 * 根据值的特征推断可能的类型
 */
function inferType(value) {
  // 返回详细的类型信息
  return {
    type: '',          // 基本类型
    subType: '',       // 子类型（如 Array, Date）
    isNullable: false, // 是否可为 null/undefined
    isPrimitive: false,// 是否为基本类型
    isCallable: false, // 是否可调用
    isIterable: false, // 是否可迭代
  };
}

// 测试
console.log(inferType([]));
console.log(inferType(new Date()));
console.log(inferType(function*(){}));
```

### 80. 面试综合题

```javascript
/**
 * 以下代码会输出什么？请详细解释每一步
 */
const obj = {
  valueOf() {
    console.log('valueOf');
    return {};
  },
  toString() {
    console.log('toString');
    return {};
  }
};

try {
  console.log(obj + 1);
} catch(e) {
  console.log('错误:', e.message);
}

// 问题：
// 1. 控制台会输出什么？
// 2. 为什么会抛出错误？
// 3. 如何修改让其正常工作？
// 4. valueOf 和 toString 的调用顺序是什么？
// 5. 在不同的转换场景下(+, ==, String())调用顺序有何不同？
```