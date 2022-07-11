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
       this.members = [];
    }
    add(element) {
        if (!this.has(element))
            this.members.push(element);
    }
    has (element) {
        return this.members.includes(element);
    }
    delete (element) {
        let i = this.members.indexOf(element);
        if (i >= 0)
            this.members.splice(i,1);
    }
    static from(iterable) {
        let group = new Group();
        for (let item of iterable)
            if (!group.has(item))
                group.add(item);

        return group;
    }
}

/* iterable groups */
class GroupIterator {
    constructor(group) {
        this.i = 0;
        this.group = group;
    }

    next() {
        if (this.i == this.group.members.length) return {done: true};
        let value = this.group.members[this.i++];
        return {value, done: false};
    }
}

Group.prototype[Symbol.iterator] = function() {
    return new GroupIterator(this);
};

/* borrowing a method */
let map = {one: true, two: true, hasOwnProperty: true};
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true
