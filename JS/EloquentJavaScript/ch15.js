/* 
Eloquent JavaScript Chapter 15
Practice Problems
*/

/* Balloon */

let balloon = document.getElementById("balloon");
balloon.style.fontSize = "12px";
balloon.style.margin = "0px";

window.addEventListener("keydown", keydown);
function keydown(event) {
    if (event.key == "ArrowUp") {
        event.preventDefault();
        let fontSize = Number(balloon.style.fontSize.replace("px", ""));
        fontSize *= 1.1;
        balloon.style.fontSize = fontSize + "px";
        if (fontSize > 200) {
            balloon.textContent = "💥";
            window.removeEventListener("keydown", keydown);
        }
    }
    if (event.key == "ArrowDown") {
        event.preventDefault();
        let fontSize = Number(balloon.style.fontSize.replace("px", ""));
        fontSize *= 0.9;
        balloon.style.fontSize = fontSize + "px";
    }
}

/* Mouse Trail */
let dots = [];
for (let i = 0; i < 10; i++) {
    let dot = document.createElement("div");
    dot.className = "trail";
    document.body.appendChild(dot);
    dots.push(dot);
}
let index = 0;
// window.addEventListener("mousemove", mouseTrail);
function mouseTrail(event) {
    dots[index].style.left = (event.clientX - 3) + "px";
    dots[index].style.top = (event.clientY - 3) + "px";
    index = (index + 1) % 10;
}

/* Tabs */

function asTabs(node) {
    let children = Array.from(node.children);
    let buttons = [];
    let toggle = function(event) {
        for (let i = 0; i < children.length; i++) {
            if (event.target == buttons[i]) {
                children[i].style.display = null;
                buttons[i].style.backgroundColor = "blue";
            }
            else  {
                children[i].style.display = "none";
                buttons[i].style.backgroundColor = null;
            }
        }
    }
    for (let i = 0; i < children.length; i++) {
        let button = document.createElement("button");
        buttons.push(button);
        button.textContent = children[i].getAttribute("data-tabname");
        node.insertBefore(button, children[0]);
        if (i != 0)
            children[i].style.display = "none";
        else
            button.style.backgroundColor = "blue";
        button.addEventListener("click", toggle);
    }
     
  }
//   function toggle(event) {
//       console.log("hi");
//   }
  asTabs(document.querySelector("tab-panel"));
