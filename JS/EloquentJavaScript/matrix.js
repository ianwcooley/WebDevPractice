/* matrix */
class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y);
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x];
    }
    set(x, y, value) {
        this.content[y * this.width + x] = value;
    }

    print() {
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                row.push(this.content[y * this.width + x]);
            }
            console.log(row.toString());
        }
    }
}

/* test */
let matrix = new Matrix(10, 10, (x,y) => (x == y ? 1 : 0));
matrix.print();

/* matrix iterator */
class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y == this.matrix.height) return {done: true};

        let value = {x: this.x,
                    y: this.y,
                    value: this.matrix.get(this.x, this.y)};
        this.x++;
        if (this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return {value, done: false};
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
};
  
// let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
// for (let {x, y, value} of matrix) {
//     console.log(x, y, value);
// }
// → 0 0 value 0,0
// → 1 0 value 1,0
// → 0 1 value 0,1
// → 1 1 value 1,1

class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }

    set(x, y, value) {
        super.set(x, y, value);
        if (x != y) {
        super.set(y, x, value);
        }
    }
}
  
// let matrix2 = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
// console.log(matrix2.get(2, 3));
// // → 3,2

// console.log(
//     new SymmetricMatrix(2) instanceof SymmetricMatrix);
// // → true
// console.log(new SymmetricMatrix(2) instanceof Matrix);
// // → true
// console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// // → false
// console.log([1] instanceof Array);
// // → true