/* 
Eloquent JavaScript Chapter 3
Practice Problems
*/

/* min */
function min(a, b) {
    return a < b ? a : b;
}


/* isEven */
function isEven(n) {
    if (n === 0)
        return true;
    if (n === 1)
        return false;
    return n > 0 ? isEven(n-2) : isEven(n+2);
}

/* countBs */
function countBs(str) {
    return countChar(str, "B");
}

/* countChar */
function countChar(str, c) {
    let count = 0;
    for (let i = 0; i < str.length; i++)
        if (str[i] === c)
            count += 1;
    return count;
}

// Copilot's version - pretty sure this is more time-costly,
// but negligibly so as they're both surely O(n) and 
// it's neat and elegant:
function countChar2(str, c) {
    return str.split('').filter(char => char === c).length;
}
