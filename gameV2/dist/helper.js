// Classes and stuff
export class vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        return new vector2(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector) {
        return new vector2(this.x - vector.x, this.y - vector.y);
    }
    dot(vector) {
        return new vector2(this.x * vector.x, this.y * vector.y);
    }
    scale(scaleFactor) {
        return new vector2(this.x * scaleFactor, this.y * scaleFactor);
    }
    toPol() {
        return new polarVector2(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), aim(new vector2(), this));
    }
}
export class polarVector2 {
    constructor(m = 0, r = 0) {
        this.m = m;
        this.r = r;
    }
    toComponent() {
        return new vector2(this.m * Math.sin(this.r), -this.m * Math.cos(this.r));
    }
}
export class physicsObject {
    constructor(position, rotation, mass, thrust, maxAngularVelocity) {
        this.pos = position;
        this.r = rotation;
        this.v = new vector2();
        this.m = mass;
        this.f = thrust;
        this.rv = maxAngularVelocity;
    }
}
export class colour {
    constructor(r, g, b, a = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toColour() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    ;
}
export class style {
    constructor(thickness, fillColour, outlineColour) {
        this.thickness = thickness;
        this.fillColour = fillColour;
        this.outlineColour = outlineColour;
    }
}
export class part {
    constructor(centre, offset, rOffset, vertices, scaleFacor, style, hitbox, hp, isTurret = false, turret = {}) {
        this.centre = centre;
        this.offset = offset;
        this.rOffset = rOffset;
        this.vertices = vertices;
        this.scaleFactor = scaleFacor;
        this.style = style;
        this.hitbox = hitbox;
        this.hp = hp;
        this.isTurret = isTurret;
        this.turret = turret;
    }
    render(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`DRAW POLYGON: Can't find canvas with id: ${canvasId}`);
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error(`DRAW POLYGON: Can't find context of canvas with id: ${canvasId}`);
            return;
        }
        ctx.save();
        ctx.translate(this.centre.x, this.centre.y);
        ctx.rotate(this.rOffset);
        ctx.translate(this.offset.x, this.offset.y);
        ctx.scale(this.scaleFactor, this.scaleFactor);
        drawPolygon(canvasId, this.vertices, this.style);
    }
}
export class forceField {
    constructor(shieldCapacity, shieldRegenPerTick = -1, shieldRegenCooldownAfterHit = 15) {
        this.cap = shieldCapacity;
        this.shield = shieldCapacity;
        if (shieldRegenPerTick == -1) {
            shieldRegenPerTick = shieldCapacity / 600;
        }
        this.rgn = shieldRegenPerTick;
        this.maxCooldown = shieldRegenCooldownAfterHit;
        this.cooldown = 0;
    }
}
export class ship {
    constructor(team, position, facing, mass, thrust, rotationSpeed, body, forceField, layer = 1) {
        this.physics = new physicsObject(position, facing, mass, thrust, rotationSpeed);
        this.body = body;
        this.actions = [];
        this.team = team;
        this.inventory = {};
        this.shield = forceField;
        this.layer = layer;
    }
    prepareCanvas(canvasId, cameraPos, display) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`DRAW POLYGON: Can't find canvas with id: ${canvasId}`);
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error(`DRAW POLYGON: Can't find context of canvas with id: ${canvasId}`);
            return;
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.rotate(this.physics.r);
        console.log(display);
        console.log(this.physics.pos.y - cameraPos.y + display.y / 2);
        ctx.translate(this.physics.pos.x - cameraPos.x + display.x / 2, this.physics.pos.y - cameraPos.y + display.y / 2);
    }
}
export class gamestate {
    constructor(player, entities, projectiles) {
        this.player = player;
        this.entities = entities;
        this.projectiles = projectiles;
    }
}
export class spaceshipGameV2 {
    constructor(gamestate, display = new vector2()) {
        this.gamestate = gamestate;
        this.keyboard = {};
        this.mousepos = new vector2(0, 0);
        this.particles = {};
        this.display = display;
        this.debug = false;
    }
}
// helper functions
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function deepFreeze(obj) {
    let propNames = Object.getOwnPropertyNames(obj);
    for (let name of propNames) {
        let value = obj[name];
        if (typeof value === 'object' && value !== null) {
            deepFreeze(value);
        }
    }
    return Object.freeze(obj);
}
// Bootleg Game Engine: rng
export function generateId() {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).slice(2, 11);
    return `${timestamp}-${randomNum}`;
}
export function randchoice(list, remove = false) {
    let length = list.length;
    let choice = randint(0, length - 1);
    if (remove) {
        let chosen = list.splice(choice, 1);
        return [chosen, list];
    }
    return list[choice];
}
export function randint(min, max) {
    if (max - min < 1) {
        return min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}
// Bootleg Game Engine: math
export function aim(pos1, pos2) {
    if (pos1 == pos2)
        return 0;
    let diff = { x: pos2.x - pos1.x, y: pos1.y - pos2.y };
    if (diff.x == 0) {
        if (diff.y > 0)
            return 0;
        else
            return Math.PI;
    }
    else if (diff.y == 0) {
        if (diff.x > 0)
            return Math.PI / 2;
        else
            return 3 * Math.PI / 2;
    }
    let angle = Math.atan(Math.abs(diff.y / diff.x));
    if (diff.x > 0 && diff.y > 0)
        return Math.PI / 2 - angle;
    else if (diff.x > 0 && diff.y < 0)
        return Math.PI / 2 + angle;
    else if (diff.x < 0 && diff.y < 0)
        return 3 * Math.PI / 2 - angle;
    else
        return 3 * Math.PI / 2 + angle;
}
// Bootleg Game Engine: rendering
export function replacehtml(elementId, text) {
    const element = document.getElementById(elementId);
    if (element)
        element.innerHTML = text;
}
export function addhtml(elementId, text) {
    const element = document.getElementById(elementId);
    if (element)
        element.innerHTML = element.innerHTML + text;
}
export function clearCanvas(canvasId, from, to) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`DRAW POLYGON: Can't find canvas with id: ${canvasId}`);
        return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error(`DRAW POLYGON: Can't find context of canvas with id: ${canvasId}`);
        return;
    }
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(from.x, from.y, to.x, to.y);
    ctx.restore();
}
export function drawPolygon(canvasId, polygon, style) {
    const points = JSON.parse(JSON.stringify(polygon));
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`DRAW POLYGON: Can't find canvas with id: ${canvasId}`);
        return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error(`DRAW POLYGON: Can't find context of canvas with id: ${canvasId}`);
        return;
    }
    console.log(`Drawing Polygon`);
    console.log(ctx.getTransform());
    console.log(points);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.moveTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    if (style.fillColour) {
        console.log(style.fillColour);
        ctx.fillStyle = style.fillColour.toColour();
        ctx.fill();
    }
    if (style.outlineColour && style.thickness > 0) {
        console.log(style.outlineColour);
        ctx.lineWidth = style.thickness;
        ctx.strokeStyle = style.outlineColour.toColour();
        ctx.stroke();
    }
}
