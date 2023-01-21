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
        LARGETURRET:{x:109,y:44}, 
        MEDIUMTURRET:{x:45,y:28}, 
    },
    img: {
        REDBATTLESHIP: document.getElementById("BattleshipRed"),
        REDLARGETURRET: document.getElementById("MainCannonRed"),
        REDMEDIUMTURRET: document.getElementById("SmallCannonRed"),
        // REDSMALLTURRET: document.getElementById("TinyCannonRed"),
        // REDPDTURRET: document.getElementById("PDCannon"),
        GREENBATTLESHIP: document.getElementById("BattleshipGreen"),
        GREENLARGETURRET: document.getElementById("MainCannonGreen"),
        GREENMEDIUMTURRET: document.getElementById("SmallCannonGreen"),
        // GREENSMALLTURRET: document.getElementById("TinyCannonGreen"),
        // GREENPDTURRET: document.getElementById("PDCannon"),
        // HUGEBULLET: document.getElementById("BulletHuge"),
        LARGEBULLET: document.getElementById("BulletLarge"),
        MEDIUMBULLET: document.getElementById("BulletSmall"),
        // SMALLBULLET: document.getElementById("BulletTiny"),
        // PDBULLET: document.getElementById("BulletPD"),
    },
    center: {
        BATTLESHIP: {x:240,y:76}, 
        LARGETURRET: {x:36,y:22},
        MEDIUMTURRET:{x:20,y:14}, 
    },
    BATTLESHIPMOUNT: {
        LARGETURRET: [{x:272,y:76}, {x:177,y:76}],
        MEDIUMTURRET: [{x:329,y:76}, {x:406,y:76}],
    },
    construction: {
        HUGEBULLET: { // cannon shell
            v: 8,
            dmg: 50000, // 16666.66 DPS
            dmgvb: 0,
            life: 240,
            physical: true
        },
        LARGEBULLET: { // cannon shell
            v: 12,
            dmg: 10000, // 8000 DPS
            dmgvb: 0,
            life: 180,
            physical: true
        },
        MEDIUMBULLET: { // laser
            v: 20,
            dmg: 1000,  // 1333.33 DPS
            dmgvb: 0,
            life: 90,
            physical: false
        },
        SMALLBULLET: { // laser
            v: 20,
            dmg: 100,   // 
            dmgvb: 0,
            life: 60,
            physical: false
        },
        PDBULLET: { // point defence (∞ ms^-1 and no image)
            v: 250,
            dmg: 2,     // 120 DPS against ships
            dmgvb: 100, // 2000 against large bullet, 3100 against huge bullet
            life: 0,
            physical: false
        },
    }
};

var keyboard = [0,0,0,0]; // W A S D
var mousepos = {x:0,y:0};
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
    thrust: 0.01,
    agi: 0.01,
    terminalAcceleration:0.25,
    terminalVelocity:4,
    drag: 0.001,
    scale: 1,
    // Stats
    hp: 1000000,
    shield: 10000,
    team: RED,
    type: BATTLESHIP,
    // Weapons
    weapons: [
        /*
        numWeapons: 5,
        facing: [0,0,0,0,0], // Fixed spinal cannon, Front small turret, back small turret, front main turret, back main turret
        turretAim: [0,0,0,0,0], 
        turretReload: [0,0,0,0,0], 
        reloadTimes: [90,45,45,60,60], 
        reload: [0,0,0,0,0],
        weaponType: ['fixed', 'sTurret', 'sTurret', 'mTurret', 'mTurret'],
        turretagi: [0,0.02,0.02,0.01,0.01],
        firingArc: [0,Math.PI*1.5,Math.PI*1.75,Math.PI*1.5,Math.PI*1.75],
        recoil: [0,0,0,0,0],*/
        {
            // CONTROL
            type: FIXED,
            size: HUGE,
            ai: false,
            keybind: false,
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
                hpMultiplier: 1,
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
            ay: data.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
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
                hpMultiplier: 1,
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
                hpMultiplier: 1,
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
                hpMultiplier: 1,
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
                hpMultiplier: 1,
                speedMultiplier: 1
            }
        },
    ],
    aimMode: 'Converge',
    hasfired: 0,
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

function handleKeyboard() {
    //console.log('aaa');
    if (keyboard[0]) { // Move Forward
        player.a += player.thrust*2; // IMPORTANT: add 2 times thrust to player
    }
    if (keyboard[2]) {
        player.a -= player.thrust*2;
        if (player.a < -player.terminalAcceleration/4) {
            player.a = -player.terminalAcceleration/4;
        }
    }
    if (keyboard[1]) { 
        player.r -= player.agi;
        /*
        for (var i=0; i< player.weapons.turretAim.length; i+=1) {
            player.weapons.turretAim[i] -=  player.agi;
        }*/
    }
    if (keyboard[3]) { 
        player.r += player.agi;
        /*
        for (var i=0; i< player.weapons.turretAim.length; i+=1) {
            player.weapons.turretAim[i] +=  player.agi;
        }*/
    }
    if (player.r >= 2*Math.PI) {
        player.r -= Math.PI*2;
    } else if (player.r <= -2*Math.PI) {
        player.r += Math.PI*2;
    }
    keyboard = [0,0,0,0];
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

function turretPos(x,y,rx,ry,r) { // I spent two thirds of my life in school for this...
    rx = rx - data.dim.BATTLESHIP.x/2;
    ry = ry - data.dim.BATTLESHIP.y/2;
    // Offset x
    x = x+Math.cos(r)*rx;
    y = y+Math.sin(r)*rx;
    // Offset y
    x = x+Math.cos(r-Math.PI/2)*ry;
    y = y+Math.sin(r-Math.PI/2)*ry;
    return {x: x, y: y};
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
    // 13 hours of my life and 3 failed prototypes
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
        console.log('rotate +');
    } else if (necessaryRot < 0) {
        currentAim -= rotSpeed*2;
        console.log('rotate -');
    }
    if (Math.abs(relativeAim-currentAim) < rotSpeed) {
        currentAim = relativeAim;
        console.log('target');
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
        if (ship.weapons[i].type == TURRET) {
            var pos = turretPos(ship.x,ship.y,ship.weapons[i].x,ship.weapons[i].y,ship.r);
            ship.weapons[i].ax = pos.x;
            ship.weapons[i].ay = pos.y;
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

function shoot(weapon, team, shipRot) { // TODO: HELP!!!!!!!
    var angle = weapon.aim + shipRot;
    var bullet = data.construction[weapon.size+'BULLET'];

    bullet.v *= weapon.bullet.speedMultiplier;
    bullet.dmg *= weapon.bullet.dmgMultiplier;
    bullet.dmgvb *= weapon.bullet.dmgMultiplier;
    bullet.hp *= weapon.bullet.hpMultiplier;

    bullet += { // does this work?
        img: null,
        team: team,
        //Physics
        x: weapon.ax,
        y: weapon.ay,
        px: weapon.ax,
        py: weapon.ay,
        vx: bullet.v*Math.cos(bullet.r),
        vy: bullet.v*Math.sin(bullet.r),
        r: angle,
        a: 0, // Bullet does not accelerate, it starts at max speed
        thrust: 0,
        terminalAcceleration:0,
        terminalVelocity:Infinity,
        drag: 0,
    };
    
    // add bullet to list of bullets (projectiles)

}

document.onkeydown = function (e) {
    switch (e.key) {
        case 'w':
            keyboard[0] = 1;
            break;
        case 'a':
            keyboard[1] = 1;
            break;
        case 's':
            keyboard[2] = 1;
            break;
        case 'd':
            keyboard[3] = 1;
            break;
        case 'q':
            if (player.aimMode == 'Parallel') {
                player.aimMode = 'Converge';
            } else {
                player.aimMode = 'Parallel';
            }
            console.log(`Aiming mode: ${player.aimMode}`);
            break;
        default:
            break;
    }
};

document.onclick = function(e) {
    player.hasfired = 1;
};

function tellPos(p){
    mousepos = {x: p.pageX, y:p.pageY};
}
addEventListener('mousemove', tellPos, false);
  
console.log(player);
console.log(keyboard);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
    clearCanvas();
    handleKeyboard();
    player = aimTurrets(player);
    player = handlemovement(player);
    //var info = aimBattleship(player.x, player.y, player.r, mousepos, player.aimMode, player.weapons, player.agi)
    //player.weapons.turretAim = info[1];
    addShip(player)
}

async function game() {
    var tick = 0
    while (1) {
        tick +=1;
        //console.log(tick);
        main();
        //await sleep(17);
        await sleep(500);
    }
}