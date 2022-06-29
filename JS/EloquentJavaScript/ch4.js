/* 
Eloquent JavaScript Chapter 4
Practice Problems
*/

/* range */
function range(start, end, step) {
    let ret = [];
    if (start <= end)
        for (let i = start ; i <= end; step > 0? i+= step : i++)
            ret.push(i);
    else
        for (let i = start; i >= end; step < 0 ? i+= step : i--)
            ret.push(i);
    return ret;
}

/* sum */
function sum(arr) {
    let ret = 0;
    for (let num of arr)
        ret += num;
    return ret;

}

/* reverseArray */
function reverseArray(arr) {
    var ret = [];
    for (let i = 0; i < arr.length; i++)
        ret.unshift(arr[i]);
    return ret;
}

/* reverseArrayInPlace */
function reverseArrayInPlace(arr) {
    let temp;
    let len = arr.length;
    let mid = Math.floor(len/2);
    for (let i = 0; i < mid; i++) {
        temp = a[i];
        a[i] = a[len - 1 - i];
        a[len - 1 - i] = temp;
    }
}

/* arrayToList */
function arrayToList(arr) {
    let list = null;
    for (let i = arr.length - 1; i >= 0; i--) {
        list = {
            value: arr[i],
            rest: list
        };
    } 
    return list;
}

/* listToArray */
function listToArray(list) {
    let arr = [];
    while (list != null) {
        arr.push(list.value);
        list = list.rest;
    }
    return arr;
}

/* prepend */
function prepend(val, list) {
    list = {
        value: val,
        rest: list
    };
    return list;
}

/* nth */
function nth(list, n) {
    let i = 0;
    while (list != null) {
        if (i++ == n)
            return list.value;
        list = list.rest;
    }
}

/* recursiveNth */
function recursiveNth(list, n) {
    if (list == null)
        return undefined;
    if (n == 0)
        return list.value;
    return recursiveNth(list.rest, n-1);
}

/* deepEqual */
function deepEqual(a, b) {
    if (a === b) {
        return true;
    } else if (typeof a == "object" && typeof b == "object") {
        for (let name of Object.keys(a)) {
            if (!(name in b))
                return false;
            if (!deepEqual(a[name], b[name])) {
                return false;
            }
        }
        for (let name of Object.keys(b)) {
            if (!(name in a))
                return false;
        }
        return true;
    } else {
        return false;
    }
}