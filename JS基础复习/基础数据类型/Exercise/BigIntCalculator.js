/**
 * 实现一个处理超大整数的计算器
 * 支持加减乘除运算
 */
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
