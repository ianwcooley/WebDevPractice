/* 
Eloquent JavaScript Chapter 6
Practice Problems
*/

/* vector */
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(v) {
        return new Vec(this.x + v.x, this.y + v.y);
    }
    minus(v) {
        return new Vec(this.x - v.x, this.y - v.y);
    }
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

/* groups */
class Group {
   constructor() {

   }
}

// let group = Group.from([10, 20]);
// console.log(group.has(10));
// // → true
// console.log(group.has(30));
// // → false
// group.add(10);
// group.delete(10);
// console.log(group.has(10));
// // → false

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
// → 1,2
console.log([1, 2][toStringSymbol]());
// → 2 cm of blue yarn

let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
  };
  console.log(stringObject[toStringSymbol]());
  // → a jute rope

  let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}

