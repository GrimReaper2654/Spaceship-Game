
/*
-----------------------------------------Balancing-----------------------------------------
1/3/2023
 • start of changelog
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

3/4/2023
 • buffed Battleship shield 25000 --> 100000
 • buffed Battleship shield regen 10 --> 50
 • nerfed Battleship health 2.5M --> 2M
 
6/6/2023
 • reworked drag entirely
 • increaced player thrust by 900%
 • increaced player agility by 50%
 • buffed eneny AI (fixed some bugs)

8/6/2023
 • nerfed Destroyer reload 150 --> 300
 • nerfed Destroyer damage 150% --> 125%

 9/6/2023
 • buffed Destroyer speed 6 --> 7.5
 • buffed Destroyer reload 300 --> 150
 • nerfed Destroyer damage 125% --> 100%

15/6/2023
 • buffed repair 500 --> 1000hp/t
 • buffed huge cannon shell damage 24000 --> 48000
 • increaced huge cannon shell hitbox to 30px wide

15/6/2023
 • decreaced railgun metal consumption 15 --> 5
 • changed ship resource drop rates

28/6/2023
 • added bomber (small ship that deals deavy damage to capital ships)
 • changed ship resource drop rates

5/7/2023
 • added bomber (small ship that deals deavy damage to capital ships)
    • 20k  hp
    • 500  shd
    • 0.5  reg
    • 30   top speed
    • 1 bomb launcher
 • added bombs
    • 2k   dmg/t
    • 60   blast radius
 • added more upgrades and endgame content
 • increaced starting resources

6/7/2023
 • added frigate (cruised but smol)
    • 150k hp
    • 8k   shd
    • 15   reg
    • 5    top speed
    • 1 medium turret, 2 small turret
 • increaced small turret spread
 • buffed bomber reload 15 --> 10
 • buffed bomb damage 2k/t --> 4k/t

-------------------------------------------------------------------------------------------
*/

// Teams
const RED = 'RED';
const GREEN = 'GREEN';
const TEAMS = [RED, GREEN];
const FRIENDLY = 'FRIENDLY';
const HOSTILE = 'HOSTILE';

// Weapon types
const FIXED = 'FIXED';
const TURRET = 'TURRET';

// Weapons
const PD = 'PD';
const SMALL = 'SMALL';
const MEDIUM = 'MEDIUM';
const LARGE = 'LARGE';
const HUGE = 'HUGE';
const BOMB = 'BOMB';
const RAIL = 'RAIL';

const PHYSICAL = [PD, LARGE, HUGE, RAIL];
const EXPLOSIVE = [BOMB];
const LASER = [SMALL, MEDIUM];

// Control
const CLICK = 'CLICK';
const ATTACK = 'ATTACK';
const ESCORT = 'ESCORT';
const IDLE = 'IDLE';

// Ship Types
const BATTLESHIP = 'BATTLESHIP';
const BATTLECRUISER = 'BATTLECRUISER';
const CRUISER = 'CRUISER';
const DESTROYER = 'DESTROYER';
const FRIGATE = 'FRIGATE';
const INTERCEPTOR = 'INTERCEPTOR';
const BOMBER = 'BOMBER';
const ALL = 'ALL';
const CAPITAL = [BATTLESHIP,CRUISER];
const FIGHTER = [BOMBER,INTERCEPTOR];
const NOTCAPITAL = [DESTROYER,FRIGATE,BOMBER,INTERCEPTOR];
const NOTFIGHTER = [BATTLESHIP,CRUISER,DESTROYER,FRIGATE];
const ALLSHIPS = [BATTLESHIP,CRUISER,DESTROYER,FRIGATE,BOMBER,INTERCEPTOR];

// Resources
const METAL = 'METAL';
const CIRCUITS = 'CIRCUITS';
const FUELCELLS = 'FUELCELLS';
const RESOURCES = [METAL, CIRCUITS, FUELCELLS];

// Support functions
function isin(a, b) { // check is a in b
    for (var i = 0; i < b.length; i += 1) {
        if (a == b[i]) {
            return true;
        }
    }
    return false;
};

function randchoice(list, remove = false) { // chose 1 from a list and update list
    let length = list.length;
    let choice = randint(0, length-1);
    if (remove) {
        let chosen = list.splice(choice, 1);
        return [chosen, list];
    }
    return list[choice];
};

function randint(min, max, notequalto=false) { // Randint returns random interger between min and max (both included)
    if (max - min <= 1) {
        return min;
    }
    var gen = Math.floor(Math.random() * (max - min + 1)) + min;
    var i = 0; // 
    while (gen != min && gen != max && notequalto && i < 100) { // loop max 100 times
        gen = Math.floor(Math.random() * (max - min + 1)) + min;
        i += 1;
        console.log('calculating...');
    }
    if (i >= 100) {
        console.log('ERROR: could not generate suitable number');
    }
    return gen;
};

// Excessively overcomplicated data storage system
var prototypedata = {
    dim: {
        BATTLESHIP:{x:497,y:152}, 
        CRUISER:{x:465,y:122}, 
        DESTROYER:{x:291,y:128}, 
        FRIGATE:{x:222,y:124}, 
        BOMBER:{x:78,y:52}, 
        INTERCEPTOR:{x:73,y:45}, 
        LARGETURRET:{x:109,y:44}, 
        MEDIUMTURRET:{x:45,y:28},
        SMALLTURRET:{x:37,y:17},
        PDTURRET:{x:17,y:10},
        BOMBBULLET:{x:12,y:12},
        RAILBULLET:{x:38,y:10},
        HUGEBULLET:{x:22,y:12}, 
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
        FRIGATEPLUME:{x:0,y:0}, 
        BOMBERPLUME:{x:0,y:0}, 
        INTERCEPTORPLUME:{x:0,y:0}, 
        SEXPLOSION:{x:73,y:45}, // SMALL EXPLOSION! not anything else your dirty mind thought up of
        MEXPLOSION:{x:0,y:0},
        LEXPLOSION:{x:0,y:0},
        METAL:{x:25,y:25},
        CIRCUITS:{x:25,y:14},
        FUELCELLS:{x:14,y:21},
    },
    center: {
        BATTLESHIP:{x:240,y:76}, 
        CRUISER:{x:155,y:61}, 
        DESTROYER:{x:75,y:64}, 
        FRIGATE:{x:80,y:62}, 
        BOMBER:{x:39,y:26}, 
        INTERCEPTOR:{x:35,y:22.5}, 
        LARGETURRET:{x:36,y:22},
        MEDIUMTURRET:{x:20,y:14}, 
        SMALLTURRET:{x:9,y:8.5},
        PDTURRET:{x:6,y:5},
        BOMBBULLET:{x:6,y:6},
        RAILBULLET:{x:27,y:5},
        HUGEBULLET:{x:0,y:6}, 
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
        FRIGATEPLUME:{x:0,y:0}, 
        BOMBERPLUME:{x:0,y:0}, 
        INTERCEPTORPLUME:{x:0,y:0}, 
        SEXPLOSION:{x:36.5,y:22.5}, // SMALL EXPLOSION! not anything else your dirty mind thought up of
        MEXPLOSION:{x:0,y:0},
        LEXPLOSION:{x:0,y:0},
        METAL:{x:12.5,y:15.5},
        CIRCUITS:{x:12.5,y:7},
        FUELCELLS:{x:7,y:10.5},
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
        FRIGATE: [
            {x:100, y:62, r:60}, 
            {x:175, y:62, r:25}, 
            {x:200, y:62, r:30}, 
            {x:240, y:62, r:15}, 
        ],
        BOMBER: [ // fits perfectly
            {x:39, y:26, r:38}, 
        ],
        INTERCEPTOR: [ // annoyingly small and hard to hit
            {x:25, y:22.5, r:22.5}, 
            {x:52.5, y:22.5, r:10}, 
        ],
        RAILBULLET: [ // much larger than expected
            {x:32, y:5, r:25}, 
        ],
        HUGEBULLET: [ // wider than you think
            {x:11, y:6, r:15}, 
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
        BOMBBULLET: [ // detonate when near something
            {x:0, y:0, r:50}, 
        ],
        METAL: [
            {x:12.5, y:12.5, r:15}, 
        ],
        CIRCUITS: [
            {x:12.5, y:7, r:15}, 
        ],
        FUELCELLS: [
            {x:7, y:10.5, r:15}, 
        ],
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
    FRIGATEMOUNT: {
        MEDIUMTURRET: [{x:120,y:62}],
        SMALLTURRET: [{x:200,y:62},{x:70,y:62}],
    },
    BOMBERMOUNT: {
        BOMB: [{x:39,y:26}],
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
    FRIGATEENGINES: [ // r is radius
        {x: -80, y: 0, r: 20},
    ],
    BOMBERENGINES: [ // r is radius
        {x: -39, y: -10, r: 10},
    ],
    INTERCEPTORENGINES: [
        {x: -35, y: -10, r: 10},
    ],
    shipSpawnProbability: [ // percentage
        5, 
        15,
        5,
        20,
        20,
        35,
    ],
};
prototypedata.construction =  {
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
        drag: 1,
    },
    AI: {
        aiControl: true,
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
        drag: 0.95,
        scale: 1,
        type: BATTLESHIP,
        // Stats
        hp: 2000000,
        shield: {
            shieldCap: 25000,
            shield: 25000,
            shieldRegen: 10,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: HUGE,
                ai: false,
                keybind: 'e',
                // PHYSICS
                x: prototypedata.dim.BATTLESHIP.x,
                y: prototypedata.center.BATTLESHIP.y,
                ax: prototypedata.dim.BATTLESHIP.x,
                ay: prototypedata.center.BATTLESHIP.y,
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
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
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
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
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
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
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
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
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
    },
    CRUISER: {
        thrust: 0.075,
        agi: 0.025,
        terminalAcceleration:0.5,
        terminalVelocity:7.5,
        drag: 0.925,
        scale: 1,
        type: CRUISER,
        // Stats
        hp: 250000,
        shield: {
            shieldCap: 80000,
            shield: 80000,
            shieldRegen: 15,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.CRUISERMOUNT.SMALLTURRET[0].x,
                y: prototypedata.CRUISERMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.CRUISERMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.CRUISERMOUNT.SMALLTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.075,
                arc: 210*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].y,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].y,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].y,
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
    },
    DESTROYER: {
        thrust: 0.1,
        agi: 0.05,
        terminalAcceleration:0.5,
        terminalVelocity:7.5,
        drag: 0.975,
        scale: 1,
        type: DESTROYER,
        // Stats
        hp: 200000,
        shield: {
            shieldCap: 10000,
            shield: 10000,
            shieldRegen: 5,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: RAIL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                y: prototypedata.DESTROYERMOUNT.RAIL[0].y,
                ax: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                ay: prototypedata.DESTROYERMOUNT.RAIL[0].y,
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
                    dmgMultiplier: 1,
                    speedMultiplier: 1
                }
            }
        ],
    },
    FRIGATE: {
        thrust: 0.05,
        agi: 0.015,
        terminalAcceleration:0.5,
        terminalVelocity:5,
        drag: 0.9,
        scale: 1,
        type: FRIGATE,
        // Stats
        hp: 150000,
        shield: {
            shieldCap: 8000,
            shield: 8000,
            shieldRegen: 15,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].x,
                y: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.05,
                arc: 300*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2,
                    speedMultiplier: 1
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].x,
                y: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].y,
                ax: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].x,
                ay: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.05,
                arc: 300*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2,
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
                x: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].y,
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
                    dmgMultiplier: 1,
                    speedMultiplier: 1
                }
            },
        ],
    },
    BOMBER: {
        thrust: 0.01,
        agi: 0.05,
        terminalAcceleration:1.5,
        terminalVelocity:30,
        drag: 0.9,
        scale: 1,
        type: BOMBER,
        // Stats
        hp: 20000,
        shield: {
            shieldCap: 500,
            shield: 500,
            shieldRegen: 0.5,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: BOMB,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BOMBERMOUNT.BOMB[0].x,
                y: prototypedata.BOMBERMOUNT.BOMB[0].y,
                ax: prototypedata.BOMBERMOUNT.BOMB[0].x,
                ay: prototypedata.BOMBERMOUNT.BOMB[0].y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 50,
                spread: 0,
                reloadTime: 10,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1,
                    speedMultiplier: 1,
                }
            },
        ],
    },
    INTERCEPTOR: {
        thrust: 0.1,
        agi: 0.1,
        terminalAcceleration:1,
        terminalVelocity:15,
        drag: 0.9,
        scale: 1,
        type: INTERCEPTOR,
        // Stats
        hp: 15000,
        shield: {
            shieldCap: 600,
            shield: 600,
            shieldRegen: 0.1,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: SMALL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].x,
                y: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].y,
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
                x: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].x,
                y: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].y,
                ax: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].x,
                ay: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].y,
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
    },
    REINFORCEDINTERCEPTOR: {
        thrust: 0.15,
        agi: 0.15,
        terminalAcceleration:1,
        terminalVelocity:20,
        drag: 0.9,
        scale: 1,
        type: INTERCEPTOR,
        // Stats
        hp: 75000,
        shield: {
            shieldCap: 500,
            shield: 500,
            shieldRegen: 10,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: SMALL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].x,
                y: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].y,
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
                    dmgMultiplier: 2,
                    speedMultiplier: 1,
                }
            },
            {
                // CONTROL
                type: FIXED,
                size: SMALL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].x,
                y: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].y,
                ax: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].x,
                ay: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].y,
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
                    dmgMultiplier: 2,
                    speedMultiplier: 1,
                }
            },
        ],
    },
    REINFORCEDFRIGATE: {
        thrust: 0.05,
        agi: 0.015,
        terminalAcceleration:0.5,
        terminalVelocity:7,
        drag: 0.9,
        scale: 1,
        type: FRIGATE,
        // Stats
        hp: 200000,
        shield: {
            shieldCap: 8000,
            shield: 8000,
            shieldRegen: 25,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].x,
                y: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.05,
                arc: 300*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
                    speedMultiplier: 1
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].x,
                y: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].y,
                ax: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].x,
                ay: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.05,
                arc: 300*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
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
                x: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].y,
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
    },
    REINFORCEDCRUISER: {
        thrust: 0.075,
        agi: 0.025,
        terminalAcceleration:0.5,
        terminalVelocity:12,
        drag: 0.925,
        scale: 1,
        type: CRUISER,
        // Stats
        hp: 250000,
        shield: {
            shieldCap: 150000,
            shield: 150000,
            shieldRegen: 50,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.CRUISERMOUNT.SMALLTURRET[0].x,
                y: prototypedata.CRUISERMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.CRUISERMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.CRUISERMOUNT.SMALLTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.075,
                arc: 210*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 8,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 8,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 8,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.5,
                    speedMultiplier: 1
                }
            },
        ],
    },
    REINFORCEDBATTLESHIP: {
        thrust: 0.0014,
        agi: 0.005,
        terminalAcceleration:0.15,
        terminalVelocity:2.5,
        drag: 0.95,
        scale: 1,
        type: BATTLESHIP,
        // Stats
        hp: 4000000,
        shield: {
            shieldCap: 25000,
            shield: 25000,
            shieldRegen: 15,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: HUGE,
                ai: false,
                keybind: 'e',
                // PHYSICS
                x: prototypedata.dim.BATTLESHIP.x,
                y: prototypedata.center.BATTLESHIP.y,
                ax: prototypedata.dim.BATTLESHIP.x,
                ay: prototypedata.center.BATTLESHIP.y,
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
                    dmgMultiplier: 10,
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
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.25,
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
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.25,
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
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.015,
                arc: 270*Math.PI/180,
                recoilAmount: 10,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 0,
                reloadTime: 60,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.5,
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
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.015,
                arc: 270*Math.PI/180,
                recoilAmount: 10,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 0,
                reloadTime: 60,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.5,
                    speedMultiplier: 1
                }
            },
        ],
    },
    // Boss ship
    DREADNOUGHT: {
        thrust: 0.001,
        agi: 0.0025,
        terminalAcceleration:0.1,
        terminalVelocity:4,
        drag: 0.95,
        scale: 1,
        type: BATTLESHIP,
        // Stats
        hp: 10000000,
        shield: {
            shieldCap: 50000,
            shield: 50000,
            shieldRegen: 75,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: HUGE,
                ai: false,
                keybind: 'e',
                // PHYSICS
                x: prototypedata.dim.BATTLESHIP.x,
                y: prototypedata.center.BATTLESHIP.y,
                ax: prototypedata.dim.BATTLESHIP.x,
                ay: prototypedata.center.BATTLESHIP.y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 5*Math.PI/180,
                reloadTime: 60,
                reload: 0,
                bullet: {
                    dmgMultiplier: 10,
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
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 2,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.25,
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
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 2,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.25,
                    speedMultiplier: 2
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: LARGE,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.01,
                arc: 270*Math.PI/180,
                recoilAmount: 10,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 0,
                reloadTime: 20,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2,
                    speedMultiplier: 1.5
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: LARGE,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.01,
                arc: 270*Math.PI/180,
                recoilAmount: 20,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 0,
                reloadTime: 10,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2,
                    speedMultiplier: 1.5
                }
            },
        ],
    },
    ASCENDEDINTERCEPTOR: {
        thrust: 0.2,
        agi: 0.2,
        terminalAcceleration:2,
        terminalVelocity:30,
        drag: 0.75,
        scale: 1,
        type: INTERCEPTOR,
        // Stats
        hp: 100000,
        shield: {
            shieldCap: 1500,
            shield: 1500,
            shieldRegen: 25,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: SMALL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].x,
                y: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 600,
                spread: 2*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
                    speedMultiplier: 1,
                }
            },
            {
                // CONTROL
                type: FIXED,
                size: SMALL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].x+2,
                y: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].x+2,
                ay: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 600,
                spread: 2*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
                    speedMultiplier: 1,
                }
            },
            {
                // CONTROL
                type: FIXED,
                size: SMALL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].x+2,
                y: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].y,
                ax: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].x+2,
                ay: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 600,
                spread: 2*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
                    speedMultiplier: 1,
                }
            },
            {
                // CONTROL
                type: FIXED,
                size: SMALL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].x,
                y: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].y,
                ax: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].x,
                ay: prototypedata.INTERCEPTORMOUNT.SMALLTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 600,
                spread: 2*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
                    speedMultiplier: 1,
                }
            },
        ],
    },
    ASCENDEDBOMBER: {
        thrust: 0.01,
        agi: 0.05,
        terminalAcceleration:1.5,
        terminalVelocity:50,
        drag: 0.9,
        scale: 1,
        type: BOMBER,
        // Stats
        hp: 30000,
        shield: {
            shieldCap: 1000,
            shield: 1000,
            shieldRegen: 5,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: BOMB,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BOMBERMOUNT.BOMB[0].x,
                y: prototypedata.BOMBERMOUNT.BOMB[0].y,
                ax: prototypedata.BOMBERMOUNT.BOMB[0].x,
                ay: prototypedata.BOMBERMOUNT.BOMB[0].y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 75,
                spread: 0,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2,
                    speedMultiplier: 1,
                }
            },
        ],
    },
    ASCENDEDFRIGATE: {
        thrust: 0.05,
        agi: 0.015,
        terminalAcceleration:0.5,
        terminalVelocity:10,
        drag: 0.9,
        scale: 1,
        type: FRIGATE,
        // Stats
        hp: 250000,
        shield: {
            shieldCap: 8000,
            shield: 8000,
            shieldRegen: 30,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].x,
                y: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.FRIGATEMOUNT.SMALLTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.05,
                arc: 300*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 4,
                    speedMultiplier: 1
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].x,
                y: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].y,
                ax: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].x,
                ay: prototypedata.FRIGATEMOUNT.SMALLTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.05,
                arc: 300*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 4,
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
                x: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.FRIGATEMOUNT.MEDIUMTURRET[0].y,
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
                    dmgMultiplier: 2,
                    speedMultiplier: 1
                }
            },
        ],
    },
    ASCENDEDDESTROYER: {
        thrust: 0.1,
        agi: 0.05,
        terminalAcceleration:0.5,
        terminalVelocity:12,
        drag: 0.975,
        scale: 1,
        type: DESTROYER,
        // Stats
        hp: 250000,
        shield: {
            shieldCap: 15000,
            shield: 15000,
            shieldRegen: 15,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: RAIL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                y: prototypedata.DESTROYERMOUNT.RAIL[0].y,
                ax: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                ay: prototypedata.DESTROYERMOUNT.RAIL[0].y,
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
            },
            {
                // CONTROL
                type: FIXED,
                size: RAIL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                y: prototypedata.DESTROYERMOUNT.RAIL[0].y,
                ax: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                ay: prototypedata.DESTROYERMOUNT.RAIL[0].y,
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
            },
            {
                // CONTROL
                type: FIXED,
                size: RAIL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                y: prototypedata.DESTROYERMOUNT.RAIL[0].y,
                ax: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                ay: prototypedata.DESTROYERMOUNT.RAIL[0].y,
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
            },
            {
                // CONTROL
                type: FIXED,
                size: RAIL,
                ai: false,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                y: prototypedata.DESTROYERMOUNT.RAIL[0].y,
                ax: prototypedata.DESTROYERMOUNT.RAIL[0].x,
                ay: prototypedata.DESTROYERMOUNT.RAIL[0].y,
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
    },
    ASCENDEDCRUISER: {
        thrust: 0.075,
        agi: 0.025,
        terminalAcceleration:0.5,
        terminalVelocity:15,
        drag: 0.925,
        scale: 1,
        type: CRUISER,
        // Stats
        hp: 250000,
        shield: {
            shieldCap: 500000,
            shield: 500000,
            shieldRegen: 250,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: TURRET,
                size: SMALL,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.CRUISERMOUNT.SMALLTURRET[0].x,
                y: prototypedata.CRUISERMOUNT.SMALLTURRET[0].y,
                ax: prototypedata.CRUISERMOUNT.SMALLTURRET[0].x,
                ay: prototypedata.CRUISERMOUNT.SMALLTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.075,
                arc: 210*Math.PI/180,
                recoilAmount: 1,
                recoil: 0,
                // STATS
                engagementRange: 1400,
                spread: 10*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 7.5,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2.5,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2.5,
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
                x: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].x,
                y: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].y,
                ax: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].x,
                ay: prototypedata.CRUISERMOUNT.MEDIUMTURRET[2].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2.5,
                    speedMultiplier: 1
                }
            },
        ],
    },
    ASCENDEDBATTLESHIP: {
        thrust: 0.001,
        agi: 0.005,
        terminalAcceleration:0.1,
        terminalVelocity: 6,
        drag: 0.95,
        scale: 1,
        type: BATTLESHIP,
        // Stats
        hp: 5000000,
        shield: {
            shieldCap: 100000,
            shield: 100000,
            shieldRegen: 300,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: HUGE,
                ai: false,
                keybind: 'e',
                // PHYSICS
                x: prototypedata.dim.BATTLESHIP.x,
                y: prototypedata.center.BATTLESHIP.y,
                ax: prototypedata.dim.BATTLESHIP.x,
                ay: prototypedata.center.BATTLESHIP.y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 5*Math.PI/180,
                reloadTime: 60,
                reload: 0,
                bullet: {
                    dmgMultiplier: 10,
                    speedMultiplier: 5
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: MEDIUM,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.25,
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
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 1,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1.25,
                    speedMultiplier: 2
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: LARGE,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.015,
                arc: 270*Math.PI/180,
                recoilAmount: 10,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 0,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2,
                    speedMultiplier: 1.5
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: LARGE,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.015,
                arc: 270*Math.PI/180,
                recoilAmount: 20,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 0,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 2,
                    speedMultiplier: 1.5
                }
            },
        ],
    },
    // Second Boss ship
    DOOMSHIP: {
        thrust: 0.001,
        agi: 0.001,
        terminalAcceleration:0.1,
        terminalVelocity:2,
        drag: 0.95,
        scale: 1,
        type: BATTLESHIP,
        // Stats
        hp: 100000000,
        shield: {
            shieldCap: 500000,
            shield: 500000,
            shieldRegen: 750,
            cooldown: 0,
        },
        weapons: [
            {
                // CONTROL
                type: FIXED,
                size: HUGE,
                ai: false,
                keybind: 'e',
                // PHYSICS
                x: prototypedata.dim.BATTLESHIP.x,
                y: prototypedata.center.BATTLESHIP.y,
                ax: prototypedata.dim.BATTLESHIP.x,
                ay: prototypedata.center.BATTLESHIP.y,
                facing: 0,
                aim: 0,
                agi: 0,
                arc: 0,
                recoilAmount: 0,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 5*Math.PI/180,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 25,
                    speedMultiplier: 3
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: MEDIUM,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 2,
                reload: 0,
                bullet: {
                    dmgMultiplier: 25,
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
                x: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.MEDIUMTURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.02,
                arc: 270*Math.PI/180,
                recoilAmount: 5,
                recoil: 0,
                // STATS
                engagementRange: 1800,
                spread: 1*Math.PI/180,
                reloadTime: 2,
                reload: 0,
                bullet: {
                    dmgMultiplier: 25,
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
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[0].y,
                facing: 0,
                aim: 0,
                agi: 0.005,
                arc: 270*Math.PI/180,
                recoilAmount: 10,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 0,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
                    speedMultiplier: 0.75
                }
            },
            {
                // CONTROL
                type: TURRET,
                size: LARGE,
                ai: true,
                keybind: CLICK,
                // PHYSICS
                x: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                y: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                ax: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].x,
                ay: prototypedata.BATTLESHIPMOUNT.LARGETURRET[1].y,
                facing: 0,
                aim: 0,
                agi: 0.005,
                arc: 270*Math.PI/180,
                recoilAmount: 20,
                recoil: 0,
                // STATS
                engagementRange: 3600,
                spread: 0,
                reloadTime: 5,
                reload: 0,
                bullet: {
                    dmgMultiplier: 5,
                    speedMultiplier: 0.75
                }
            },
        ],
    },
    MISSILEBULLET: { // a missile that explodes on impact
        v: 5,
        dmg: 1500, // this acts more as health than damage
        dmgvb: 0,
        life: 216000, // basically lives forever (1 hour of life)
        physical: true,
        effect: true,
        explosion: {r: 50, dmg: 6000, dropoff: 0.1},
    },
    MEGABULLET: { // giant ball of plasma
        v: 5,
        dmg: 150000, // instakills almost everything but is very slow
        dmgvb: 0,
        life: 720,
        physical: false,
        effect: true,
        explosion: {r: 200, dmg: 100000, dropoff: 0.9},
    },
    RAILBULLET: { // railgun round
        v: 100,
        dmg: 100000, // instakills smaller ships and pierces through them
        dmgvb: 0,
        life: 50,
        physical: true,
        effect: true,
        explosion: {r: 0, dmg: 0, dropoff: 0},
    },
    HUGEBULLET: { // cannon shell
        v: 20,
        dmg: 48000,
        dmgvb: 0,
        life: 240,
        physical: true,
        effect: false,
        explosion: {r: 0, dmg: 0, dropoff: 0},
    },
    LARGEBULLET: { // cannon shell
        v: 25,
        dmg: 18000, // 14.4k DPS per turret
        dmgvb: 0,
        life: 120,
        physical: true,
        effect: false,
        explosion: {r: 0, dmg: 0, dropoff: 0},
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
    BOMBBULLET: { // bomb
        v: 5,
        dmg: 100, // it explodes so minimal damage on collision
        dmgvb: 0,
        life: 10,
        physical: false,
        effect: false,
        explosion: {r: 60, dmg: 4000, dropoff: 0.6},
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
};
const img = {
    img: {
        // Dead ships
        BATTLESHIP: document.getElementById("Battleship"),
        CRUISER: document.getElementById("Cruiser"),
        DESTROYER: document.getElementById("Destroyer"),
        FRIGATE: document.getElementById("Frigate"),
        BOMBER: document.getElementById("Bomber"),
        INTERCEPTOR: document.getElementById("Interceptor"),

        // Red Ships
        REDBATTLESHIP: document.getElementById("BattleshipRed"),
        REDCRUISER: document.getElementById("CruiserRed"),
        REDDESTROYER: document.getElementById("DestroyerRed"),
        REDFRIGATE: document.getElementById("FrigateRed"),
        REDBOMBER: document.getElementById("BomberRed"),
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
        GREENFRIGATE: document.getElementById("FrigateGreen"),
        GREENBOMBER: document.getElementById("BomberGreen"),
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
        BOMBBULLET: document.getElementById("BulletBomb"),
        PDBULLET: document.getElementById("BulletPD"),

        // Health Bar Parts
        GREYCIRCLE: document.getElementById("greyCircle"),
        BLUECIRCLE: document.getElementById("blueCircle"),
        SILVERCIRCLE: document.getElementById("silverCircle"),

        // The particle image that is reused for almost every particle effect
        particle: document.getElementById("particle"),

        // Explosions
        sExplosion: [].concat(Array(5).fill(document.getElementById("s0")), Array(5).fill(document.getElementById("s1")), Array(5).fill(document.getElementById("s2")), Array(5).fill(document.getElementById("s3")), Array(5).fill(document.getElementById("s4")), Array(5).fill(document.getElementById("s5")), Array(120).fill(document.getElementById("None"))),

        // Engine plumes
        BATTLESHIPPLUME: document.getElementById("BattleshipPlume"),
        BATTLESHIPPLUMEOVERLAY: document.getElementById("BattleshipPlumeOverlay"),
        CRUISERPLUME: document.getElementById("CruiserPlume"),
        CRUISERPLUMEOVERLAY: document.getElementById("CruiserPlumeOverlay"),
        DESTROYERPLUME: document.getElementById("DestroyerPlume"),
        DESTROYERPLUMEOVERLAY: document.getElementById("DestroyerPlumeOverlay"),
        FRIGATEPLUME: document.getElementById("FrigatePlume"),
        FRIGATEPLUMEOVERLAY: document.getElementById("FrigatePlumeOverlay"),
        BOMBERPLUME: document.getElementById("BomberPlume"),
        BOMBERPLUMEOVERLAY: document.getElementById("BomberPlumeOverlay"),
        INTERCEPTORPLUME: document.getElementById("InterceptorPlume"),
        INTERCEPTORPLUMEOVERLAY: document.getElementById("InterceptorPlumeOverlay"),

        chinaImage: document.getElementById("China"),

        // Resources
        RES: [
            document.getElementById("Metal"),
            document.getElementById("Circuits"),
            document.getElementById("FuelCell"),
        ],
    }
};

const data = Object.assign(img, JSON.parse(JSON.stringify(prototypedata)));
var mousepos = {x:0,y:0};
var display = {x:window.innerWidth, y:window.innerHeight};

var spawnChances = [];
for (var i = 0; i < data.shipSpawnProbability.length; i += 1) {
    for (var j = 0; j < data.shipSpawnProbability[i]; j += 1) {
        spawnChances.push(ALLSHIPS[i]);
    }
}
console.log(spawnChances);

var player = {};
//localStorage.removeItem('player');
var savedPlayer = localStorage.getItem('player');
if (savedPlayer !== null) {
    console.log('loading previous save');
    player = JSON.parse(savedPlayer);
    console.log(savedPlayer);
} else {
    // No saved data found
    console.log('no save found, creating new player');
    player = { // Play as Battleship
        // Physics
        x: display.x/2,
        y: display.y/2,
        px: display.x/2,
        py: display.y/2,
        v: 0,
        vx: 0,
        vy: 0,
        r: 0,
        a: 0,
        thrust: 0.005,
        agi: 0.015,
        terminalAcceleration:0.15,
        terminalVelocity:5,
        drag: 0.999,
        scale: 1,
        hitbox: JSON.parse(JSON.stringify(data.hitbox.BATTLESHIP)),
        // Stats
        hp: 2000000,
        maxHp: 2000000,
        shield: {
            shieldCap: 100000,
            shield: 100000,
            shieldRegen: 50,
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
                size: RAIL,
                ai: false,
                keybind: 'f',
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
                cost: {METAL: 5, FUELCELLS: 1},
                engagementRange: 5400,
                spread: 0,
                reloadTime: 150,
                reload: 0,
                bullet: {
                    dmgMultiplier: 1,
                    speedMultiplier: 1
                }
            },
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
                cost: {METAL: 10},
                engagementRange: 3600,
                spread: 5*Math.PI/180,
                reloadTime: 120,
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
                cost: {FUELCELLS: 0.05},
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
                cost: {FUELCELLS: 0.05},
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
                cost: {METAL: 1},
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
                cost: {METAL: 1},
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
        abilities: {
            repair: {
                keybind: 'x',
                hp: 1000, // regen hp / tick
                reloadTime: 0,
                reload: 0,
                cost: {METAL: 1, CIRCUITS: 0.1}, 
            },
            boost: {
                keybind: 'r',
                a: 0.5,
                reloadTime: 1,
                reload: 0,
                cost: {FUELCELLS: 0.025},
            },
        },
        // Data
        mspt: 1000/60,
        resourceBonus: 1,
        value: 0,
        // Input
        hasClicked: 0,
        keyboard: {},
        // Inventory
        cargo: {
            METAL: 250,
            CIRCUITS: 100,
            FUELCELLS: 25,
        },
        // Upgrades
        upgrades: [
            {
                display: 'Weapons Damage ',
                id: 0,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < player.weapons.length; i += 1) {
                    newPlayer.weapons[i].bullet.dmgMultiplier += 0.1;
                }
                newPlayer;
                `,
                cost: {CIRCUITS: 150}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Projectile Damage ',
                id: 1,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < player.weapons.length; i += 1) {
                    if (isin(newPlayer.weapons[i].size, PHYSICAL)) {
                        newPlayer.weapons[i].bullet.dmgMultiplier += 0.15;
                    }
                }
                newPlayer;
                `,
                cost: {METAL: 10, CIRCUITS: 50, FUELCELLS: 1}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Laser Damage ',
                id: 2,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < player.weapons.length; i += 1) {
                    if (isin(newPlayer.weapons[i].size, LASER)) {
                        newPlayer.weapons[i].bullet.dmgMultiplier += 0.15;
                    }
                }
                newPlayer;
                `,
                cost: {CIRCUITS: 75, FUELCELLS: 2}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Railgun Damage ',
                id: 3,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < player.weapons.length; i += 1) {
                    if (newPlayer.weapons[i].size == RAIL) {
                        newPlayer.weapons[i].bullet.dmgMultiplier += 0.15;
                    }
                }
                newPlayer;
                `,
                cost: {CIRCUITS: 100, FUELCELLS: 5}, 
                increment: {cost: {CIRCUITS: 100}, mode: 'addition'}
            },
            {
                display: 'Armour Plating ',
                id: 4,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.thrust *= 0.95;
                newPlayer.maxHp += 100000;
                newPlayer.hp += 100000;
                newPlayer;
                `,
                cost: {METAL: 100, CIRCUITS: 50}, 
                increment: {cost: {METAL: 25, CIRCUITS: 10}, mode: 'addition'}
            },
            {
                display: 'Optimised Thrusters ',
                id: 5,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.thrust *= 1.1;
                newPlayer.agi *= 1.05;
                newPlayer.terminalAcceleration *= 1.05;
                newPlayer.terminalVelocity *= 1.1;
                newPlayer;
                `,
                cost: {METAL: 25, CIRCUITS: 75, FUELCELLS: 5}, 
                increment: {cost: {METAL: 5, CIRCUITS: 25, FUELCELLS: 1}, mode: 'addition'}
            },
            {
                display: 'Optimised RCS ',
                id: 6,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.agi *= 1.1;
                newPlayer.terminalAcceleration *= 1.1;
                newPlayer.terminalVelocity *= 1.05;
                newPlayer;
                `,
                cost: {METAL: 5, CIRCUITS: 75, FUELCELLS: 2}, 
                increment: {cost: {METAL: 5, CIRCUITS: 25, FUELCELLS: 2}, mode: 'addition'}
            },
            {
                display: 'Repair Efficiency ',
                id: 7,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.abilities.repair.cost.METAL *= 0.9;
                newPlayer.abilities.repair.cost.CIRCUITS *= 0.9;
                newPlayer;
                `,
                cost: {CIRCUITS: 250}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Repair Speed ',
                id: 8,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.abilities.repair.hp *= 1.5;
                newPlayer.abilities.repair.cost.METAL *= 1.5;
                newPlayer.abilities.repair.cost.CIRCUITS *= 1.5;
                newPlayer;
                `,
                cost: {CIRCUITS: 50}, 
                increment: {cost: 5, mode: 'multiply'}
            },
            {
                display: 'Improved Shielding ',
                id: 9,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.shield.shieldCap += 25000;
                newPlayer.shield.regen += 5;
                newPlayer;
                `,
                cost: {CIRCUITS: 250}, 
                increment: {cost: {CIRCUITS: 50}, mode: 'addition'}
            },
            {
                display: 'Shield Regen',
                id: 10,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.shield.shieldRegen += 10;
                newPlayer;
                `,
                cost: {CIRCUITS: 250, FUELCELLS: 0}, 
                increment: {cost: {CIRCUITS: 100, FUELCELLS: 1}, mode: 'addition'}
            },
            {
                display: 'Projectile Speed ',
                id: 11,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < player.weapons.length; i += 1) {
                    if (isin(newPlayer.weapons[i].size, PHYSICAL)) {
                        newPlayer.weapons[i].bullet.speedMultiplier *= 1.05;
                    }
                }
                newPlayer;
                `,
                cost: {CIRCUITS: 50}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Gauss Cannon ',
                id: 12,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < 5; i += 1) {
                    newPlayer.weapons.push(JSON.parse(JSON.stringify(newPlayer.weapons[0])));
                }
                newPlayer;
                `,
                cost: {METAL: 500, CIRCUITS: 1000, FUELCELLS: 50}, 
                increment: {cost: {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity}, mode: 'addition'}
            },
            {
                display: 'Save ',
                id: 13,
                level: 1,
                effect: `
                var newPlayer = player;
                localStorage.setItem('player', JSON.stringify(newPlayer));
                console.log('saved');
                newPlayer;
                `,
                cost: {METAL: 0, CIRCUITS: 0, FUELCELLS: 0}, 
                increment: {cost: {METAL: 0, CIRCUITS: 0, FUELCELLS: 0}, mode: 'addition'}
            },
            {
                display: 'Clear Save ',
                id: 14,
                level: 1,
                effect: `
                var newPlayer = player;
                localStorage.removeItem('player');
                location.reload(false);
                newPlayer;
                `,
                cost: {METAL: 0, CIRCUITS: 0, FUELCELLS: 0}, 
                increment: {cost: {METAL: 0, CIRCUITS: 0, FUELCELLS: 0}, mode: 'addition'}
            },
            {
                display: 'Turret Rotation ',
                id: 15,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < newPlayer.weapons.length; i += 1) {
                    if (newPlayer.weapons[i].type == TURRET) {
                        newPlayer.weapons[i].agi *= 1.1;
                    }
                }
                newPlayer;
                `,
                cost: {CIRCUITS: 100}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Projectile Weapon Fire Rate',
                id: 16,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < player.weapons.length; i += 1) {
                    if (isin(newPlayer.weapons[i].size, PHYSICAL)) {
                        newPlayer.weapons[i].reloadTime *= 0.8;
                    }
                }
                newPlayer;
                `,
                cost: {METAL: 100, CIRCUITS: 500, FUELCELLS: 0}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Energy Weapons Fire Rate ',
                id: 17,
                level: 1,
                effect: `
                var newPlayer = player;
                for (var i = 0; i < player.weapons.length; i += 1) {
                    if (isin(newPlayer.weapons[i].size, LASER)) {
                        newPlayer.weapons[i].reloadTime *= 0.8;
                    }
                }
                newPlayer;
                `,
                cost: {CIRCUITS: 500, FUELCELLS: 10}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Resource Drop Rate ',
                id: 18,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.resourceBonus+=0.25;
                newPlayer;
                `,
                cost: {CIRCUITS: 250}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            {
                display: 'Nanomaterial Research ',
                id: 19,
                level: 1,
                effect: `
                var newPlayer = player;
                if (newPlayer.upgrades[19].level == 5) {
                    newPlayer.upgrades.push(newPlayer.storage.upgrade20);
                    newPlayer.upgrades[19].cost = {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity};
                    player.value += 50;
                }
                newPlayer;
                `,
                cost: {METAL: 1000}, 
                increment: {cost: 2, mode: 'multiply'}
            },
        ],
        storage: {
            upgrade20: {
                display: 'Computing Research ',
                id: 20,
                level: 1,
                effect: `
                var newPlayer = player;
                if (newPlayer.upgrades[20].level == 5) {
                    newPlayer.upgrades.push(newPlayer.storage.upgrade21);
                    newPlayer.upgrades[20].cost = {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity};
                    newPlayer.value += 50;
                }
                newPlayer;
                `,
                cost: {CIRCUITS: 500}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            upgrade21: {
                display: 'Quantum Physics Research ',
                id: 21,
                level: 1,
                effect: `
                var newPlayer = player;
                if (newPlayer.upgrades[21].level == 5) {
                    newPlayer.upgrades.push(newPlayer.storage.upgrade22);
                    newPlayer.upgrades[21].cost = {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity};
                    newPlayer.value += 50;
                }
                newPlayer;
                `,
                cost: {FUELCELLS: 25}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            upgrade22: {
                display: 'High Dimentional Physics Research ',
                id: 22,
                level: 1,
                effect: `
                var newPlayer = player;
                if (newPlayer.upgrades[22].level == 100) {
                    newPlayer.upgrades.push(newPlayer.storage.upgrade23);
                    newPlayer.upgrades[22].cost = {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity};
                    newPlayer.value += 50;
                }
                newPlayer;
                `,
                cost: {METAL: 0, CIRCUITS: 0, FUELCELLS: 0}, 
                increment: {cost: {METAL: 0, CIRCUITS: 0, FUELCELLS: 0}, mode: 'addition'}
            },
            upgrade23: {
                display: 'Matter Energy Conversion Research',
                id: 23,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.upgrades.push(newPlayer.storage.upgrade24);
                newPlayer.upgrades.push(newPlayer.storage.upgrade25);
                newPlayer.upgrades.push(newPlayer.storage.upgrade26);
                newPlayer.upgrades.push(newPlayer.storage.upgrade27);
                newPlayer.value += 100;
                newPlayer;
                `,
                cost: {METAL: 100000, FUELCELLS: 100}, 
                increment: {cost: {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity}, mode: 'addition'}
            },
            upgrade24: {
                display: 'Matter --> Energy',
                id: 24,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.cargo.FUELCELLS += 10;
                newPlayer;
                `,
                cost: {METAL: 1000}, 
                increment: {cost: {METAL: 0}, mode: 'addition'}
            },
            upgrade25: {
                display: 'Energy --> Matter (Metal)',
                id: 25,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.cargo.METAL += 1000;
                newPlayer;
                `,
                cost: {FUELCELLS: 10}, 
                increment: {cost: {FUELCELLS: 0}, mode: 'addition'}
            },
            upgrade26: {
                display: 'Energy --> Matter (Circuits)',
                id: 26,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.cargo.CIRCUITS += 750;
                newPlayer;
                `,
                cost: {FUELCELLS: 10}, 
                increment: {cost: {FUELCELLS: 0}, mode: 'addition'}
            },
            upgrade27: {
                display: 'Special Relativity Research',
                id: 27,
                level: 1,
                effect: `
                var newPlayer = player;
                if (newPlayer.upgrades[27].level == 100) {
                    newPlayer.upgrades.push(newPlayer.storage.upgrade28);
                    newPlayer.value += 25;
                }
                if (newPlayer.upgrades[27].level == 200) {
                    newPlayer.upgrades.push(newPlayer.storage.upgrade29);
                    newPlayer.value += 25;
                }
                if (newPlayer.upgrades[27].level == 500) {
                    newPlayer.upgrades.push(newPlayer.storage.upgrade30);
                    newPlayer.upgrades[29].cost = {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity};
                    newPlayer.value += 150;
                }
                newPlayer;
                `,
                cost: {FUELCELLS: 1}, 
                increment: {cost: {FUELCELLS: 0}, mode: 'addition'}
            },
            upgrade28: {
                display: 'Time Dilation (double game speed) [optional]',
                id: 28,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.mspt /= 2; // double speed
                newPlayer;
                `,
                cost: {FUELCELLS: 1000}, 
                increment: {cost: {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity}, mode: 'addition'}
            },
            upgrade29: {
                display: 'Advanced Resource Extraction [optional]',
                id: 29,
                level: 1,
                effect: `
                var newPlayer = player;
                newPlayer.resourceBonus *= 10;
                if (newPlayer.upgrades[28].level == 3) {
                    newPlayer.upgrades[28].cost = {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity};
                }
                newPlayer.value += 100;
                newPlayer;
                `,
                cost: {METAL: 250000, CIRCUITS: 100000, FUELCELLS: 1000}, 
                increment: {cost: 2, mode: 'multiply'}
            },
            upgrade30: {
                display: 'Quantum Nexus: Unraveling the Omni-Simulacrum Paradigm (Unleash hell upon the world)',
                id: 30,
                level: 1,
                effect: `
                var newPlayer = player;
                // win the game
                newPlayer.value += 5000;
                newPlayer;
                `,
                cost: {METAL: 10000000, CIRCUITS: 10000000, FUELCELLS: 10000000}, 
                increment: {cost: {METAL: Infinity, CIRCUITS: Infinity, FUELCELLS: Infinity}, mode: 'addition'}
            },
        },
    };
}

var npcs = {};
for (var i=0; i<ALLSHIPS.length; i+=1) {
    var ship = {...data.construction.physics, ...data.construction["ASCENDED"+ALLSHIPS[i]], ...data.construction.AI, ...{hitbox: data.hitbox[ALLSHIPS[i]]}};
    for (var j=0; j <ship.weapons.length; j+=1) {
        ship.weapons[j].ai = true;
    }
    for (var j=0; j <TEAMS.length; j+=1) {
        ship.team = TEAMS[j];
        npcs[TEAMS[j]+ship.type] = JSON.parse(JSON.stringify(ship));
    }
}
var doomship = {...data.construction.physics, ...data.construction.DOOMSHIP, ...data.construction.AI, ...{hitbox: data.hitbox[BATTLESHIP]}};
for (var j=0; j <doomship.weapons.length; j+=1) {
    doomship.weapons[j].ai = true;
}
doomship.team = GREEN;
var ships = [player, JSON.parse(JSON.stringify(doomship))];
var projectiles = [];
var resources = [];
var decoratives = [];
var explosions = [];
var overlays = [];

function replacehtml(text) {
    document.getElementById("game").innerHTML = text;
};

function replaceControlPannel(text) {
    document.getElementById("controlPannel").innerHTML = text;
};

function load() {
    console.log('Startin the game...');
    replacehtml(`<canvas id="main" width="${display.x}" height="${display.y}" style="position: absolute; top: 0; left: 0;"></canvas><canvas id="explosion" width="${display.x}" height="${display.y}" style="position: absolute; top: 0; left: 0;"></canvas><canvas id="bombers" width="${display.x}" height="${display.y}" style="position: absolute; top: 0; left: 0;"></canvas><canvas id="canvasOverlay" width="${display.x}" height="${display.y}" style="position: absolute; top: 0; left: 0;"></canvas>`);
    game();
};

function addImage(layer, img, x, y, cx, cy, scale, r, absolute, opacity=1) {
    var c = document.getElementById(layer);
    var ctx = c.getContext("2d");
    ctx.globalAlpha = opacity;
    if (absolute) {
        ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
        ctx.rotate(r);
        ctx.drawImage(img, -cx, -cy);
    } else {
        ctx.setTransform(scale, 0, 0, scale, x-player.x+display.x/2, y-player.y+display.y/2); // position relative to player
        ctx.rotate(r);
        ctx.drawImage(img, -cx, -cy);
    }
    ctx.globalAlpha = 1.0;
};

function clearCanvas() {
    var layers = ['main', 'explosion', 'bombers', 'canvasOverlay'];
    for (var i =0; i < layers.length; i +=1) {
        var c = document.getElementById(layers[i]);
        var ctx = c.getContext("2d");
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, display.x, display.y);
        ctx.restore();
    }
};

function drawLine(pos, r, length, style, absolute) {
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
    if (absolute) {
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + length * Math.cos(r), pos.y + length * Math.sin(r));
    } else {
        ctx.moveTo(pos.x-player.x+display.x/2, pos.y-player.y+display.y/2);
        ctx.lineTo(pos.x-player.x+display.x/2 + length * Math.cos(r), pos.y-player.y+display.y/2 + length * Math.sin(r));
    }
    ctx.stroke();
    ctx.restore();
};

function sufficient(ability, cargo) {
    var sufficient = true
    for (var i=0; i < Object.keys(ability.cost).length; i += 1) {
        if (cargo[Object.keys(ability.cost)[i]] < ability.cost[Object.keys(ability.cost)[i]]) {
            sufficient = false;
        }
    }
    if (sufficient) {
        if (ability.reload) {
            ability.reload = ability.reloadTime;
        }
        for (var i=0; i < Object.keys(ability.cost).length; i += 1) {
            cargo[Object.keys(ability.cost)[i]] -= ability.cost[Object.keys(ability.cost)[i]];
        }
    }
    return [sufficient, ability, cargo];
};

function handleInputs(player) {
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
    }
    if (player.keyboard.d) { 
        player.r += player.agi;
        if (player.r >= 2*Math.PI) {
            player.r -= Math.PI*2;
        } else if (player.r <= -2*Math.PI) {
            player.r += Math.PI*2;
        }
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
    if (player.keyboard[player.abilities.repair.keybind] && player.hp < player.maxHp) {
        var res = sufficient(player.abilities.repair, player.cargo);
        if (res[0]) {
            player.hp += player.abilities.repair.hp;
            if (player.hp > player.maxHp) {
                player.hp = player.maxHp;
            }
            player.cargo = res[2];
        }
    }
    if (player.abilities.boost) {
        if (player.keyboard[player.abilities.boost.keybind] && player.abilities.boost.reload == 0) {
            var res = sufficient(player.abilities.boost, player.cargo);
            if (res[0] && player.v <= player.terminalVelocity*5) {
                player.a += player.abilities.boost.a;
                player.abilities.boost = res[1];
                player.cargo = res[2];
            }
        }
    }
    for (var i = 0; i < player.weapons.length; i+=1) {
        if (player.weapons[i].keybind == CLICK) {
            if (player.hasClicked) {
                player = attemptShoot(i, player);
            }
        } else {
            if (player.keyboard[player.weapons[i].keybind]) {
                player = attemptShoot(i, player);
            }
        }
    }
    return player;
};

function logObj(obj) {
    var l = '';
    for(var key in obj) {
        l += JSON.stringify(obj[key]);
        l += ', ';
    }
    console.log(l);
};

function handlemovement(obj) {
    if (obj.v != 0 && obj.vx == 0 && obj.vy && 0) { // incase I forgot to set the velocity components
        obj.vx = obj.v*Math.cos(obj.r);
        obj.vy = obj.v*Math.sin(obj.r);
    }
    obj.px = obj.x;
    obj.py = obj.y;
    obj.v *= obj.drag;
    obj.vx *= obj.drag;
    obj.vy *= obj.drag;
    if (obj.a > 0) {
        obj.a -= obj.thrust;
        if (obj.a < 0) {
            obj.a = 0;
        }
    }
    if (Math.abs(obj.a) > obj.terminalAcceleration) {
        obj.a = Math.max(obj.a-Math.max(0.5-obj.thrust, 0.1),obj.terminalAcceleration);
    }
    obj.vx += obj.a*Math.cos(obj.r);
    obj.vy += obj.a*Math.sin(obj.r);
    obj.v = Math.sqrt(obj.vx*obj.vx+obj.vy*obj.vy);
    if (obj.v > obj.terminalVelocity) {
        var change = Math.max((obj.v-obj.terminalAcceleration), obj.terminalVelocity)/obj.v;
        obj.vx *= change;
        obj.vy *= change;
    }
    obj.x += obj.vx;
    obj.y += obj.vy;
    if (obj.av) {
        obj.r += obj.av;
        obj.av *= obj.ad;
        if (Math.abs(obj.av) < Math.PI/69) {
            obj.av = 0;
        }
        
    }
    return obj;
};

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
};

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
};

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
    if (a > Math.PI) {
        a = -(2*Math.PI-a);
    } else if (a < -Math.PI) {
        a = (2*Math.PI+a);
    }
    return a;
};

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
    currentRot = correctAngle(currentRot);
    if (currentAim < 0) {
        currentAim += Math.PI*2;
    }

    currentAim = currentAim%(Math.PI*2);
    currentAim = correctAngle(currentAim);
    var relativeAim = aim;
    var possibleRot = Math.round((relativeAim - currentAim)*100)/100; 
    if (possibleRot > 0 && (Math.PI-currentAim) < possibleRot) {
        possibleRot = Math.round((currentAim - relativeAim)*100)/100; 
    }
    necessaryRot = possibleRot;
    if (necessaryRot > 0) {
        currentAim += rotSpeed*2;
    } else if (necessaryRot < 0) {
        currentAim -= rotSpeed*2;
    }
    if (Math.abs(relativeAim-currentAim) < rotSpeed) {
        currentAim = relativeAim;
    }
    currentAim = correctAngle(currentAim);
    if (currentAim < -rotLimit/2+facing) {
        currentAim = -rotLimit/2+facing;
    } else if (currentAim > rotLimit/2+facing) {
        currentAim = rotLimit/2+facing;
    }
    currentAim = correctAngle(currentAim);
    return currentAim;
};

function aimTurrets(ship) {
    for (var i = 0; i < ship.weapons.length; i+=1) {
        var pos = turretPos(ship.type,ship.x,ship.y,ship.r,ship.weapons[i]);
        ship.weapons[i].ax = pos.x;
        ship.weapons[i].ay = pos.y;
        if (ship.weapons[i].type == TURRET) {
            if (ship.weapons[i].ai) {
                if (ship.target) {
                    ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, {x: ship.target.x, y: ship.target.y}, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
                } else {
                    ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, {x: ship.x+500*Math.cos(ship.r), y: ship.y+500*Math.sin(ship.r)}, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
                }
            } else {
                var rMousePos = {x:mousepos.x+player.x-display.x/2,y:mousepos.y+player.y-display.y/2};
                ship.weapons[i].aim = turretRot(ship.r, ship.weapons[i].agi, ship.weapons[i].arc, ship.weapons[i].facing, rMousePos, ship.aimMode, {x: ship.x, y: ship.y}, pos, ship.weapons[i].aim);
            }
        }
    }
    return ship;
};

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
};

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
    if (ship.a > ship.terminalAcceleration) {
        for (var i = 0; i < engine.length; i+= 1) {
            var p = JSON.parse(JSON.stringify(data.construction.physics));
            p.img = data.img.particle;
            p.v = 15-ship.v;
            p.x = (Math.random() * engine[i].r + engine[i].x) * Math.cos(ship.r) + (Math.random() * engine[i].r + engine[i].y) * Math.sin(ship.r) + ship.x;
            p.y = (Math.random() * engine[i].r + engine[i].x) * Math.cos(ship.r-Math.PI/2) + (Math.random() * engine[i].r + engine[i].y) * Math.sin(ship.r-Math.PI/2) + ship.y;
            p.r = ship.r+Math.PI;
            p.life = 15;
            decoratives.push(p);
        }
    }
};

function addShip(layer, ship) {
    if (ship.a > 0) {
        if (t % 3 == 0) {
            engineEffect(ship);
        }
        addImage(layer, data.img[ship.type+'PLUME'], ship.x, ship.y, data.center[ship.type+'PLUME'].x, data.center[ship.type+'PLUME'].y, 1, ship.r);
    }
    addImage(layer, data.img[ship.team+ship.type], ship.x, ship.y, data.center[ship.type].x, data.center[ship.type].y, 1, ship.r);
    if (ship.a > 0) {
        addImage(layer, data.img[ship.type+'PLUMEOVERLAY'], ship.x, ship.y, data.center[ship.type+'PLUME'].x, data.center[ship.type+'PLUME'].y, 1, ship.r);
    }
    for (var i = 0; i < ship.weapons.length; i+=1) {
        if (ship.weapons[i].type == TURRET) {
            addImage(layer, data.img[ship.team+ship.weapons[i].size+'TURRET'], ship.weapons[i].ax*ship.scale, ship.weapons[i].ay*ship.scale, data.center[ship.weapons[i].size+'TURRET'].x*ship.scale, data.center[ship.weapons[i].size+'TURRET'].y*ship.scale, ship.scale, ship.weapons[i].aim+ship.r);
        }
    }
};

function handleMotion(objs) {
    for (var i=0; i < objs.length; i+=1) {
        objs[i] = handlemovement(objs[i]);
    }
    return objs;
};

function attemptShoot(weapon, ship) {
    if (ship.weapons[weapon].reload == 0) {
        if (ship.cargo) {
            var result = sufficient(ship.weapons[weapon], ship.cargo);
            if (result[0]) {
                ship.weapons[weapon] = result[1];
                ship.cargo = result[2]; 
            } else {
                return ship;
            }
        }
        shoot(ship.weapons[weapon], ship);
        ship.weapons[weapon].reload = ship.weapons[weapon].reloadTime;
        ship.weapons[weapon].recoil = ship.weapons[weapon].recoilAmount;
    }
    return ship;
};

function shoot(weapon, ship) {
    // no need to deep copy everything but anyways...
    var angle = weapon.aim + ship.r;
    var bullet = {...JSON.parse(JSON.stringify(data.construction.physics)), ...JSON.parse(JSON.stringify(data.construction[weapon.size+'BULLET']))};
    bullet.hitbox = JSON.parse(JSON.stringify(data.hitbox[weapon.size+'BULLET']));
    bullet.v *= JSON.parse(JSON.stringify(weapon.bullet.speedMultiplier));
    bullet.dmg *= JSON.parse(JSON.stringify(weapon.bullet.dmgMultiplier));
    bullet.dmgvb *= JSON.parse(JSON.stringify(weapon.bullet.dmgMultiplier));
    bullet.type = JSON.parse(JSON.stringify(weapon.size+'BULLET'));
    bullet.team = JSON.parse(JSON.stringify(ship.team));
    bullet.x = JSON.parse(JSON.stringify(weapon.ax));
    bullet.y = JSON.parse(JSON.stringify(weapon.ay));
    bullet.px = JSON.parse(JSON.stringify(weapon.ax));
    bullet.py = JSON.parse(JSON.stringify(weapon.ay));
    bullet.r = angle+(Math.random()-0.5)*weapon.spread;
    bullet.vx = bullet.v*Math.cos(bullet.r) + ship.vx;
    bullet.vy = bullet.v*Math.sin(bullet.r) + ship.vy;
    projectiles.push(bullet);
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
    console.log(romanNumeral);
    return romanNumeral;
};

function addCosts(cost, increment) {
    if (increment.mode == 'addition') {
        for (var res in increment.cost) {
            cost[res] += increment.cost[res];
        }
    } else if (increment.mode == 'multiply') {
        for (var res in cost) {
            cost[res] *= increment.cost;
        }
    } else {
        console.log('ERROR');
    }
    return cost;
};

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
window.addEventListener("resize", function () {
    if (t > 0) {
        display = {x:window.innerWidth,y:window.innerHeight};
        replacehtml(`<canvas id="main" width="${display.x}" height="${display.y}" style="position: absolute; top: 0; left: 0;"></canvas><canvas id="explosion" width="${display.x}" height="${display.y}" style="position: absolute; top: 0; left: 0;"></canvas><canvas id="bombers" width="${display.x}" height="${display.y}" style="position: absolute; top: 0; left: 0;"></canvas><canvas id="canvasOverlay" width="${display.x}" height="${display.y}" style="position: absolute; top: 0; left: 0;"></canvas>`);
    }
});
function tellPos(p){
    mousepos = {x: p.pageX, y:p.pageY};
};
window.addEventListener('mousemove', tellPos, false);
var buttons = document.getElementsByClassName('button');

function updateButtons() {
    // Clear existing buttons and add new ones in
    var overlay = document.getElementById('overlay');
    overlay.innerHTML = `<div id="leftText">Upgrades</div><div id="rightText">Resources: <img src="Metal.png"><span> ${player.cargo.METAL ? Math.round(player.cargo.METAL) : 0}  </span><img src="Circuit.png"><span> ${player.cargo.CIRCUITS ? Math.round(player.cargo.CIRCUITS) : 0}  </span><img src="FuelCell.png"><span> ${player.cargo.FUELCELLS ? Math.round(player.cargo.FUELCELLS) : 0}  </span></div>`;
    var buttonGrid = document.getElementById('buttonGrid');
    buttonGrid.innerHTML = '';
    player.upgrades.forEach(function(button) {
        var buttonElement = document.createElement('button');
        buttonElement.className = 'button';
        buttonElement.id = `${button.id}`;
        buttonElement.innerHTML = `${button.display} ${roman(button.level)}\n<img src="Metal.png"><span> ${player.upgrades[button.id].cost.METAL ? Math.round(player.upgrades[button.id].cost.METAL) : 0}  </span><img src="Circuit.png"><span> ${player.upgrades[button.id].cost.CIRCUITS ? Math.round(player.upgrades[button.id].cost.CIRCUITS) : 0}  </span><img src="FuelCell.png"><span> ${player.upgrades[button.id].cost.FUELCELLS ? Math.round(player.upgrades[button.id].cost.FUELCELLS) : 0}  </span>`;
        buttonElement.addEventListener('click', function(event) {
            var buttonId = event.target.id;
            console.log('Button pressed: ' + buttonId);
            var result = sufficient(player.upgrades[buttonId], player.cargo);
            if (result[0]) {
                player.cargo = result[2];
                player = eval(player.upgrades[buttonId].effect);
                player.upgrades[buttonId].cost = addCosts(player.upgrades[buttonId].cost, player.upgrades[buttonId].increment);
                player.upgrades[buttonId].level += 1;
                updateButtons();
            }
        });
        buttonGrid.appendChild(buttonElement);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function drawCircle(layer, x, y, radius, fill, stroke, strokeWidth, opacity=1) { // draw a circle (I coppied most of this from stack overflow) also does not work somethimes I think
    var canvas = document.getElementById(layer);
    var ctx = canvas.getContext("2d");
    ctx.resetTransform();
    ctx.globalAlpha = opacity;
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
    ctx.globalAlpha = 1.0;
};

function drawLight(layer, x, y, radius) {
    var canvas = document.getElementById(layer);
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;

    ctx.fill();
};

function updateHitboxes(obj, show) {
    for (var i = 0; i < obj.hitbox.length; i+=1) {
        obj.hitbox[i] = hitboxPos(obj.type, obj.x, obj.y, data.hitbox[obj.type][i].x, data.hitbox[obj.type][i].y, obj.r, obj.hitbox[i].r);
        if (show) {
            drawCircle('main', obj.hitbox[i].x-player.x+display.x/2, obj.hitbox[i].y-player.y+display.y/2, obj.hitbox[i].r, false, 'white', 2);
        }
    }
    return obj;
};

function handlePlayer(player, resources) {
    player = handleInputs(player);
    for (var i = 0; i < resources.length; i +=1) {
        if (detectCollision(player, resources[i])) {
            if (player.cargo[resources[i].type]) {
                player.cargo[resources[i].type] += resources[i].n;
            } else {
                player.cargo[resources[i].type] = resources[i].n;
            }
            resources[i].life = 1;
            resources[i].n = 0;
        }
    }
    return [player,resources];
};

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
        if (ship.type != BOMBER) {
            addShip('main', ships[i]);
            ships[i] = updateHitboxes(ships[i], false);
            if (i != 0) {
                healthBar(50, ships[i], 2);
            }
        }
    }
    return ships;
};

function handleBombers(ships) { // handles all ships
    for (var i = 0; i < ships.length; i++) {
        if (ship.type == BOMBER) {
            addShip('bombers', ships[i]);
            ships[i] = updateHitboxes(ships[i], false); // turn on show hitboxes here
            if (i != 0) {
                healthBar(50, ships[i], 2);
            }
        }
    }
    return ships;
};

function preaim(obj1, obj2) {
    // help pls pls pls
};

// AI attack methods (I have no idea how to make these)
// These are very scuffed and don't work as intended but somehow it works so I can't be bothered to fix it

function chase(attacker, dist) { // follow a target while shooting them and run away if the enemy gets too close
    // It works, lets gooooooo!
    if (attacker.target) {
        attacker.r = correctAngle(attacker.r);
        if (getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) >= dist) {
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
            if ((Math.abs(aim) > 180*Math.PI/180 && getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 500) || getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 150 || (getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 400 && isin(attacker.target.type, CAPITAL))) {
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
                    attacker.a += attacker.thrust*2;
                } else {
                    attacker.a -= attacker.thrust*2;
                }
            }
        }
        if (getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 5000) {
            attacker = aimTurrets(attacker);
            for (var i = 0; i < attacker.weapons.length; i += 1) {
                if (((Math.abs(correctAngle(attacker.weapons[i].aim+attacker.r-aim)) < 1*Math.PI/180) || (Math.abs(correctAngle(attacker.weapons[i].aim+attacker.r-aim)) < 10*Math.PI/180 && attacker.weapons[i].reloadTime <= 120) || (attacker.weapons[i].reloadTime <= 45 && Math.abs(correctAngle(attacker.weapons[i].aim+attacker.r-aim)) < 90*Math.PI/180)) && getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < attacker.weapons[i].engagementRange) {
                    attemptShoot(i, attacker);
                }
            }
        }
    } else {
        attacker.target = null;
    }
    return attacker;
};

function ram(attacker, dist) { // charge at a target
    //console.log(attacker);
    if (attacker.target) {
        attacker.r = correctAngle(attacker.r);
        //var preaimTarget = preaim({x: attacker.x, y: attacker.y, v: attacker.terminalVelocity}, attacker.target);
        var aim = correctAngle(target({x:attacker.x,y:attacker.y}, {x: attacker.target.x,y: attacker.target.y}));
        var rAim = aim - attacker.r;
        if (attacker.method != 'charge' && Math.abs(rAim) < 0.01 && getDist({x: attacker.x,y: attacker.y}, {x: attacker.target.x,y: attacker.target.y}) <= dist*2) {
            attacker.method = 'charge';
        } else if (attacker.method != 'reposition' && getDist({x: attacker.x,y: attacker.y}, {x: attacker.target.x,y: attacker.target.y}) >= dist) {
            attacker.method = 'reposition';
        }
        if (attacker.method == 'charge') { // charge towards target
            // rotate slowly while charging
            if (rAim != 0) {
                if (rAim > 0 && rAim < Math.PI) {
                    attacker.r += attacker.agi/10;
                } else {
                    attacker.r -= attacker.agi/10;
                }
            }
            if (Math.abs(rAim) < attacker.agi/5) { // make it easier for the attacker to lock on to the target
                attacker.r = aim;
            }
            attacker.a += attacker.thrust*11; // accelerate at 10 times faster than normal
        } else {
            var aim = correctAngle(target({x:attacker.x,y:attacker.y},{x: attacker.target.x,y: attacker.target.y}));
            var rAim = aim - attacker.r;
            // rotate towards target
            if (rAim != 0) {
                if (rAim > 0 && rAim < Math.PI) {
                    attacker.r += attacker.agi/2;
                } else {
                    attacker.r -= attacker.agi/2;
                }
            }
            if (Math.abs(rAim) < attacker.agi) { // make it easier for the attacker to lock on to the target
                attacker.r = aim;
            }
            if (attacker.v < attacker.terminalVelocity/5) {
                attacker.a += attacker.thrust*2;
            }
        }
        if (getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) < 5000) {
            attacker = aimTurrets(attacker);
            for (var i = 0; i < attacker.weapons.length; i += 1) {
                if (getDist({x: attacker.x,y: attacker.y},{x: attacker.target.x,y: attacker.target.y}) <= attacker.weapons[i].engagementRange) {
                    attemptShoot(i, attacker);
                }
            }
        }
    }
    return attacker;
};

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
};

function idle(ship) { // wander around the map (highly doubt this works)
    if (ship.target = '') {
        ship.target = {x: Math.random()*display.x,y: Math.random()*display.y};
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
};

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
                    return [true,{x: obj1.hitbox[i].px+obj1.vx*(step/steps), y: obj1.hitbox[i].py+obj1.vy*(step/steps)}];
                }
            }
            if (getDist({x: obj1.hitbox[i].x, y: obj1.hitbox[i].y},{x: obj2.hitbox[j].x, y: obj2.hitbox[j].y}) < obj1.hitbox[i].r + obj2.hitbox[j].r) {
                return [true,{x: obj1.hitbox[i].x, y: obj1.hitbox[i].y}];
            }
        }
    }
    return false;
};

function bulletTrail(obj1) {
    var steps = Math.abs(obj1.v) / obj1.hitbox[0].r;
    if (steps < 0) {
        steps = 0;
    }
    for (var step = 0; step < steps; step += 1) {
        particleEffect({x:obj1.px+obj1.vx/steps*step,y:obj1.py+obj1.vy/steps*step,r:obj1.r}, obj1.hitbox[0].r*2, -0.1, Math.round(10/(Math.max(step,1))), 120, 15*Math.PI/180);
    }
};

function autoTarget(type, team, pos, shipType, dist) { // inefficient, switch the order of the checks for better performance
    var target = false;
    var minDist = dist+1;
    for (var i = 0; i < ships.length; i+=1) {
        if ((ships[i].team != team && type == HOSTILE) || (ships[i].team == team && type == FRIENDLY)) {
            var shouldCalculate = false;
            if (!isin(shipType, ALLSHIPS)) {
                if (isin(ships[i].type, shipType)) {
                    shouldCalculate = true;
                }
            } else {
                if (ships[i].type == shipType) {
                    shouldCalculate = true;
                }
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
};

function autoMission(ship) { // Expand this later
    if (ship.type != BOMBER) {
        var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, ALLSHIPS, 100000);
        if (target) {
            return {mission: ATTACK, target: target};
        }
        return {mission: IDLE, target: null};
    } else {
        var target = autoTarget(HOSTILE, ship.team, {x:ship.x,y:ship.y}, NOTFIGHTER, 100000);
        if (target) {
            return {mission: ATTACK, target: target};
        } 
        return {mission: IDLE, target: null};
    }
};

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
        }
    }
    return ships;
};

function runAi(ships) { // TODO: add more attack methods
    for (var i = 0; i < ships.length; i+=1) {
        if (ships[i].aiControl) {
            switch (ships[i].type) {
                case INTERCEPTOR:
                    ships[i] = chase(ships[i], 500);
                    break;
                case BOMBER:
                    ships[i] = ram(ships[i], 1000);
                    break;
                case DESTROYER:
                    ships[i] = chase(ships[i], 3000);
                    break;
                case FRIGATE:
                    ships[i] = chase(ships[i], 750);
                    break;
                default:
                    ships[i] = chase(ships[i], 1250);
                    break;
            }
        }
    }
    return ships;
};

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
                ship.shield.cooldown += 5;
            } else {
                bullet.dmg -= ship.shield.shield*0.75;
                ship.shield.shield *= 0.25;
                ship.shield.cooldown += 15;
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
        if (ship.upgrades) {
            if (ship.upgrades[19]) {
                bullet.dmg *= (1-(ship.upgrades[19].level-1)*0.1);
            }
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
};

function bar(image, pos, size, step) {
    for (var i = 0; i < size; i += 1) {
        addImage('main', data.img[image], pos.x+i*step, pos.y, data.dim[image].x, data.dim[image].x, 1, 0)
    }
};

function healthBar(size, ship, step) {
    var length = size * step;
    var pos = {x: ship.x-length/2, y: ship.y + data.center[ship.type].y*1.5};
    var top = Math.round(ship.shield.shield / ship.shield.shieldCap * size);
    var bottom = Math.round(ship.hp / data.construction[ship.type].hp * size);
    bar('GREYCIRCLE', pos, size, step);
    bar('BLUECIRCLE', pos, top, step);
    bar('SILVERCIRCLE', pos, bottom, step);
};

function PlayerUiBar(level, max, pos, dim, fillColour, border) {
    var c = document.getElementById("main");
    var ctx = c.getContext("2d");

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (border != -1) {
        ctx.fillStyle = '#696969';
        ctx.fillRect(pos.x, pos.y, dim.x, dim.y);
    } else {
        border = 0;
    }
  
    const fillPercentage = level / max;
    ctx.fillStyle = fillColour;
    ctx.fillRect(pos.x+border, pos.y+border, fillPercentage * (dim.x-border*2), dim.y-border*2);

    ctx.restore();
};

function handleProjectiles(projectiles, ships, overlays) {
    //console.log(projectiles);
    projectiles = handleMotion(projectiles);
    for (var i = 0; i < projectiles.length; i +=1 ) {
        // check for collisions
        for (var j = 0; j < ships.length; j += 1) {
            if (ships[j].team != projectiles[i].team) {
                var collision = detectCollision(projectiles[i], ships[j]);
                if (collision[0]) {
                    var res = calculateDamage(projectiles[i], ships[j]);
                    if (projectiles[i].explosion) { // calculate explosions
                        if (ships[j].shield.shield < ships[j].shield.shieldCap/4 || projectiles[i].explosion.r > 0) {
                            var explode = JSON.parse(JSON.stringify(data.construction.physics))
                            explode.x = collision[1].x;
                            explode.y = collision[1].y;
                            if (projectiles[i].explosion.r == 0) {
                                explode.vx = ships[j].vx;
                                explode.vy = ships[j].vy;
                                explode.cx = data.center.SEXPLOSION.x
                                explode.cy = data.center.SEXPLOSION.y
                                explode.r = 2*Math.PI*Math.random();
                                explode.img = data.img.sExplosion[69]; // why not?
                                explode.life = 30;
                                explode.animation = true;
                                explode.frames = data.img.sExplosion;
                                overlays.push(explode);
                            } else { // do fancy explosion effect
                                explode.vx = ships[j].vx/2;
                                explode.vy = ships[j].vy/2;
                                explode.team = projectiles[i].team;
                                explode.r = 0;
                                explode.maxR = projectiles[i].explosion.r;
                                explode.dmg = JSON.parse(JSON.stringify(projectiles[i].explosion.dmg));
                                explode.dropoff = projectiles[i].explosion.dropoff;
                                explode.transparancy = 0.8;
                                explosions.push(explode);
                            }
                            
                        }
                    }
                    projectiles[i] = res[0];
                    ships[j] = res[1];
                }
            }
        }
        // draw the bullet
        if (projectiles[i].effect) {
            bulletTrail(projectiles[i]);
        }
        addImage('main', data.img[projectiles[i].type], projectiles[i].x, projectiles[i].y, data.center[projectiles[i].type].x, data.center[projectiles[i].type].y, 1, projectiles[i].r);
        projectiles[i] = updateHitboxes(projectiles[i], false); // projectile hitboxes
    }
    var newProjectiles = [];
    for (var i = 0; i < projectiles.length; i +=1 ) {
        if (projectiles[i].dmg > 0 && projectiles[i].v > 2) {
            newProjectiles.push(projectiles[i]);
        }
    }
    return [newProjectiles, ships, overlays, explosions];
};

function handleDecoratives(decoratives) {
    decoratives = handleMotion(decoratives);
    for (var i = 0; i < decoratives.length; i+=1) {
        var cx = 0;
        var cy = 0;
        if (decoratives[i].cx) {
            cx = decoratives[i].cx
        }
        if (decoratives[i].cy) {
            cy = decoratives[i].cy
        }
        addImage('main', decoratives[i].img, decoratives[i].x, decoratives[i].y, cx, cy, 1, decoratives[i].r);
    }
    return decoratives;
};

function generatePos(ship) { // put the newly generated ship off screen somewhere. This makes the ship appear as if it has been there for the whole time and isn't recently generated
    if (Math.random() > 0.5) {
        ship.x = (Math.random() > 0.5) ? player.x-display.x/2-100-500*Math.random() : player.x+display.x/2+100+500*Math.random();
        ship.y = Math.floor(Math.random() * (display.y + 500)) - 250 + player.y;
    } else {
        ship.x = Math.floor(Math.random() * (display.x + 500)) - 250 + player.x;
        ship.y = (Math.random() > 0.5) ? player.y-display.y/2-100-500*Math.random() : player.y+display.y/2+100+500*Math.random();
    }
    return ship;
};

function generateShips(ships, rate, balance=false) {
    if (true) { // use to turn off enemies for debug purposes
        if (balance) {
            var pts = {};
            for (var i = 0; i < TEAMS.length; i += 1) {
                pts[TEAMS[i]] = 1;
            }
            for (var i = 1; i < ships.length; i += 1) {
                var points = 0;
                switch (ships[i].type) {
                    case BATTLESHIP:
                        points = 200;
                        break;
                    case CRUISER:
                        points = 125;
                        break;
                    case DESTROYER:
                        points = 150;
                        break;
                    case FRIGATE:
                        points = 50;
                        break;
                    case BOMBER:
                        points = 40;
                        break;
                    case INTERCEPTOR:
                        points = 25;
                        break;
                    default:
                        console.log('WARNING: unrecognised ship type');
                        break;
                }
                pts[ships[i].team] += points;
            }
            pts[RED]+=player.value;
            var sorted = Object.keys(pts).sort(function(a, b) {
                return pts[a] - pts[b];
            });
            console.log(pts);
            console.log(sorted[0], 'is weaker');
            if (pts[sorted[TEAMS.length-1]] - pts[sorted[0]] < 250) {
                var shipType = randchoice(spawnChances);
                var num = 0;
                switch (shipType) {
                    case BATTLESHIP:
                        num = randint(1,2);
                        break;
                    case CRUISER:
                        num = randint(1,3);
                        break;
                    case DESTROYER:
                        num = randint(1,2);
                        break;
                    case FRIGATE:
                        num = randint(2,5);
                        break;
                    case BOMBER:
                        num = randint(2,3);
                        break;
                    case INTERCEPTOR:
                        num = randint(3,8);
                        break;
                    default:
                        console.log('WARNING: unrecognised ship type');
                        break;
                }
                console.log(`added ${num} ${shipType} to each team`);
                for (var j=0; j < num; j += 1) {
                    for (var k=0; k < TEAMS.length; k += 1) {
                        var chosen = npcs[TEAMS[k]+shipType];
                        chosen = generatePos(chosen);
                        ships.push(JSON.parse(JSON.stringify(chosen)));
                    }
                }
            }
            var numGenerations = 1;
            if (pts[sorted[TEAMS.length-1]] - pts[sorted[0]] >= 5000) {
                numGenerations = 10;
            } else if (pts[sorted[0]] <= 1 || pts[sorted[TEAMS.length-1]] - pts[sorted[0]] > 2000) {
                numGenerations = 6;
            } if (pts[sorted[TEAMS.length-1]] - pts[sorted[0]] > 1000) {
                numGenerations = 5;
            } else if (pts[sorted[TEAMS.length-1]] - pts[sorted[0]] > 500) {
                numGenerations = 3;
            } else if (pts[sorted[TEAMS.length-1]] - pts[sorted[0]] > 200) {
                numGenerations = 2;
            }
            for (var i = 0; i < numGenerations; i += 1) {
                var shipType = randchoice(spawnChances);
                var num = 0;
                switch (shipType) {
                    case BATTLESHIP:
                        num = 1;
                        break;
                    case CRUISER:
                        num = randint(1,2);
                        break;
                    case DESTROYER:
                        num = randint(1,2);
                        break;
                    case FRIGATE:
                        num = randint(2,5);
                        break;
                    case BOMBER:
                        num = randint(2,3);
                        break;
                    case INTERCEPTOR:
                        num = randint(3,5);
                        break;
                    default:
                        console.log('WARNING: unrecognised ship type');
                        break;
                } 
                console.log(`added ${num} ${sorted[0]+shipType}`);
                for (var j=0; j < num; j += 1) {
                    var chosen = npcs[sorted[0]+shipType];
                    chosen = generatePos(chosen);
                    ships.push(JSON.parse(JSON.stringify(chosen)));
                }
            }
        } else {
            for (var i=0; i < rate; i += 1) {
                var shipType = randchoice(ALLSHIPS);
                var num = 0;
                switch (shipType) {
                    case BATTLESHIP:
                        num = randint(1,2);
                        break;
                    case CRUISER:
                        num = randint(2,3);
                        break;
                    case DESTROYER:
                        num = randint(1,2);
                        break;
                    case FRIGATE:
                        num = randint(2,5);
                        break;
                    case BOMBER:
                        num = randint(1,4);
                        break;
                    case INTERCEPTOR:
                        num = randint(3,8);
                        break;
                    default:
                        console.log('WARNING: unrecognised ship type');
                        break;
                }
                console.log(`added ${num} ${shipType} to each team`);
                for (var j=0; j < num; j += 1) {
                    for (var k=0; k < TEAMS.length; k += 1) {
                        var chosen = npcs[TEAMS[k]+shipType];
                        chosen = generatePos(chosen);
                        ships.push(JSON.parse(JSON.stringify(chosen)));
                    }
                }
            }
        }
    }
    return ships;
};

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
                objs[i].recoil = 0;
            }
        }
        // if it has cooldown, reduce it
        if (objs[i].cooldown) {
            objs[i].cooldown -= 1;
            if (objs[i].cooldown < 0) {
                objs[i].cooldown = 0;
            }
        }
        // if it is reloading, reload it
        if (objs[i].reload) {
            objs[i].reload -= 1;
            if (objs[i].reload < 0) {
                objs[i].reload = 0;
            }
        }
        // Animate animated effects
        if (objs[i].animation) {
            objs[i].img = objs[i].frames[objs[i].life];
        }
    }
    objs = objs.filter(obj => !obj.hasOwnProperty('life') || obj.life > 0);
    objs = objs.filter(obj => !obj.hasOwnProperty('hp') || obj.hp > 0);
    return objs;
};

function grid(spacing) {
    var start = (player.y - display.y / 2) < 0 ? Math.ceil((player.y - display.y / 2) / spacing) * spacing : Math.floor((player.y - display.y / 2) / spacing) * spacing - spacing * 2;
    var end = (player.y + display.y / 2) < 0 ? Math.ceil((player.y + display.y / 2) / spacing) * spacing : Math.floor((player.y + display.y / 2) / spacing) * spacing + spacing * 2;
    for (let i = start; i <= end; i += spacing) {
        drawLine({x:(player.x - display.x / 2) - spacing,y:i}, r=0, display.x+spacing*2, {colour:'#999999',width:10,opacity:0.1});
    }
    start = (player.x - display.x / 2) < 0 ? Math.ceil((player.x - display.x / 2) / spacing) * spacing : Math.floor((player.x - display.x / 2) / spacing) * spacing - spacing * 2;
    end = (player.x + display.x / 2) < 0 ? Math.ceil((player.x + display.x / 2) / spacing) * spacing : Math.floor((player.x + display.x / 2) / spacing) * spacing + spacing * 2;
    for (var i = start; i < end; i += spacing) {
        drawLine({x:i,y:(player.y - display.y / 2) -spacing}, r=Math.PI/2, display.y+spacing*2, {colour:'#999999',width:10,opacity:0.1});
    }
};

function displaytxt(txt, pos, font, fill) {
    var canvas = document.getElementById("main");
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Set the font and text color
    ctx.font = font;
    ctx.fillStyle = fill;
  
    // Display the points on the canvas
    ctx.fillText(txt, pos.x, pos.y);

    ctx.stroke();
    ctx.restore();
};

function handlePlayerUI() {
    PlayerUiBar(player.shield.shield, player.shield.shieldCap, {x:100,y:50}, {x:500,y:50}, "rgb(116, 251, 253)",5);
    PlayerUiBar(player.shield.cooldown, 300, {x:105,y:85}, {x:490,y:10}, "#FFFFFF",-1);
    PlayerUiBar(player.hp, data.construction[player.type].hp, {x:100,y:125}, {x:500,y:50}, "rgb(200, 200, 200)",5);
    for (var i = 0; i < Object.keys(player.cargo).length; i += 1) {
        displaytxt(`${Object.keys(player.cargo)[i]}: ${Math.round(player.cargo[Object.keys(player.cargo)[i]])}`, {x:110, y:250+50*i}, "bold 50px Arial", "rgb(200, 200, 200)");
    }
    
};

function handleDeathEffects(overlays, ships, decoratives, resources) {
    var nships = []
    for (var i = 0; i < ships.length; i++) {
        if (ships[i].hp <= 0) { // Ship is dead
            // Effects
            ships[i].cx = data.center[ships[i].type].x;
            ships[i].cy = data.center[ships[i].type].y;
            ships[i].hp = 1; // so the dead ship decorative is not deleted
            ships[i].life = 45;
            ships[i].img = data.img[ships[i].type];
            ships[i].a = 0;
            decoratives.push(ships[i]);
            for (var j = 0; j < ships[i].hitbox.length; j++) {
                var area = Math.PI * (ships[i].hitbox[j].r)**2; // area of circle
                var numExplosions = area / (225*Math.PI);
                for (var k=0; k < numExplosions; k++) {
                    var explode = JSON.parse(JSON.stringify(data.construction.physics));
                    var rd = Math.random()*ships[i].hitbox[j].r;
                    var rr = Math.random()*2*Math.PI;
                    explode.x = ships[i].hitbox[j].x + rd*Math.cos(rr);
                    explode.y = ships[i].hitbox[j].y + rd*Math.sin(rr);
                    explode.vx = ships[i].vx;
                    explode.vy = ships[i].vy;
                    explode.cx = data.center.SEXPLOSION.x;
                    explode.cy = data.center.SEXPLOSION.y;
                    explode.r = 2*Math.PI*Math.random();
                    explode.img = data.img.sExplosion[69];
                    var delay = Math.round(Math.random()*30)
                    explode.life = 30+delay;
                    explode.animation = true;
                    explode.frames = data.img.sExplosion;
                    overlays.push(explode);
                }
            }
            // Drop resources upon death
            var res = [0,0,0]; // Metal, Circuits, Fuelcells
            switch (ships[i].type) {
                case BATTLESHIP:
                    res = [75,25,4];
                    break;
                case BATTLECRUISER:
                    res = [30,40,3];
                    break;
                case CRUISER:
                    res = [30,20,2];
                    break;
                case DESTROYER:
                    res = [10,20,3];
                    break;
                case FRIGATE:
                    res = [15,10,1];
                    break;
                case BOMBER:
                    res = [3,1,0];
                    break;
                case INTERCEPTOR:
                    res = [2,2,0];
                    break;
            }
            const stackSize = [255, 71, 29, 13, 3, 1]; // why not?
            for (var j=0; j < res.length; j+=1) {
                res[j] = Math.floor(res[j]*player.resourceBonus);
                while (res[j] > 0) {
                    for (var k = 0; k < stackSize.length; k++) {
                        if (res[j] >= stackSize[k]) {
                            res[j] -= stackSize[k];
                            var droppedRes = JSON.parse(JSON.stringify(data.construction.physics));
                            droppedRes.drag = 0.99;
                            droppedRes.cx = data.center[RESOURCES[j]].x;
                            droppedRes.cy = data.center[RESOURCES[j]].y;
                            droppedRes.x = ships[i].x;
                            droppedRes.y = ships[i].y;
                            droppedRes.vx = ships[i].vx + Math.random()*6-3;
                            droppedRes.vy = ships[i].vy + Math.random()*6-3;
                            droppedRes.r = Math.random()*Math.PI*2;
                            droppedRes.av = (Math.random()*Math.PI-Math.PI/2)/4;
                            droppedRes.ad = 0.98;
                            droppedRes.life = 3600;
                            droppedRes.img = data.img.RES[j];
                            droppedRes.n = stackSize[k];
                            droppedRes.type = RESOURCES[j];
                            droppedRes.hitbox = [{x:data.center[RESOURCES[j]].x, y:data.center[RESOURCES[j]].y, r: 15}];
                            resources.push(droppedRes);
                        }
                    }
                }
            }
        } else { // ship not dead
            nships.push(ships[i]);
        }
    }
    return [nships,overlays,decoratives,resources];
};

function handlePickup(resources) {
    var nRes = [];
    for (var i=0; i < resources.length; i+=1) {
        if (getDist(player, resources[i]) < Math.max(display.x,display.y)*1.5) {
            var dist = 500;
            var v = 2;
            if (player.upgrades[21]) {
                dist += player.upgrades[21].level*100;
                v += player.upgrades[21].level;
            }

            if (getDist(player, resources[i]) < dist) {
                var r = target(resources[i], player);
                resources[i].vx += Math.cos(r)*v;
                resources[i].vy += Math.sin(r)*v;
            }
            nRes.push(resources[i]);
        }
    }
    return nRes;
};

function toggleUpgrades() {
    var overlay = document.getElementById('upgrades');
    if (overlay.style.display == 'block') {
        overlay.style.display = 'none';
        var pause = false;
    } else {
        overlay.style.display = 'block';
        var pause = true;
    }
    return pause;
};

function handleZoom() {
    var zoom = window.outerWidth/window.innerWidth;
    var overlay = document.getElementById("upgrades");
    overlay.style.zoom = `${Math.round((1 / zoom) * 100)}%`;
};

function handleExplosions(explosions, ships) {
    var newExplosions = [];
    for (var i = 0; i < explosions.length; i += 1) {
        if (explosions[i].r >= explosions[i].maxR) {
            explosions[i].transparancy *=0.9;
            explosions[i].r*=1.1;
        }
        if (explosions[i].transparancy > 0.25) {
            handleMotion(explosions[i]);
            explosions[i].r += 2;
            if (explosions[i].r > explosions[i].maxR) {
                explosions[i].r = explosions[i].maxR;
            }
            newExplosions.push(explosions[i]);
        }
        
        drawCircle('explosion', explosions[i].x-r-player.x+display.x/2, explosions[i].y-r-player.y+display.y/2, explosions[i].r, '#fccbb1', '#f7b28d', 0.1, 0.5*explosions[i].transparancy);
        drawCircle('explosion', explosions[i].x-r-player.x+display.x/2, explosions[i].y-r-player.y+display.y/2, explosions[i].r, false, '#f7b28d', 5, 0.5);
        drawCircle('explosion', explosions[i].x-r-player.x+display.x/2, explosions[i].y-r-player.y+display.y/2, Math.max(explosions[i].r-20, 0), false, '#fcd8d2', 20, 0.3*explosions[i].transparancy);
        drawCircle('explosion', explosions[i].x-r-player.x+display.x/2, explosions[i].y-r-player.y+display.y/2, Math.max(explosions[i].r-15, 0), false, '#fcd8d2', 15, 0.3*explosions[i].transparancy);
        drawCircle('explosion', explosions[i].x-r-player.x+display.x/2, explosions[i].y-r-player.y+display.y/2, Math.max(explosions[i].r-10, 0), false, '#fcd8d2', 10, 0.3*explosions[i].transparancy);
        drawCircle('explosion', explosions[i].x-r-player.x+display.x/2, explosions[i].y-r-player.y+display.y/2, Math.max(explosions[i].r-5, 0), false, '#fcd8d2', 5, 0.3*explosions[i].transparancy);
        drawLight('explosion', explosions[i].x-r-player.x+display.x/2, explosions[i].y-r-player.y+display.y/2,explosions[i].maxR+explosions[i].r/2);

        for (var j=0; j < ships.length; j += 1) {
            if (detectCollision({x: explosions[i].x, y: explosions[i].y, hitbox: [{x: explosions[i].x, y: explosions[i].y, r: explosions[i].r}]}, ships[j])) {
                var res = calculateDamage(JSON.parse(JSON.stringify(explosions[i])), ships[j]); // TODO: implement damage dropoff based on proximity
                ships[j] = res[1]; 
            }
        }
    }
    return [newExplosions, ships];
};

async function main() {
    clearCanvas();
    grid(400);
    //addImage('main', data.img.chinaImage, display.x-300, display.y-300, 315, 315, 0.33, 0, true, 0.2);
    if (t % 300 == 0 && (ships.length < 50 || (player.value > 5000 && ships.length < 100))) {
        ships = generateShips(ships, 1, true);
    }
    decoratives = tick(decoratives);
    projectiles = tick(projectiles);
    overlays = tick(overlays);
    resources = tick(resources);
    ships = tick(ships);
    for (var i = 0; i < ships.length; i += 1) {
        ships[i].weapons = tick(ships[i].weapons);
        if (ships[i].abilities) {
            for (var ability in ships[i].abilities) {
                if (ships[i].abilities[ability].reload > 0) {
                    ships[i].abilities[ability].reload -= 1;
                }
            }
        }
    }
    for (var i = 0; i < resources.length; i += 1) {
        resources[i] = updateHitboxes(resources[i], false);
    }
    ships = handleAi(ships);
    ships = runAi(ships);
    decoratives = handleDecoratives(decoratives);
    ships = handleShips(ships);
    ships = handleBombers(ships); // Bombers fly over other stuff so they on top
    var result = handlePlayer(player,resources);
    player = result[0];
    resources = result[1];
    resources = handleDecoratives(resources);
    result = handleProjectiles(projectiles, ships, overlays);
    projectiles = result[0];
    ships = result[1];
    overlays = result[2];
    explosions = result[3];
    result = handleExplosions(explosions, ships);
    explosions = result[0];
    ships = result[1];
    result = handleDeathEffects(overlays, ships, decoratives, resources);
    ships = result[0];
    overlays = result[1];
    decoratives = result[2];
    resources = result[3];
    overlays = handleDecoratives(overlays);
    resources = handlePickup(resources);
    handlePlayerUI(); // UI is rendered above all other game stuff
    if (player.hp <= 0) {
        localStorage.removeItem('player');
        player.cargo = {METAL: 0, CIRCUITS: 0, FUELCELLS: 0}; // clear player's inventory after death to prevent then glitching the save system to revive
        await sleep(3000);
        location.reload(false);
    }
};

var t = 0
var pause = false;
async function game() {
    document.getElementById('controlPannel').innerHTML = "";
    ships = generateShips(ships, 4);
    updateButtons();
    requestAnimationFrame(updateCanvas);
    while (1) {
        handleZoom();
        await sleep(1000/60);
        if (player.keyboard.u) {
            player.keyboard.u = false;
            updateButtons();
            pause = toggleUpgrades();
        }
    }
    console.log('gg');
    throw "Error: The operation completed successfully.";
};

var lastTime = 0;
function updateCanvas(timestamp) {
    var elapsedTime = timestamp - lastTime;
    if (elapsedTime > player.mspt && pause == false) {
        lastTime = timestamp;
        main();
        t += 1;
    }
    requestAnimationFrame(updateCanvas);
};