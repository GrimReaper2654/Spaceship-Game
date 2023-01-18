const data = {
    display: {x:1600,y:800},
    dim: {
        battleship:{x:498,y:152}, // actually 497 by 152
    },
};
var keyboard = [0,0,0,0]; // W A S D
var player = {
    x: 800,
    y: 400,
    v: 0,
    vx: 0,
    vy: 0,
    r: 1,
    a: 0,
    thrust: 0.0002,
    terminalAcceleration:2,
    terminalVelocity:8
}
const RedBattleship = document.getElementById("BattleshipRed");



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

function test() {
    var img = document.getElementById("BattleshipRed");
    addImage(img, player.x, player.y);
}

function handleKeyboard() {
    console.log('aaa');
    if (keyboard[0] && keyboard[2]==0) { // Move Forward
        player.a += player.thrust;
        console.log('player moved');
    }
}

function handlemovement(obj) {
    if (obj.a > obj.terminalAcceleration) {
        obj.a = obj.terminalAcceleration;
    }
    if (obj.v > obj.terminalVelocity) {
        obj.v = obj.terminalVelocity;
    }
    obj.x += obj.vx;
    obj.y += obj.vy;
    obj.vx = obj.v*Math.cos(obj.r);
    obj.vy = obj.v*Math.sin(obj.r);
    obj.v += obj.a;
    return obj
}

document.onkeydown = function (e) {
    console.log(e);
    switch (e.key) {
        case 'w':
            keyboard[0] = 1;
            console.log(keyboard);
            console.log('w');
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
        default:
            break;
    }
};

console.log(player);
console.log(keyboard);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
    clearCanvas();
    handleKeyboard();
    player = handlemovement(player);
    addImage(RedBattleship, player.x, player.y, data.dim.battleship.x/2, data.dim.battleship.y/2, 1, player.r);
}

async function game() {
    var tick = 0
    while (1) {
        tick +=1;
        console.log(tick);
        main();
        await sleep(17);
    }
}

