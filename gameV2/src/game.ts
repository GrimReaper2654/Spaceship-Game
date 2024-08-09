/*
-----------------------------------------Balancing-----------------------------------------
7/8/2024
 • started development
 • Imported some functions and stuff


-------------------------------------------------------------------------------------------
*/

// load data
import {
    // classes
    vector2, 
    polarVector2, 
    physicsObject, 
    ship, 
    gamestate, 
    spaceshipGameV2,

    // functions
    deepFreeze,
    generateId,
    randchoice,
    randint,
    randProperty,
    aim,
    replacehtml,
    addhtml,
    clearCanvas,
} from "./helper.ts";

import {SSGV2Data} from "./data.js";

declare global {interface Window {spaceshipGameV2: any;}}
window.spaceshipGameV2 = {};

const data = JSON.parse(JSON.stringify(SSGV2Data));
deepFreeze(data);
window.spaceshipGameV2.data = data;

const game = new spaceshipGameV2(new gamestate({}, [], []));
window.spaceshipGameV2.game = game;

// Steal Data (get inputs)
window.onkeyup = function(e) {
    game.keyboard[e.key.toLowerCase()] = false; 
};
window.onkeydown = function(e) {
    game.keyboard[e.key.toLowerCase()] = true; 
};
document.addEventListener('mousedown', function() {
    game.keyboard['click'] = true; 
});
document.addEventListener('mouseup', function() {
    game.keyboard['click'] = false; 
});
window.addEventListener("resize", function () {
    game.display = new vector2(window.innerWidth, window.innerHeight);
});
window.addEventListener('mousemove', function(p) {
    game.mousepos = new vector2(p.pageX, p.pageY);
}, false);

console.info("Spaceship Game V2: Load functions successful! We win these!");

let a = new vector2(69, 69);
let b = new vector2(420, 420);
console.log(a.add(b));
console.log(data);

/*
function drawLine(pos, r, length, style, absolute) {
    var c = document.getElementById("main");
    var ctx = c.getContext("2d");
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.strokeStyle = style.colour;
    ctx.lineWidth = style.width;
    ctx.globalAlpha = style.opacity;
    ctx.beginPath();
    if (!absolute) 
    if (absolute) {
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo((pos.x + length * Math.cos(r))*data.constants.zoom, (pos.y + length * Math.sin(r))*data.constants.zoom);
    } else {
        ctx.moveTo((pos.x-player.x)*data.constants.zoom+display.x/2, (pos.y-player.y)*data.constants.zoom+display.y/2);
        ctx.lineTo((pos.x-player.x + length * Math.cos(r))*data.constants.zoom+display.x/2, (pos.y-player.y + length * Math.sin(r))*data.constants.zoom+display.y/2);
    }
    ctx.stroke();
    ctx.restore();
};

function getDist(sPos, tPos) { 
    // Mathematics METHods
    var dx = tPos.x - sPos.x;
    var dy = tPos.y - sPos.y;
    var dist = Math.sqrt(dx*dx+dy*dy);
    return dist;
};

function correctAngle(a) {
    a = a%(Math.PI*2);
    return a;
};

function adjustAngle(a) {
    if (a > Math.PI) {
        a -= 2*Math.PI;
    }
    return a;
};

function rotateAngle(r, rTarget, increment) {
    if (Math.abs(r) > Math.PI*4 || Math.abs(rTarget) > Math.PI*4) {
        throw "Error: You f*cked up the angle thing again...";
        console.log(r, rTarget);
        r = correctAngle(r);
        rTarget = correctAngle(rTarget);
    }
    if (r == rTarget) {
        return correctAngle(r);
    }else if (rTarget - r <= Math.PI && rTarget - r > 0) {
        if (rTarget - r < increment) {
            r = rTarget;
        } else {
            r += increment;
        }
        return r;
    } else if (r - rTarget < Math.PI && r - rTarget > 0) {
        if (r - rTarget < increment) {
            r = rTarget;
        } else {
            r -= increment;
        }
        return correctAngle(r);
    } else {
        if (r < rTarget) {
            r += Math.PI*2;
        } else {
            rTarget += Math.PI*2;
        }
        return correctAngle(rotateAngle(r, rTarget, increment));
    }
};

function offsetPoints(points, offset) {
    for (let i = 0; i < points.length; i++){
        points[i].x += offset.x;
        points[i].y += offset.y;
    }
    return points;
};

function roman(number) {
    if (number <= 0 || number >= 4000) {
        var symbols = ['0','1','2','3','4','5','6','7','8','9','¡','£','¢','∞','§','¶','œ','ß','∂','∫','∆','√','µ','†','¥','ø'];
        return `${randchoice(symbols)}${randchoice(symbols)}${randchoice(symbols)}`;
    }
    
    const romanNumerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    
    let romanNumeral = '';
    
    for (let key in romanNumerals) {
        while (number >= romanNumerals[key]) {
            romanNumeral += key;
            number -= romanNumerals[key];
        }
    }
    return romanNumeral;
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function toColour(colour) {
    return `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`;
};

function drawCircle(x, y, radius, fill, stroke, strokeWidth, opacity, absolute) { // draw a circle
    var canvas = document.getElementById('main');
    var ctx = canvas.getContext("2d");
    ctx.resetTransform();
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    if (absolute) {
        ctx.arc(x*data.constants.zoom, y*data.constants.zoom, radius*data.constants.zoom, 0, 2 * Math.PI, false);
    } else {
        ctx.arc((-player.x+x)*data.constants.zoom+display.x/2, (-player.y+y)*data.constants.zoom+display.y/2, radius*data.constants.zoom, 0, 2 * Math.PI, false);
    }
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth*data.constants.zoom;
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
};

function displaytxt(txt, pos) {
    var canvas = document.getElementById("canvasOverlay");
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Set the font and text color
    ctx.font = "20px Verdana";
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    // Display the points on the canvas
    ctx.fillText(txt, pos.x*data.constants.zoom, pos.y*data.constants.zoom);
    ctx.stroke();
    ctx.restore();
};

function rotatePolygon(point, r) {
    let points = JSON.parse(JSON.stringify(point));
    for (let i = 0; i < points.length; i++) {
        points[i].x = point[i].x * Math.cos(r) - point[i].y * Math.sin(r); 
        points[i].y = point[i].x * Math.sin(r) + point[i].y * Math.cos(r); 
    }
    return points
};

function drawPolygon(point, offset, r, fill, stroke, absolute, debug=false) {
    let points = JSON.parse(JSON.stringify(point));
    //console.log(points);
    if (points.length < 3) {
        throw "Error: Your polygon needs to have at least 3 points dumbass";
    }
    points = rotatePolygon(points, r)
    var canvas = document.getElementById('main');
    var ctx = canvas.getContext("2d");
    ctx.resetTransform();
    ctx.beginPath();
    if (absolute) {
        ctx.moveTo((points[0].x + offset.x)*data.constants.zoom, (points[0].y + offset.y)*data.constants.zoom);
        if (debug) {displaytxt(`(${Math.round((points[0].x + offset.x)*data.constants.zoom)}, ${Math.round((points[0].y + offset.y)*data.constants.zoom)})`, {x: (points[0].x + offset.x)*data.constants.zoom, y: (points[0].y + offset.y)*data.constants.zoom});}
    } else {
        ctx.moveTo((points[0].x-player.x + offset.x)*data.constants.zoom+display.x/2, (points[0].y-player.y + offset.y)*data.constants.zoom+display.y/2);
        if (debug) {displaytxt(`(${Math.round((points[0].x-player.x + offset.x)*data.constants.zoom+display.x/2)}, ${Math.round((points[0].y-player.y + offset.y)*data.constants.zoom+display.y/2)})`, {x: (points[0].x-player.x + offset.x)*data.constants.zoom+display.x/2, y: (points[0].y-player.y + offset.y)*data.constants.zoom+display.y/2});}
        //if (debug) {displaytxt(`(${Math.round(points[0].x-player.x+display.x/2 + offset.x)}, ${Math.round(points[0].y-player.y+display.y/2 + offset.y)})`, {x: points[0].x-player.x+display.x/2 + offset.x, y: points[0].y-player.y+display.y/2 + offset.y});}
    }
    for (let i = 1; i < points.length; i++) {
        if (absolute) {
            ctx.lineTo((points[i].x + offset.x)*data.constants.zoom, (points[i].y + offset.y)*data.constants.zoom);
            if (debug) {displaytxt(`(${Math.round((points[i].x + offset.x)*data.constants.zoom)}, ${Math.round((points[i].y + offset.y)*data.constants.zoom)})`, {x: (points[i].x + offset.x)*data.constants.zoom, y: (points[i].y + offset.y)*data.constants.zoom});}
        } else {
            ctx.lineTo((points[i].x-player.x + offset.x)*data.constants.zoom+display.x/2, (points[i].y-player.y + offset.y)*data.constants.zoom+display.y/2);
            if (debug) {displaytxt(`(${Math.round((points[i].x-player.x + offset.x)*data.constants.zoom+display.x/2)}, ${Math.round((points[i].y-player.y + offset.y)*data.constants.zoom+display.y/2)})`, {x: (points[i].x-player.x + offset.x)*data.constants.zoom+display.x/2, y: (points[i].y-player.y + offset.y)*data.constants.zoom+display.y/2});}
            //if (debug) {displaytxt(`(${Math.round(points[i].x-player.x+display.x/2 + offset.x)}, ${Math.round(points[i].y-player.y+display.y/2 + offset.y)})`, {x: points[i].x-player.x+display.x/2 + offset.x, y: points[i].y-player.y+display.y/2 + offset.y});}
        }
    }
    ctx.closePath();
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.lineWidth = stroke.width*data.constants.zoom;
        ctx.strokeStyle = stroke.colour;
        ctx.stroke();
    }
};

function rect(coords, size, style, absolute=false, canvas='main') {
    var canvas = document.getElementById(canvas);
    var ctx = canvas.getContext("2d");
    ctx.resetTransform();
    ctx.beginPath();
    if (absolute) {
        ctx.moveTo(coords.x*data.constants.zoom, coords.y*data.constants.zoom);
        ctx.lineTo(coords.x*data.constants.zoom, (coords.y+size.y)*data.constants.zoom);
        ctx.lineTo((coords.x+size.x)*data.constants.zoom, (coords.y+size.y)*data.constants.zoom);
        ctx.lineTo((coords.x+size.x)*data.constants.zoom, coords.y*data.constants.zoom);
    } else {
        ctx.moveTo((coords.x-player.x)*data.constants.zoom+display.x/2, (coords.y-player.y)*data.constants.zoom+display.y/2);
        ctx.lineTo((coords.x-player.x)*data.constants.zoom+display.x/2, (coords.y+size.y-player.y)*data.constants.zoom+display.y/2);
        ctx.lineTo((coords.x+size.x-player.x)*data.constants.zoom+display.x/2, (coords.y+size.y-player.y)*data.constants.zoom+display.y/2);
        ctx.lineTo((coords.x+size.x-player.x)*data.constants.zoom+display.x/2, (coords.y-player.y)*data.constants.zoom+display.y/2);
    }
    ctx.closePath();
    ctx.fillStyle = style.fill;
    ctx.fill();
    ctx.lineWidth = style.stroke.width*data.constants.zoom;
    ctx.strokeStyle = style.stroke.colour;
    ctx.stroke();
}

function renderBar(centre, shift, size, value, increments, padding, spacing, bgStyle, fillStyle) {
    let vPadding = {x: padding, y: padding};
    let startPos = vMath(centre, vMath(size, 0.5, '*'), '-');
    if (shift != 0) {
        startPos = vMath(startPos, shift, '+');
    }
    let blockSize = {x: (size.x - spacing * (increments-1)) / increments, y: size.y};
    rect(vMath(startPos, vPadding, '-'), vMath(size, vMath(vPadding, 2, '*'), '+'), bgStyle);
    for (let i = 0; i < value; i++) {
        rect(startPos, blockSize, fillStyle);
        startPos.x += spacing + blockSize.x;
    }
};

function drawLight(x, y, radius) {
    var canvas = document.getElementById('main');
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    if (false) {
        ctx.arc(x*data.constants.zoom, y*data.constants.zoom, radius*data.constants.zoom, 0, 2 * Math.PI, false);
    } else {
        ctx.arc((player.x+x)*data.constants.zoom+display.x/2, (player.y+y)*data.constants.zoom+display.y/2, radius*data.constants.zoom, 0, 2 * Math.PI, false);
    }
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;

    ctx.fill();
};

function grid(spacing, reference) { // TODO: update colours
    for (let i = 0; i >= reference.x - (display.x/2 + spacing*5)/data.constants.zoom; i -= spacing) {
        drawLine({x: i, y: reference.y + (display.y/2 + spacing)/data.constants.zoom}, 3*Math.PI/2, (display.y + spacing*2)/data.constants.zoom, {colour:'#000000',width:10,opacity:0.05}, false);
    }
    for (let i = 0; i <= reference.x + (display.x/2 + spacing*5)/data.constants.zoom; i += spacing) {
        drawLine({x: i, y: reference.y + (display.y/2 + spacing)/data.constants.zoom}, 3*Math.PI/2, (display.y + spacing*2)/data.constants.zoom, {colour:'#000000',width:10,opacity:0.05}, false);
    }
    for (let i = 0; i >= reference.y - (display.y/2 + spacing*5)/data.constants.zoom; i -= spacing) {
        drawLine({x: reference.x + (display.x/2 + spacing)/data.constants.zoom, y: i}, Math.PI, (display.x + spacing*2)/data.constants.zoom, {colour:'#000000',width:10,opacity:0.05}, false);
    }
    for (let i = 0; i <= reference.y + (display.y/2 + spacing*5)/data.constants.zoom; i += spacing) {
        drawLine({x: reference.x + (display.x/2 + spacing)/data.constants.zoom, y: i}, Math.PI, (display.x + spacing*2)/data.constants.zoom, {colour:'#000000',width:10,opacity:0.05}, false);
    }
};

function renderExplosion(explosion) {
    drawCircle(explosion.x-explosion.r, explosion.y-explosion.r, explosion.r, '#fccbb1', '#f7b28d', 0.1, 0.2*explosion.transparancy, false);
    drawCircle(explosion.x-explosion.r, explosion.y-explosion.r, explosion.r, false, '#f7b28d', 5, 0.2);
    drawCircle(explosion.x-explosion.r, explosion.y-explosion.r, Math.max(explosion.r-20, 0), false, '#fcd8d2', 20, 0.1*explosion.transparancy, false);
    drawCircle(explosion.x-explosion.r, explosion.y-explosion.r, Math.max(explosion.r-15, 0), false, '#fcd8d2', 15, 0.1*explosion.transparancy, false);
    drawCircle(explosion.x-explosion.r, explosion.y-explosion.r, Math.max(explosion.r-10, 0), false, '#fcd8d2', 10, 0.1*explosion.transparancy, false);
    drawCircle(explosion.x-explosion.r, explosion.y-explosion.r, Math.max(explosion.r-5, 0), false, '#fcd8d2', 5, 0.1*explosion.transparancy, false);
    drawLight(explosion.x-explosion.r, explosion.y-explosion.r, explosion.r*1.1);
};

function handleExplosion(explosion) {
    //console.log(explosion);
    if (explosion.r >= explosion.maxR) {
        explosion.transparancy *= 0.75;
        explosion.r *= 1.2;
        explosion.active = false;
    }
    if (explosion.r < explosion.maxR) {
        explosion.active = true;
        explosion.r += explosion.expandSpeed;
        if (explosion.r > explosion.maxR) {
            explosion.r = explosion.maxR;
        }
    }
    if (explosion.transparancy > 0.25) {
        return explosion;
    } return false;
};

function normalDistribution(mean, sDiv) {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random(); 
    while (v === 0) v = Math.random(); 
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return mean + z * sDiv;
};

function raySegmentIntersection(pointIn, segmentIn) {
    let point = vMath(pointIn, 1.1, 'multiply');
    let segment = {start: vMath(segmentIn.start, 1.1, 'multiply'), end: vMath(segmentIn.end, 1.1, 'multiply')};
    let A1 = adjustAngle(correctAngle(aim(point, segment.start)));
    let A2 = adjustAngle(correctAngle(aim(point, segment.end)));
    if ((A1 >= 0 && A2 <= 0 || A2 >= 0 && A1 <= 0) && Math.abs(A1) + Math.abs(A2) < Math.PI) {
        return true;
    }
    return false;
};

function pointInPolygon(point, polygon) {
    let inside = false;
    let cnt = 0;
    if (raySegmentIntersection(point, {start: polygon[0], end: polygon[polygon.length-1]})) {
        inside = !inside;
        cnt++;
    }
    for (let i = 0; i < polygon.length-1; i++) {
        if (raySegmentIntersection(point, {start: polygon[i], end: polygon[i+1]})) {
            inside = !inside;
            cnt++;
        }
    }
    return inside;
};

function vMath(v1, v2, mode) { 
    switch (mode) {
        case '||':
        case 'magnitude':
            return Math.sqrt(v1.x**2+v1.y**2);
        case '+': 
        case 'addition':
        case 'add':
            return {x: v1.x+v2.x, y: v1.y+v2.y};
        case '-': 
        case 'subtraction':
        case 'subtract':
            return {x: v1.x-v2.x, y: v1.y-v2.y};
        case '*': 
        case 'x': 
        case 'scalar multiplication':
        case 'multiplication':
        case 'multiply': // v2 is now a scalar
            return {x: v1.x*v2, y: v1.y*v2};
        case '/': 
        case 'division':
        case 'divide': // v2 is now a scalar
            return {x: v1.x/v2, y: v1.y/v2};
        case '•': 
        case '.': 
        case 'dot product': 
            return v1.x * v2.x + v1.y * v2.y;
        case 'cross product': // chat gpt, I believe in you (I doubt this is correct)
            return v1.x * v2.y - v1.y * v2.x;
        case 'projection':
        case 'vector resolute':
        return vMath(v2, vMath(v1, v2, '.')/vMath(v2, null, '||')**2, 'x');
        default:
            throw 'what are you trying to do to to that poor vector?';
    }
};

function circleToPolygon(pos, r, sides) {
    let step = Math.PI*2/sides;
    let polygon = [];
    for(let i = 0; i < sides; i++) {
        polygon.push(vMath(toComponent(r, step*i),pos,'add'));
    }
    return polygon;
};

function pressKey(key) {
    orders.push({id: key, value: true});
}

function releaseKey(key) {
    orders.push({id: key, value: false});
}
*/