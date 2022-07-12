/* 
Eloquent JavaScript Chapter 8
Examples from book and practice problems
*/

// /* strict mode */
// function canYouSpotTheProblem() {
//     "use strict";
//     for (counter = 0; counter < 10; counter++) {
//         console.log("Happy happy");
//     }
// }
// canYouSpotTheProblem();
//   // → ReferenceError: counter is not defined

// "use strict";
// function Person(name) { this.name = name; }
// let ferdinand = Person("Ferdinand"); // forgot new
// // → TypeError: Cannot set property 'name' of undefined

/* exception handling */
// function promptDirection(question) {
//     let result = prompt(question);
//     if (result.toLowerCase() == "left") return "L";
//     if (result.toLowerCase() == "right") return "R";
//     throw new Error("Invalid direction: " + result);
// }

function look() {
    if (promptDirection("Which way?") == "L") {
        return "a house";
    } else {
        return "two angry bears";
    }
}

// try {
//     console.log("You see", look());
// } catch (error) {
//     console.log("Something went wrong: " + error);
// }

const accounts = {
    a: 100,
    b: 0,
    c: 20
};

function getAccount() {
    let accountName = prompt("Enter an account name");
    if (!accounts.hasOwnProperty(accountName)) {
        throw new Error(`No such account: ${accountName}`);
    }
    return accountName;
}

function transfer(from, amount) {
    if (accounts[from] < amount) return;
        let progress = 0;
    try {
        accounts[from] -= amount;
        progress = 1;
        accounts[getAccount()] += amount;
        progress = 2;
    } finally {
        if (progress == 1) {
            accounts[from] += amount;
        }
    }
}

// console.log(accounts);
// transfer("a", 20);
// console.log(accounts);


class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}

// for (;;) {
//     try {
//       let dir = promptDirection("Where?");
//       console.log("You chose ", dir);
//       break;
//     } catch (e) {
//       if (e instanceof InputError) {
//         console.log("Not a valid direction. Try again.");
//       } else {
//         throw e;
//       }
//     }
//   }





/*
EXERCISES
*/

/* retry */
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
    // for (;;) {
        try {
            return primitiveMultiply(a,b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                console.log("error");
                return reliableMultiply(a,b);
            } else {
                throw e;
            }
        }
    }
// }

console.log(reliableMultiply(8, 8));
// → 64

/* the locked box */
const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };
  
  function withBoxUnlocked(body) {
      box.unlock();
      try {
        body();
      } finally {
        box.lock();
      }
    // Your code here.
  }
  
  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });

  console.log(box.locked);
  // → true
  
  try {
    withBoxUnlocked(function() {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    console.log("Error raised: " + e);
  }
  console.log(box.locked);
  // → true