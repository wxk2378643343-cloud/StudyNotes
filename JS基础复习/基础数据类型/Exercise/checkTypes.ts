// 装饰器函数：用于在运行时检查方法参数类型
function checkTypes(...types: string[]) {
    // target: 类的原型
    // key: 方法名
    // descriptor: 方法的属性描述符，包含原始方法 value
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        // 保存原始方法
        const original = descriptor.value;

        // 重写方法，在调用前进行类型检查
        descriptor.value = function (...args: any[]) {
            for (let i = 0; i < types.length; i++) {
                // typeof args[i] 获取参数实际类型
                if (typeof args[i] !== types[i]) {
                    // 类型不匹配，抛出运行时错误
                    throw new TypeError(
                        `Argument ${i + 1} of ${key} expected ${types[i]}, got ${typeof args[i]}`
                    );
                }
            }
            // 类型正确，执行原方法
            return original.apply(this, args);
        };

        // 返回修改后的描述符
        return descriptor;
    };
}

class Calculator {
    // add 方法期望两个 number 类型参数
    @checkTypes('number', 'number')
    add(a: number, b: number) {
        return a + b;
    }

    // print 方法期望一个 string 类型参数
    @checkTypes('string')
    print(msg: string) {
        console.log(msg);
    }
}

const calc = new Calculator();

// 正确调用
console.log(calc.add(1, 2));    // 输出 3

// 错误调用，会抛出 TypeError
// calc.add('1', 2);

calc.print('Hello');             // 输出 Hello
// calc.print(123);             // 抛出 TypeError
