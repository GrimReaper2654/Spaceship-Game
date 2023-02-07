// Teams
const RED = 'RED';
const GREEN = 'GREEN';
const FRIENDLY = 'FRIENDLY';
const HOSTILE = 'HOSTILE';

// Weapon types
const FIXED = 'FIXED';
const TURRET = 'TURRET';

// Turrets
const PD = 'PD';
const SMALL = 'SMALL';
const MEDIUM = 'MEDIUM';
const LARGE = 'LARGE';
const HUGE = 'HUGE';
const BOMB = 'BOMB';

// Control
const CLICK = 'CLICK';
const ATTACK = 'ATTACK';
const ESCORT = 'ESCORT';
const IDLE = 'IDLE';

// Ship Types
const BATTLESHIP = 'BATTLESHIP';
const CRUISER = 'CRUISER';
const DESTROYER = 'DESTROYER';
const FRIGATE = 'FRIGATE';
const INTERCEPTOR = 'INTERCEPTOR';
const BOMBER = 'BOMBER';
const ALL = 'ALL';
const CAPITAL = ['BATTLESHIP','CRUISER'];
const FIGHTER = ['INTERCEPTOR','BOMBER'];
const NOTCAPITAL = ['DESTROYER','FRIGATE','INTERCEPTOR','BOMBER'];
const NOTFIGHTER = ['BATTLESHIP','CRUISER','DESTROYER','FRIGATE'];

const data = {
    display: {x:window.innerWidth,y:window.innerHeight},
    dim: {
        BATTLESHIP:{x:497,y:152}, 
        INTERCEPTOR:{x:73,y:45}, 
        LARGETURRET:{x:109,y:44}, 
        MEDIUMTURRET:{x:45,y:28},
        SMALLTURRET:{x:37,y:17},
        PDTURRET:{x:17,y:10},
        HUGEBULLET:{x:15,y:8}, 
        LARGEBULLET:{x:7,y:24}, 
        MEDIUMBULLET:{x:5,y:12}, 
        SMALLBULLET:{x:3,y:1}, 
        PDBULLET:{x:0,y:0}, 
    },
    center: {
        BATTLESHIP:{x:240,y:76}, 
        INTERCEPTOR:{x:35,y:22.5}, 
        LARGETURRET:{x:36,y:22},
        MEDIUMTURRET:{x:20,y:14}, 
        SMALLTURRET:{x:9,y:8.5},
        PDTURRET:{x:6,y:5},
        HUGEBULLET:{x:0,y:4}, 
        LARGEBULLET:{x:0,y:12}, 
        MEDIUMBULLET:{x:0,y:6}, 
        SMALLBULLET:{x:0,y:0.5}, 
        PDBULLET:{x:0,y:0}, 
    },
    hitbox: { // all sprites will use circular hitboxes (ez to code) Note: 'r' is radius not rotation
        BATTLESHIP: [ // so many hitboxes... so much lag... 
            {x:40, y:76, r:25}, 
            {x:120, y:76, r:75},
            {x:220, y:76, r:60},
            {x:280, y:76, r:60},
            {x:360, y:76, r:40},
            {x:400, y:76, r:30},
            {x:440, y:76, r:30},
            {x:480, y:76, r:20},
        ],
        INTERCEPTOR: [ // annoyingly small and hard to hit
            {x:25, y:22.5, r:22.5}, 
            {x:52.5, y:22.5, r:10}, 
        ],
        HUGEBULLET: [ // wider than you think
            {x:7.5, y:4, r:7.5}, 
        ],
        LARGEBULLET: [ // I would make 3 hitboxes for the 3 bullets but lag...
            {x:3.5, y:12, r:12}, 
        ],
        MEDIUMBULLET: [ // the 2 lasers share 1 hitbox
            {x:2.5, y:6, r:6}, 
        ],
        SMALLBULLET: [ // large-ish hitbox so you can actually hit something
            {x:1.5, y:0.5, r:2}, 
        ],
        PDBULLET: [ // no hitbox necessary
            {x:0, y:0, r:0}, 
        ],
    },
    img: {
        REDBATTLESHIP: document.getElementById("BattleshipRed"),
        REDINTERCEPTOR: document.getElementById("InterceptorRed"),

        REDLARGETURRET: document.getElementById("MainCannonRed"),
        REDMEDIUMTURRET: document.getElementById("SmallCannonRed"),
        REDSMALLTURRET: document.getElementById("TinyCannonRed"),
        REDPDTURRET: document.getElementById("PDCannon"),

        GREENBATTLESHIP: document.getElementById("BattleshipGreen"),
        GREENINTERCEPTOR: document.getElementById("InterceptorGreen"),

        GREENLARGETURRET: document.getElementById("MainCannonGreen"),
        GREENMEDIUMTURRET: document.getElementById("SmallCannonGreen"),
        GREENSMALLTURRET: document.getElementById("TinyCannonGreen"),
        GREENPDTURRET: document.getElementById("PDCannon"),

        HUGEBULLET: document.getElementById("BulletHuge"),
        LARGEBULLET: document.getElementById("BulletLarge"),
        MEDIUMBULLET: document.getElementById("BulletSmall"),
        SMALLBULLET: document.getElementById("BulletTiny"),
        PDBULLET: document.getElementById("BulletPD"),
    },
    BATTLESHIPMOUNT: {
        LARGETURRET: [{x:272,y:76}, {x:177,y:76}],
        MEDIUMTURRET: [{x:329,y:76}, {x:406,y:76}],
    },
    INTERCEPTORMOUNT: {
        SMALLTURRET: [{x:59,y:17}, {x:59,y:29}],
    },
    construction: {
        AI: {
            target: '',
            task: '',
            method: '',
            int: 1, // Lower is further sensor range
        },
        BATTLESHIP: {
            thrust: 0.0014,
            agi: 0.005,
            terminalAcceleration:0.15,
            terminalVelocity:3,
            drag: 0.001,
            scale: 1,
            // Stats
            hp: 1000000,
            shield: 10000,
        },
        INTERCEPTOR: {
            thrust: 0.1,
            agi: 0.05,
            terminalAcceleration:1,
            terminalVelocity:15,
            drag: 0.001,
            scale: 1,
            // Stats
            hp: 1500,
            shield: 100,
        },
        HUGEBULLET: { // cannon shell
            v: 20,
            dmg: 8000, // 2666.66 DPS for Battleship
            dmgvb: 0,
            life: 180,
            physical: true
        },
        LARGEBULLET: { // cannon shell
            v: 30,
            dmg: 10000, // 8000 DPS for Battleship
            dmgvb: 0,
            life: 120,
            physical: true
        },
        MEDIUMBULLET: { // laser
            v: 60,
            dmg: 1000,  // 1333.33 DPS for Battleship
            dmgvb: 0,
            life: 30,
            physical: false
        },
        SMALLBULLET: { // laser
            v: 60,
            dmg: 100,   // 450*2 DPS for Interceptor
            dmgvb: 0,
            life: 10,
            physical: false
        },
        PDBULLET: { // point defence (∞ ms^-1 and no image)
            v: 250,
            dmg: 2,     // 120 DPS against ships
            dmgvb: 100, // 2000 against large bullet, 3100 against huge bullet
            life: 1,
            physical: false
        },
    }
};

var mousepos = {x:0,y:0};

/* Play as interceptor
var player = {
    // Physics
    x: data.display.x/2,
    y: data.display.y/2,
    px: data.display.x/2,
    py: data.display.y/2,
    v: 0,
    vx: 0,
    vy: 0,
    r: 0,
    a: 0,
    thrust: 0.1,
    agi: 0.05,
    terminalAcceleration:1,
    terminalVelocity:15,
    drag: 0.0001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.INTERCEPTOR)),
    // Stats
    hp: 1500,
    shield: 100,
    team: RED,
    type: INTERCEPTOR,
    aiControl: false,
    id: 69420,
    // Weapons
    weapons: [
        {
            // CONTROL
            type: FIXED,
            size: SMALL,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.INTERCEPTORMOUNT.SMALLTURRET[0].x,
            y: data.INTERCEPTORMOUNT.SMALLTURRET[0].y,
            ax: data.INTERCEPTORMOUNT.SMALLTURRET[0].x,
            ay: data.INTERCEPTORMOUNT.SMALLTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0,
            arc: 0,
            recoilAmount: 0,
            recoil: 0,
            // STATS
            reloadTime: 10,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1
            }
        },
        {
            // CONTROL
            type: FIXED,
            size: SMALL,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.INTERCEPTORMOUNT.SMALLTURRET[1].x,
            y: data.INTERCEPTORMOUNT.SMALLTURRET[1].y,
            ax: data.INTERCEPTORMOUNT.SMALLTURRET[1].x,
            ay: data.INTERCEPTORMOUNT.SMALLTURRET[1].y,
            facing: 0,
            aim: 0,
            agi: 0,
            arc: 0,
            recoilAmount: 0,
            recoil: 0,
            // STATS
            reloadTime: 10,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1,
            }
        },
    ],
    // Input
    hasClicked: 0,
    keyboard: {},
}*/
var player = { // Play as Battleship
    // Physics
    x: data.display.x/2,
    y: data.display.y/2,
    px: data.display.x/2,
    py: data.display.y/2,
    v: 0,
    vx: 0,
    vy: 0,
    r: 0,
    a: 0,
    thrust: 0.0014,
    agi: 0.005,
    terminalAcceleration:0.15,
    terminalVelocity:3,
    drag: 0.001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.BATTLESHIP)),
    // Stats
    hp: 1000000,
    shield: 10000,
    team: RED,
    type: BATTLESHIP,
    aiControl: false,
    id: 69420,
    // Weapons
    weapons: [
        {
            // CONTROL
            type: FIXED,
            size: HUGE,
            ai: false,
            keybind: 'e',
            // PHYSICS
            x: data.dim.BATTLESHIP.x,
            y: data.center.BATTLESHIP.y,
            ax: data.dim.BATTLESHIP.x,
            ay: data.center.BATTLESHIP.y,
            facing: 0,
            aim: 0,
            agi: 0,
            arc: 0,
            recoilAmount: 0,
            recoil: 0,
            // STATS
            engagementRange: 3600,
            spread: 5*Math.PI/180,
            reloadTime: 180,
            reload: 0,
            bullet: {
                dmgMultiplier: 1,
                speedMultiplier: 1
            }
        },
        {
            // CONTROL
            type: TURRET,
            size: MEDIUM,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
            y: data.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
            ax: data.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
            ay: data.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 45,
            reload: 0,
            bullet: {
                dmgMultiplier: 1,
                speedMultiplier: 1
            }
        },
        {
            // CONTROL
            type: TURRET,
            size: MEDIUM,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
            y: data.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
            ax: data.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
            ay: data.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 45,
            reload: 0,
            bullet: {
                dmgMultiplier: 1,
                speedMultiplier: 1
            }
        },
        {
            // CONTROL
            type: TURRET,
            size: LARGE,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.BATTLESHIPMOUNT.LARGETURRET[0].x,
            y: data.BATTLESHIPMOUNT.LARGETURRET[0].y,
            ax: data.BATTLESHIPMOUNT.LARGETURRET[0].x,
            ay: data.BATTLESHIPMOUNT.LARGETURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0.015,
            arc: 270*Math.PI/180,
            recoilAmount: 10,
            recoil: 0,
            // STATS
            engagementRange: 3600,
            spread: 0,
            reloadTime: 75,
            reload: 0,
            bullet: {
                dmgMultiplier: 1,
                speedMultiplier: 1
            }
        },
        {
            // CONTROL
            type: TURRET,
            size: LARGE,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.BATTLESHIPMOUNT.LARGETURRET[1].x,
            y: data.BATTLESHIPMOUNT.LARGETURRET[1].y,
            ax: data.BATTLESHIPMOUNT.LARGETURRET[1].x,
            ay: data.BATTLESHIPMOUNT.LARGETURRET[1].y,
            facing: 0,
            aim: 0,
            agi: 0.015,
            arc: 270*Math.PI/180,
            recoilAmount: 10,
            recoil: 0,
            // STATS
            engagementRange: 3600,
            spread: 0,
            reloadTime: 75,
            reload: 0,
            bullet: {
                dmgMultiplier: 1,
                speedMultiplier: 1
            }
        },
    ],
    aimMode: 'Parallel',
    // Input
    hasClicked: 0,
    keyboard: {},
}

var sampleEnemy = {
    // Physics
    x: 200,
    y: 200,
    px: 200,
    py: 200,
    v: 0,
    vx: 0,
    vy: 0,
    r: 0,
    a: 0,
    thrust: 0.1,
    agi: 0.05,
    terminalAcceleration:1,
    terminalVelocity:15,
    drag: 0.0001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.INTERCEPTOR)),
    // Stats
    hp: 1500,
    shield: 100,
    team: RED,
    type: INTERCEPTOR,
    aiControl: false,
    id: 25000, // Team (1,2) type (1-6) number (0-1000)
    // Weapons
    weapons: [
        {
            // CONTROL
            type: FIXED,
            size: SMALL,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.INTERCEPTORMOUNT.SMALLTURRET[0].x,
            y: data.INTERCEPTORMOUNT.SMALLTURRET[0].y,
            ax: data.INTERCEPTORMOUNT.SMALLTURRET[0].x,
            ay: data.INTERCEPTORMOUNT.SMALLTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0,
            arc: 0,
            recoilAmount: 0,
            recoil: 0,
            // STATS
            engagementRange: 600,
            spread: 2*Math.PI/180,
            reloadTime: 10,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1
            }
        },
        {
            // CONTROL
            type: FIXED,
            size: SMALL,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.INTERCEPTORMOUNT.SMALLTURRET[1].x,
            y: data.INTERCEPTORMOUNT.SMALLTURRET[1].y,
            ax: data.INTERCEPTORMOUNT.SMALLTURRET[1].x,
            ay: data.INTERCEPTORMOUNT.SMALLTURRET[1].y,
            facing: 0,
            aim: 0,
            agi: 0,
            arc: 0,
            recoilAmount: 0,
            recoil: 0,
            // STATS
            engagementRange: 600,
            spread: 2*Math.PI/180,
            reloadTime: 10,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1,
            }
        },
    ],
    target: '',
    task: '',
    method: '',
    int: 1, // Lower is further sensor range
}

var ships = [player, sampleEnemy];
var projectiles = [];

function replacehtml(text) {
    document.getElementById("game").innerHTML = text;
};

function replaceControlPannel(text) {
    document.getElementById("controlPannel").innerHTML = text;
};

function load() {
    console.log('Started the game');
    replacehtml(`<canvas id="main" width="${data.display.x}" height="${data.display.y}"></canvas>`);
};

function addImage(img, x, y, cx, cy, scale, r) {
    var c = document.getElementById("main");
    var ctx = c.getContext("2d");
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(r);
    ctx.drawImage(img, -cx, -cy);
}

function clearCanvas() {
    var c = document.getElementById("main");
    var ctx = c.getContext("2d");
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, data.display.x, data.display.y);
    ctx.restore();
}

function handleInputs(player) {
    //console.log('aaa');
    //console.log(player.keyboard);
    if (player.keyboard.w) { // Move Forward
        player.a += player.thrust*2; // IMPORTANT: add 2 times thrust to player
    }
    if (player.keyboard.s) {
        player.a -= player.thrust*2;
        if (player.a < -player.terminalAcceleration/4) {
            player.a = -player.terminalAcceleration/4;
        }
    }
    if (player.keyboard.a) { 
        player.r -= player.agi;
        if (player.r >= 2*Math.PI) {
            player.r -= Math.PI*2;
        } else if (player.r <= -2*Math.PI) {
            player.r += Math.PI*2;
        }
        /*
        for (var i=0; i< player.weapons.turretAim.length; i+=1) {
            player.weapons.turretAim[i] -=  player.agi;
        }*/
    }
    if (player.keyboard.d) { 
        player.r += player.agi;
        if (player.r >= 2*Math.PI) {
            player.r -= Math.PI*2;
        } else if (player.r <= -2*Math.PI) {
            player.r += Math.PI*2;
        }
        /*
        for (var i=0; i< player.weapons.turretAim.length; i+=1) {
            player.weapons.turretAim[i] +=  player.agi;
        }*/
    }
    if (player.keyboard.q) {
        if (player.aimMode == 'Parallel') {
            player.aimMode = 'Converge';
        } else {
            player.aimMode = 'Parallel';
        }
        console.log(`Aiming mode: ${player.aimMode}`);
    }
    for (var i = 0; i < player.weapons.length; i+=1) {
        if (player.weapons[i].keybind == CLICK) {
            if (player.hasClicked) {
                console.log('try shoot');
                player.weapons[i] = attemptShoot(player.weapons[i], player.team, player.r);
            }
        } else {
            if (player.keyboard[player.weapons[i].keybind]) {
                player.weapons[i] = attemptShoot(player.weapons[i], player.team, player.r);
            }
        }
    }
    //player.keyboard = {};
    player.hasClicked = 0;
    return player;
}

function handlemovement(obj) {
    obj.px = obj.x;
    obj.py = obj.y;
    if (obj.a > 0) {
        obj.a -= obj.thrust;
        if (obj.a < 0) {
            obj.a = 0;
        }
    }
    if (obj.a === 0 && obj.v != 0) {
        if (obj.v > 0) {
            obj.v -= obj.drag;
        } else {
            obj.v += obj.drag;
        }
        if (Math.abs(obj.v) <= obj.drag) {
            obj.v = 0;
        }
    }
    if (Math.abs(obj.a) > obj.terminalAcceleration) {
        obj.a = obj.terminalAcceleration;
    }
    if (Math.abs(obj.v) > obj.terminalVelocity) {
        obj.v = obj.terminalVelocity;
    }
    if (obj.v < obj.terminalVelocity/8 && obj.v < 0) {
        obj.v = obj.terminalVelocity/8;
    }
    obj.x += obj.vx;
    obj.y += obj.vy;
    obj.vx = obj.v*Math.cos(obj.r);
    obj.vy = obj.v*Math.sin(obj.r);
    obj.v += obj.a;
    //console.log(`V: ${obj.v}`);
    //console.log(`A: ${obj.a}`);
    return obj
}

function turretPos(type, x, y, r, weapon) { // I spent two thirds of my life in school for this...
    var rx = weapon.x;
    var ry = weapon.y;
    rx -= data.dim[type].x/2;
    ry -= data.dim[type].y/2;
    // Offset x
    x += Math.cos(r)*rx;
    y += Math.sin(r)*rx;
    // Offset y
    x += Math.cos(r-Math.PI/2)*ry;
    y += Math.sin(r-Math.PI/2)*ry;
    // Recoil
    x -= Math.cos(weapon.aim+r)*weapon.recoil;
    y -= Math.sin(weapon.aim+r)*weapon.recoil;
    return {x: x, y: y};
}

function hitboxPos(type, x, y, rx, ry, r, radius) { // turretPos but adapted to work for hitboxes (radius is not used)
    rx -= data.dim[type].x/2;
    ry -= data.dim[type].y/2;
    // Offset x
    x += Math.cos(r)*rx;
    y += Math.sin(r)*rx;
    // Offset y
    x += Math.cos(r-Math.PI/2)*ry;
    y += Math.sin(r-Math.PI/2)*ry;
    return {x: x, y: y, r: radius};
}

function target(sPos, tPos) { // WARNING: Horifically inefficient coding (there goes 3 hours of my life...)
    // Huh, how does this work?
    var dx = tPos.x - sPos.x;
    var dy = tPos.y - sPos.y;
    var rotation = Math.atan(dy/dx);
    if (dx < 0) {
        rotation = Math.PI + rotation;
    }
    if (rotation > Math.PI && rotation < Math.PI*1.5) {
        rotation = -(2*Math.PI-rotation);
    }
    return rotation; // rotation is absolute
}

function getDist(sPos, tPos) { 
    // Mathematics METHods
    var dx = tPos.x - sPos.x;
    var dy = tPos.y - sPos.y;
    var dist = Math.sqrt(dx*dx+dy*dy);
    return dist;
}

function correctAngle(a) {
    a = a%(Math.PI*2);
    if (a > Math.PI) {
        a = -(2*Math.PI-a);
    } else if (aim < -Math.PI) {
        a = (2*Math.PI+a);
    }
    return a;
}

function turretRot(currentRot, rotSpeed, rotLimit, facing, aimPos, aimType, shipPos, cannonPos, currentAim){ // Only god knows how this works (or doesn't work)...
    // 15 hours of my life and 4 failed prototypes later...
    if (aimType == 'Parallel') {
        aim = target(shipPos, aimPos);
    } else {
        aim = target(cannonPos, aimPos);
    }
    aim -= currentRot;
    if (aim > Math.PI && aim < Math.PI*1.5) {
        aim = -(2*Math.PI-aim);
    }
    aim = aim%(2*Math.PI);
    aim = correctAngle(aim);
    //console.log(`Step0: caim: ${currentAim*180/Math.PI}`);
    //console.log(`Step1: aim: ${aim*180/Math.PI}`);
    currentRot = correctAngle(currentRot);
    //console.log(`Step2: ship rotation: ${currentRot*180/Math.PI}`);
    if (currentAim < 0) {
        currentAim += Math.PI*2;
    }

    currentAim = currentAim%(Math.PI*2);
    currentAim = correctAngle(currentAim);
    //console.log(`Step3: turret rotation: ${currentAim*180/Math.PI}`);
    var relativeAim = aim;
    var possibleRot = Math.round((relativeAim - currentAim)*100)/100; 
    //console.log(`Step4.1: possible rot: ${possibleRot*180/Math.PI}`);
    if (possibleRot > 0 && (Math.PI-currentAim) < possibleRot) {
        possibleRot = Math.round((currentAim - relativeAim)*100)/100; 
        //console.log(`Step4.2: corrected possible rot: ${possibleRot*180/Math.PI}`);
    }
    necessaryRot = possibleRot;
    //console.log(`Step5: necessary turret rotation: ${necessaryRot*180/Math.PI}`);
    if (necessaryRot > 0) {
        currentAim += rotSpeed*2;
        //console.log('rotate +');
    } else if (necessaryRot < 0) {
        currentAim -= rotSpeed*2;
        //console.log('rotate -');
    }
    if (Math.abs(relativeAim-currentAim) < rotSpeed) {
        currentAim = relativeAim;
        //console.log('target');
    }
    currentAim = correctAngle(currentAim);
    //console.log(`Step6: after motion relative turret rotation: ${currentAim*180/Math.PI}`);
    if (currentAim < -rotLimit/2+facing) {
        currentAim = -rotLimit/2+facing;
    } else if (currentAim > rotLimit/2+facing) {
        currentAim = rotLimit/2+facing;
    }
    currentAim = correctAngle(currentAim);
    //console.log(`Step7: after collision turret rotation: ${currentAim*180/Math.PI}`);
    return currentAim;
}

function aimTurrets(ship) {
    for (var i = 0; i < ship.weapons.length; i+=1) {
        var pos = turretPos(ship.type,ship.x,ship.y,ship.r,ship.weapons[i]);
        ship.weapons[i].ax = pos.x;
        ship.weapons[i].ay = pos.y;
        if (ship.weapons[i].type == TURRET) {
            if (ship.weapons[i].ai) {
                var aiTarget = {x:0,y:0}; // TODO: add targeting AI
                ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, aiTarget, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
            } else {
                ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, mousepos, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
            }
        }
    }
    return ship;
}

function addShip(ship) {
    addImage(data.img[ship.team+ship.type], ship.x, ship.y, data.center[ship.type].x, data.center[ship.type].y, 1, ship.r);
    for (var i = 0; i < ship.weapons.length; i+=1) {
        if (ship.weapons[i].type == TURRET) {
            //console.log(ship.team+ship.weapons[i].size+'TURRET');
            addImage(data.img[ship.team+ship.weapons[i].size+'TURRET'], ship.weapons[i].ax*ship.scale, ship.weapons[i].ay*ship.scale, data.center[ship.weapons[i].size+'TURRET'].x*ship.scale, data.center[ship.weapons[i].size+'TURRET'].y*ship.scale, ship.scale, ship.weapons[i].aim+ship.r);
        }
    }
}

function handleMotion(objs) {
    for (var i=0; i < objs.length; i+=1) {
        objs[i] = handlemovement(objs[i]);
    }
    return objs;
}

function attemptShoot(weapon, team, shipRot) {
    if (weapon.reload == 0) {
        shoot(weapon, team, shipRot);
        weapon.reload = weapon.reloadTime;
        weapon.recoil = weapon.recoilAmount;
    }
    return weapon;
}

function shoot(weapon, team, shipRot) {
    var angle = weapon.aim + shipRot;
    var bullet = JSON.parse(JSON.stringify(data.construction[weapon.size+'BULLET'])); // Deep copy (probably don't need to do it for everything but better safe than sorry, and I'm lazy) 
    bullet.hitbox = JSON.parse(JSON.stringify(data.hitbox[weapon.size+'BULLET']));
    bullet.v *= JSON.parse(JSON.stringify(weapon.bullet.speedMultiplier));
    bullet.dmg *= JSON.parse(JSON.stringify(weapon.bullet.dmgMultiplier));
    bullet.dmgvb *= JSON.parse(JSON.stringify(weapon.bullet.dmgMultiplier));
    bullet.type = JSON.parse(JSON.stringify(weapon.size+'BULLET'));
    bullet.team = JSON.parse(JSON.stringify(team));
    bullet.x = JSON.parse(JSON.stringify(weapon.ax));
    bullet.y = JSON.parse(JSON.stringify(weapon.ay));
    bullet.px = JSON.parse(JSON.stringify(weapon.ax));
    bullet.py = JSON.parse(JSON.stringify(weapon.ay));
    bullet.vx = JSON.parse(JSON.stringify(bullet.v*Math.cos(bullet.r)));
    bullet.vy = JSON.parse(JSON.stringify(bullet.v*Math.sin(bullet.r)));
    bullet.r = angle+(Math.random()-0.5)*weapon.spread;
    bullet.a = 0;
    bullet.thrust = 0;
    bullet.terminalAcceleration = 0;
    bullet.terminalVelocity = Infinity;
    bullet.drag = 0;
    projectiles.push(bullet);
}

window.onkeyup = function(e) { player.keyboard[e.key] = false; }
window.onkeydown = function(e) { player.keyboard[e.key] = true; }

document.onclick = function(e) {
    player.hasClicked = 1;
};

function tellPos(p){
    mousepos = {x: p.pageX, y:p.pageY};
}
addEventListener('mousemove', tellPos, false);
  
console.log(player);
console.log(player.keyboard);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawCircle(x, y, radius, fill, stroke, strokeWidth) { // draw a circle (I coppied most of this from stack overflow) also does not work
    var canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");
    ctx.resetTransform();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }
}

function updateHitboxes(obj, show) {
    for (var i = 0; i < obj.hitbox.length; i+=1) {
        obj.hitbox[i] = hitboxPos(obj.type, obj.x, obj.y, data.hitbox[obj.type][i].x, data.hitbox[obj.type][i].y, obj.r, obj.hitbox[i].r);
        if (show) {
            //console.log(obj.hitbox[i]);
            //drawCircle(obj.hitbox[i].x+obj.x-data.center[obj.type].x, obj.hitbox[i].y+obj.y-data.center[obj.type].y, obj.hitbox[i].r, false, 'white', 2);
            drawCircle(obj.hitbox[i].x, obj.hitbox[i].y, obj.hitbox[i].r, false, 'white', 2);
        }
    }
    return obj;
}

function handlePlayer(player) {
    player = handleInputs(player);
    player = aimTurrets(player);
    player = handlemovement(player);
    addShip(player);
    player = updateHitboxes(player, true);
    return player;
}

// AI attack methods (I have no idea how to make these)
function circleStrafe(attacker, target, dist, variation) { // circle around the target (fighters only)

}

function escort(attacker, target, dist) { // follow a target (can also follow a friendly ship)
    if (getDist({x: attacker.x,y: attacker.y},{x: target.x,y: target.y} > dist)) {
        var aim = target({x:attacker.x,y:attacker.y},{x:target.x,y:target.y});
        var rAim = aim - attacker.r // relative aim
        if (rAim != 0) {
            if (rAim > 0 && rAim < Math.PI) {
                attacker.r += attacker.agi;
            } else {
                attacker.r -= attacker.agi;
            }
        }
        if (abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
            attacker.r = aim;
        }
        attacker.a += attacker.thrust*2;
    } else {
        var aim = target.r
        var rAim = aim - attacker.r // relative aim
        if (rAim != 0) {
            if (rAim > 0 && rAim < Math.PI) {
                attacker.r += attacker.agi;
            } else {
                attacker.r -= attacker.agi;
            }
        }
        if (abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
            attacker.r = aim;
        }
        if (attacker.v < target.v) { // try to match target's speed
            attacker.a += attacker.thrust*2;
        } else {
            attacker.a -= attacker.thrust*2;
        }
    }
}

function chase(attacker, target, dist) { // follow a target while shooting them
    if (getDist({x: attacker.x,y: attacker.y},{x: target.x,y: target.y} > dist)) {
        var aim = target({x:attacker.x,y:attacker.y},{x:target.x,y:target.y});
        var rAim = aim - attacker.r // relative aim
        if (rAim != 0) {
            if (rAim > 0 && rAim < Math.PI) {
                attacker.r += attacker.agi;
            } else {
                attacker.r -= attacker.agi;
            }
        }
        if (abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
            attacker.r = aim;
        }
        attacker.a += attacker.thrust*2;
    } else {
        var aim = target.r
        var rAim = aim - attacker.r // relative aim
        if (rAim != 0) {
            if (rAim > 0 && rAim < Math.PI) {
                attacker.r += attacker.agi;
            } else {
                attacker.r -= attacker.agi;
            }
        }
        if (abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
            attacker.r = aim;
        }
        if (attacker.v < target.v) { // try to match target's speed
            attacker.a += attacker.thrust*2;
        } else {
            attacker.a -= attacker.thrust*2;
        }
    }

}

function hitAndRun(attacker, target, minDist, variaton) { // fly towards emeny while firing and flee when too close (interceptor only)
    var aim = target({x:attacker.x,y:attacker.y},{x:target.x,y:target.y});
    console.log(`step 1: aim ${aim} cr ${attacker.r}`);
    var rAim = aim - attacker.r // relative aim
    if (rAim != 0) {
        if (rAim > 0 && rAim < Math.PI) {
            attacker.r += attacker.agi;
        } else {
            attacker.r -= attacker.agi;
        }
    }
    if (abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
        attacker.r = aim;
    }
    attacker.a += attacker.thrust*2;
    console.log(`step 2: fr ${attacker.r}`);
    if (getDist({x: attacker.x,y: attacker.y},{x: target.x,y: target.y}) < attacker.weapons[0].engagementRange && Math.abs(attacker.r-aim) < tolerence*Math.PI*2) {
        for (var i = 0; i < attacker.weapons.length; i+=1) {
            attemptShoot(attacker.weapons[i], attacker.team, attacker.r);
        }
    }
    var nearest = minDist+1;
    for (var i = 0; i < target.hitbox.length; i+=1) {
        var distance = getDist({x: attacker.x,y: attacker.y},target.hitbox[i]) + target.hitbox[i].r;
        if (distance < nearest) {
            nearest = distance;
        }
    }
    if (nearest < minDist) {
        attacker.method = 'flee';
    }
}

function flee(attacker, target, dist) { // run away (attacker is the fleeing ship)
    var aim = target({x:attacker.x,y:attacker.y},{x:target.x,y:target.y});
    var rAim = aim - attacker.r // relative aim
    rAim+=Math.PI;
    rAim = correctAngle(rAim);
    if (rAim != 0) {
        if (rAim > 0 && rAim < Math.PI) {
            attacker.r += attacker.agi;
        } else {
            attacker.r -= attacker.agi;
        }
    }
    attacker.a += attacker.thrust*2;
    if (getDist({x:attacker.x,y:attacker.y},{x:target.x,y:target.y}) > dist) {
        attacker.method = '';
    }
}

function bombingRun(attacker, target, variaton) { // fly over the enemy, dropping bombs on them (bomber only)
    var aim = target({x:attacker.x,y:attacker.y},{x:target.x,y:target.y});
    console.log(`step 1: aim ${aim} cr ${attacker.r}`);
    var rAim = aim - attacker.r // relative aim
    if (rAim != 0) {
        if (rAim > 0 && rAim < Math.PI) {
            attacker.r += attacker.agi;
        } else {
            attacker.r -= attacker.agi;
        }
    }
    if (abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
        attacker.r = aim;
    }
    attacker.a += attacker.thrust*2;
    var shouldAttack = false;
    for (var i = 0; i < target.hitbox.length; i+=1) {
        var distance = getDist({x: attacker.x,y: attacker.y},target.hitbox[i]);
        if (distance < target.hitbox[i].r) {
            shouldAttack = true;
        }
    }
    if (shouldAttack) {
        for (var i = 0; i < attacker.weapons.length; i+=1) {
            attemptShoot(attacker.weapons[i], attacker.team, attacker.r);
        }
    }
}

function snipe(attacker, target, distance) { // maintain distance and shoot at the target (ships with turrets only)

}

function ram(attacker, target) { // get close to the enemy while shooting them and ram them
    var aim = target({x:attacker.x,y:attacker.y},{x:target.x,y:target.y});
    console.log(`step 1: aim ${aim} cr ${attacker.r}`);
    var rAim = aim - attacker.r // relative aim
    if (rAim != 0) {
        if (rAim > 0 && rAim < Math.PI) {
            attacker.r += attacker.agi;
        } else {
            attacker.r -= attacker.agi;
        }
    }
    if (abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
        attacker.r = aim;
    }
    attacker.a += attacker.thrust*2;
    console.log(`step 2: fr ${attacker.r}`);
    if (getDist({x: attacker.x,y: attacker.y},{x: target.x,y: target.y}) < attacker.weapons[0].engagementRange && Math.abs(attacker.r-aim) < tolerence*Math.PI*2) {
        for (var i = 0; i < attacker.weapons.length; i+=1) {
            attemptShoot(attacker.weapons[i], attacker.team, attacker.r);
        }
    }
}

function idle(ship) { // wander around the map
    if (ship.target = '') {
        ship.target = {x: Math.random()*data.display.x,y: Math.random()*data.display.y};
    }
    var aim = target({x: ship.x,y: ship.y},{x:ship.target.x,y:ship.target.y});
    var rAim = aim - ship.r // relative aim
    if (rAim != 0) {
        if (rAim > 0 && rAim < Math.PI) {
            ship.r += ship.agi;
        } else {
            ship.r -= ship.agi;
        }
    }
    if (getDist({x: ship.x,y: ship.y},{x:ship.target.x,y:ship.target.y}) > 500 || ship.v < ship.terminalVelocity/4) {
        ship.a += ship.thrust*2;
    }
    if (getDist({x: ship.x,y: ship.y},{x:ship.target.x,y:ship.target.y}) < 200) {
        ship.target = '';
    }
    return ship;
}

// Other functions
function autoTarget(type, team, pos, shipType, dist) { // inefficient, switch the order of the checks for better performance
    var target = false;
    var minDist = dist+1;
    for (var i = 0; i < ships.length; i+=1) {
        if ((ships[i].team != team && type == HOSTILE) || (ships[i].team == team && type == FRIENDLY)) {
            var shouldCalculate = false;
            if (shipType != ALL) {
                if (shipType == FIGHTER || shipType == CAPITAL) {
                    for (var j = 0; j < shipType.length; j+=1) {
                        if (ships[i].type == shipType[j]) {
                            shouldCalculate = true;
                        }
                    }
                } else {
                    if (ships[i].type == shipType[j]) {
                        shouldCalculate = true;
                    }
                }
            }
            if (shouldCalculate) {
                if (Math.sqrt(abs(ships[i].x-pos.x)**2+abs(ships[i].y-pos.y)**2) < minDist) {
                    minDist = Math.sqrt(abs(ships[i].x-pos.x)**2+abs(ships[i].y-pos.y)**2);
                    target = ships[i].id;
                }
            }
        }
    }
    return target;
}

function autoMission(ship) {
    switch (ship.type) {
        case BATTLESHIP: // attack nearby capital ships then other ships
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, BATTLESHIP, 3100);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, CRUISER, 3000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 4000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 20000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 50000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            return {mission: IDLE, target: null};
        case CRUISER: // attack nearby ships then search for smaller ships to hunt. Escort the nearest battleship if there are no targets nearby. If there is no battleship to escort, attack the nearest enemy ship
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 3000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 2000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, DESTROYER, 6000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, FRIGATE, 5000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, BATTLESHIP, 15000/ship.int);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 30000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 60000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            return {mission: IDLE, target: null};
        case DESTROYER: // attack nearby ships, otherwise try to find a capital ship to escort. attack the nearest non capital ship if there is nothing to escort
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 2000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 2000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, FRIGATE, 15000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, BATTLESHIP, 5000/ship.int);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, CRUISER, 5000/ship.int);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 15000/ship.int);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTCAPITAL, 20000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            return {mission: IDLE, target: null};
        case FRIGATE: // If large ships in range, attack them, otherwise attack nearby small ships and fighters. If there are no fighters nearby, esort the nearest capital ship. If there are no capital ships in range, attack nearby fighters
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 1500);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTCAPITAL, 2000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 15000/ship.int);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, FIGHTER, 15000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            return {mission: IDLE, target: null};
        case INTERCEPTOR: // Attack nearby bombers and other fighters followed by bigger ships, else, escort friendly bombers. If there are no nearby bombers, escort other ships
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, BOMBER, 1000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, FIGHTER, 2500);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, ALL, 1500);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, BOMBER, 1500);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 3000);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 5000);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 20000/ship.int);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            return {mission: IDLE, target: null};
        case BOMBER: // Beeline the nearest capital ship and bomb it, otherwise bomb other bombable ships. If there is nothing to attack, follow a larger ship for protection
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 5000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 4000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 15000/ship.int);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 25000/ship.int);
            if (target) {
                return {mission: ESCORT, target: target};
            }
            return {mission: IDLE, target: null};
        default: // attack, attack and attack more
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, CAPITAL, 3000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 4000);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 10000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, ALL, 25000/ship.int);
            if (target) {
                return {mission: ATTACK, target: target};
            }
            return {mission: IDLE, target: null};
    }
}

function handleAi(ships) {
    for (var i = 0; i < ships.length; i+=1) {
        if (ships[i].aiControl) {
            var targetExists = false;
            for (var j = 0; j < ships.length; j+=1) {
                if (ships[i].target == ships[j].id) {
                    targetExists = true;
                }
            }
            if (targetExists == false) {
                ships[i].target = '';
            }
            if ((ships[i].task == '' || ships[i].target == '') || (t%500 == 0 && (ships[i].task == 'idle' || ships[i].task == 'escort')) || t%5000 == 0) {
                var mission = autoMission(ships[i]);
                ships[i].task = mission.task;
                ships[i].target = mission.target;
            } else {
                if (ships[i].task == 'idle') {
                    ships[i] = idle(ships[i]);
                } else if (ships[i].task == 'idle') {
                    ships[i] = escort(ships[i],ships[i].target);
                } else if (ships[i].method != '') {
                    // choose a method to complete the task
                    if (ships[i].task == 'attack') {
                        switch (ships[i].type) {
                            case BATTLESHIP:
                            case CRUISER:
                                ships[i].method = '';
                                break;
                            case DESTROYER:
                                ships[i].method = '';
                                break;
                            case FRIGATE:
                                ships[i].method = '';
                                break;
                            case INTERCEPTOR:
                                ships[i].method = '';
                                break;
                            case BOMBER:
                                ships[i].method = '';
                                break;
                            default:
                                ships[i].method = '';
                                break;
                        }

                    }
                }
                
            }
        }
    }
    return ships;
}

function handleProjectiles(projectiles) {
    //console.log(projectiles);
    projectiles = handleMotion(projectiles);
    for (var i = 0; i < projectiles.length; i+=1) {
        // check for collisions
        /*
        [code goes here] 
        I'll write it later...
        */
        // draw the bullet if it didn't hit anything
        addImage(data.img[projectiles[i].type], projectiles[i].x, projectiles[i].y, data.center[projectiles[i].type].x, data.center[projectiles[i].type].y, 1, projectiles[i].r);
        projectiles[i] = updateHitboxes(projectiles[i], true);
    }


    return projectiles;
}

function tick(objs) {
    for (var i = 0; i < objs.length; i+=1) {
        // if it dead, remove it
        if (objs[i].hp <= 0) {
            objs.splice(i,1);
            continue;
        }
        // if it has life, reduce it
        if (objs[i].life) {
            objs[i].life -= 1;
            if (objs[i].life <= 0) {
                objs.splice(i,1);
                continue;
            }
        }
        // if it has recoil, reduce it
        if (objs[i].recoil) {
            objs[i].recoil -= 1;
            if (objs[i].recoil < 0) {
                objs[i] = 0;
            }
        }
        // if it has cooldown, reduce it
        if (objs[i].cooldown) {
            objs[i].cooldown -= 1;
            if (objs[i].cooldown < 0) {
                objs[i] = 0;
            }
        }
        // if it is reloading, reload it
        if (objs[i].reload) {
            objs[i].reload -= 1;
            if (objs[i].reload < 0) {
                objs[i] = 0;
            }
        }
    }
    return objs;
}

function main() {
    clearCanvas();
    projectiles = tick(projectiles);
    player.weapons = tick(player.weapons);
    player = handlePlayer(player);
    projectiles = handleProjectiles(projectiles);
    
}

var t = 0
async function game() {
    while (1) {
        t += 1;
        //console.log(tick);
        main();
        await sleep(1000/60);  // 60 FPS
        //await sleep(500);    // Debug Mode
    }
}
