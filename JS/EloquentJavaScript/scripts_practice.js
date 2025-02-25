function renderScripts(scripts) {
    scripts.forEach(script => {
        // Create an <h2> element for the script name
        const h2 = document.createElement('h2');
        h2.textContent = script.name;
        document.body.appendChild(h2);

        // Create a <p> element for the characters
        const p = document.createElement('p');
        const characters = script.ranges.flatMap(([from, to]) => {
            let chars = [];
            for (let i = from; i < to; i++) {
                chars.push(String.fromCodePoint(i));
            }
            return chars;
        }).join(' ');
        p.textContent = characters;
        document.body.appendChild(p);
    });
}

// Call the function with the SCRIPTS array
renderScripts(SCRIPTS);

