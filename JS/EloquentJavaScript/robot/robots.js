import randomPick from "./random-item.js";
import roadGraph from "./roads.js";
import { VillageState, runRobot } from "./state.js";


// randomRobot: gives a random direction to move to next
function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
       memory = mailRoute;
    }  
    return {direction: memory[0], memory: memory.slice(1)};
}

// findRoute: through graph from "from" to "to"
// looks at all places next to "at", and if one of them is "to", returns route.
// else, adds place and route to it to "work", if haven't reached the place yet.
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

// goalOrientedRobot: looks at next parcel on list, and follows route 
// to its place or its address, dropping off and/or picking up other
// packages along the way as it moves.
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

/* robot efficiency */
function efficientRobot({place, parcels}, route) {
    for (let parcel of parcels) {
        let newRoute;
        if (parcel.place != place) {
            newRoute = findRoute(roadGraph, place, parcel.place);
        } else {
            newRoute = findRoute(roadGraph, place, parcel.address);
        }
        if (route.length == 0 || newRoute.length < route.length)
            route = newRoute;
    }
    return {direction: route[0], memory: route.slice(1)};
}

function compareBots(robots, memories) {
    let numberOfTasks = 100;
    let numberOfBots = robots.length;
    let avgs = new Array(numberOfBots).fill(0);
    let i, j;
    for (i = 0; i < numberOfTasks; i++) {
        let state = VillageState.random();
        for (j = 0; j < numberOfBots; j++) {
            avgs[j] += runRobot(state, robots[j], memories[j]);
        }
    }
    avgs = avgs.map(a => a / numberOfTasks);
    avgs.forEach((avg, i) => { 
        console.log(`robot ${i+1} average: ${avg} turns`); 
    });
}

export {randomRobot, routeRobot, mailRoute, goalOrientedRobot, efficientRobot, compareBots };