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
