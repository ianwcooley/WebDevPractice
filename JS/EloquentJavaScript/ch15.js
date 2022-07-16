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