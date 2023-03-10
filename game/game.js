/*
-----------------------------------------Balancing-----------------------------------------
1/3/2023
 • buffed Battleship health 1M --> 2.5M
 • added Cruiser (well shielded ship designed to deal with swarms of fighters)
    • 250k hp
    • 80k  shd
    • 15   reg
    • 7.5  top speed
    • 3 medium turrets, 1 small turret

7/3/2023
 • buffed Battleship agility 0.005 --> 0.01
 • buffed Battleship top speed 3 --> 5
 • buffed Cruiser shield regen 15 --> 25
 • buffed Cruiser shield capacity 80k --> 100k
 • buffed Interceptor range 100% --> 125%
 • nerfed Battleship acceleration 0.0014 --> 0.0005
 • nerfed Interceptor reload 3 --> 4
 • nerfed Interceptor damage 150% --> 50%
 • added Destroyer (medium sized ship designed to snipe enemies at long range)
    • 200k hp
    • 10k  shd
    • 10   reg
    • 5    top speed
    • 1 railgun
 • added railguns
    • 100k dmg
    • 100  speed
    • 5k   range

8/3/2023
 • buffed Destroyer damage 100% --> 150%
 • nerfed Destroyer reload 120 --> 150
 • added laser sights to destroyer
 
-------------------------------------------------------------------------------------------
*/

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
const RAIL = 'RAIL';

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
        CRUISER:{x:465,y:122}, 
        DESTROYER:{x:291,y:128}, 
        INTERCEPTOR:{x:73,y:45}, 
        LARGETURRET:{x:109,y:44}, 
        MEDIUMTURRET:{x:45,y:28},
        SMALLTURRET:{x:37,y:17},
        PDTURRET:{x:17,y:10},
        RAILBULLET:{x:38,y:10},
        HUGEBULLET:{x:15,y:8}, 
        LARGEBULLET:{x:7,y:24}, 
        MEDIUMBULLET:{x:11,y:18}, 
        SMALLBULLET:{x:11,y:5}, 
        PDBULLET:{x:0,y:0}, 
        GREYCIRCLE:{x:12,y:12}, 
        BLUECIRCLE:{x:12,y:12}, 
        SILVERCIRCLE:{x:12,y:12}, 
        BATTLESHIPPLUME:{x:526,y:152}, 
        CRUISERPLUME:{x:546,y:122}, 
        DESTROYERPLUME:{x:307,y:128}, 
        INTERCEPTORPLUME:{x:0,y:0}, 
    },
    center: {
        BATTLESHIP:{x:240,y:76}, 
        CRUISER:{x:155,y:61}, 
        DESTROYER:{x:75,y:64}, 
        INTERCEPTOR:{x:35,y:22.5}, 
        LARGETURRET:{x:36,y:22},
        MEDIUMTURRET:{x:20,y:14}, 
        SMALLTURRET:{x:9,y:8.5},
        PDTURRET:{x:6,y:5},
        RAILBULLET:{x:27,y:5},
        HUGEBULLET:{x:0,y:4}, 
        LARGEBULLET:{x:0,y:12}, 
        MEDIUMBULLET:{x:0,y:9}, 
        SMALLBULLET:{x:0,y:2.5}, 
        PDBULLET:{x:0,y:0}, 
        GREYCIRCLE:{x:6,y:6}, 
        BLUECIRCLE:{x:6,y:6}, 
        SILVERCIRCLE:{x:6,y:6}, 
        BATTLESHIPPLUME:{x:269,y:76}, 
        CRUISERPLUME:{x:236,y:61}, 
        DESTROYERPLUME:{x:91,y:64}, 
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
        CRUISER: [ // even more hitboxes... why did I make this ship so long and thin?
            {x:120, y:61, r:40}, 
            {x:180, y:61, r:40}, 
            {x:250, y:61, r:60}, 
            {x:320, y:61, r:40}, 
            {x:360, y:61, r:40}, 
            {x:400, y:61, r:40}, 
            {x:440, y:61, r:40}, 
            {x:480, y:61, r:40}, 
            {x:510, y:61, r:30}, 
        ],
        DESTROYER: [ // finally, a reasonable amount of hitboxes
            {x:130, y:64, r:60}, 
            {x:190, y:64, r:40}, 
            {x:260, y:64, r:40}, 
            {x:320, y:64, r:40}, 
        ],
        INTERCEPTOR: [ // annoyingly small and hard to hit
            {x:25, y:22.5, r:22.5}, 
            {x:52.5, y:22.5, r:10}, 
        ],
        RAILBULLET: [ // much larger than expected
            {x:32, y:5, r:25}, 
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
        // Red Ships
        REDBATTLESHIP: document.getElementById("BattleshipRed"),
        REDCRUISER: document.getElementById("CruiserRed"),
        REDDESTROYER: document.getElementById("DestroyerRed"),
        REDINTERCEPTOR: document.getElementById("InterceptorRed"),

        // Red Turrets
        REDLARGETURRET: document.getElementById("MainCannonRed"),
        REDMEDIUMTURRET: document.getElementById("SmallCannonRed"),
        REDSMALLTURRET: document.getElementById("TinyCannonRed"),
        REDPDTURRET: document.getElementById("PDCannon"),

        // Green Ships
        GREENBATTLESHIP: document.getElementById("BattleshipGreen"),
        GREENCRUISER: document.getElementById("CruiserGreen"),
        GREENDESTROYER: document.getElementById("DestroyerGreen"),
        GREENINTERCEPTOR: document.getElementById("InterceptorGreen"),

        // Green Turrets
        GREENLARGETURRET: document.getElementById("MainCannonGreen"),
        GREENMEDIUMTURRET: document.getElementById("SmallCannonGreen"),
        GREENSMALLTURRET: document.getElementById("TinyCannonGreen"),
        GREENPDTURRET: document.getElementById("PDCannon"),

        // Bullets
        RAILBULLET: document.getElementById("BulletRail"),
        HUGEBULLET: document.getElementById("BulletHuge"),
        LARGEBULLET: document.getElementById("BulletLarge"),
        MEDIUMBULLET: document.getElementById("BulletSmall"),
        SMALLBULLET: document.getElementById("BulletTiny"),
        PDBULLET: document.getElementById("BulletPD"),

        // Health Bar Parts
        GREYCIRCLE: document.getElementById("greyCircle"),
        BLUECIRCLE: document.getElementById("blueCircle"),
        SILVERCIRCLE: document.getElementById("silverCircle"),

        // The particle image that is reused for almost every particle effect
        particle: document.getElementById("particle"),

        // Engine plumes
        BATTLESHIPPLUME: document.getElementById("BattleshipPlume"),
        BATTLESHIPPLUMEOVERLAY: document.getElementById("BattleshipPlumeOverlay"),
        CRUISERPLUME: document.getElementById("CruiserPlume"),
        CRUISERPLUMEOVERLAY: document.getElementById("CruiserPlumeOverlay"),
        DESTROYERPLUME: document.getElementById("DestroyerPlume"),
        DESTROYERPLUMEOVERLAY: document.getElementById("DestroyerPlumeOverlay"),
        INTERCEPTORPLUME: document.getElementById("InterceptorPlume"),
        INTERCEPTORPLUMEOVERLAY: document.getElementById("InterceptorPlumeOverlay"),
    },
    BATTLESHIPMOUNT: {
        LARGETURRET: [{x:272,y:76}, {x:177,y:76}],
        MEDIUMTURRET: [{x:329,y:76}, {x:406,y:76}],
    },
    CRUISERMOUNT: {
        MEDIUMTURRET: [{x:450,y:61},{x:390,y:61}, {x:340,y:61}],
        SMALLTURRET: [{x:510,y:61}],
    },
    DESTROYERMOUNT: {
        RAIL: [{x:75,y:64}],
    },
    INTERCEPTORMOUNT: {
        SMALLTURRET: [{x:59,y:17}, {x:59,y:29}],
    },
    BATTLESHIPENGINES: [ // r is radius
        {x: -240, y: -10, r: 15},
        {x: -200, y: -50, r: 10},
        {x: -200, y: 35, r: 10},
    ],
    CRUISERENGINES: [ // r is radius
        {x: -170, y: -10, r: 25},
        {x: -170, y: 10, r: 20},
        {x: -170, y: -30, r: 20},
        {x: -190, y: -10, r: 25},
        {x: -190, y: 10, r: 20},
        {x: -190, y: -30, r: 20},
    ],
    DESTROYERENGINES: [ // r is radius
        {x: -75, y: -70, r: 10},
        {x: -75, y: 55, r: 10},
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
            hp: 2500000,
            shield: {
                shieldCap: 25000,
                shield: 25000,
                shieldRegen: 10,
                cooldown: 0,
            },
        },
        CRUISER: {
            thrust: 0.075,
            agi: 0.025,
            terminalAcceleration:0.5,
            terminalVelocity:7.5,
            drag: 0.001,
            scale: 1,
            // Stats
            hp: 250000,
            shield: {
                shieldCap: 80000,
                shield: 80000,
                shieldRegen: 15,
                cooldown: 0,
            },
        },
        DESTROYER: {
            thrust: 0.1,
            agi: 0.05,
            terminalAcceleration:0.5,
            terminalVelocity:6,
            drag: 0.01,
            scale: 1,
            // Stats
            hp: 200000,
            shield: {
                shieldCap: 10000,
                shield: 10000,
                shieldRegen: 5,
                cooldown: 0,
            },
        },
        INTERCEPTOR: {
            thrust: 0.1,
            agi: 0.1,
            terminalAcceleration:1,
            terminalVelocity:15,
            drag: 0.0001,
            scale: 1,
            // Stats
            hp: 15000,
            shield: {
                shieldCap: 600,
                shield: 600,
                shieldRegen: 0.1,
                cooldown: 0,
            },
        },
        MISSILEBULLET: { // a missile that explodes on impact
            v: 5,
            dmg: 1500, // this acts more as health than damage
            dmgvb: 0,
            life: 216000, // basically lives forever (1 hour of life)
            physical: true,
            effect: true,
            explosion: {r: 50, dmg: 6000, dropoff: 0.1}
        },
        MEGABULLET: { // giant ball of plasma
            v: 5,
            dmg: 150000, // instakills almost everything but is very slow
            dmgvb: 0,
            life: 720,
            physical: false,
            effect: true,
            explosion: {r: 200, dmg: 100000, dropoff: 0.9}
        },
        RAILBULLET: { // railgun round
            v: 100,
            dmg: 100000, // instakills smaller ships and pierces through them
            dmgvb: 0,
            life: 50,
            physical: true,
            effect: true,
            explosion: false,
        },
        HUGEBULLET: { // cannon shell
            v: 20,
            dmg: 24000, // 16k dps per turret
            dmgvb: 0,
            life: 240,
            physical: true,
            effect: false,
            explosion: false,
        },
        LARGEBULLET: { // cannon shell
            v: 25,
            dmg: 18000, // 14.4k DPS per turret
            dmgvb: 0,
            life: 120,
            physical: true,
            effect: false,
            explosion: false,
        },
        MEDIUMBULLET: { // laser
            v: 30,
            dmg: 2000, // 8k dps per turret
            dmgvb: 0,
            life: 45,
            physical: false,
            effect: false,
            explosion: false,
        },
        DUBULLET: { // depleted uranium cannon shell
            v: 35,
            dmg: 25, // shreds almost anything instantly in massive quantities
            dmgvb: 0,
            life: 20,
            physical: true,
            effect: false,
            explosion: false,
        },
        SMALLBULLET: { // laser
            v: 45,
            dmg: 100, // weak individually but dangerous in large quantities
            dmgvb: 0,
            life: 15,
            physical: false,
            effect: false,
            explosion: false,
        },
        BOMBBULLET: { // laser
            v: 0,
            dmg: 0, // it explodes
            dmgvb: 0,
            life: 1,
            physical: false,
            effect: false,
            explosion: {r: 20, dmg: 20000, dropoff: 0.6},
        },
        PDBULLET: { // point defence (∞ ms^-1)
            v: 250,
            dmg: 20, // basiclly nothing against larger ships but effective against fighters (1.2k dps)
            dmgvb: 100, // 2000 against large bullet, 3100 against huge bullet in total
            life: 1,
            physical: false,
            effect: false,
            explosion: false,
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
    thrust: 0.0005,
    agi: 0.01,
    terminalAcceleration:0.15,
    terminalVelocity:5,
    drag: 0.001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.BATTLESHIP)),
    // Stats
    hp: 2500000,
    shield: {
        shieldCap: 25000,
        shield: 25000,
        shieldRegen: 10,
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
            reloadTime: 15,
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
            reloadTime: 15,
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

/*
var player = { // Play as Cruiser
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
    thrust: 0.075,
    agi: 0.025,
    terminalAcceleration:0.5,
    terminalVelocity:7.5,
    drag: 0.001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.CRUISER)),
    // Stats
    hp: 250000,
    shield: {
        shieldCap: 80000,
        shield: 80000,
        shieldRegen: 15,
        cooldown: 0,
    },
    team: RED,
    type: CRUISER,
    aiControl: false,
    // Weapons
    weapons: [
        {
            // CONTROL
            type: TURRET,
            size: SMALL,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.CRUISERMOUNT.SMALLTURRET[0].x,
            y: data.CRUISERMOUNT.SMALLTURRET[0].y,
            ax: data.CRUISERMOUNT.SMALLTURRET[0].x,
            ay: data.CRUISERMOUNT.SMALLTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0.075,
            arc: 210*Math.PI/180,
            recoilAmount: 1,
            recoil: 0,
            // STATS
            engagementRange: 1400,
            spread: 5*Math.PI/180,
            reloadTime: 1,
            reload: 0,
            bullet: {
                dmgMultiplier: 1,
                speedMultiplier: 2
            }
        },
        {
            // CONTROL
            type: TURRET,
            size: MEDIUM,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.CRUISERMOUNT.MEDIUMTURRET[0].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[0].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[0].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
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
            x: data.CRUISERMOUNT.MEDIUMTURRET[1].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[1].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[1].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[1].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
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
            x: data.CRUISERMOUNT.MEDIUMTURRET[2].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[2].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[2].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[2].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1
            }
        },
    ],
    aimMode: 'Parallel',
    // Input
    hasClicked: 0,
    keyboard: {},
};*/

/*
var player = { // Play as Destroyer
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
    agi: 0.025,
    terminalAcceleration:0.5,
    terminalVelocity:6,
    drag: 0.01,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.DESTROYER)),
    // Stats
    hp: 200000,
    shield: {
        shieldCap: 10000,
        shield: 10000,
        shieldRegen: 5,
        cooldown: 0,
    },
    team: RED,
    type: DESTROYER,
    aiControl: false,
    id: 69420,
    // Weapons
    weapons: [
        {
            // CONTROL
            type: FIXED,
            size: RAIL,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.DESTROYERMOUNT.RAIL[0].x,
            y: data.DESTROYERMOUNT.RAIL[0].y,
            ax: data.DESTROYERMOUNT.RAIL[0].x,
            ay: data.DESTROYERMOUNT.RAIL[0].y,
            facing: 0,
            aim: 0,
            agi: 0,
            arc: 0,
            recoilAmount: 0,
            recoil: 0,
            // STATS
            engagementRange: 5200,
            spread: 0,
            reloadTime: 150,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1
            }
        }
    ],
    aiming: true,
    // Input
    hasClicked: 0,
    keyboard: {},
};*/

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
            engagementRange: 700,
            spread: 2*Math.PI/180,
            reloadTime: 4,
            reload: 0,
            bullet: {
                dmgMultiplier: 0.5,
                speedMultiplier: 1.25,
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
            engagementRange: 700,
            spread: 2*Math.PI/180,
            reloadTime: 4,
            reload: 0,
            bullet: {
                dmgMultiplier: 0.5,
                speedMultiplier: 1.25,
            }
        },
    ],
    target: '',
    task: '',
    method: '',
    int: 1, // Lower is further sensor range TODO: actually implement this
};
var sampleEnemy2 = { // Destroyer
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
    agi: 0.025,
    terminalAcceleration:0.5,
    terminalVelocity:6,
    drag: 0.01,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.DESTROYER)),
    // Stats
    hp: 200000,
    shield: {
        shieldCap: 10000,
        shield: 10000,
        shieldRegen: 5,
        cooldown: 0,
    },
    team: GREEN,
    type: DESTROYER,
    aiControl: true,
    id: 69420,
    // Weapons
    weapons: [
        {
            // CONTROL
            type: FIXED,
            size: RAIL,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.DESTROYERMOUNT.RAIL[0].x,
            y: data.DESTROYERMOUNT.RAIL[0].y,
            ax: data.DESTROYERMOUNT.RAIL[0].x,
            ay: data.DESTROYERMOUNT.RAIL[0].y,
            facing: 0,
            aim: 0,
            agi: 0,
            arc: 0,
            recoilAmount: 0,
            recoil: 0,
            // STATS
            engagementRange: 5200,
            spread: 0,
            reloadTime: 150,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1
            }
        }
    ],
    aiming: false,
    target: '',
    task: '',
    method: '',
    int: 1, // Lower is further sensor range
};
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
    hp: 15000,
    shield: {
        shieldCap: 1200,
        shield: 1200,
        shieldRegen: 0.5,
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
            engagementRange: 850,
            spread: 2*Math.PI/180,
            reloadTime: 4,
            reload: 0,
            bullet: {
                dmgMultiplier: 0.5,
                speedMultiplier: 1.25
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
            engagementRange: 850,
            spread: 2*Math.PI/180,
            reloadTime: 4,
            reload: 0,
            bullet: {
                dmgMultiplier: 0.5,
                speedMultiplier: 1.25,
            }
        },
    ],
    target: '',
    task: '',
    method: '',
    int: 1, // Lower is further sensor range
};
var sampleEnemy4 = {
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
    thrust: 0.075,
    agi: 0.025,
    terminalAcceleration:0.5,
    terminalVelocity:7.5,
    drag: 0.001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.CRUISER)),
    // Stats
    hp: 250000,
    shield: {
        shieldCap: 100000,
        shield: 100000,
        shieldRegen: 25,
        cooldown: 0,
    },
    team: GREEN,
    type: CRUISER,
    aiControl: true,
    // Weapons
    weapons: [
        {
            // CONTROL
            type: TURRET,
            size: SMALL,
            ai: true,
            keybind: CLICK,
            // PHYSICS
            x: data.CRUISERMOUNT.SMALLTURRET[0].x,
            y: data.CRUISERMOUNT.SMALLTURRET[0].y,
            ax: data.CRUISERMOUNT.SMALLTURRET[0].x,
            ay: data.CRUISERMOUNT.SMALLTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0.075,
            arc: 210*Math.PI/180,
            recoilAmount: 1,
            recoil: 0,
            // STATS
            engagementRange: 1400,
            spread: 5*Math.PI/180,
            reloadTime: 1,
            reload: 0,
            bullet: {
                dmgMultiplier: 1,
                speedMultiplier: 2
            }
        },
        {
            // CONTROL
            type: TURRET,
            size: MEDIUM,
            ai: true,
            keybind: CLICK,
            // PHYSICS
            x: data.CRUISERMOUNT.MEDIUMTURRET[0].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[0].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[0].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
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
            x: data.CRUISERMOUNT.MEDIUMTURRET[1].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[1].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[1].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[1].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
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
            x: data.CRUISERMOUNT.MEDIUMTURRET[2].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[2].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[2].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[2].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1
            }
        },
    ],
    aimMode: 'Parallel',
};
var sampleEnemy5 = {
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
    thrust: 0.0005,
    agi: 0.01,
    terminalAcceleration:0.15,
    terminalVelocity:5,
    drag: 0.001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.BATTLESHIP)),
    // Stats
    hp: 2500000,
    shield: {
        shieldCap: 25000,
        shield: 25000,
        shieldRegen: 10,
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
            reloadTime: 15,
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
            reloadTime: 15,
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
};
var sampleTeammate2 = {
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
    thrust: 0.075,
    agi: 0.025,
    terminalAcceleration:0.5,
    terminalVelocity:7.5,
    drag: 0.001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.CRUISER)),
    // Stats
    hp: 250000,
    shield: {
        shieldCap: 100000,
        shield: 100000,
        shieldRegen: 25,
        cooldown: 0,
    },
    team: RED,
    type: CRUISER,
    aiControl: true,
    // Weapons
    weapons: [
        {
            // CONTROL
            type: TURRET,
            size: SMALL,
            ai: true,
            keybind: CLICK,
            // PHYSICS
            x: data.CRUISERMOUNT.SMALLTURRET[0].x,
            y: data.CRUISERMOUNT.SMALLTURRET[0].y,
            ax: data.CRUISERMOUNT.SMALLTURRET[0].x,
            ay: data.CRUISERMOUNT.SMALLTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0.075,
            arc: 210*Math.PI/180,
            recoilAmount: 1,
            recoil: 0,
            // STATS
            engagementRange: 1400,
            spread: 5*Math.PI/180,
            reloadTime: 1,
            reload: 0,
            bullet: {
                dmgMultiplier: 1,
                speedMultiplier: 2
            }
        },
        {
            // CONTROL
            type: TURRET,
            size: MEDIUM,
            ai: true,
            keybind: CLICK,
            // PHYSICS
            x: data.CRUISERMOUNT.MEDIUMTURRET[0].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[0].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[0].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[0].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
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
            x: data.CRUISERMOUNT.MEDIUMTURRET[1].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[1].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[1].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[1].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
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
            x: data.CRUISERMOUNT.MEDIUMTURRET[2].x,
            y: data.CRUISERMOUNT.MEDIUMTURRET[2].y,
            ax: data.CRUISERMOUNT.MEDIUMTURRET[2].x,
            ay: data.CRUISERMOUNT.MEDIUMTURRET[2].y,
            facing: 0,
            aim: 0,
            agi: 0.02,
            arc: 270*Math.PI/180,
            recoilAmount: 5,
            recoil: 0,
            // STATS
            engagementRange: 1800,
            spread: 1*Math.PI/180,
            reloadTime: 20,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1
            }
        },
    ],
    aimMode: 'Parallel',
};
var sampleTeammate3 = {
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
    thrust: 0.0005,
    agi: 0.01,
    terminalAcceleration:0.15,
    terminalVelocity:5,
    drag: 0.001,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.BATTLESHIP)),
    // Stats
    hp: 2500000,
    shield: {
        shieldCap: 25000,
        shield: 25000,
        shieldRegen: 10,
        cooldown: 0,
    },
    team: RED,
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
            reloadTime: 15,
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
            reloadTime: 15,
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
};
var sampleTeammate4 = { // Destroyer
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
    agi: 0.025,
    terminalAcceleration:0.5,
    terminalVelocity:6,
    drag: 0.01,
    scale: 1,
    hitbox: JSON.parse(JSON.stringify(data.hitbox.DESTROYER)),
    // Stats
    hp: 200000,
    shield: {
        shieldCap: 10000,
        shield: 10000,
        shieldRegen: 5,
        cooldown: 0,
    },
    team: RED,
    type: DESTROYER,
    aiControl: true,
    id: 69420,
    // Weapons
    weapons: [
        {
            // CONTROL
            type: FIXED,
            size: RAIL,
            ai: false,
            keybind: CLICK,
            // PHYSICS
            x: data.DESTROYERMOUNT.RAIL[0].x,
            y: data.DESTROYERMOUNT.RAIL[0].y,
            ax: data.DESTROYERMOUNT.RAIL[0].x,
            ay: data.DESTROYERMOUNT.RAIL[0].y,
            facing: 0,
            aim: 0,
            agi: 0,
            arc: 0,
            recoilAmount: 0,
            recoil: 0,
            // STATS
            engagementRange: 5200,
            spread: 0,
            reloadTime: 150,
            reload: 0,
            bullet: {
                dmgMultiplier: 1.5,
                speedMultiplier: 1
            }
        }
    ],
    aiming: false,
    target: '',
    task: '',
    method: '',
    int: 1, // Lower is further sensor range
};

// I really should make this better
const enemies = [ // list of enemies to choose from
    JSON.parse(JSON.stringify(sampleEnemy)),      // Green Interceptor
    JSON.parse(JSON.stringify(sampleEnemy)),
    JSON.parse(JSON.stringify(sampleEnemy)),
    JSON.parse(JSON.stringify(sampleEnemy)),
    JSON.parse(JSON.stringify(sampleEnemy)),
    JSON.parse(JSON.stringify(sampleEnemy)),
    JSON.parse(JSON.stringify(sampleEnemy4)),     // Green Cruiser
    JSON.parse(JSON.stringify(sampleEnemy4)),
    JSON.parse(JSON.stringify(sampleEnemy5)),     // Green Battleship
    JSON.parse(JSON.stringify(sampleEnemy2)),     // Red Destroyer
    JSON.parse(JSON.stringify(sampleTeammate)),   // Red Interceptor
    JSON.parse(JSON.stringify(sampleTeammate)),
    JSON.parse(JSON.stringify(sampleTeammate)),
    JSON.parse(JSON.stringify(sampleTeammate)),
    JSON.parse(JSON.stringify(sampleTeammate)),
    JSON.parse(JSON.stringify(sampleTeammate)),
    JSON.parse(JSON.stringify(sampleTeammate2)),  // Red Cruiser
    JSON.parse(JSON.stringify(sampleTeammate2)),
    JSON.parse(JSON.stringify(sampleTeammate3)),  // Red Battleship
    JSON.parse(JSON.stringify(sampleTeammate4)),  // Red Destroyer
];

var ships = [player];
console.log(ships);
var projectiles = [];
var decoratives = [];

function isin(a, b) { // check is a in b
    for (var i = 0; i < b.length; i += 1) {
        if (a == b[i]) {
            return true;
        }
    }
    return false;
};

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

function drawLine(pos, r, length, style) {
    var c = document.getElementById("main");
    var ctx = c.getContext("2d");
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (style) {
        ctx.strokeStyle = style.colour;
        ctx.lineWidth = style.width;
        ctx.globalAlpha = style.opacity;
    }
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + length * Math.cos(r), pos.y + length * Math.sin(r));
    ctx.stroke();
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
        if (player.aimMode) {
            if (player.aimMode == 'Parallel') {
                player.aimMode = 'Converge';
            } else {
                player.aimMode = 'Parallel';
            }
            console.log(`Aiming mode: ${player.aimMode}`);
        } else {
            if (player.aiming == false) {
                player.aiming = true;
            } else {
                player.aiming = false;
            }
            console.log(`Toggled laser sights ${player.aiming}`);
        }
        player.keyboard.q = false;
    }
    for (var i = 0; i < player.weapons.length; i+=1) {
        if (player.weapons[i].keybind == CLICK) {
            if (player.hasClicked) {
                player.weapons[i] = attemptShoot(player.weapons[i], player.team, player.r);
            }
        } else {
            if (player.keyboard[player.weapons[i].keybind]) {
                player.weapons[i] = attemptShoot(player.weapons[i], player.team, player.r);
            }
        }
    }
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
                ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, {x: ship.target.x, y: ship.target.y}, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
            } else {
                ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, mousepos, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
            }
        }
    }
    return ship;
}

function particleEffect(pos, r, v, density, duration, variation) {
    var p = JSON.parse(JSON.stringify(data.construction.physics));
    for (var i = 0; i < density; i += 1) {
        p.img = data.img.particle;
        p.v = v;
        p.x = (Math.random() * r-r/2) * Math.cos(pos.r) + (Math.random() * r-r/2) * Math.sin(pos.r) + pos.x;
        p.y = (Math.random() * r-r/2) * Math.cos(pos.r-Math.PI/2) + (Math.random() * r-r/2) * Math.sin(pos.r-Math.PI/2) + pos.y;
        p.r = pos.r+Math.PI+(variation*Math.random()-variation/2);
        p.life = duration;
        decoratives.push(p);
    }
}

function engineEffect(ship) {
    var engine = data[ship.type+'ENGINES'];
    for (var i = 0; i < engine.length; i+= 1) {
        var p = JSON.parse(JSON.stringify(data.construction.physics));
        p.img = data.img.particle;
        p.v = 2-ship.v;
        p.x = (Math.random() * engine[i].r + engine[i].x) * Math.cos(ship.r) + (Math.random() * engine[i].r + engine[i].y) * Math.sin(ship.r) + ship.x;
        p.y = (Math.random() * engine[i].r + engine[i].x) * Math.cos(ship.r-Math.PI/2) + (Math.random() * engine[i].r + engine[i].y) * Math.sin(ship.r-Math.PI/2) + ship.y;
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
document.addEventListener('mousedown', function(event) {
  if (event.button === 0) { // Check if left mouse button was clicked
    player.hasClicked = true;
  }
});
document.addEventListener('mouseup', function(event) {
  if (event.button === 0) { // Check if left mouse button was released
    player.hasClicked = false;
  }
});
function tellPos(p){
    mousepos = {x: p.pageX, y:p.pageY};
}
addEventListener('mousemove', tellPos, false);

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
        if(ships[i].type == DESTROYER && ships[i].aiming == true) {
            drawLine({x: ships[i].weapons[0].ax, y: ships[i].weapons[0].ay}, ships[i].r, 5000, {colour: 'red',width:3,opacity:0.8});
        }
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
        ships[i] = updateHitboxes(ships[i], false);
        healthBar(50, ships[i], 2);
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
            if ((Math.abs(correctAngle(attacker.weapons[i].aim+attacker.r-aim)) < 10*Math.PI/180 || (attacker.weapons[i].reloadTime <= 45 && Math.abs(correctAngle(attacker.weapons[i].aim+attacker.r-aim)) < 90*Math.PI/180)) && getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < attacker.weapons[i].engagementRange) {
                //console.log('aligned');
                attemptShoot(attacker.weapons[i], attacker.team, attacker.r);
            }
        }
    }
    return attacker;
}

function escort(attacker, dist) { // follow a target and defend them TODO: make escorting ship use its turrets to shoot nearby enemies
    //console.log(attacker);
    attacker.r = correctAngle(attacker.r);
    currentDist = getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y});
    if (currentDist >= dist*2) {
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
    } else if(currentDist < dist) {
        var rAim = attacker.r - attacker.r // relative aim
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

function bulletTrail(obj1) {
    var steps = Math.abs(obj1.v) / obj1.hitbox[0].r;
    if (steps < 0) {
        steps = 0;
    }
    for (var step = 0; step < steps; step += 1) {
        particleEffect({x:obj1.px+obj1.vx/steps*step,y:obj1.py+obj1.vy/steps*step,r:obj1.r}, obj1.hitbox[0].r*2, -0.1, Math.round(10/(Math.max(step,1))), 120, 15*Math.PI/180);
    }
}

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
    return target;
}

function autoMission(ship) { // Expand this later
    var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, ALL, 100000);
    if (target) {
        return {mission: ATTACK, target: target};
    } else {
        var target = autoTarget(FRIENDLY, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 100000);
        if (target) {
            return {mission: ESCORT, target: target};
        } else {
            return {mission: IDLE, target: null};
        }
    }
}

function handleAi(ships) {
    for (var i = 0; i < ships.length; i+=1) {
        if (ships[i].aiControl) {
            if (ships.target == null) {
                ships[i].target = '';
            }
            if ((ships[i].task == '' || ships[i].target == '') || (t%60 == 0 && (ships[i].task == IDLE || ships[i].task == ESCORT)) || t%600 == 0) {
                var mission = autoMission(ships[i]);
                ships[i].task = mission.mission;
                ships[i].target = mission.target;
            } 
            if (ships[i].task == ATTACK) {
                ships[i] = chase(ships[i], 500);
            } else if(ships[i].task == ESCORT) {
                ships[i] = escort(ships[i], 1000);
            } else {
                ships[i] = idle(ships[i]);
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
        if (ship.shield.cooldown > 300) {
            ship.shield.cooldown = 300;
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
                var res = calculateDamage(projectiles[i], ships[j]);
                projectiles[i] = res[0];
                ships[j] = res[1];
            }
        }
        // draw the bullet
        if (projectiles[i].effect) {
            bulletTrail(projectiles[i]);
        }
        addImage(data.img[projectiles[i].type], projectiles[i].x, projectiles[i].y, data.center[projectiles[i].type].x, data.center[projectiles[i].type].y, 1, projectiles[i].r);
        projectiles[i] = updateHitboxes(projectiles[i], false);
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

function generatePos(ship) { // put the newly generated ship off screen somewhere. This makes the ship appear as if it has been there for the whole time and isn't recently generated
    ship.x = Math.floor(Math.random() * (data.display.x + 251)) - 250;
    ship.y = Math.floor(Math.random() * (data.display.y + 251)) - 250;
    var edge = null;
    if (Math.random() > 0.5) {
        edge = 'x';
    } else {
        edge = 'y'
    }
    if (Math.random() > 0.5) {
        ship[edge] = data.display[edge]+250;
    } else {
        ship[edge] = -250;
    }
    return ship;
}

function generateShips(ships, step, rate) {
    if (true) { // use to turn off enemies for debug purposes
        if (t === 0) {
            for (var i = 0; i < 5; i += 1) {
                var chosen = JSON.parse(JSON.stringify(enemies[Math.floor(Math.random() * enemies.length)]));
                if (isin(chosen.type, FIGHTER)) {
                    var gen = true;
                    while (gen) {
                        chosen = generatePos(chosen);
                        ships.push(JSON.parse(JSON.stringify(chosen)));
                        if (Math.random() < Math.min(rate*2,0.75)) {
                            gen = false;
                        }
                    }
                }
                chosen = generatePos(chosen);
                ships.push(chosen);
            }
        } else if (t % step === 0) {
            if (Math.random() < rate) {
                var chosen = JSON.parse(JSON.stringify(enemies[Math.floor(Math.random() * enemies.length)]));
                if (isin(chosen.type, FIGHTER)) {
                    var gen = true;
                    while (gen) {
                        chosen = generatePos(chosen);
                        ships.push(JSON.parse(JSON.stringify(chosen)));
                        if (Math.random() < Math.min(rate*2,0.75)) {
                            gen = false;
                        }
                    }
                }
                chosen = generatePos(chosen);
                ships.push(chosen);
            }
        } else {
        }
    }
    return ships;
}

function tick(objs) {
    for (var i = 0; i < objs.length; i+=1) {
        // if it has life, reduce it
        if (objs[i].life) {
            objs[i].life -= 1;
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
    objs = objs.filter(obj => !obj.hasOwnProperty('life') || obj.life > 0);
    objs = objs.filter(obj => !obj.hasOwnProperty('hp') || obj.hp > 0);
    return objs;
}

var shouldAddShips = false;
function test() {
    shouldAddShips = true;
}

function main() {
    clearCanvas();
    if (shouldAddShips) {
        shouldAddShips = false;
        ships = generateShips(ships, 1, 1);
        ships = generateShips(ships, 1, 1);
        ships = generateShips(ships, 1, 1);
        ships = generateShips(ships, 1, 1);
        ships = generateShips(ships, 1, 1);
    }
    ships = generateShips(ships, 120, 0.25);
    decoratives = tick(decoratives);
    projectiles = tick(projectiles);
    ships = tick(ships);
    for (var i = 0; i < ships.length; i += 1) {
        ships[i].weapons = tick(ships[i].weapons);
    }
    ships = handleAi(ships);
    decoratives = handleDecoratives(decoratives);
    ships = handleShips(ships);
    player = handlePlayer(player);
    var res = handleProjectiles(projectiles, ships);
    projectiles = res[0];
    ships = res[1];
}

var t = 0
async function game() {
    ships = generateShips(ships, 0, 1);
    while (1) {
        t += 1;
        main();
        //await sleep(500);  // Debug Mode
        await sleep(1000/60);  // 60 FPS
    }
    console.log('gg');
}

