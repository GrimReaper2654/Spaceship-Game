import {
    // classes
    vector2, 
    polarVector2, 
    physicsObject,
    colour,
    style,
    part,  
    ship, 
    gamestate, 
    spaceshipGameV2,
} from "./helper.js";
import { SSGV2Ships } from "./ships.js";

export const SSGV2Data = {
    teams: {
        player: {
            style: new style(10, new colour(200, 0, 0, 1), new colour(150, 0, 0, 1)),
        },
        dead: {
            style: new style(10, new colour(100, 100, 100, 1), new colour(50, 50, 50, 1)),
        },
    },
    ships: SSGV2Ships,
};


