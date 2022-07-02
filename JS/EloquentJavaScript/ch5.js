/* 
Eloquent JavaScript Chapter 5
Practice Problems
*/

/* flatten */
function flatten(arr) {
    return arr.reduce((a,b) => a.concat(b));
}

/* loop */
function loop(val, test, update, body) {
    if (!test(val))
        return;
    body(val);
    loop(update(val), test, update, body);
}

/* every */
function every(array, test) {
    for (let i = 0; i < array.length; i++)
        if (!test(array[i]))
            return false;
    return true;
}
// forAll: same as every, but with different implementation
function forAll(array, test) {
    return !array.some(x => !test(x));
}

/* dominantDirection */
function dominantDirection(text) {
    let characterDirection = char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    };   
    return(countBy(text, characterDirection).reduce((a,b) => 
        b.count > a.count ? b : a
    ).name);
}
