/* 
Eloquent JavaScript Chapter 5
Practice Problems
*/

// NB: include a link to scripts.js before the link to this file,
// because this file references the SCRIPTS variable from scripts.js

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

// helper functions for dominantDirection:

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.find(c => c.name == name);
        if (!known) {
            counts.push({name, count: 1});
        } else {
            known.count++;
        }
    }
    return counts;
}

function textScripts(text) {
    let scripts = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.name : "none";
    }).filter(({name}) => name != "none");
  
    let total = scripts.reduce((n, {count}) => n + count, 0);
    if (total == 0) return "No scripts found";
  
    return scripts.map(({name, count}) => {
      return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
  }
  
  console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));

/* dominantDirection */
function dominantDirection(text) {
    let directions = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({name}) => name != "none");

    let total = directions.reduce((n, {count}) => n + count, 0);
    if (total == 0) return "No scripts found";

    return directions.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`;
      }).join(", ");
}

console.log(dominantDirection('英国的狗说"woof", ᠮᠣᠩᠭᠣᠯ说"тяв" چ	ڇ	ڈ'));