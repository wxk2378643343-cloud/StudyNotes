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
console.log(str);
const parsed = SafeJSON.parse(str);

console.log(parsed);