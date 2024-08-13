// Classes and stuff
export class vector2 {
    x: number;
    y: number;
   
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vector:vector2): vector2 {
        return new vector2(this.x+vector.x, this.y+vector.y);
    }

    subtract(vector:vector2): vector2 {
        return new vector2(this.x-vector.x, this.y-vector.y);
    }

    dot(vector:vector2): vector2 {
        return new vector2(this.x*vector.x, this.y*vector.y);
    }

    scale(scaleFactor:number): vector2 {
        return new vector2(this.x*scaleFactor, this.y*scaleFactor);
    }

    toPol() {
        return new polarVector2(Math.sqrt(this.x**2+this.y**2), aim(new vector2(), this));
    }
}

export class polarVector2 {
    m: number;
    r: number;

    constructor(m = 0, r = 0) {
        this.m = m;
        this.r = r;
    }

    toComponent() {
        return new vector2(this.m * Math.sin(this.r), -this.m * Math.cos(this.r))
    }
} 

export class physicsObject {
    pos: vector2;
    v: vector2;
    r: number;
    m: number;
    f: number;
    rv: number;

    constructor(position:vector2, rotation:number, mass:number, thrust:number, maxAngularVelocity: number) {
        this.pos = position;
        this.r = rotation;
        this.v = new vector2();
        this.m = mass;
        this.f = thrust;
        this.rv = maxAngularVelocity;
    }
}

export class colour {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r:number, g:number, b:number, a:number=0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toColour() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    };
}

export class style {
    thickness: number;
    fillColour?: colour;
    outlineColour?: colour;

    constructor(thickness:number, fillColour?:colour, outlineColour?:colour) {
        this.thickness = thickness;
        this.fillColour = fillColour;
        this.outlineColour = outlineColour;
    }
}

export class part {
    centre: vector2;
    offset: vector2;
    rOffset: number;
    vertices: Array<vector2>;
    scaleFactor: number; // scale factor only scales the vertices (and hitbox as well)
    style: style;
    hitbox: Array<vector2>;
    hp: number;
    isTurret: boolean;
    turret: object;

    constructor(centre:vector2, offset:vector2, rOffset:number, vertices:Array<vector2>, scaleFacor:number, style:style, hitbox:Array<vector2>, hp:number, isTurret:boolean=false, turret:object={}) {
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

    render(canvasId:string) {
        const canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.centre.x, this.centre.y);
        ctx.rotate(this.rOffset);
        ctx.translate(this.offset.x, this.offset.y);
        ctx.scale(this.scaleFactor, this.scaleFactor);
        drawPolygon(canvasId, this.vertices, this.style);
    }
}

export class ship {
    physics: physicsObject;
    body: Array<part>;
    actions: Array<object>;
    team: string;

    constructor(team:string, position:vector2, facing:number, mass:number, thrust:number, rotationSpeed:number, body:Array<part>) {
        this.physics = new physicsObject(position, facing, mass, thrust, rotationSpeed);
        this.body = body;
        this.actions = [];
        this.team = team;
    }

    prepareCanvas(canvasId:string, cameraPos:vector2, window: vector2) {
        const canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.rotate(this.physics.r);
        ctx.translate(this.physics.pos.x-cameraPos.x+window.x, this.physics.pos.y-cameraPos.y+window.y);
    }
}

export class gamestate {
    player: object;
    projectiles: Array<object>;
    entities: Array<object>;

    constructor(player:object, entities:Array<object>, projectiles:Array<object>) {
        this.player = player;
        this.entities = entities;
        this.projectiles = projectiles;
    }
}

export class spaceshipGameV2 {
    gamestate: gamestate;
    keyboard: Record<string, boolean>;
    particles: object;
    mousepos: vector2;
    display: vector2;
    debug: boolean;
   
    constructor(gamestate:gamestate) {
        this.gamestate = gamestate;
        this.keyboard = {};
        this.mousepos = new vector2(0, 0);
        this.particles = {};
        this.display = new vector2();
        this.debug = false;
    }
}

// helper functions
export function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function deepFreeze(obj:object) {
    let propNames = Object.getOwnPropertyNames(obj);
    for (let name of propNames) {
        let value = obj[name as keyof object];
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

export function randchoice(list:Array<any>, remove:boolean=false) { // chose 1 from a list and update list
    let length = list.length;
    let choice = randint(0, length-1);
    if (remove) {
        let chosen = list.splice(choice, 1);
        return [chosen, list];
    }
    return list[choice];
}

export function randint(min:number, max:number) {
    if (max - min < 1) {
        return min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randProperty(obj:object) { // stolen from stack overflow
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0] as keyof object];
};

// Bootleg Game Engine: math
export function aim(pos1:vector2, pos2:vector2) {
    if (pos1 == pos2) return 0;
    let diff = {x: pos2.x - pos1.x, y: pos1.y - pos2.y};
    if (diff.x == 0) {
        if (diff.y > 0) return 0;
        else return Math.PI;
    } else if (diff.y == 0) {
        if (diff.x > 0) return Math.PI/2;
        else return 3*Math.PI/2;
    }
    let angle = Math.atan(Math.abs(diff.y / diff.x));
    if (diff.x > 0 && diff.y > 0) return Math.PI/2 - angle;
    else if (diff.x > 0 && diff.y < 0) return Math.PI/2 + angle;
    else if (diff.x < 0 && diff.y < 0) return 3*Math.PI/2 - angle;
    else return 3*Math.PI/2 + angle;
};

// Bootleg Game Engine: rendering
export function replacehtml(elementId:string, text:string) {
    const element = document.getElementById(elementId);
    if (element) element.innerHTML = text;
}

export function addhtml(elementId:string, text:string) {
    const element = document.getElementById(elementId);
    if (element) element.innerHTML = element.innerHTML + text;
}

export function clearCanvas(canvasId:string, from:vector2, to:vector2) {
    const canvas = <HTMLCanvasElement> document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(from.x, from.y, to.x, to.y);
    ctx.restore();
}

export function drawPolygon(canvasId:string, polygon: Array<vector2>, style:style) {
    const points = JSON.parse(JSON.stringify(polygon));
    const canvas = <HTMLCanvasElement> document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.moveTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    if (style.fillColour) {
        ctx.fillStyle = style.fillColour.toColour();
        ctx.fill();
    }
    if (style.outlineColour && style.thickness > 0) {
        ctx.lineWidth = style.thickness;
        ctx.strokeStyle = style.outlineColour.toColour();
        ctx.stroke();
    }
};

