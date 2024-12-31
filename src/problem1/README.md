# Sum to N Function Implementations

This repository contains three different implementations of the function `sum_to_n(n)` in JavaScript. Each function calculates the sum of all integers from `1` to `n`.

## Function Implementations

### 1. **Arithmetic Sum Formula (Constant Time)**

```javascript
var sum_to_n_a = function(n) {
    return (n * (n + 1)) / 2;
}
```
**Time Complexity:**
𝑂
(
1
)
O(1) — This approach uses the well-known formula for the sum of the first n integers.
**Description:** The function uses the formula
𝑛
(
𝑛
+
1
)
2
2
n(n+1)
​
to compute the sum of integers from 1 to n in constant time.



### 2. **Using a for Loop (Linear Time)**

```javascript
var sum_to_n_b = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
```
**Time Complexity:**
𝑂
(
𝑛
)
O(n) — The function iterates through all integers from 1 to n and accumulates the sum.
**Description:** This implementation uses a simple loop to sum the integers from 1 to n



### 3. **Recursive Implementation (Linear Time)**

```javascript
var sum_to_n_c = function(n) {
    if (n === 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
};
```
**Time Complexity:**
𝑂
(
𝑛
)
O(n) — The function recursively calculates the sum of integers.

**Description:** This implementation computes the sum recursively by reducing n in each call until reaching