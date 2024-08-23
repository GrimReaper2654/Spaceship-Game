import { 
// classes
vector2, colour, style, part, ship, forceField, } from "./helper.js";
const styles = {
    metal1: new style(10, new colour(200, 200, 200, 1), new colour(200, 200, 200, 1)),
};
const shapes = {
    square: [
        new vector2(-1, -1),
        new vector2(-1, 1),
        new vector2(1, 1),
        new vector2(1, -1)
    ],
};
const debugShipParts = [
    new part(new vector2(), new vector2(), 0, shapes.square, 500, styles.metal1, shapes.square, 100, false),
];
const debugShip = new ship('neutral', new vector2(), 0, 1000, 100, Math.PI / 36, debugShipParts, new forceField(1000));
export const SSGV2Ships = {
    debugShip: debugShip,
};
