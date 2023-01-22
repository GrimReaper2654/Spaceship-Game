// Teams
const RED = 'RED';
const GREEN = 'GREEN';

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

// Ship Types
const BATTLESHIP = 'BATTLESHIP';
const CRUISER = 'CRUISER';
const DESTROYER = 'DESTROYER';
const FRIGATE = 'FRIGATE';
const BOMBER = 'BOMBER';
const INTERCEPTOR = 'INTERCEPTOR';

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

var ships = [player];
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
    addImage(data.img[ship.team+ship.type], ship.x, ship.y, data.center[ship.type].x, data.center[ship.type].y, ship.scale, ship.r);
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
        console.log('shoooooot');
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
    bullet.r = angle;
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
    player = updateHitboxes(player, false);
    return player;
}

function handleEnemy(enemies) {
    player = handleInputs(player);
    player = aimTurrets(player);
    player = handlemovement(player);
    addShip(player);
    player = updateHitboxes(player, false);
    return player;
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
        projectiles[i] = updateHitboxes(projectiles[i], false);
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

async function game() {
    var tick = 0
    while (1) {
        tick +=1;
        //console.log(tick);
        main();
        await sleep(1000/60);  // 60 FPS
        //await sleep(500);    // Debug Mode
    }
}