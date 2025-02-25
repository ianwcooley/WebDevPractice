// Eloquent JavaScript Chapter 6
// Better Solutions with Copilot

// A Vector Type
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  minus(other) {
    return new Vec(this.x - other.x, this.y - other.y);
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}


// Groups
class Group {
  constructor() {
    this.members = [];
  }
  add(value) {
    if (!this.has(value)) this.members.push(value);
  }
  delete(value) {
    this.members = this.members.filter(v => v !== value);
  }
  has(value) {
    return this.members.includes(value);
  }
  static from(iterable) {
    let group = new Group();
    for (let value of iterable) {
      group.add(value);
    }
    return group;
  }
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}


// Iterable Groups
class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }
  next() {
    if (this.position >= this.group.members.length) {
      return { done: true };
    } else {
      let result = { value: this.group.members[this.position],
                     done: false };
      this.position++;
      return result;
    }
  }
}


// Borrowing a Method
let map = { one: 'a', two: 5, hasOwnProperty: Symbol('bob') };
console.log(Object.prototype.hasOwnProperty.call(map, "one"));