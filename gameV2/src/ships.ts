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

const styles = {
    metal1: new style(
        10,
        new colour(200,200,200,1),
        new colour(200,200,200,1),
    ),
}

const shapes = {
    square: [
        new vector2(0, 0),
        new vector2(0, 1),
        new vector2(1, 1),
        new vector2(1, 0)
    ],
}

const debugShipParts = [
    new part(new vector2(), new vector2(), 0, shapes.square, 100, styles.metal1, shapes.square, 100, false),
];

const debugShip = new ship('neutral', new vector2(), 0, 1000, 100, Math.PI/36, debugShipParts);

export const SSGV2Ships = {
    debugShip: debugShip,
};
