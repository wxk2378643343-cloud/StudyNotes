# 一、数据类型

## 基本数据类型

### number

* **概念**：Number 是 JavaScript 中用于表示 **数值的原始数据类型**（包括整数和浮点数）。
* **表示范围**：
  * 整数和浮点数都使用 **IEEE 754 双精度浮点数**
  * 最大安全整数：`Number.MAX_SAFE_INTEGER` → 2^53 - 1
  * 最小安全整数：`Number.MIN_SAFE_INTEGER` → -(2^53 - 1)
  * 特殊值：`Infinity`, `-Infinity`, `NaN`
* **创建方式**：
  * 字面量：`let a = 42`
  * 构造函数（不推荐）：`let b = Number(42)`
* **特点**：
  * 可以表示小数和整数
  * 超过安全整数范围会丢失精度
  * 特殊值 NaN 和 Infinity 属于 Number 类型
* **类型判断**：
  ```js
  typeof 42       // "number"
  typeof 3.14     // "number"
  typeof NaN      // "number"
  typeof Infinity // "number"

**注意事项**：

- 浮点数计算可能存在精度问题：`0.1 + 0.2 !== 0.3`
- N**aN 不等于自身：`NaN === NaN // false`，需使用 `Number.isNaN` 判断**
- **Number 与 BigInt 不可直接混合运算**

### boolean

* **概念**：Boolean 是 JavaScript 中表示 **逻辑真值的原始数据类型**，只有两个可能值：`true` 和 `false`。
* **创建方式**：
  * 字面量：`let flag = true`
  * 构造函数（不推荐）：`let flag = new Boolean(true)` → 生成对象，不是原始值
* **特点**：
  * 用于条件判断和逻辑运算
  * Boolean 对象与原始布尔值不同：
    ```js
    let a = true;
    let b = new Boolean(true);
    console.log(a == b);  // true
    console.log(a === b); // false
    ```
  * 可以通过逻辑上下文自动转换：
    ```js
    !!0        // false
    !!'hello'  // true
    !!null     // false
    ```
* **类型判断**：
  ```js
  typeof true       // "boolean"
  typeof false      // "boolean"
  typeof new Boolean(true) // "object"

**注意事项**：

- 尽量使用原始布尔值，不要使用 Boolean 对象
- 逻辑运算会进行隐式类型转换，需注意短路和真值判断

### string

* **概念**：String 是 JavaScript 中表示 **文本数据的原始数据类型**。
* **创建方式**：
  * 字面量：`let str = 'hello'` 或 `let str = "hello"`
  * 构造函数（不推荐）：`let strObj = new String('hello')` → 生成对象，不是原始值
* **特点**：
  * 可以通过索引访问字符：`str[0]`
  * 不可变（immutable），操作会生成新字符串
  * 自动封装为 String 对象以调用方法：
    ```js
    'abc'.toUpperCase() // "ABC"
    ```
* **常用方法**：
  * `str.length` 获取长度
  * `str.includes(sub)` 判断包含
  * `str.slice(start, end)` 截取
  * `str.split(separator)` 分割
* **类型判断**：
  ```js
  typeof 'hello'         // "string"
  typeof new String('a') // "object"
  注意事项：

**注意事项**：

- 尽量使用原始字符串而非 String 对象
- 字符串是不可变的，任何操作都会返回新字符串

### null

* **来源**：JavaScript 早期设计时引入，用于表示“刻意的空对象引用”。
* **使用场景**：
  * 开发者主动赋值为空：`let a = null`
  * 占位空值：`let user = null`
  * API 或 DOM 返回无对象时：`document.getElementById('not-exist') // null`
* **特殊点**：`typeof null` 返回 `"object"`，是早期设计遗留问题。

### undefined

* **来源**：JavaScript 内置原始值，表示“未初始化或不存在的值”。
* **使用场景**：
  * 变量声明但未赋值：`let a; // undefined`
  * 函数未返回值时默认返回：`function f(){}; f() // undefined`
  * 对象不存在的属性访问：`obj.missing // undefined`
* **特殊点**：可以被重新赋值（非严格模式下），且 `typeof undefined` 返回 `"undefined"`。

| 特性                   | 非严格模式                     | 严格模式                           |
| ---------------------- | ------------------------------ | ---------------------------------- |
| `undefined` 是否可赋值 | ✅ 可以被重新赋值（不推荐）     | ❌ 不可赋值，尝试赋值会报 TypeError |
| 未初始化变量           | undefined                      | undefined                          |
| 函数无返回值           | undefined                      | undefined                          |
| 访问不存在的对象属性   | undefined                      | undefined                          |
| 类型检测               | typeof undefined → "undefined" | typeof undefined → "undefined"     |

### symbol

* **概念**：Symbol 是 ES6 引入的一种 **原始数据类型**，表示独一无二的值。
* **创建方式**：
  * 使用 `Symbol()` 创建唯一值：`let s1 = Symbol('desc')`
  * 全局注册 Symbol：`let s2 = Symbol.for('key')`
* **特点**：
  * 每个 Symbol 都是唯一的，即使描述相同也不相等
    ```js
    Symbol('id') === Symbol('id') // false
    ```
  * 可以作为对象的属性键，避免命名冲突
    ```js
    const obj = {}
    const key = Symbol('key')
    obj[key] = 123
    ```
  * 不会被 `for...in` 或 `Object.keys` 遍历，但可以用 `Object.getOwnPropertySymbols` 获取
* **用途**：
  * 定义对象私有属性
  * 构建库或框架内部唯一标识
  * 定义自定义迭代行为（例如 `Symbol.iterator`）
* **类型判断**：
  ```js
  typeof Symbol() // "symbol"

**注意事项**：

- **Symbol 不能与其他类型隐式转换进行算术运算，否则会报错**
- JSON 无法直接序列化 Symbol

### bigInt

* **概念**：BigInt 是 ES2020 引入的一种 **原始数据类型**，用于表示任意精度的整数。
* **创建方式**：
  * 字面量方式：`let n = 12345678901234567890n`
  * 构造函数方式：`let n = BigInt("12345678901234567890")`
* **特点**：
  * 可以表示超出 Number.MAX_SAFE_INTEGER 的整数
  * 只能表示整数，不支持小数
  * **与 Number 不可混合运算，需要显式转换**
    
    ```js
    1n + 2n // 3n
    1n + 1   // TypeError
    ```
* **用途**：
  * 大整数计算（如金融系统、区块链、唯一 ID）
  * 高精度计数器和时间戳
* **类型判断**：
  ```js
  typeof 123n       // "bigint"
  typeof BigInt(10) // "bigint"

**注意事项**：

- **JSON 不支持直接序列化 BigInt**
- 与 Number 混合运算会报错
- 不支持小数和浮点运算

### 0 值比较

| 值        | typeof      | 是否为原始值 | 表示含义             | 真值（Boolean） | 使用场景 / 注意事项                                       |
| --------- | ----------- | ------------ | -------------------- | --------------- | --------------------------------------------------------- |
| null      | "object"    | ✅            | 有意的空对象引用     | false           | 占位空对象、API 空返回                                    |
| undefined | "undefined" | ✅            | 未初始化或不存在的值 | false           | 变量未赋值、函数无返回、属性不存在                        |
| NaN       | "number"    | ✅            | 非法数值结果         | false           | 数值运算错误时出现；`NaN !== NaN`，用 `Number.isNaN` 判断 |
| 0         | "number"    | ✅            | 数值零               | false           | 普通数字，可用于计数、比较等                              |
| ''        | "string"    | ✅            | 空字符串             | false           | 字符串占位或初始化，长度为 0                              |

## 引用数据类型

### Object

* **概念**：Object 是 JavaScript 中用于存储 **键值对集合** 的引用数据类型，可以包含属性和方法。
* **创建方式**：
  * 字面量：`let obj = { key: 'value' }`
  * 构造函数：`let obj = new Object()`
  * `Object.create(proto)` 创建继承自指定原型的对象
* **特点**：
  * **引用类型**：赋值和传参都是引用传递
  * 属性可以动态添加、修改、删除
  * 可以嵌套其他对象、数组、函数等
* **常用操作**：
  * 访问属性：`obj.key` 或 `obj['key']`
  * 添加/修改属性：`obj.newKey = 123`
  * 删除属性：`delete obj.key`
  * 遍历属性：
    ```js
    for (let k in obj) { console.log(k, obj[k]) } // 包括继承属性
    Object.keys(obj).forEach(k => console.log(k)) // 仅自身属性
    ```
* **类型判断**：
  ```js
  typeof {}          // "object"
  obj instanceof Object // true

**注意事项**：

- Object 是 **引用类型**，需要注意拷贝问题（浅拷贝 vs 深拷贝）
- 对象属性名可以是字符串或 Symbol
- 方法内部的 this 指向对象，需留意绑定问题

# 二、类型判断方法

## 1、typeof

* `typeof` 是一元运算符
* 主要用于判断 **基本数据类型**
* 对 **null** 和大部分 **引用类型** 返回 `"object"`
* 返回值始终是 **字符串**
* 对 **数字**（包括 `NaN` 和 `Infinity`）返回 `"number"`
* 对 **函数** 返回 `"function"`

  ```js
  typeof x
  
  console.log(typeof 1)            // "number"
  console.log(typeof 'hello')      // "string"
  console.log(typeof true)         // "boolean"
  console.log(typeof undefined)    // "undefined"
  console.log(typeof null)         // "object"
  
  console.log(typeof {})            // "object"
  console.log(typeof [])            // "object"
  console.log(typeof function(){})  // "function"
  console.log(typeof (() => {}))    // "function"
  
  console.log(typeof Symbol())      // "symbol"
  console.log(typeof 10n)           // "bigint"
  
  console.log(typeof notExist)      // "undefined"
  ```

## 2、instanceof

* `instanceof` 是二元运算符
* 用于判断 **左侧对象是否为右侧构造函数的实例**（即引用类型）
* 基本语法：
  ```js
  obj instanceof Constructor

只适用于 **引用类型**，对基本类型无效

原理：判断 **右侧构造函数的 prototype 是否存在于左侧对象的原型链上**

注意事项：

- 不检查基本类型：`2 instanceof Number` → false

- 可以被继承：子类实例也是父类的 `instanceof`

  ```js
  class A {}
  class B extends A {}
  const b = new B()
  b instanceof B // true
  b instanceof A // true
  ```

- 可以用来自定义类型判断（通过修改对象的原型链）

**手撕 Instanceof** 

```js
function myInstanceof(left, right) {
  // 基本类型直接返回 false
  if (typeof left !== "object" || left === null) return false;

  let proto = Object.getPrototypeOf(left); // 获取对象原型
  const prototype = right.prototype;      // 构造函数原型

  while (proto) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
```

`Object.getPrototypeOf(left)` → **沿原型链向上查找**

`right.prototype` → **目标原型对象**，必须匹配

`instanceof` 判断逻辑：

> 左侧对象的原型链上是否存在右侧构造函数的 `prototyp`

## 3、Object.prototype.toString

* **概念**：`Object.prototype.toString` 是所有对象继承的方法，用于返回对象的 **内部类型标识**。
* **语法**：
  ```js
  Object.prototype.toString.call(value)

**特点**：

- 返回格式固定：`"[object Type]"`
- 可以准确判断 **各种类型**，包括 `null`、数组、函数等

**示例**：

```js
Object.prototype.toString.call(null)      // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call([])        // "[object Array]"
Object.prototype.toString.call({})        // "[object Object]"
Object.prototype.toString.call(()=>{})    // "[object Function]"
Object.prototype.toString.call(Symbol())  // "[object Symbol]"
Object.prototype.toString.call(10n)       // "[object BigInt]"
```

**用途**：

- 精确判断任意值类型，弥补 `typeof` 对 `null`、数组等的不足
- 常用于库或框架中的类型检测

**注意事项**：

- 必须用 `call` 或 `apply` 指定对象，否则返回调用对象自身的类型

**原理**

- 每个对象内部都有一个 **`[[Class]]`** 属性（语言内部概念，不是属性或方法）
- `Object.prototype.toString` 方法就是读取对象的 `[[Class]]` 并返回字符串
- 所以它可以**精确识别对象类型**，比 `typeof` 和 `instanceof` 更可靠。

### 三者对比

| 特性     | typeof                                            | instanceof                                            | Object.prototype.toString                               |
| -------- | ------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| 返回值   | 字符串（如 "number", "string"）                   | 布尔值（true/false）                                  | 字符串（"[object Type]")                                |
| 适用类型 | 基本类型 + 函数                                   | 引用类型（对象、数组、函数等）                        | 任意类型（基本类型 + 引用类型）                         |
| 原理     | 根据值的内部类型标记（internal type）             | 判断右侧构造函数的 prototype 是否在左侧对象的原型链上 | 读取对象内部 [[Class]] 标签                             |
| 优点     | 简单快速，语法直观                                | 可判断继承关系                                        | 精确判断各种类型，包括 null、数组、函数、Symbol、BigInt |
| 缺点     | null/数组/对象返回相同 "object"，无法区分复杂对象 | 基本类型返回 false；继承链会影响结果；无法判断原始值  | 必须使用 call/apply 指定 this；返回值需截取处理         |

# 三、隐式类型转换规则

## 1、转布尔值（Boolean）

- 假值（Falsy）：`false, 0, -0, 0n, '', null, undefined, NaN`
- 其他值为真值（Truthy）

```
!!0      // false
!!'abc'  // true
!!null   // false
```

------

## 2、转数字（Number）

- 算术运算（`-`, `*`, `/`）触发
- 转换规则：

| 原类型    | 转换结果                          |
| --------- | --------------------------------- |
| boolean   | true→1, false→0                   |
| null      | 0                                 |
| undefined | NaN                               |
| string    | 尝试解析数字，失败→NaN            |
| BigInt    | 保留 BigInt（和 Number 混合报错） |
| Symbol    | TypeError                         |

```
'5' - 0       // 5
true + 2      // 3
null + 5      // 5
undefined + 1 // NaN
```

------

## 3、 转字符串（String）

- 拼接运算符 `+` 触发
- 转换规则：

| 原类型          | 转换结果                         |
| --------------- | -------------------------------- |
| boolean         | true→"true", false→"false"       |
| null            | "null"                           |
| undefined       | "undefined"                      |
| number / BigInt | 变字符串                         |
| Symbol          | TypeError                        |
| 对象/函数       | 调用 `toString()` 或 `valueOf()` |

```
'num: ' + 123   // "num: 123"
'' + null       // "null"
```

------

## 4、 相等运算（`==`）

- 不同类型时会触发隐式转换，常见规则：
  1. null == undefined → true
  2. 字符串 ↔ 数字 → 字符串转数字
  3. 布尔 ↔ 其他 → 布尔转数字
  4. 对象 ↔ 原始值 → 调用对象的 `valueOf()` 或 `toString()`

```
0 == false        // true
'123' == 123      // true
null == undefined // true
[] == 0           // true
```

## 5、JS取整

| 方法          | 规则         | 示例                                   |
| ------------- | ------------ | -------------------------------------- |
| Math.floor(x) | 向下取整     | Math.floor(3.7)=3, Math.floor(-3.7)=-4 |
| Math.ceil(x)  | 向上取整     | Math.ceil(3.2)=4, Math.ceil(-3.2)=-3   |
| Math.round(x) | 四舍五入     | Math.round(3.7)=4, Math.round(-3.7)=-4 |
| Math.trunc(x) | 去掉小数部分 | Math.trunc(3.7)=3, Math.trunc(-3.7)=-3 |
| x             | 0            | 位运算取整（向零）                     |
