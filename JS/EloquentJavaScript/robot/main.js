import {randomRobot, routeRobot, mailRoute, goalOrientedRobot, efficientRobot, compareBots } from "./robots.js"

compareBots([randomRobot, routeRobot, goalOrientedRobot, efficientRobot], 
    [[],mailRoute,[],[]]);