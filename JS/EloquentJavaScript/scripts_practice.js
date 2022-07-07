let Ahom = SCRIPTS.find(n => n.name == "Ahom")
console.log(Ahom);

let AhomCharCodes = flatten(Ahom.ranges.map(expand));
console.log(AhomCharCodes);
for (let i = 0; i < AhomCharCodes.length; i++)
    console.log("&#" + AhomCharCodes[i] + ";</p>");



/* helper functions */
function expand([start, finish]) {
    let ret = [];
    for (let i = start; i < finish; i++)
        ret.push(i);
    return ret;
}

function flatten(arr) {
    return arr.reduce((a,b) => a.concat(b));
}
