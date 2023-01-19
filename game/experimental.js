const RED = 'RED';
const GREEN = 'GREEN';
var data = {
    display: {x:window.innerWidth,y:window.innerHeight},
    dim: {
        battleship:{x:497,y:152}, 
        mainCannon:{x:109,y:44}, 
        smallCannon:{x:45,y:28}, 
    },
    img: {
        redBattleship: document.getElementById("BattleshipRed"),
        redMainCannon: document.getElementById("MainCannonRed"),
        redSmallCannon: document.getElementById("SmallCannonRed"),
        greenBattleship: document.getElementById("BattleshipGreen"),
        greenMainCannon: document.getElementById("MainCannonGreen"),
        greenSmallCannon: document.getElementById("SmallCannonGreen"),
        largeBullet: document.getElementById("BulletLarge"),
        smallBullet: document.getElementById("BulletSmall"),
    },
    center: {
        battleship: {x:240,y:76}, 
        mainCannon: {x:36,y:22},
        smallCannon:{x:20,y:14}, 
    },
    turretMount: {
        main: [{x:272,y:76}, {x:177,y:76}],
        secondary: [{x:329,y:76}, {x:406,y:76}],
    },
    construction: {
        largeBullets: {
            img: null,
            //Physics
            x: 0,
            y: 0,
            v: 0,
            vx: 0,
            vy: 0,
            r: 0,
            a: 0,
            thrust: 0,
            terminalAcceleration:100,
            terminalVelocity:100,
            drag: 0,
        },
    }
};

data.construction.largeBullets.img = data.img.largeBullet;


var projectiles = [];
var keyboard = [0,0,0,0]; // W A S D
var mousepos = {x:0,y:0};
var player = {
    // Physics
    x: data.display.x/2,
    y: data.display.y/2,
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
    // Stats
    hp: 10000,
    shield: 1000,
    team: RED,
    // Weapons
    weapons: {
        numWeapons: 5,
        facing: [0,0,0,0,0], // Fixed spinal cannon, Front small turret, back small turret, front main turret, back main turret
        turretAim: [0,0,0,0,0], 
        turretReload: [0,0,0,0,0], 
        reloadTimes: [90,45,45,60,60], 
        reload: [0,0,0,0,0],
        weaponType: ['fixed', 'sTurret', 'sTurret', 'mTurret', 'mTurret'],
        turretagi: [0,0.02,0.02,0.01,0.01],
        firingArc: [0,Math.PI*1.5,Math.PI*1.75,Math.PI*1.5,Math.PI*1.75],
        recoil: [0,0,0,0,0],
    },
    aimMode: 'Converge',
    hasfired: 0,
}

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
/*

var c = document.getElementById("main");
    var ctx = c.getContext("2d");
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(r);
    ctx.drawImage(img, -cx, -cy);


*/


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
    rx = rx - data.dim.battleship.x/2;
    ry = ry - data.dim.battleship.y/2;
    // Offset x
    var x = x+Math.cos(r)*rx;
    var y = y+Math.sin(r)*rx;
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

function turretRot(currentRot, rotSpeed, rotLimit, facing, shipRot, aimPos, aimType, shipPos, cannonPos, currentAim){ // Only god knows how this works (or doesn't work)...
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
    //console.log(`Step1: aim: ${aim*180/Math.PI}`);
    currentRot = correctAngle(currentRot);
    //console.log(`Step2: ship rotation: ${currentRot*180/Math.PI}`);
    if (currentAim < 0) {
        currentAim += Math.PI*2;
    }
    //currentAim += shipRot;
    currentAim = currentAim%(Math.PI*2);
    currentAim = correctAngle(currentAim); // extra
    //console.log(`Step3: turret rotation: ${currentAim*180/Math.PI}`);
    /*
    currentAim += currentRot;
    currentAim = currentAim%(Math.PI*2);
    currentAim = correctAngle(currentAim);
    console.log(`Step3.5: relative turret rotation: ${currentAim*180/Math.PI}`);*/
    /*
    var relativeAim = aim+currentRot;
    relativeAim = correctAngle(relativeAim);
    console.log(`Step4: relative aim: ${relativeAim*180/Math.PI}`);*/
    var relativeAim = aim; // extra
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
    //currentAim -= currentRot;
    if (currentAim < -rotLimit/2+facing) {
        currentAim = -rotLimit/2+facing;
    } else if (currentAim > rotLimit/2+facing) {
        currentAim = rotLimit/2+facing;
    }
    currentAim = correctAngle(currentAim);
    //console.log(`Step7: after collision turret rotation: ${currentAim*180/Math.PI}`);
    return currentAim;
}

function aimBattleship(x, y, rotation, aimPos, aimType, weapons, agi) {
    var shipRot = 0;
    var newRotation = [0,0,0,0,0];
    var turretPositions = [0,0,0,0,0];
    for (var i = 1; i < 3; i+=1) {
        var tp = turretPos(x,y,data.turretMount.secondary[(i-1)].x,data.turretMount.secondary[(i-1)].y,rotation);
        var tr = turretRot(rotation, weapons.turretagi[i], weapons.firingArc[i], weapons.facing[i], shipRot, aimPos, aimType, {x: x, y: y}, tp, weapons.turretAim[i]);
        newRotation[i] = tr;
        turretPositions[i] = tp;
    }
    for (var i = 3; i < 5; i+=1) {
        var tp = turretPos(x,y,data.turretMount.main[(i-3)].x,data.turretMount.main[(i-3)].y,rotation);
        var tr = turretRot(rotation, weapons.turretagi[i], weapons.firingArc[i], weapons.facing[i], shipRot, aimPos, aimType, {x: x, y: y}, tp, weapons.turretAim[i]);
        newRotation[i] = tr;
        turretPositions[i] = tp;
    }
    return [turretPositions, newRotation];
}

function addBattleship(battleshipImg, mainCannonImg, smallCannonImg, x, y, scale, rotation, tp, tr) {
    addImage(battleshipImg, x, y, data.center.battleship.x, data.center.battleship.y, scale, rotation);
    for (var i = 1; i < 3; i+=1) {
        addImage(smallCannonImg, tp[i].x, tp[i].y, data.center.smallCannon.x, data.center.smallCannon.y, scale, tr[i]+rotation);
    }
    for (var i = 3; i < 5; i+=1) {
        addImage(mainCannonImg, tp[i].x, tp[i].y, data.center.mainCannon.x, data.center.mainCannon.y, scale, tr[i]+rotation);
    }
}

function addBullet() {

}

function shoot() {
    
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
    player = handlemovement(player);
    var info = aimBattleship(player.x, player.y, player.r, mousepos, player.aimMode, player.weapons, player.agi)
    player.weapons.turretAim = info[1];
    addBattleship(data.img.redBattleship, data.img.redMainCannon, data.img.redSmallCannon, player.x, player.y, 1, player.r, info[0], info[1])
}

async function game() {
    var tick = 0
    while (1) {
        tick +=1;
        //console.log(tick);
        main();
        await sleep(17);
        //await sleep(100);
    }
}

