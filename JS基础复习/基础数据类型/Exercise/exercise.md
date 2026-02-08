# JavaScript 类型系统练习题集

## 📝 第一部分：基础概念题（20题）

### 类型分类与判断

**1-5. 判断题**

```javascript
// 判断以下说法是否正确
1. null 是对象类型 (错  )
2. typeof NaN 返回 "number" (  对)
3. typeof function(){} 返回 "function" (对  )
4. Symbol('a') === Symbol('a') (错  )
5. BigInt(10) === 10n ( 对 )
```

**6-10. 选择题**

```javascript
// 6. typeof null 返回什么？  b
A. "null"
B. "object" 
C. "undefined"
D. "number"

// 7. 以下哪个不是基本类型？ c
A. Symbol
B. BigInt
C. Array
D. String

// 8. typeof [] 返回什么？ b
A. "array"
B. "object"
C. "Array"
D. "undefined"

// 9. 以下哪个判断数组的方法最准确？ c
A. typeof arr === 'array'
B. arr instanceof Array
C. Array.isArray(arr)
D. arr.constructor === Array

// 10. Object.prototype.toString.call(new Date()) 返回什么？ A
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

console.log(typeof undefined);           // 11. ? undefined
console.log(typeof null);                 // 12. ? object
console.log(typeof true);                 // 13. ? boolean
console.log(typeof 123);                  // 14. ? number
console.log(typeof '123');                // 15. ? string
console.log(typeof Symbol('id'));         // 16. ? symbol
console.log(typeof 10n);                  // 17. ? binInt
console.log(typeof {});                   // 18. ? object
console.log(typeof []);                   // 19. ? object
console.log(typeof function(){});         // 20. ? function
console.log(typeof NaN);                  // 21. ? number
console.log(typeof Infinity);             // 22. ? number
```

### instanceof 专项练习

```javascript
// 23-30. 写出以下代码的输出结果

console.log([] instanceof Array);               // 23. ? true
console.log([] instanceof Object);              // 24. ? true
console.log({} instanceof Object);              // 25. ? true
console.log(function(){} instanceof Function);  // 26. ? true
console.log(function(){} instanceof Object);    // 27. ? true

class Person {}
const p = new Person();
console.log(p instanceof Person);               // 28. ? true
console.log(p instanceof Object);               // 29. ? true

const obj = Object.create(null);
console.log(obj instanceof Object);             // 30. ? false
```

### 类型转换专项练习

```javascript
// 31-50. 写出以下代码的输出结果

// == 比较
console.log(null == undefined);          // 31. ? true
console.log(null === undefined);         // 32. ? false
console.log(0 == false);                 // 33. ? true
console.log('' == false);                // 34. ? true
console.log('0' == false);               // 35. ? true
console.log([] == false);                // 36. ? true
console.log({} == false);                // 37. ? false
console.log([] == ![]);                  // 38. ? true

// + 运算符
console.log(1 + '2');                    // 39. ? 12
console.log('1' + 2);                    // 40. ? 12
console.log(1 + 2 + '3');                // 41. ? 33
console.log('1' + 2 + 3);                // 42. ? 123
console.log([] + []);                    // 43. ? ”“
console.log([] + {});                    // 44. ? “[object object]"
console.log({} + []);                    // 45. ? “[object object]"
console.log({} + {});                    // 46. ? “[object object] [object object]

// 其他运算符
console.log('5' - 2);                    // 47. ? 3
console.log('5' * '2');                  // 48. ? 10
console.log(true + 1);                   // 49. ? 2
console.log(false + 1);                  // 50. ? 1
```

### if 条件判断专项

```javascript
// 51-60. 判断以下值在 if 中是 true 还是 false

if (0) {}                    // 51. ? false
if ('') {}                   // 52. ? false
if (' ') {}                  // 53. ? true
if ([]) {}                   // 54. ? true
if ({}) {}                   // 55. ? true
if (null) {}                 // 56. ? fasle
if (undefined) {}            // 57. ? fasle
if (NaN) {}                  // 58. ? false
if (false) {}                // 59. ? false 
if ('0') {}                  // 60. ? true
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
```

### 62. 手写 instanceof

```javascript
/**
 * 实现 instanceof 运算符
 * 原理：检查右边构造函数的 prototype 是否在左边对象的原型链上
 */
function myInstanceof(left, right) {
     // 你的代码
    if (typeof left !== "object" || left === null) return false;
    let LeftPro = Object.getPrototypeOf(left);
    const rightPro = right.prototype
    while(LeftPro){
        if(LeftPro === rightPro) return true
        LeftPro = Object.getPrototypeOf(LeftPro)
    }
    return false
}

// 测试用例
console.log(myInstanceof([], Array));        // true
console.log(myInstanceof([], Object));       // true
console.log(myInstanceof({}, Array));        // false
console.log(myInstanceof(function () { }, Function)); // true

```

### 63. 实现类型转换函数 - ToPrimitive

```javascript
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
```

### 64. 实现深度类型判断

```javascript
/**
 * 判断两个值是否类型相同（包括深层对象）
 */
function isSameType(a, b) {
    return Object.prototype.toString.call(a) === Object.prototype.toString.call(b);
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
```

### 66. 实现安全的类型转换

```javascript
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
```

### 67. 手写 isPlainObject

```javascript
/**
 * 判断是否为纯对象（通过 {} 或 new Object 创建）
 * “纯对象”并不是指“不包含业务代码”，
 * ·而是指“原型是否来自 Object.prototype（或 null）”。
 */

function isPlainObject(obj) {
    // 你的代码
    if( typeof obj !== 'object'  || obj == null)  return false;
    const proto = Object.getPrototypeOf(obj)
    return proto === Object.prototype || proto === null;

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
```

### 69. 实现类型转换器类

```javascript
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
```

### 70. 实现复杂类型判断

```javascript
/**
 * 实现判断是否为空值的函数
 * 空值定义：null, undefined, '', [], {}, NaN, 0, false
 */
function isEmpty(value) {
    // null / undefined
    if (value == null) return true;

    // string
    if (typeof value === 'string') {
        return value === '';
    }

    // number
    if (typeof value === 'number') {
        return value === 0 || Number.isNaN(value);
    }

    // boolean
    if (typeof value === 'boolean') {
        return value === false;
    }

    // array
    if (Array.isArray(value)) {
        return value.length === 0;
    }

    // object
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
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

````javascript
这是一个**经典且非常“刁钻”的 JavaScript 类型转换陷阱题**，考察点集中在 **抽象相等比较（`==`）与对象到原始值转换规则**。下面按你的三个问题，**严格、系统地分析**。

---

## 一、为什么会输出「成功」

代码如下：

```js
const a = {
  i: 1,
  toString() {
    return this.i++;
  }
};

if (a == 1 && a == 2 && a == 3) {
  console.log('成功');
}
```

### 关键结论一句话版

> **`==` 在比较对象与基本类型时，会触发对象的隐式类型转换，而这个对象在转换过程中“有副作用”。**

---

### 详细执行过程（逐步）

#### 第一次比较：`a == 1`

* `a` 是对象，`1` 是 number
* 触发 **对象 → 原始值** 转换
* 调用顺序：

    1. `a.valueOf()`（未定义，返回对象本身）
    2. `a.toString()` ✅

```js
a.toString() → 返回 1，同时 i 变为 2
```

于是：

```js
1 == 1 → true
```

---

#### 第二次比较：`a == 2`

```js
a.toString() → 返回 2，同时 i 变为 3
2 == 2 → true
```

---

#### 第三次比较：`a == 3`

```js
a.toString() → 返回 3，同时 i 变为 4
3 == 3 → true
```

---

### 最终结果

```js
true && true && true → true
```

因此输出：

```txt
成功
```

---

## 二、这里涉及了哪些类型转换规则

这是**面试重点**，可以明确拆成三条规则：

---

### 1️⃣ 抽象相等比较（`==`）规则

当比较：

```js
对象 == 基本类型
```

会执行：

> **ToPrimitive(obj, hint = Number)**

---

### 2️⃣ 对象到原始值的转换顺序

在没有 `Symbol.toPrimitive` 的情况下，顺序是：

```txt
valueOf() → toString()
```

你这里是：

```js
toString() 被调用
```

---

### 3️⃣ 转换过程允许「副作用」

规范 **并不禁止** 在转换过程中修改对象内部状态：

```js
return this.i++;
```

这正是“陷阱”的根源。

---

### 总结成一句标准表述（面试用）

> 该代码利用了 `==` 的隐式类型转换机制，在对象转原始值时通过 `toString` 引入副作用，使同一个对象在多次比较中返回不同的原始值。

---

## 三、如何修改代码让 `===` 也能成功？

### 结论先给出（非常重要）

> **无法通过修改对象本身，让 `a === 1 && a === 2 && a === 3` 成立。**

这是一个**原理级结论**。

---

### 为什么 `===` 不可能成功？

#### 1️⃣ `===` 不进行类型转换

```js
a === 1
```

等价于：

```txt
Object === Number → false
```

**第一步就直接失败**，不会调用任何 `toString / valueOf`。

---

#### 2️⃣ 即使使用 `Symbol.toPrimitive` 也无效

```js
const a = {
  [Symbol.toPrimitive]() {
    return 1;
  }
};

a === 1 // false
```

原因：

> **`===` 根本不会触发 ToPrimitive**

---

#### 3️⃣ `===` 的本质规则

| 情况            | 结果       |
| ------------- | -------- |
| 不同类型          | 永远 false |
| 对象 === 对象     | 比较引用     |
| 基本类型 === 基本类型 | 比较值      |

---

### 那有没有“变通方案”？

只能通过**改变比较对象本身**，而不是“修复 `===`”。

#### ✅ 合法示例（语义不同）

```js
let i = 1;
if (i === 1 && ++i === 2 && ++i === 3) {
  console.log('成功');
}
```

但这已经**不是原题语义**。

---

### ❌ 不存在的方案（重要澄清）

* ❌ 重写 `===`（不可能）
* ❌ 利用原型链劫持 `===`
* ❌ 通过对象魔法骗过 `===`

**全部不可能**。

---

## 四、最终总结（建议直接记）

> 1️⃣ 该题成立的根本原因是：`==` 触发对象到原始值的隐式转换
> 2️⃣ `toString` 中的副作用导致每次比较返回不同值
> 3️⃣ `===` 不做类型转换，因此从规范层面不可能实现同样效果

---


````

### 72. 实现类型安全的深拷贝

```javascript
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
```

### 73. 类型转换优先级问题

```javascript
// 预测以下表达式的结果，并解释原因

const result1 = [1, 2] + [3, 4];          // "1,23,4"
const result2 = {} + {};                  // "[object Object][object Object]"
const result3 = {} + [];                  // "[object Object]"
const result4 = [] + {};                  // "[object Object]"
const result5 = [1, 2] + 3;               // "1,23"
const result6 = 1 + [2, 3];               // "12,3"
const result7 = true + false + true;      // 2
const result8 = 'value' + null + undefined; // "valuenullundefined"

// 请写出每个结果，并说明转换过程
+ 运算符：
先拆对象，再看字符串，
有字符串就拼，没有就算
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
// 创建 Symbol，用于私有属性
const _name = Symbol('name');
const _age = Symbol('age');

class PrivateData {
    constructor(name, age) {
        this[_name] = name;
        this[_age] = age;
    }

    // getter/setter
    get name() {
        return this[_name];
    }
    set name(name) {
        this[_name] = name;
    }

    get age() {
        return this[_age];
    }
    set age(age) {
        this[_age] = age;
    }
}

// 测试
const data = new PrivateData('Alice', 25);

console.log(data.name);   // "Alice"
console.log(data.age);    // 25

console.log(data._name);  // undefined
console.log(data._age);   // undefined

console.log(Object.keys(data)); // []，Symbol 属性不会被遍历
console.log(Object.getOwnPropertySymbols(data)); // [ Symbol(name), Symbol(age) ]
```

### 76. BigInt 实际应用

```javascript
/**
 * 实现一个处理超大整数的计算器
 * 支持：加 / 减 / 乘 / 除（整数除法）
 * 所有参数、返回值均为字符串
 */
class BigIntCalculator {
    static add(a, b) {
        return (BigInt(a) + BigInt(b)).toString();
    }

    static subtract(a, b) {
        return (BigInt(a) - BigInt(b)).toString();
    }

    static multiply(a, b) {
        return (BigInt(a) * BigInt(b)).toString();
    }

    static divide(a, b) {
        if (BigInt(b) === 0n) {
            throw new Error('Division by zero');
        }
        return (BigInt(a) / BigInt(b)).toString(); // 整数除法
    }
}

const huge1 = '9007199254740992'; // Number.MAX_SAFE_INTEGER + 1
const huge2 = '9007199254740993';

console.log(BigIntCalculator.add(huge1, huge2));
// 18014398509481985

console.log(BigIntCalculator.subtract(huge2, huge1));
// 1

console.log(BigIntCalculator.multiply('123456789', '987654321'));
// 121932631112635269

console.log(BigIntCalculator.divide('10', '3'));
// 3

```

### 77. 类型转换性能对比

```javascript
/**
 * 比较不同类型转换方法的性能
 * 测试：String()、toString()、'' + value
 */
function performanceTest() {
    const iterations = 1_000_000;
    const value = 12345;

    const result = {};

    // 1️⃣ String(value)
    let start = performance.now();
    for (let i = 0; i < iterations; i++) {
        String(value);
    }
    let end = performance.now();
    result.String = (end - start).toFixed(2) + ' ms';

    // 2️⃣ value.toString()
    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        value.toString();
    }
    end = performance.now();
    result.toString = (end - start).toFixed(2) + ' ms';

    // 3️⃣ '' + value
    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        '' + value;
    }
    end = performance.now();
    result.concat = (end - start).toFixed(2) + ' ms';

    return result;
}

console.log(performanceTest());

```

### 78. 实现类型安全的 JSON

```javascript
/**
 * 实现支持所有 JavaScript 类型的序列化和反序列化
 * 包括 undefined, Symbol, BigInt, Function, Date, RegExp 等
 */
class SafeJSON {
  static stringify(value) {
    return JSON.stringify(value, (key, val) => {
      // undefined
      if (val === undefined) {
        return { __type: 'undefined' };
      }

      // BigInt
      if (typeof val === 'bigint') {
        return { __type: 'bigint', value: val.toString() };
      }

      // Symbol
      if (typeof val === 'symbol') {
        return { __type: 'symbol', value: val.description };
      }

      // Function
      if (typeof val === 'function') {
        return { __type: 'function', value: val.toString() };
      }

      // Date
      if (val instanceof Date) {
        return { __type: 'date', value: val.toISOString() };
      }

      // RegExp
      if (val instanceof RegExp) {
        return {
          __type: 'regexp',
          source: val.source,
          flags: val.flags
        };
      }

      return val;
    });
  }

  static parse(str) {
    return JSON.parse(str, (key, val) => {
      if (!val || typeof val !== 'object') return val;

      switch (val.__type) {
        case 'undefined':
          return undefined;
        case 'bigint':
          return BigInt(val.value);
        case 'symbol':
          return Symbol(val.value);
        case 'function':
          return eval(`(${val.value})`);
        case 'date':
          return new Date(val.value);
        case 'regexp':
          return new RegExp(val.source, val.flags);
        default:
          return val;
      }
    });
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
    result.isIterable =
        value != null &&
        typeof value[Symbol.iterator] === 'function';

    return result;
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