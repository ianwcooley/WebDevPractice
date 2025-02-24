/* 
Eloquent JavaScript Chapter 4
Practice Problems
*/

/* range */
function range(start, end, step) {
    let ret = [];
    if (start <= end)
        for (let i = start ; i <= end; step > 0 ? i+= step : i++)
            ret.push(i);
    else
        for (let i = start; i >= end; step < 0 ? i+= step : i--)
            ret.push(i);
    return ret;
}

// used copilot to write the same function but more legibly and avoiding infinite loops
function range(start, end, step = 1) {
    if (step === 0) throw new Error("Step cannot be zero.");
    if ((start < end && step < 0) || (start > end && step > 0)) throw new Error("Step value is not appropriate for the given start and end values.");
    let ret = [];
    if (start <= end) {
        for (let i = start; i <= end; i += step) {
            ret.push(i);
        }
    } else {
        for (let i = start; i >= end; i += step) {
            ret.push(i);
        }
    }
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

// copilot's prettier algorithm without need for "temp"
function reverseArrayInPlace(arr) {
    let len = arr.length;
    for (let i = 0; i < Math.floor(len / 2); i++) {
        [arr[i], arr[len - 1 - i]] = [arr[len - 1 - i], arr[i]];
    }
}

// This version is more aesthetically pleasing imo
function reverseArrayInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
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

// copilot's version
function arrayToList(arr) {
    return arr.reduceRight((rest, value) => ({ value, rest }), null);
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

// copilot wrote a method using recursion, but this could overflow the call stack if the list is too long
function listToArray(list, arr = []) {
    if (list === null) return arr;
    arr.push(list.value);
    return listToArray(list.rest, arr);
}

/* prepend */
function prepend(val, list) {
    list = {
        value: val,
        rest: list
    };
    return list;
}

// copilot using shortcuts to make it prettier
function prepend(value, list) {
    return { value, rest: list };
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

// for once, i think my version above is better than copilot's
function nth(list, n) {
    for (let i = 0; list != null; i++, list = list.rest) {
        if (i === n) return list.value;
    }
    return undefined;
}

/* recursiveNth */
function recursiveNth(list, n) {
    if (list == null)
        return undefined;
    if (n == 0)
        return list.value;
    return recursiveNth(list.rest, n-1);
}
// once again i like my version above better
function recursiveNth(list, n) {
    if (!list) return undefined;
    return n === 0 ? list.value : recursiveNth(list.rest, n - 1);
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

// copilot's version
function deepEqual(a, b) {
    if (a === b) return true;
    if (a == null || typeof a !== "object" || b == null || typeof b !== "object") return false;

    let keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }

    return true;
}