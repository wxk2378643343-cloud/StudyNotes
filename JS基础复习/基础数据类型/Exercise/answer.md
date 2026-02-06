# JavaScript 类型系统练习题 - 完整答案与解析

## 📝 第一部分：基础概念题答案

### 1-5. 判断题答案

javascript

```javascript
1. null 是对象类型 (❌)
   解析：typeof null 返回 "object" 是 JS 的历史遗留 bug，但 null 是基本类型

2. typeof NaN 返回 "number" (✅)
   解析：NaN 是 Number 类型的特殊值，表示"不是一个数字"

3. typeof function(){} 返回 "function" (✅)
   解析：函数在 typeof 中有特殊处理，返回 "function"

4. Symbol('a') === Symbol('a') (❌)
   解析：每次调用 Symbol() 都会创建唯一的 symbol 值

5. BigInt(10) === 10n (✅)
   解析：两种方式创建的 BigInt 值相等
```

### 6-10. 选择题答案

javascript

```javascript
6. B - "object" 
   这是 JavaScript 的一个著名 bug，从第一版就存在

7. C - Array
   Array 是引用类型（对象），其他都是基本类型

8. B - "object"
   数组是特殊的对象，typeof 无法区分

9. C - Array.isArray(arr)
   最可靠的方法，不受原型链影响

10. A - "[object Date]"
    Object.prototype.toString 是最准确的类型判断方法
```

------

## 🔍 第二部分：代码输出题答案

### typeof 专项练习答案

javascript

```javascript
11. typeof undefined          // "undefined"
12. typeof null              // "object" ⚠️ 历史 bug
13. typeof true              // "boolean"
14. typeof 123               // "number"
15. typeof '123'             // "string"
16. typeof Symbol('id')      // "symbol"
17. typeof 10n               // "bigint"
18. typeof {}                // "object"
19. typeof []                // "object" ⚠️ 数组也是对象
20. typeof function(){}      // "function"
21. typeof NaN               // "number" ⚠️ NaN 是数字类型
22. typeof Infinity          // "number"
```

**知识点总结：**

- typeof 能识别 7 种基本类型 + function
- typeof null 返回 "object" 是历史遗留问题
- typeof 无法区分数组和普通对象

### instanceof 专项练习答案

javascript

```javascript
23. [] instanceof Array              // true
24. [] instanceof Object             // true（数组继承自 Object）
25. {} instanceof Object             // true
26. function(){} instanceof Function // true
27. function(){} instanceof Object   // true（函数也是对象）
28. p instanceof Person              // true
29. p instanceof Object              // true
30. obj instanceof Object            // false（没有原型链）
```

**知识点总结：**

- instanceof 检查原型链
- 所有对象都继承自 Object（除了 Object.create(null)）
- instanceof 右边必须是构造函数

### 类型转换专项练习答案

javascript

```javascript
// == 比较
31. null == undefined           // true ✅ 规范规定
32. null === undefined          // false
33. 0 == false                  // true（false → 0）
34. '' == false                 // true（'' → 0, false → 0）
35. '0' == false                // true（'0' → 0, false → 0）
36. [] == false                 // true（[] → '' → 0, false → 0）
37. {} == false                 // false（{} → '[object Object]' → NaN）
38. [] == ![]                   // true（![] → false, [] → 0）

// + 运算符
39. 1 + '2'                     // "12"（数字转字符串）
40. '1' + 2                     // "12"
41. 1 + 2 + '3'                 // "33"（从左到右：3 + '3'）
42. '1' + 2 + 3                 // "123"（从左到右：'12' + 3）
43. [] + []                     // ""（[] → ''）
44. [] + {}                     // "[object Object]"
45. {} + []                     // 0 或 "[object Object]"（取决于上下文）
46. {} + {}                     // "[object Object][object Object]" 或 NaN

// 其他运算符
47. '5' - 2                     // 3（字符串转数字）
48. '5' * '2'                   // 10
49. true + 1                    // 2（true → 1）
50. false + 1                   // 1（false → 0）
```

**重点解析：**

**第 38 题：[] == ![]**

javascript

```javascript
// 步骤分解：
[] == ![]
[] == false        // ![] 先计算，[] 是真值，![] 是 false
'' == false        // [] 转基本类型调用 toString()
0 == 0             // 都转为数字
true               // 最终结果
```

**第 45 题：{} + []**

javascript

```javascript
// 在不同上下文有不同结果：

// 作为表达式（有赋值、括号等）
const result = {} + [];  // "[object Object]"

// 作为语句（代码块）
{} + []                  // 0
// 被解析为：空代码块 {} ; +[]
// +[] 转为数字 0
```

### if 条件判断专项答案

javascript

```javascript
51. if (0) {}                    // false（falsy 值）
52. if ('') {}                   // false（falsy 值）
53. if (' ') {}                  // true（非空字符串）
54. if ([]) {}                   // true（对象都是真值）
55. if ({}) {}                   // true
56. if (null) {}                 // false（falsy 值）
57. if (undefined) {}            // false（falsy 值）
58. if (NaN) {}                  // false（falsy 值）
59. if (false) {}                // false
60. if ('0') {}                  // true（非空字符串）
```

**JavaScript 的 8 个 Falsy 值：**

1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt 零)
5. `""` (空字符串)
6. `null`
7. `undefined`
8. `NaN`

**其他所有值都是 Truthy！**

------

## 💻 第三部分：手写实现题答案

### 61. 手写 typeof 增强版

javascript

```javascript
function typeOf(value) {
  // 处理 null
  if (value === null) return 'null';
  
  // 基本类型用 typeof
  const type = typeof value;
  if (type !== 'object') return type;
  
  // 引用类型用 Object.prototype.toString
  const toString = Object.prototype.toString.call(value);
  const typeMap = {
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object WeakMap]': 'weakmap',
    '[object WeakSet]': 'weakset',
    '[object Promise]': 'promise',
    '[object Error]': 'error',
  };
  
  return typeMap[toString] || 'object';
}

// 测试
console.log(typeOf(null));           // "null"
console.log(typeOf(undefined));      // "undefined"
console.log(typeOf(123));            // "number"
console.log(typeOf('abc'));          // "string"
console.log(typeOf(true));           // "boolean"
console.log(typeOf(Symbol('s')));    // "symbol"
console.log(typeOf(10n));            // "bigint"
console.log(typeOf({}));             // "object"
console.log(typeOf([]));             // "array"
console.log(typeOf(function(){}));   // "function"
console.log(typeOf(new Date()));     // "date"
console.log(typeOf(/regex/));        // "regexp"
console.log(typeOf(new Map()));      // "map"
console.log(typeOf(new Set()));      // "set"
```

### 62. 手写 instanceof

javascript

~~~javascript
function myInstanceof(left, right) {
  // 基本类型直接返回 false
  if (left === null || typeof left !== 'object') {
    return false;
  }
  
  // 获取原型
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;
  
  // 沿着原型链查找
  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  
  return false;
}

// 测试
console.log(myInstanceof([], Array));         // true
console.log(myInstanceof([], Object));        // true
console.log(myInstanceof({}, Array));         // false
console.log(myInstanceof(function(){}, Function)); // true

class Person {}
const p = new Person();
console.log(myInstanceof(p, Person));         // true
console.log(myInstanceof(p, Object));         // true
```

**原理图解：**
```
实例对象 → __proto__ → 构造函数.prototype → __proto__ → Object.prototype → null
~~~

### 63. 实现 ToPrimitive

javascript

```javascript
function toPrimitive(obj, hint = 'default') {
  // 基本类型直接返回
  if (obj !== Object(obj)) return obj;
  
  // 尝试调用 Symbol.toPrimitive
  if (typeof obj[Symbol.toPrimitive] === 'function') {
    const result = obj[Symbol.toPrimitive](hint);
    if (result !== Object(result)) return result;
    throw new TypeError('Symbol.toPrimitive 必须返回基本类型');
  }
  
  // 根据 hint 决定调用顺序
  const methods = hint === 'string' 
    ? ['toString', 'valueOf'] 
    : ['valueOf', 'toString'];
  
  for (const method of methods) {
    if (typeof obj[method] === 'function') {
      const result = obj[method]();
      if (result !== Object(result)) return result;
    }
  }
  
  throw new TypeError('无法转换为基本类型');
}

// 测试
const obj = {
  valueOf() { return 42; },
  toString() { return 'hello'; }
};

console.log(toPrimitive(obj, 'number'));  // 42
console.log(toPrimitive(obj, 'string'));  // "hello"
console.log(toPrimitive(obj, 'default')); // 42

// 自定义 Symbol.toPrimitive
const obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 100;
    if (hint === 'string') return 'custom';
    return 'default';
  }
};
console.log(toPrimitive(obj2, 'number'));  // 100
```

### 64. 深度类型判断

javascript

```javascript
function isSameType(a, b) {
  // 使用增强版 typeOf
  const typeA = typeOf(a);
  const typeB = typeOf(b);
  
  return typeA === typeB;
}

// 或者更简单的版本
function isSameType(a, b) {
  const getType = (val) => {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'array';
    return typeof val;
  };
  
  return getType(a) === getType(b);
}

// 测试
console.log(isSameType(1, 2));              // true
console.log(isSameType(1, '1'));            // false
console.log(isSameType([], []));            // true
console.log(isSameType({a:1}, {b:2}));      // true
console.log(isSameType(null, undefined));   // false
console.log(isSameType(NaN, NaN));          // true
```

### 65. 类型转换预测器

javascript

```javascript
function predictEqual(a, b) {
  // 1. 类型相同，使用 === 比较（除了 NaN）
  if (typeof a === typeof b) {
    if (Number.isNaN(a) && Number.isNaN(b)) return false;
    return a === b;
  }
  
  // 2. null == undefined
  if ((a === null && b === undefined) || (a === undefined && b === null)) {
    return true;
  }
  
  // 3. 数字和字符串比较：字符串转数字
  if (typeof a === 'number' && typeof b === 'string') {
    return a === Number(b);
  }
  if (typeof a === 'string' && typeof b === 'number') {
    return Number(a) === b;
  }
  
  // 4. 布尔值转数字
  if (typeof a === 'boolean') {
    return predictEqual(Number(a), b);
  }
  if (typeof b === 'boolean') {
    return predictEqual(a, Number(b));
  }
  
  // 5. 对象和基本类型：对象转基本类型
  if (typeof a === 'object' && a !== null) {
    return predictEqual(toPrimitive(a), b);
  }
  if (typeof b === 'object' && b !== null) {
    return predictEqual(a, toPrimitive(b));
  }
  
  return false;
}

// 测试
console.log(predictEqual(null, undefined));  // true
console.log(predictEqual(1, '1'));           // true
console.log(predictEqual([], ''));           // true
console.log(predictEqual([1], '1'));         // true
console.log(predictEqual(true, 1));          // true
console.log(predictEqual(false, 0));         // true
```

### 66. 安全类型转换

javascript

```javascript
function safeConvert(value, targetType, defaultValue) {
  try {
    switch (targetType) {
      case 'number': {
        if (value === null || value === undefined) return defaultValue;
        const num = Number(value);
        return Number.isNaN(num) ? defaultValue : num;
      }
      
      case 'string': {
        if (value === null || value === undefined) return defaultValue;
        return String(value);
      }
      
      case 'boolean': {
        if (value === null || value === undefined) return defaultValue;
        return Boolean(value);
      }
      
      case 'array': {
        if (Array.isArray(value)) return value;
        if (value === null || value === undefined) return defaultValue;
        return [value];
      }
      
      case 'object': {
        if (typeof value === 'object' && value !== null) return value;
        return defaultValue;
      }
      
      default:
        return defaultValue;
    }
  } catch (e) {
    return defaultValue;
  }
}

// 测试
console.log(safeConvert('123', 'number', 0));      // 123
console.log(safeConvert('abc', 'number', 0));      // 0
console.log(safeConvert(123, 'string', ''));       // "123"
console.log(safeConvert(null, 'boolean', false));  // false
console.log(safeConvert(null, 'number', -1));      // -1
console.log(safeConvert('test', 'array', []));     // ["test"]
```

### 67. 手写 isPlainObject

javascript

```javascript
function isPlainObject(obj) {
  // 1. 不是对象类型
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  // 2. Object.create(null) 的情况
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) {
    return true;
  }
  
  // 3. 检查原型链，必须是 Object.prototype 或 null
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  
  return proto === baseProto;
}

// 更简洁的版本
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const proto = Object.getPrototypeOf(obj);
  return proto === null || proto === Object.prototype;
}

// 测试
console.log(isPlainObject({}));                    // true
console.log(isPlainObject(new Object()));          // true
console.log(isPlainObject(Object.create(null)));   // true
console.log(isPlainObject([]));                    // false
console.log(isPlainObject(new Date()));            // false
console.log(isPlainObject(null));                  // false
console.log(isPlainObject(Object.create({})));     // true
```

### 68. 类型守卫函数集

javascript

```javascript
// 基本类型守卫
function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFunction(value) {
  return typeof value === 'function';
}

function isNull(value) {
  return value === null;
}

function isUndefined(value) {
  return value === undefined;
}

function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

// 扩展守卫
function isBoolean(value) {
  return typeof value === 'boolean';
}

function isSymbol(value) {
  return typeof value === 'symbol';
}

function isBigInt(value) {
  return typeof value === 'bigint';
}

function isPrimitive(value) {
  return value === null || 
         (typeof value !== 'object' && typeof value !== 'function');
}

function isPromise(value) {
  return value instanceof Promise || 
         (value !== null && 
          typeof value === 'object' && 
          typeof value.then === 'function');
}

// 测试
console.log(isString('hello'));        // true
console.log(isNumber(123));            // true
console.log(isNumber(NaN));            // false
console.log(isArray([]));              // true
console.log(isObject({}));             // true
console.log(isObject([]));             // false
console.log(isNullOrUndefined(null));  // true
console.log(isPromise(Promise.resolve())); // true
```

### 69. 类型转换器类

javascript

```javascript
class TypeConverter {
  // 转换为字符串
  static toString(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'symbol') return value.toString();
    return String(value);
  }
  
  // 转换为数字
  static toNumber(value) {
    if (value === null) return 0;
    if (value === undefined) return NaN;
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '') return 0;
      return Number(trimmed);
    }
    if (typeof value === 'symbol') return NaN;
    if (typeof value === 'bigint') return Number(value);
    return Number(value);
  }
  
  // 转换为布尔值
  static toBoolean(value) {
    // 8 个 falsy 值
    return !(
      value === false ||
      value === 0 ||
      value === -0 ||
      value === 0n ||
      value === '' ||
      value === null ||
      value === undefined ||
      Number.isNaN(value)
    );
  }
  
  // 转换为数组
  static toArray(value) {
    if (value === null || value === undefined) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    if (typeof value[Symbol.iterator] === 'function') {
      return Array.from(value);
    }
    return [value];
  }
  
  // 转换为对象
  static toObject(value) {
    if (value === null || value === undefined) {
      return {};
    }
    return Object(value);
  }
}

// 测试
console.log(TypeConverter.toString(123));       // "123"
console.log(TypeConverter.toString(null));      // "null"
console.log(TypeConverter.toNumber("456"));     // 456
console.log(TypeConverter.toNumber("  789  ")); // 789
console.log(TypeConverter.toBoolean(1));        // true
console.log(TypeConverter.toBoolean(0));        // false
console.log(TypeConverter.toArray("abc"));      // ["abc"]
console.log(TypeConverter.toArray(new Set([1,2]))); // [1, 2]
```

### 70. 判断空值

javascript

```javascript
function isEmpty(value) {
  // null 或 undefined
  if (value === null || value === undefined) {
    return true;
  }
  
  // NaN
  if (Number.isNaN(value)) {
    return true;
  }
  
  // false 或 0
  if (value === false || value === 0) {
    return true;
  }
  
  // 空字符串
  if (typeof value === 'string' && value.length === 0) {
    return true;
  }
  
  // 空数组
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  
  // 空对象
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  
  return false;
}

// 更严格的版本（只检查 null/undefined/空字符串/空数组/空对象）
function isEmptyStrict(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

// 测试
console.log(isEmpty(null));         // true
console.log(isEmpty(undefined));    // true
console.log(isEmpty(''));           // true
console.log(isEmpty([]));           // true
console.log(isEmpty({}));           // true
console.log(isEmpty(0));            // true
console.log(isEmpty(false));        // true
console.log(isEmpty(NaN));          // true
console.log(isEmpty(' '));          // false
console.log(isEmpty([1]));          // false
console.log(isEmpty({a: 1}));       // false
console.log(isEmpty(1));            // false
```

------

## 🎯 第四部分：综合应用题答案

### 71. 类型转换陷阱分析

javascript

```javascript
const a = {
  i: 1,
  toString() {
    return this.i++;
  }
};

if (a == 1 && a == 2 && a == 3) {
  console.log('成功');
}

// 输出："成功"
```

**详细解析：**

javascript

```javascript
// 第一次比较：a == 1
// 1. a 是对象，需要转换为基本类型
// 2. 调用 a.toString()，返回 1，同时 i 变成 2
// 3. 1 == 1，条件成立

// 第二次比较：a == 2
// 1. 再次调用 a.toString()，返回 2，同时 i 变成 3
// 2. 2 == 2，条件成立

// 第三次比较：a == 3
// 1. 再次调用 a.toString()，返回 3，同时 i 变成 4
// 2. 3 == 3，条件成立

// 三个条件都满足，输出"成功"
```

**涉及的类型转换规则：**

1. 对象与基本类型比较时，对象会转换为基本类型
2. 转换时优先调用 `valueOf()`，如果没有或返回对象，则调用 `toString()`
3. 每次比较都是独立的转换过程

**如何让 === 也能成功：**

javascript

```javascript
// 方法1：使用 Symbol.toPrimitive
const a = {
  i: 1,
  [Symbol.toPrimitive]() {
    return this.i++;
  }
};
// === 不会进行类型转换，所以无法通过这种方式

// 方法2：使用 valueOf
const a = {
  i: 1,
  valueOf() {
    return this.i++;
  }
};
// === 同样无法工作

// 实际上，=== 要求类型和值都相同，无法通过这种技巧实现
// 但可以用 Proxy 实现：
let i = 1;
const a = new Proxy({}, {
  get() {
    return i++;
  }
});
if (a.valueOf === 1 && a.valueOf === 2 && a.valueOf === 3) {
  console.log('成功');
}
```

### 72. 类型安全的深拷贝

javascript

```javascript
function deepClone(value, hash = new WeakMap()) {
  // 1. 基本类型直接返回
  if (value === null || typeof value !== 'object') {
    return value;
  }
  
  // 2. 处理循环引用
  if (hash.has(value)) {
    return hash.get(value);
  }
  
  // 3. 处理 Date
  if (value instanceof Date) {
    return new Date(value);
  }
  
  // 4. 处理 RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }
  
  // 5. 处理 Map
  if (value instanceof Map) {
    const result = new Map();
    hash.set(value, result);
    value.forEach((val, key) => {
      result.set(key, deepClone(val, hash));
    });
    return result;
  }
  
  // 6. 处理 Set
  if (value instanceof Set) {
    const result = new Set();
    hash.set(value, result);
    value.forEach(val => {
      result.add(deepClone(val, hash));
    });
    return result;
  }
  
  // 7. 处理数组
  if (Array.isArray(value)) {
    const result = [];
    hash.set(value, result);
    value.forEach((item, index) => {
      result[index] = deepClone(item, hash);
    });
    return result;
  }
  
  // 8. 处理普通对象
  const result = Object.create(Object.getPrototypeOf(value));
  hash.set(value, result);
  
  // 拷贝所有自有属性（包括 Symbol）
  Reflect.ownKeys(value).forEach(key => {
    result[key] = deepClone(value[key], hash);
  });
  
  return result;
}

// 测试
const obj = {
  // 基本类型
  num: 1,
  str: 'hello',
  bool: true,
  nil: null,
  undef: undefined,
  sym: Symbol('s'),
  bigint: 10n,
  
  // 引用类型
  arr: [1, 2, 3],
  date: new Date(),
  reg: /test/gi,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  
  // 嵌套
  nested: {
    a: 1,
    b: [2, 3]
  }
};

// 循环引用
obj.self = obj;
obj.arr.push(obj);

const cloned = deepClone(obj);

console.log(cloned === obj);              // false
console.log(cloned.self === cloned);      // true（循环引用正确处理）
console.log(cloned.arr[3] === cloned);    // true
console.log(cloned.date === obj.date);    // false（新对象）
console.log(cloned.date.getTime() === obj.date.getTime()); // true（值相同）
```

### 73. 类型转换优先级问题

javascript

```javascript
const result1 = [1, 2] + [3, 4];
// 步骤：
// [1,2].toString() => "1,2"
// [3,4].toString() => "3,4"
// "1,2" + "3,4" => "1,23,4"
console.log(result1); // "1,23,4"

const result2 = {} + {};
// 在表达式中：
// {}.toString() => "[object Object]"
// {}.toString() => "[object Object]"
// "[object Object]" + "[object Object]" => "[object Object][object Object]"
console.log(result2); // "[object Object][object Object]"

const result3 = {} + [];
// 在表达式中：
// {}.toString() => "[object Object]"
// [].toString() => ""
// "[object Object]" + "" => "[object Object]"
console.log(result3); // "[object Object]"

const result4 = [] + {};
// [].toString() => ""
// {}.toString() => "[object Object]"
// "" + "[object Object]" => "[object Object]"
console.log(result4); // "[object Object]"

const result5 = [1, 2] + 3;
// [1,2].toString() => "1,2"
// "1,2" + 3 => "1,2" + "3" => "1,23"
console.log(result5); // "1,23"

const result6 = 1 + [2, 3];
// 1 + [2,3].toString() => 1 + "2,3" => "12,3"
console.log(result6); // "12,3"

const result7 = true + false + true;
// true => 1, false => 0, true => 1
// 1 + 0 + 1 => 2
console.log(result7); // 2

const result8 = 'value' + null + undefined;
// 'value' + String(null) + String(undefined)
// 'value' + 'null' + 'undefined'
// 'valuenullundefined'
console.log(result8); // "valuenullundefined"
```

**+ 运算符规则总结：**

1. 如果有一个操作数是字符串，另一个转为字符串进行拼接
2. 如果都不是字符串，都转为数字进行相加
3. 对象转基本类型：先调用 `valueOf()`，如果返回对象则调用 `toString()`

### 74. 类型检查装饰器

javascript

```javascript
// 方法1：使用装饰器语法（需要 Babel 或 TypeScript）
function checkTypes(...types) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
      // 检查参数数量
      if (args.length < types.length) {
        throw new TypeError(
          `Expected ${types.length} arguments, got ${args.length}`
        );
      }
      
      // 检查每个参数的类型
      for (let i = 0; i < types.length; i++) {
        const expectedType = types[i];
        const actualType = typeof args[i];
        const value = args[i];
        
        let isValid = false;
        
        switch (expectedType) {
          case 'number':
            isValid = actualType === 'number' && !Number.isNaN(value);
            break;
          case 'string':
            isValid = actualType === 'string';
            break;
          case 'boolean':
            isValid = actualType === 'boolean';
            break;
          case 'array':
            isValid = Array.isArray(value);
            break;
          case 'object':
            isValid = actualType === 'object' && value !== null && !Array.isArray(value);
            break;
          default:
            isValid = actualType === expectedType;
        }
        
        if (!isValid) {
          throw new TypeError(
            `Argument ${i + 1}: expected ${expectedType}, got ${actualType}`
          );
        }
      }
      
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}

// 方法2：不使用装饰器语法
function createTypeChecker(...types) {
  return function(fn) {
    return function(...args) {
      for (let i = 0; i < types.length; i++) {
        const expectedType = types[i];
        const value = args[i];
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        
        if (actualType !== expectedType) {
          throw new TypeError(
            `Argument ${i + 1} of ${fn.name}: expected ${expectedType}, got ${actualType}`
          );
        }
      }
      return fn.apply(this, args);
    };
  };
}

// 使用示例
class Calculator {
  add(a, b) {
    return a + b;
  }
  
  print(message) {
    console.log(message);
  }
}

// 手动应用类型检查
Calculator.prototype.add = createTypeChecker('number', 'number')(
  Calculator.prototype.add
);
Calculator.prototype.print = createTypeChecker('string')(
  Calculator.prototype.print
);

const calc = new Calculator();
calc.add(1, 2);        // 正常执行: 3
// calc.add('1', 2);   // TypeError: Argument 1 of add: expected number, got string
calc.print('Hello');   // 正常执行
// calc.print(123);    // TypeError: Argument 1 of print: expected string, got number
```

### 75. Symbol 实现私有属性

javascript

```javascript
class PrivateData {
  // 创建私有 Symbol
  #nameSymbol = Symbol('name');
  #ageSymbol = Symbol('age');
  
  constructor() {
    this[this.#nameSymbol] = '';
    this[this.#ageSymbol] = 0;
  }
  
  get name() {
    return this[this.#nameSymbol];
  }
  
  set name(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }
    this[this.#nameSymbol] = value;
  }
  
  get age() {
    return this[this.#ageSymbol];
  }
  
  set age(value) {
    if (typeof value !== 'number' || value < 0) {
      throw new TypeError('Age must be a positive number');
    }
    this[this.#ageSymbol] = value;
  }
}

// 更简单的方案：使用 WeakMap
const privateData = new WeakMap();

class PrivateData2 {
  constructor() {
    privateData.set(this, {
      name: '',
      age: 0
    });
  }
  
  get name() {
    return privateData.get(this).name;
  }
  
  set name(value) {
    privateData.get(this).name = value;
  }
  
  get age() {
    return privateData.get(this).age;
  }
  
  set age(value) {
    privateData.get(this).age = value;
  }
}

// 测试
const data = new PrivateData();
data.name = 'Alice';
data.age = 25;
console.log(data.name);           // "Alice"
console.log(data._name);          // undefined
console.log(data.age);            // 25
console.log(Object.keys(data));   // []（Symbol 属性不可枚举）
console.log(Object.getOwnPropertySymbols(data)); // [Symbol(name), Symbol(age)]
```

### 76. BigInt 计算器

javascript

```javascript
class BigIntCalculator {
  // 统一转换为 BigInt
  static toBigInt(value) {
    if (typeof value === 'bigint') return value;
    if (typeof value === 'number') return BigInt(value);
    if (typeof value === 'string') return BigInt(value);
    throw new TypeError('Cannot convert to BigInt');
  }
  
  static add(a, b) {
    return this.toBigInt(a) + this.toBigInt(b);
  }
  
  static subtract(a, b) {
    return this.toBigInt(a) - this.toBigInt(b);
  }
  
  static multiply(a, b) {
    return this.toBigInt(a) * this.toBigInt(b);
  }
  
  static divide(a, b) {
    const dividend = this.toBigInt(a);
    const divisor = this.toBigInt(b);
    
    if (divisor === 0n) {
      throw new Error('Division by zero');
    }
    
    return dividend / divisor; // BigInt 除法是整数除法
  }
  
  // 带余数的除法
  static divideWithRemainder(a, b) {
    const dividend = this.toBigInt(a);
    const divisor = this.toBigInt(b);
    
    return {
      quotient: dividend / divisor,
      remainder: dividend % divisor
    };
  }
  
  // 比较
  static compare(a, b) {
    const bigA = this.toBigInt(a);
    const bigB = this.toBigInt(b);
    
    if (bigA > bigB) return 1;
    if (bigA < bigB) return -1;
    return 0;
  }
}

// 测试
const huge1 = '9007199254740992'; // Number.MAX_SAFE_INTEGER + 1
const huge2 = '9007199254740993';

console.log(BigIntCalculator.add(huge1, huge2).toString());
// "18014398509481985"

console.log(BigIntCalculator.multiply(huge1, huge2).toString());
// "81129638414606663407354894336"

// 验证精度问题
console.log(9007199254740992 + 9007199254740993); // 18014398509481984 (错误！)
console.log(BigIntCalculator.add(huge1, huge2).toString()); // 正确结果

// 注意：BigInt 不能与 Number 混合运算
// BigInt(10) + 5 // TypeError
// 必须都转为 BigInt: BigInt(10) + BigInt(5)
```

### 77. 类型转换性能对比

javascript

```javascript
function performanceTest() {
  const iterations = 1000000;
  const value = 12345;
  
  // 方法1：String()
  console.time('String()');
  for (let i = 0; i < iterations; i++) {
    String(value);
  }
  console.timeEnd('String()');
  
  // 方法2：toString()
  console.time('toString()');
  for (let i = 0; i < iterations; i++) {
    value.toString();
  }
  console.timeEnd('toString()');
  
  // 方法3：'' +
  console.time('\'\' +');
  for (let i = 0; i < iterations; i++) {
    '' + value;
  }
  console.timeEnd('\'\' +');
  
  // 方法4：模板字符串
  console.time('Template literal');
  for (let i = 0; i < iterations; i++) {
    `${value}`;
  }
  console.timeEnd('Template literal');
  
  console.log('\n--- 转数字性能测试 ---');
  const str = '12345';
  
  // Number()
  console.time('Number()');
  for (let i = 0; i < iterations; i++) {
    Number(str);
  }
  console.timeEnd('Number()');
  
  // parseInt()
  console.time('parseInt()');
  for (let i = 0; i < iterations; i++) {
    parseInt(str);
  }
  console.timeEnd('parseInt()');
  
  // +
  console.time('+ operator');
  for (let i = 0; i < iterations; i++) {
    +str;
  }
  console.timeEnd('+ operator');
  
  // parseFloat()
  console.time('parseFloat()');
  for (let i = 0; i < iterations; i++) {
    parseFloat(str);
  }
  console.timeEnd('parseFloat()');
}

performanceTest();

/* 典型结果（性能从快到慢）：
转字符串：
1. '' + value        (最快)
2. value.toString()
3. String(value)
4. `${value}`        (最慢)

转数字：
1. +str             (最快)
2. Number(str)
3. parseInt(str)
4. parseFloat(str)  (最慢)
*/
```

**性能建议：**

- 转字符串：使用 `'' + value`（性能最好）或 `String(value)`（语义最清晰）
- 转数字：使用 `+str`（性能最好）或 `Number(str)`（语义最清晰）
- parseInt 用于解析整数，parseFloat 用于解析浮点数
- 模板字符串性能较差，但可读性好

### 78. 类型安全的 JSON

javascript

```javascript
class SafeJSON {
  static stringify(value, space) {
    const seen = new WeakSet();
    
    return JSON.stringify(value, (key, val) => {
      // 处理循环引用
      if (typeof val === 'object' && val !== null) {
        if (seen.has(val)) {
          return '[Circular]';
        }
        seen.add(val);
      }
      
      // 处理特殊类型
      if (val === undefined) {
        return { __type: 'undefined' };
      }
      
      if (typeof val === 'symbol') {
        return { __type: 'symbol', value: val.toString() };
      }
      
      if (typeof val === 'bigint') {
        return { __type: 'bigint', value: val.toString() };
      }
      
      if (typeof val === 'function') {
        return { __type: 'function', value: val.toString() };
      }
      
      if (val instanceof Date) {
        return { __type: 'date', value: val.toISOString() };
      }
      
      if (val instanceof RegExp) {
        return { __type: 'regexp', source: val.source, flags: val.flags };
      }
      
      if (val instanceof Map) {
        return { __type: 'map', value: Array.from(val.entries()) };
      }
      
      if (val instanceof Set) {
        return { __type: 'set', value: Array.from(val) };
      }
      
      if (Number.isNaN(val)) {
        return { __type: 'nan' };
      }
      
      if (val === Infinity) {
        return { __type: 'infinity' };
      }
      
      if (val === -Infinity) {
        return { __type: '-infinity' };
      }
      
      return val;
    }, space);
  }
  
  static parse(str) {
    return JSON.parse(str, (key, val) => {
      if (val && typeof val === 'object' && val.__type) {
        switch (val.__type) {
          case 'undefined':
            return undefined;
            
          case 'symbol':
            return Symbol.for(val.value);
            
          case 'bigint':
            return BigInt(val.value);
            
          case 'function':
            // 注意：不推荐反序列化函数，这里仅作演示
            return new Function('return ' + val.value)();
            
          case 'date':
            return new Date(val.value);
            
          case 'regexp':
            return new RegExp(val.source, val.flags);
            
          case 'map':
            return new Map(val.value);
            
          case 'set':
            return new Set(val.value);
            
          case 'nan':
            return NaN;
            
          case 'infinity':
            return Infinity;
            
          case '-infinity':
            return -Infinity;
        }
      }
      return val;
    });
  }
}

// 测试
const data = {
  undef: undefined,
  sym: Symbol.for('test'),
  big: 100n,
  fn: () => console.log('hello'),
  date: new Date(),
  reg: /test/gi,
  map: new Map([['a', 1], ['b', 2]]),
  set: new Set([1, 2, 3]),
  nan: NaN,
  inf: Infinity,
  nested: {
    arr: [1, 2, 3]
  }
};

const str = SafeJSON.stringify(data, 2);
console.log(str);

const parsed = SafeJSON.parse(str);
console.log(parsed);
console.log(parsed.big === 100n);        // true
console.log(parsed.date instanceof Date); // true
console.log(parsed.map instanceof Map);   // true
```

### 79. 类型推断系统

javascript

```javascript
function inferType(value) {
  const result = {
    type: typeof value,
    subType: null,
    isNullable: value === null || value === undefined,
    isPrimitive: false,
    isCallable: false,
    isIterable: false,
    isAsync: false,
    constructor: null
  };
  
  // 处理 null
  if (value === null) {
    result.type = 'null';
    result.isPrimitive = true;
    return result;
  }
  
  // 基本类型
  if (typeof value !== 'object' && typeof value !== 'function') {
    result.isPrimitive = true;
    return result;
  }
  
  // 函数
  if (typeof value === 'function') {
    result.isCallable = true;
    result.constructor = value.constructor.name;
    
    // 检查是否是异步函数
    if (value.constructor.name === 'AsyncFunction') {
      result.isAsync = true;
      result.subType = 'async-function';
    } else if (value.constructor.name === 'GeneratorFunction') {
      result.subType = 'generator-function';
    } else if (value.constructor.name === 'AsyncGeneratorFunction') {
      result.subType = 'async-generator-function';
      result.isAsync = true;
    } else {
      result.subType = 'function';
    }
    
    return result;
  }
  
  // 对象类型
  result.constructor = value.constructor.name;
  
  // 检查是否可迭代
  if (typeof value[Symbol.iterator] === 'function') {
    result.isIterable = true;
  }
  
  // 检查是否是异步迭代器
  if (typeof value[Symbol.asyncIterator] === 'function') {
    result.isAsync = true;
  }
  
  // 具体子类型
  if (Array.isArray(value)) {
    result.subType = 'array';
  } else if (value instanceof Date) {
    result.subType = 'date';
  } else if (value instanceof RegExp) {
    result.subType = 'regexp';
  } else if (value instanceof Map) {
    result.subType = 'map';
  } else if (value instanceof Set) {
    result.subType = 'set';
  } else if (value instanceof WeakMap) {
    result.subType = 'weakmap';
  } else if (value instanceof WeakSet) {
    result.subType = 'weakset';
  } else if (value instanceof Promise) {
    result.subType = 'promise';
    result.isAsync = true;
  } else if (value instanceof Error) {
    result.subType = 'error';
  } else if (ArrayBuffer.isView(value)) {
    result.subType = 'typed-array';
  } else if (value instanceof ArrayBuffer) {
    result.subType = 'array-buffer';
  } else {
    result.subType = 'object';
  }
  
  return result;
}

// 测试
console.log(inferType([]));
// { type: 'object', subType: 'array', isPrimitive: false, isCallable: false, isIterable: true, ... }

console.log(inferType(new Date()));
// { type: 'object', subType: 'date', isPrimitive: false, isCallable: false, isIterable: false, ... }

console.log(inferType(function*(){}));
// { type: 'function', subType: 'generator-function', isPrimitive: false, isCallable: true, isIterable: false, ... }

console.log(inferType(async function(){}));
// { type: 'function', subType: 'async-function', isPrimitive: false, isCallable: true, isAsync: true, ... }

console.log(inferType(new Map()));
// { type: 'object', subType: 'map', isPrimitive: false, isCallable: false, isIterable: true, ... }
```

### 80. 面试综合题

javascript

~~~javascript
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
```

**输出结果：**
```
valueOf
toString
错误: Cannot convert object to primitive value
~~~

**详细解析：**

1. 为什么会输出 "valueOf" 和 "toString"？
   - `obj + 1` 触发类型转换
   - JavaScript 尝试将 obj 转换为基本类型
   - 对于 `+` 运算符，hint 是 "default"，优先调用 valueOf()
   - valueOf() 返回 {}（对象），不是基本类型
   - 继续尝试 toString()
   - toString() 也返回 {}（对象），不是基本类型
2. 为什么会抛出错误？
   - valueOf() 和 toString() 都没有返回基本类型
   - JavaScript 无法完成类型转换
   - 抛出 TypeError
3. **如何修改让其正常工作？**

javascript

```javascript
// 方案1：让 valueOf 返回数字
const obj = {
  valueOf() {
    console.log('valueOf');
    return 42;  // ✅ 返回基本类型
  },
  toString() {
    console.log('toString');
    return {};
  }
};
console.log(obj + 1); // 输出: valueOf, 43

// 方案2：让 toString 返回字符串
const obj = {
  valueOf() {
    console.log('valueOf');
    return {};
  },
  toString() {
    console.log('toString');
    return 'hello'; // ✅ 返回基本类型
  }
};
console.log(obj + 1); // 输出: valueOf, toString, "hello1"

// 方案3：使用 Symbol.toPrimitive
const obj = {
  [Symbol.toPrimitive](hint) {
    console.log('toPrimitive', hint);
    return 42;
  },
  valueOf() {
    console.log('valueOf');
    return {};
  },
  toString() {
    console.log('toString');
    return {};
  }
};
console.log(obj + 1); // 输出: toPrimitive default, 43
// Symbol.toPrimitive 优先级最高
```

1. **valueOf 和 toString 的调用顺序？**

javascript

```javascript
// 对于 hint="number" 的情况（如 +obj, obj - 1）
// 顺序：valueOf() → toString()

const obj1 = {
  valueOf() {
    console.log('valueOf');
    return 10;
  },
  toString() {
    console.log('toString');
    return '20';
  }
};
console.log(+obj1);  // 输出: valueOf, 10

// 对于 hint="string" 的情况（如 String(obj), alert(obj)）
// 顺序：toString() → valueOf()

const obj2 = {
  valueOf() {
    console.log('valueOf');
    return 10;
  },
  toString() {
    console.log('toString');
    return '20';
  }
};
console.log(String(obj2));  // 输出: toString, "20"
```

1. **在不同转换场景下的调用顺序：**

javascript

```javascript
const obj = {
  valueOf() {
    console.log('valueOf called');
    return 42;
  },
  toString() {
    console.log('toString called');
    return 'hello';
  }
};

// + 运算符（hint="default"，优先 valueOf）
console.log(obj + 1);
// 输出: valueOf called, 43

// String() 函数（hint="string"，优先 toString）
console.log(String(obj));
// 输出: toString called, "hello"

// Number() 函数（hint="number"，优先 valueOf）
console.log(Number(obj));
// 输出: valueOf called, 42

// == 比较（hint="default"，优先 valueOf）
console.log(obj == 42);
// 输出: valueOf called, true

// 模板字符串（hint="string"，优先 toString）
console.log(`Value: ${obj}`);
// 输出: toString called, "Value: hello"
```

------

## 📊 知识点总结

### 关键概念

1. 7 种基本类型
   - undefined, null, boolean, number, string, symbol, bigint
   - 存储在栈内存，按值传递
2. 引用类型
   - Object（包括 Array, Function, Date, RegExp 等）
   - 存储在堆内存，按引用传递
3. 类型判断优先级
   - 最准确：`Object.prototype.toString.call()`
   - 数组判断：`Array.isArray()`
   - 原型链：`instanceof`
   - 基本类型：`typeof`（注意 typeof null === "object"）
4. 类型转换三大场景
   - `==` 比较：复杂的转换规则
   - `+` 运算符：字符串拼接 vs 数字相加
   - `if` 条件：8 个 falsy 值

### 面试高频考点

✅ typeof null 为什么是 "object"
 ✅ [] == ![] 为什么是 true
 ✅ 手写 instanceof
 ✅ ToPrimitive 转换过程
 ✅ valueOf vs toString 调用顺序
 ✅ Symbol 的用途和特性
 ✅ BigInt 的使用场景

这套题目涵盖了从基础到高级