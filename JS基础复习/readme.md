## JS基础复习大纲

### 一、数据类型
- 基本类型与引用类型
- 类型判断（typeof、instanceof、Object.prototype.toString）
- 类型转换规则（隐式转换、==、+、if等场景）
- 装箱与拆箱

### 二、作用域与闭包
- 执行上下文（变量对象、作用域链、this）
- 作用域链查找机制
- 变量提升与暂时性死区
- 闭包原理与应用场景
- 闭包内存问题

### 三、原型与继承
- prototype、`__proto__`、constructor关系
- 原型链查找机制
- 继承方式对比（原型链、构造函数、组合、寄生组合）
- ES6 Class 与传统继承
- new 操作符原理

### 四、this绑定
- 四种绑定规则（默认、隐式、显式、new）
- 箭头函数的this
- call/apply/bind原理与实现
- 优先级判断

### 五、异步编程
- Event Loop（宏任务、微任务）
- Promise原理与实现
- async/await本质
- Generator与迭代器
- 并发控制

### 六、常用API实现
- 数组方法（map、filter、reduce、flat等）
- 对象方法（Object.create、Object.assign等）
- 函数方法（防抖、节流、柯里化、compose）
- 深浅拷贝（循环引用、特殊类型处理）

### 七、面向对象
- 设计模式（单例、工厂、观察者等）
- 封装、继承、多态
- 组合优于继承

### 八、模块化
- CommonJS vs ES Module
- 模块加载机制
- 循环依赖处理
- Tree Shaking原理

### 九、性能优化
- 垃圾回收机制
- 内存泄漏场景
- 事件委托
- 函数优化（尾调用、记忆化）

### 十、ES6+新特性
- 解构、展开运算符
- Set、Map、WeakMap、WeakSet
- Proxy与Reflect
- Symbol应用
- 可选链、空值合并