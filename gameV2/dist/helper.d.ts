export declare class vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(vector: vector2): vector2;
    subtract(vector: vector2): vector2;
    dot(vector: vector2): vector2;
    scale(scaleFactor: number): vector2;
    toPol(): polarVector2;
}
export declare class polarVector2 {
    m: number;
    r: number;
    constructor(m?: number, r?: number);
    toComponent(): vector2;
}
export declare class physicsObject {
    pos: vector2;
    v: vector2;
    r: number;
    m: number;
    f: number;
    rv: number;
    constructor(position: vector2, rotation: number, mass: number, thrust: number, maxAngularVelocity: number);
}
export declare class colour {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a?: number);
    toColour(): string;
}
export declare class style {
    thickness: number;
    fillColour?: colour;
    outlineColour?: colour;
    constructor(thickness: number, fillColour?: colour, outlineColour?: colour);
}
export declare class part {
    centre: vector2;
    offset: vector2;
    rOffset: number;
    vertices: Array<vector2>;
    scaleFactor: number;
    style: style;
    hitbox: Array<vector2>;
    hp: number;
    isTurret: boolean;
    turret: object;
    constructor(centre: vector2, offset: vector2, rOffset: number, vertices: Array<vector2>, scaleFacor: number, style: style, hitbox: Array<vector2>, hp: number, isTurret?: boolean, turret?: object);
    render(canvasId: string): void;
}
export declare class forceField {
    shield: number;
    cap: number;
    rgn: number;
    cooldown: number;
    maxCooldown: number;
    constructor(shieldCapacity: number, shieldRegenPerTick?: number, shieldRegenCooldownAfterHit?: number);
}
export declare class ship {
    physics: physicsObject;
    body: Array<part>;
    actions: Array<object>;
    team: string;
    inventory: object;
    shield: forceField;
    layer: number;
    constructor(team: string, position: vector2, facing: number, mass: number, thrust: number, rotationSpeed: number, body: Array<part>, forceField: forceField, layer?: number);
    prepareCanvas(canvasId: string, cameraPos: vector2, display: vector2): void;
}
export declare class gamestate {
    player: ship;
    projectiles: Array<object>;
    entities: Array<object>;
    constructor(player: ship, entities: Array<object>, projectiles: Array<object>);
}
export declare class spaceshipGameV2 {
    gamestate: gamestate;
    keyboard: Record<string, boolean>;
    particles: object;
    mousepos: vector2;
    display: vector2;
    debug: boolean;
    constructor(gamestate: gamestate, display?: vector2);
}
export declare function sleep(ms: number): Promise<unknown>;
export declare function deepFreeze(obj: object): object;
export declare function generateId(): string;
export declare function randchoice(list: Array<any>, remove?: boolean): any;
export declare function randint(min: number, max: number): number;
export declare function randProperty(obj: object): never;
export declare function aim(pos1: vector2, pos2: vector2): number;
export declare function replacehtml(elementId: string, text: string): void;
export declare function addhtml(elementId: string, text: string): void;
export declare function clearCanvas(canvasId: string, from: vector2, to: vector2): void;
export declare function drawPolygon(canvasId: string, polygon: Array<vector2>, style: style): void;
