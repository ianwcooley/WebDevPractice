/* 
Eloquent JavaScript Chapter 7
Project: A Robot
*/
const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

/* roadGraph: graph of town,
    used in all examples to follow */
const roadGraph = buildGraph(roads);

// // TEST
// console.log(roadGraph);   
// // ENDTEST


// VillageState: keeps track of where robot is, where parcels are, 
// and where parcels need to go
class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    // move: changes this.place to destination, along with p.place for every
    // parcel p gathered so far. Then, filters out any gathered parcels that
    // were addressed to destination.
    move(destination) {
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else {
        let parcels = this.parcels.map(p => {
          if (p.place != this.place) return p;
          return {place: destination, address: p.address};
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
      }
    }
}

// // TEST
// let first = new VillageState(
//     "Post Office",
//     [{place: "Post Office", address: "Alice's House"}]
// );
// let next = first.move("Alice's House");
// console.log(first);
// console.log(next);
// // ENDTEST

// robot looks at state and returns action, telling us which direction to move next.
// then, state moves to action.direction, and packages get picked up and/or
// dropped off at that location.
function runRobot(state, robot, memory) {
    let turn = 0;
    for (;; turn++) {
        if (state.parcels.length == 0) {
            // console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        // console.log(`Moved to ${action.direction}`);
    }
    return turn; // added for the sake of compareRobots exercise, below
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

// randomRobot: gives a random direction to move to next
function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

// returns a village state that starts at Post Office, with
// parcels in random places and addressed to random locations
VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

// // TEST of randomRobot
// runRobot(VillageState.random(), randomRobot);
// // ENDTEST

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

// TEST
// tell routeRobot to follow the mailRoute above.
runRobot(VillageState.random(), routeRobot, mailRoute);
// ENDTEST

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

// // TEST of goalOrientedRobot
// runRobot(VillageState.random(), goalOrientedRobot, []);
// // ENDTEST






/* EXERCISE SOLUTIONS */

/* compare robots */
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
function compareRobots(robot1, memory1, robot2, memory2) {
    let numberOfTasks = 100;
    let avg1 = 0, avg2 = 0;
    for (let i = 0; i < numberOfTasks; i++) {
        let state = VillageState.random();
        avg1 += runRobot(state, robot1, memory1);
        avg2 += runRobot(state, robot2, memory2);
    }
    avg1 /= numberOfTasks;
    avg2 /= numberOfTasks;
    console.log(`robot 1 average: ${avg1} turns`);
    console.log(`robot 2 average: ${avg2} turns`);
}
// TEST
// compareRobots(goalOrientedRobot, [], efficientRobot, []);
// ENDTEST
compareBots([randomRobot, routeRobot, goalOrientedRobot, efficientRobot], 
    [[],mailRoute,[],[]]);

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

/* persistent group */
class PGroup {
    constructor() {
       this.members = [];
    }
    add(element) {
        let newGroup = new PGroup();
        if (!this.has(element))
            newGroup.members = this.members.concat(element);
        else
            newGroup.members = this.members.slice();
        return newGroup;
    }
    has (element) {
        return this.members.includes(element);
    }
    delete (element) {
        let newGroup = new PGroup();
        newGroup.members = this.members.slice();
        let i = this.members.indexOf(element);
        if (i >= 0)
            newGroup.members.splice(i,1);
        return newGroup;
    }
}