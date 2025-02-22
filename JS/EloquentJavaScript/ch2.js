/* 
Eloquent JavaScript Chapter 2
Practice Problems
*/

let size, str, i, j;

/* triangle */
size = 7;
str = "";
for (i = 0; i < size; i++) {
    str += "#";
    console.log(str);
}



// Alternatively,

let row = '#';
while (row.length < 8) {
    console.log(row);
    row += '#'
}

// Or
let layer = '#'
do {
    console.log(layer);
    layer += '#'
} while (layer.length < 8);

// /* fizzbuzz */
// size = 100;
// str = "";
// for (i = 1; i <= 100; i++) {
//     if (!(i % 3))
//         str += "fizz";
//     if (!(i % 5))
//         str += "buzz";
//     if (str) {
//         console.log(str);
//         str = "";
//     } else {
//         console.log(i);
//     }
// }

// Because copilot is awesome, here is a better solution:
for (let i = 1; i <= 100; i++) {
    let output = '';
    if (i % 3 === 0) output += 'Fizz';
    if (i % 5 === 0) output += 'Buzz';
    console.log(output || i);
}

// /* chessboard */
// size = 20;
// str = "";
// for (i = 0; i < size; i++) {
//     for (j = 0; j< size; j++) {
//         if (i % 2)
//             str += j % 2 ? " " : "#";
//         else
//             str += j % 2 ? "#" : " ";
//     }
//     console.log(str);
//     str = "";
// }


// Wow, copilot is so cool. This solution reminds me of
// the formula for a determinant, in the way it uses
// (i + j) % 2 to determine the character to print.
let boardLength = 8;
for (let i = 0; i < boardLength; i++) {
    let row = '';
    for (let j = 0; j < boardLength; j++) {
        if ((i + j) % 2 === 0) {
            row += ' ';
        } else {
            row += '#';
        }
    }
    console.log(row);
}
