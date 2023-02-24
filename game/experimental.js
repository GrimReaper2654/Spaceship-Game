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
        MEDIUMBULLET:{x:11,y:18}, 
        SMALLBULLET:{x:11,y:5}, 
        PDBULLET:{x:0,y:0}, 
        GREYCIRCLE:{x:12,y:12}, 
        BLUECIRCLE:{x:12,y:12}, 
        SILVERCIRCLE:{x:12,y:12}, 
        BATTLESHIPPLUME:{x:526,y:152}, 
        INTERCEPTORPLUME:{x:0,y:0}, 
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
        MEDIUMBULLET:{x:0,y:9}, 
        SMALLBULLET:{x:0,y:2.5}, 
        PDBULLET:{x:0,y:0}, 
        GREYCIRCLE:{x:6,y:6}, 
        BLUECIRCLE:{x:6,y:6}, 
        SILVERCIRCLE:{x:6,y:6}, 
        BATTLESHIPPLUME:{x:269,y:76}, 
        INTERCEPTORPLUME:{x:0,y:0}, 
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
            {x:7.5, y:4, r:10}, 
        ],
        LARGEBULLET: [ // I would make 3 hitboxes for the 3 bullets but lag...
            {x:3.5, y:12, r:20}, 
        ],
        MEDIUMBULLET: [ // the 2 lasers share 1 hitbox
            {x:5.5, y:9, r:12}, 
        ],
        SMALLBULLET: [ // large-ish hitbox so you can actually hit something
            {x:5.5, y:2.5, r:5}, 
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

        GREYCIRCLE: document.getElementById("greyCircle"),
        BLUECIRCLE: document.getElementById("blueCircle"),
        SILVERCIRCLE: document.getElementById("silverCircle"),

        particle: document.getElementById("particle"),

        BATTLESHIPPLUME: document.getElementById("BattleshipPlume"),
        BATTLESHIPPLUMEOVERLAY: document.getElementById("BattleshipPlumeOverlay"),
        INTERCEPTORPLUME: document.getElementById("InterceptorPlume"),
        INTERCEPTORPLUMEOVERLAY: document.getElementById("InterceptorPlumeOverlay"),
    },
    BATTLESHIPMOUNT: {
        LARGETURRET: [{x:272,y:76}, {x:177,y:76}],
        MEDIUMTURRET: [{x:329,y:76}, {x:406,y:76}],
    },
    INTERCEPTORMOUNT: {
        SMALLTURRET: [{x:59,y:17}, {x:59,y:29}],
    },
    BATTLESHIPENGINES: [ // r is radius
        {x: -240, y: -10, r: 15},
        {x: -240, y: -10, r: 15},
        {x: -200, y: -50, r: 10},
        {x: -200, y: 35, r: 10},
    ],
    INTERCEPTORENGINES: [
        {x: -35, y: -10, r: 10},
    ],
    construction: {
        physics: {
            x: 0,
            y: 0,
            px: 0,
            py: 0,
            v: 0,
            vx: 0,
            vy: 0,
            r: 0,
            a: 0,
            thrust: 0,
            agi: 0,
            terminalAcceleration:250,
            terminalVelocity:250,
            drag: 0,
        },
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
            type: BATTLESHIP,
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
            type: INTERCEPTOR,
            hp: 15000,
            shield: 100,
        },
        HUGEBULLET: { // cannon shell
            v: 20,
            dmg: 12000, // a lot of DPS for Battleship
            dmgvb: 0,
            life: 180,
            physical: true
        },
        LARGEBULLET: { // cannon shell
            v: 25,
            dmg: 10000, // 8000 DPS for Battleship
            dmgvb: 0,
            life: 120,
            physical: true
        },
        MEDIUMBULLET: { // laser
            v: 30,
            dmg: 1000,  // 1333.33 DPS for Battleship
            dmgvb: 0,
            life: 30,
            physical: false
        },
        SMALLBULLET: { // laser
            v: 45,
            dmg: 100,   // 450*2 DPS for Interceptor
            dmgvb: 0,
            life: 15,
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

/*
var player = { // Play as interceptor
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
            spread: 2*Math.PI/180,
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
    shield: {
        shieldCap: 10000,
        shield: 10000,
        shieldRegen: 1,
        cooldown: 0,
    },
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
    agi: 0.1,
    terminalAcceleration:1,
    terminalVelocity:15,
    drag: 0.0001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.INTERCEPTOR)),
    // Stats
    hp: 15000,
    shield: {
        shieldCap: 600,
        shield: 600,
        shieldRegen: 0.1,
        cooldown: 0,
    },
    team: GREEN,
    type: INTERCEPTOR,
    aiControl: true,
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
            reloadTime: 4,
            reload: 0,
            bullet: {
                dmgMultiplier: 0.75,
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
            reloadTime: 4,
            reload: 0,
            bullet: {
                dmgMultiplier: 0.75,
                speedMultiplier: 1,
            }
        },
    ],
    target: '',
    task: '',
    method: '',
    int: 1, // Lower is further sensor range TODO: actually implement this
}
var sampleTeammate = {
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
    agi: 0.1,
    terminalAcceleration:1,
    terminalVelocity:15,
    drag: 0.0001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.INTERCEPTOR)),
    // Stats
    hp: 1500,
    shield: {
        shieldCap: 600,
        shield: 600,
        shieldRegen: 0.1,
        cooldown: 0,
    },
    team: RED,
    type: INTERCEPTOR,
    aiControl: true,
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
            reloadTime: 4,
            reload: 0,
            bullet: {
                dmgMultiplier: 0.75,
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
            reloadTime: 4,
            reload: 0,
            bullet: {
                dmgMultiplier: 0.75,
                speedMultiplier: 1,
            }
        },
    ],
    target: '',
    task: '',
    method: '',
    int: 1, // Lower is further sensor range
}
var sampleEnemy2 = {
    // Physics
    x: data.display.x/4,
    y: data.display.y/4,
    px: data.display.x/4,
    py: data.display.y/4,
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
    shield: {
        shieldCap: 10000,
        shield: 10000,
        shieldRegen: 1,
        cooldown: 0,
    },
    team: GREEN,
    type: BATTLESHIP,
    aiControl: true,
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
            ai: true,
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
            ai: true,
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
            ai: true,
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
            ai: true,
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
    target: '',
    task: '',
    method: '',
}

var ships = [player, JSON.parse(JSON.stringify(sampleEnemy2)), JSON.parse(JSON.stringify(sampleEnemy)), JSON.parse(JSON.stringify(sampleEnemy)), JSON.parse(JSON.stringify(sampleEnemy))];
//console.log(ships);
var projectiles = [];
var decoratives = [];

function isin(a, b) { // check is something is in a list
    for (var i = 0; i < b.length; i += 1) {
        if (a == b[i]) {
            return true;
        }
    }
    return false;
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

function logObj(obj) {
    var l = '';
    for(var key in obj) {
        l += JSON.stringify(obj[key]);
        l += ', ';
    }
    console.log(l);
}

function handlemovement(obj) {
    //console.log('obj',obj);
    obj.px = obj.x;
    obj.py = obj.y;
    if (obj.a > 0) {
        obj.a -= obj.thrust;
        if (obj.a < 0) {
            obj.a = 0;
        }
    }
    if (obj.a == 0 && obj.v != 0) {
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
    if (obj.v > obj.terminalVelocity) {
        obj.v = obj.terminalVelocity;
    }
    if (obj.v < -obj.terminalVelocity/16) {
        obj.v = -obj.terminalVelocity/16;
    }
    obj.vx = obj.v*Math.cos(obj.r);
    obj.vy = obj.v*Math.sin(obj.r);
    obj.x += obj.vx;
    obj.y += obj.vy;
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
    } else if (a < -Math.PI) {
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
                ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, {x: ship.target.x, y: ship.target.x}, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
            } else {
                ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, mousepos, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
            }
        }
    }
    return ship;
}

function engineEffect(ship) {
    var enginePos = data[ship.type+'ENGINES'];
    for (var i = 0; i < enginePos.length; i+= 1) {
        var p = JSON.parse(JSON.stringify(data.construction.physics));
        p.img = data.img.particle;
        p.v = 2-ship.v;
        p.x = (Math.random() * enginePos[i].r + enginePos[i].x) * Math.cos(ship.r) + (Math.random() * enginePos[i].r + enginePos[i].y) * Math.sin(ship.r) + ship.x;
        p.y = (Math.random() * enginePos[i].r + enginePos[i].x) * Math.cos(ship.r-Math.PI/2) + (Math.random() * enginePos[i].r + enginePos[i].y) * Math.sin(ship.r-Math.PI/2) + ship.y;
        p.r = ship.r+Math.PI;
        p.life = 10;
        decoratives.push(p);
    }
}

function addShip(ship) {
    if (ship.a > 0) {
        if (t % 3 == 0) {
            engineEffect(ship);
        }
        addImage(data.img[ship.type+'PLUME'], ship.x, ship.y, data.center[ship.type+'PLUME'].x, data.center[ship.type+'PLUME'].y, 1, ship.r);
    }
    addImage(data.img[ship.team+ship.type], ship.x, ship.y, data.center[ship.type].x, data.center[ship.type].y, 1, ship.r);
    if (ship.a > 0) {
        addImage(data.img[ship.type+'PLUMEOVERLAY'], ship.x, ship.y, data.center[ship.type+'PLUME'].x, data.center[ship.type+'PLUME'].y, 1, ship.r);
    }
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
    var bullet = {...JSON.parse(JSON.stringify(data.construction.physics)), ...JSON.parse(JSON.stringify(data.construction[weapon.size+'BULLET']))};
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
    bullet.r = angle+(Math.random()-0.5)*weapon.spread;
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
    return player;
}

function handleShips(ships) { // handles all ships
    for (var i = 0; i < ships.length; i++) {
        if (ships[i].shield) {
            if (ships[i].shield.cooldown == 0) {
                ships[i].shield.shield += ships[i].shield.shieldRegen;
                if (ships[i].shield.shield > ships[i].shield.shieldCap) {
                    ships[i].shield.shield = ships[i].shield.shieldCap;
                }
            } else {
                ships[i].shield.cooldown -= 1;
            }
        }
        ships[i] = handlemovement(ships[i]);
        ships[i] = aimTurrets(ships[i]);
        addShip(ships[i]);
        ships[i] = updateHitboxes(ships[i], true);
        healthBar(50, ships[i], 2);
        //console.log(ships[i].hp, ships[i].shield.shield);
    }
    return ships;
}

// AI attack methods (I have no idea how to make these)
// These are very scuffed and don't work as intended but somehow it works so I can't be bothered to fix it

function chase(attacker, dist) { // follow a target while shooting them and run away if the enemy gets too close
    // It works, lets gooooooo!
    //console.log(attacker);
    attacker.r = correctAngle(attacker.r);
    if (getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) >= dist) {
        //console.log('get closer');
        var aim = correctAngle(target({x:attacker.x,y:attacker.y},{x: attacker.target.x,y: attacker.target.y}));
        var rAim = aim - attacker.r // relative aim
        if (rAim != 0) {
            if (rAim > 0 && rAim < Math.PI) {
                attacker.r += attacker.agi;
            } else {
                attacker.r -= attacker.agi;
            }
        }
        if (Math.abs(rAim) < attacker.agi*2) { // make it easier for the attacker to lock on to the target
            attacker.r = aim;
        }
        attacker.a += attacker.thrust*2;
    } else {
        var aim = correctAngle(target({x:attacker.x,y:attacker.y},{x: attacker.target.x,y: attacker.target.y}));
        //console.log(Math.abs(aim));
        if ((Math.abs(aim) > 180*Math.PI/180 && getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 500) || getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 150 || (getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 400 && isin(attacker.target.type, CAPITAL))) {
            //console.log('flee');
            attacker.a += attacker.thrust*2;
            if (correctAngle(Math.abs(aim) - Math.PI) > 10*Math.PI/180) {
                if (Math.random() < 0.9) {
                    attacker.r += attacker.agi;
                } else {
                    attacker.r -= attacker.agi;
                }
            } else if (correctAngle(Math.abs(aim) - Math.PI) < 10*Math.PI/180) {
                if (Math.random() < 0.9) {
                    attacker.r -= attacker.agi;
                } else {
                    attacker.r += attacker.agi;
                }
            } else {
                if (Math.random() > 0.5) {
                    attacker.r -= attacker.agi;
                } else {
                    attacker.r += attacker.agi;
                }
            }
        } else {
            //console.log('maintain distance');
            var aim = target({x:attacker.x,y:attacker.y},{x: attacker.target.x,y: attacker.target.y});
            var rAim = aim - attacker.r // relative aim
            if (rAim != 0) {
                if (rAim > 0 && rAim < Math.PI) {
                    if (Math.random() < 0.9) {
                        attacker.r += attacker.agi;
                    } else {
                        attacker.r -= attacker.agi;
                    }
                } else {
                    if (Math.random() < 0.9) {
                        attacker.r -= attacker.agi;
                    } else {
                        attacker.r += attacker.agi;
                    }
                }
            } else {
                if (Math.random() > 0.7) {
                    if (Math.random() > 0.5) {
                        attacker.r += attacker.agi;
                    } else {
                        attacker.r -= attacker.agi;
                    }
                }
            }
            if (Math.abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
                attacker.r = aim;
            }
            if (attacker.v < attacker.target.v) { // try to match target's speed
                //console.log('accelerate');
                attacker.a += attacker.thrust*2;
            } else {
                attacker.a -= attacker.thrust*2;
                //console.log('decelerate');
            }
        }
    }
    if (getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 5000) {
        attacker = aimTurrets(attacker);
        for (var i = 0; i < attacker.weapons.length; i += 1) {
            if (Math.abs(correctAngle(attacker.weapons[i].aim+attacker.r-aim)) < 10*Math.PI/180 || (attacker.weapons[i].reloadTime <= 45 && Math.abs(correctAngle(attacker.weapons[i].aim+attacker.r-aim)) < 90*Math.PI/180)) {
                //console.log('aligned');
                attemptShoot(attacker.weapons[i], attacker.team, attacker.r);
            }
        }
    }
    return attacker;
}

function idle(ship) { // wander around the map (highly doubt this works)
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
function detectCollision(obj1, obj2) { // Should detect collisions even when stuff goes really fast
    for (var i = 0; i < obj1.hitbox.length; i += 1) {
        for (var j = 0; j < obj2.hitbox.length; j += 1) {
            var steps = Math.abs(obj1.v) / obj1.hitbox[0].r;
            if (steps <= 1) {
                steps = 1;
            }
            for (var step = 0; step < steps; step += 1) {
                if (getDist({x: obj1.hitbox[i].px+obj1.vx*(step/steps), y: obj1.hitbox[i].py+obj1.vy*(step/steps)},{x: obj2.hitbox[j].x, y: obj2.hitbox[j].y}) < obj1.hitbox[i].r + obj2.hitbox[j].r) {
                    return true;
                }
            }
            if (getDist({x: obj1.hitbox[i].x, y: obj1.hitbox[i].y},{x: obj2.hitbox[j].x, y: obj2.hitbox[j].y}) < obj1.hitbox[i].r + obj2.hitbox[j].r) {
                return true;
            }
        }
    }
    return false;
}

function autoTarget(type, team, pos, shipType, dist) { // inefficient, switch the order of the checks for better performance
    console.log(ships);
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
            } else {
                shouldCalculate = true;
            }
            if (shouldCalculate) {
                if (Math.sqrt(Math.abs(ships[i].x-pos.x)**2+Math.abs(ships[i].y-pos.y)**2) < minDist) {
                    minDist = Math.sqrt(Math.abs(ships[i].x-pos.x)**2+Math.abs(ships[i].y-pos.y)**2);
                    target = ships[i];
                }
            }
        }
    }
    console.log(target);
    return target;
}

function autoMission(ship) {
    var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, ALL, 100000);
    if (target) {
        return {mission: ATTACK, target: target};
    } else {
        console.log('stupid');
    }
    /*
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
            var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, ALL, 10000);
            if (target) {
                return {mission: ATTACK, target: target};
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
    }*/
}

function handleAi(ships) {
    for (var i = 0; i < ships.length; i+=1) {
        if (ships[i].aiControl) {
            if (ships.target == 0) {
                ships[i].target = '';
            }
            if ((ships[i].task == '' || ships[i].target == '') || (t%500 == 0 && (ships[i].task == IDLE || ships[i].task == ESCORT)) || t%00 == 0) {
                var mission = autoMission(ships[i]);
                ships[i].task = mission.mission;
                ships[i].target = mission.target;
            } else {
                /*
                if (ships[i].task == IDLE) {
                    ships[i].method = 'idle';
                    //ships[i] = idle(ships[i]);
                } else if (ships[i].task == ESCORT) {
                    ships[i].method = 'escort';
                    //ships[i] = escort(ships[i],ships[i].target,1500);
                } else if (ships[i].method == '') {
                    // choose a method to complete the task
                    if (ships[i].task == ATTACK) {
                        switch (ships[i].type) {
                            case BATTLESHIP:
                            case CRUISER:
                            case DESTROYER:
                            case FRIGATE: 
                                ships[i].method = 'chase';
                            case INTERCEPTOR:
                                if (ships[i].target.type == BOMBER) {
                                    ships[i].method = 'chase';
                                } else {
                                    ships[i].method = 'hitAndRun';
                                }
                                break;
                            case BOMBER:
                                ships[i].method = 'bombingRun';
                                break;
                            default:
                                ships[i].method = 'chase';
                                break;
                        }
                    }
                }
                */
               var doNothing = 1;
            }
        }
    }
    return ships;
}

function runAi(ships) { // TODO: add more attack methods
    for (var i = 0; i < ships.length; i+=1) {
        if (ships[i].aiControl) {
            ships[i] = chase(ships[i], 500);
        }
    }
    return ships;
}

function calculateDamage(bullet, ship) {
    if (bullet.dmg > 0 && bullet.team != ship.team) {
        if (bullet.dmg > ship.shield.shieldCap) {
            bullet.dmg -= ship.shield.shield*(ship.shield.shield/bullet.dmg);
            ship.shield.shield = 0;
            ship.shield.cooldown = 300;
        } else {
            if (bullet.dmg < ship.shield.shield*0.1) {
                ship.shield.shield -= bullet.dmg/2;
                bullet.dmg = 0;
            } else if (bullet.dmg < ship.shield.shield*0.75) {
                ship.shield.shield -= bullet.dmg;
                bullet.dmg = 0;
                ship.shield.cooldown += 15;
            } else {
                ship.shield.shield -= bullet.dmg*1.1;
                bullet.dmg = Math.max(bullet.dmg*0.9,bullet.dmg-ship.shield.shield);
                ship.shield.cooldown += 20;
            }
        }
        if (ship.shield.shield.cooldown > 300) {
            ship.shield.shield.cooldown = 300;
        }
        if (ship.shield.shield < 0) {
            ship.shield.shield = 0;
        }
        if (bullet.dmg < 0) {
            bullet.dmg = 0;
        }
        ship.hp -= bullet.dmg;
        if (0-ship.hp > bullet.dmg*0.5) {
            bullet.v *= (0-ship.hp)/bullet.dmg;
            bullet.dmg = 0-ship.hp;
        } else {
            bullet.dmg = 0;
        }
    }
    return [bullet, ship];
}

function bar(image, pos, size, step) {
    for (var i = 0; i < size; i += 1) {
        addImage(data.img[image], pos.x+i*step, pos.y, data.dim[image].x, data.dim[image].x, 1, 0)
    }
}

function healthBar(size, ship, step) {
    var length = size * step;
    var pos = {x: ship.x-length/2, y: ship.y + data.center[ship.type].y*1.5};
    var top = Math.round(ship.shield.shield / ship.shield.shieldCap * size);
    var bottom = Math.round(ship.hp / data.construction[ship.type].hp * size);
    bar('GREYCIRCLE', pos, size, step);
    bar('BLUECIRCLE', pos, top, step);
    bar('SILVERCIRCLE', pos, bottom, step);
}

function handleProjectiles(projectiles, ships) {
    //console.log(projectiles);
    projectiles = handleMotion(projectiles);
    for (var i = 0; i < projectiles.length; i +=1 ) {
        // check for collisions
        for (var j = 0; j < ships.length; j += 1) {
            if (detectCollision(projectiles[i], ships[j])) {
                console.log('hit');
                var res = calculateDamage(projectiles[i], ships[j]);
                projectiles[i] = res[0];
                ships[j] = res[1];
            }
        }
        // draw the bullet if it didn't hit anything
        addImage(data.img[projectiles[i].type], projectiles[i].x, projectiles[i].y, data.center[projectiles[i].type].x, data.center[projectiles[i].type].y, 1, projectiles[i].r);
        projectiles[i] = updateHitboxes(projectiles[i], true);
    }
    var newProjectiles = [];
    for (var i = 0; i < projectiles.length; i +=1 ) {
        if (projectiles[i].dmg > 0 && projectiles[i].v > 2) {
            newProjectiles.push(projectiles[i]);
        }
    }
    return [newProjectiles, ships];
}

function handleDecoratives(decoratives) {
    decoratives = handleMotion(decoratives);
    for (var i = 0; i < decoratives.length; i+=1) {
        addImage(decoratives[i].img, decoratives[i].x, decoratives[i].y, 0, 0, 1, decoratives[i].r);
    }
    return decoratives;
}

function tick(objs) {
    for (var i = 0; i < objs.length; i+=1) {
        // if it dead, remove it
        if (objs[i].hp <= 0) {
            objs.splice(i,1);
            i-=1;
            continue;
        }
        // if it has life, reduce it
        if (objs[i].life) {
            objs[i].life -= 1;
            if (objs[i].life <= 0) {
                objs.splice(i,1);
                i-=1;
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
    decoratives = tick(decoratives);
    projectiles = tick(projectiles);
    ships = tick(ships);
    for (var i = 0; i < ships.length; i += 1) {
        ships[i].weapons = tick(ships[i].weapons);
    }
    ships = handleAi(ships);
    ships = runAi(ships);
    decoratives = handleDecoratives(decoratives);
    ships = handleShips(ships);
    player = handlePlayer(player);
    var res = handleProjectiles(projectiles, ships);
    projectiles = res[0];
    ships = res[1];
}

var t = 0
async function game() {
    while (1) {
        t += 1;
        //console.log('tick',t);
        main();
        await sleep(1000/60);  // 60 FPS
        //await sleep(100);    // Debug Mode
    }
}

