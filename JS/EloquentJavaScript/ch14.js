/* 
Eloquent JavaScript Chapter 9
Practice Problems
*/

/* Build a Table */
const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

function appendTable(parentNode, data) {
    let i, j, header, row, cell, cellData; 
    let table = document.createElement("table");
    let headers = Object.keys(data[0]);
    let headersRow = table.appendChild(document.createElement("tr"));
    for (j = 0; j < headers.length; j++) {
        header = headersRow.appendChild(document.createElement("th"));
        header.appendChild(document.createTextNode(headers[j]));
    }

    for (i = 0; i < data.length; i++) {
        row = table.appendChild(document.createElement("tr"));
        for (j = 0; j < headers.length; j++) {
            cellData = data[i][headers[j]];
            cell = row.appendChild(document.createElement("td"));
            cell.appendChild(document.createTextNode(cellData));
            if (typeof cellData == "number")
                cell.style.textAlign = "right";
        }
    }    
    parentNode.appendChild(table);
}

// let div = document.getElementById("mountains");
// appendTable(div, MOUNTAINS);

/* Elements by Tag Name */

function byTagName(node, tagName) {
    let ret = [];
    for (child of node.children) {
        if (child.nodeType == Node.ELEMENT_NODE) {
            if (child.nodeName.toLowerCase() == tagName)
                ret.push(child);
            ret = ret.concat(byTagName(child, tagName));
        }
    }
    return ret;
  }

  console.log(byTagName(document.body, "h1"));
  // → 1
  console.log(byTagName(document.body, "span"));
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span"));
  // → 2
  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2

  /* The Cat's Hat */

  let cat = document.querySelector("#cat");
  let hat = document.querySelector("#hat");

  let angle = 0;
  let lastTime = null;
  function animate(time) {
    if (lastTime != null) angle += (time - lastTime) * 0.001;
    lastTime = time;
    cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
    cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
    hat.style.top = (-Math.sin(angle) * 40 + 40) + "px";
    hat.style.left = (-Math.cos(angle) * 200 + 230) + "px";

    // Your extensions here.

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);