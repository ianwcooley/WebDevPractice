import randomPick from "./random-item.js";
import roadGraph from "./roads.js";

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

export { VillageState, runRobot };