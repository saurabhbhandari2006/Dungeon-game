var initHealth = 100;
var initDice = 5;
var teleportCost = 5;
window.theme = {};
theme.background = "assets/img/background.jpg";

/*

 */
var map = [

    {name: "Purple", type: "definition", generation: {},
        definition: [
            {lx: 1, ly: 1, choiceSet: ["Portal Any", "Monster"]},
            {lx: 1, ly: 2, choiceSet: []},
            {lx: 1, ly: 3, choiceSet: ["Monster"]},
            {lx: 2, ly: 1, choiceSet: ["Portal Blue"]},
            {lx: 2, ly: 2, choiceSet: ["Player"]},
            {lx: 2, ly: 3, choiceSet: []},
            {lx: 3, ly: 1, choiceSet: []},
            {lx: 3, ly: 2, choiceSet: ["Monster"]},
            {lx: 3, ly: 3, choiceSet: ["Portal Green"]}
        ],
        backgroundImage:"assets/img/minimap/purple.png"
    },

    {name: "Blue",  type: "definition", generation: {},
        definition: [
            {lx: 1, ly: 1, choiceSet: ["Portal Purple"]},
            {lx: 1, ly: 2, choiceSet: []},
            {lx: 1, ly: 3, choiceSet: ["Monster"]},
            {lx: 2, ly: 1, choiceSet: ["Monster"]},
            {lx: 2, ly: 2, choiceSet: ["Player"]},
            {lx: 2, ly: 3, choiceSet: ["Portal Green"]},
            {lx: 3, ly: 1, choiceSet: []},
            {lx: 3, ly: 2, choiceSet: ["Portal Any", "Monster"]},
            {lx: 3, ly: 3, choiceSet: []}
        ],
        backgroundImage:"assets/img/minimap/blue.png"
    },

    {name: "Green",  type: "definition", generation: {},
        definition: [
            {lx: 1, ly: 1, choiceSet: ["Portal Any", "Monster"]},
            {lx: 1, ly: 2, choiceSet: ["Portal Blue"]},
            {lx: 1, ly: 3, choiceSet: []},
            {lx: 2, ly: 1, choiceSet: ["Portal Yellow"]},
            {lx: 2, ly: 2, choiceSet: ["Player"]},
            {lx: 2, ly: 3, choiceSet: ["Monster"]},
            {lx: 3, ly: 1, choiceSet: ["Seer"]},
            {lx: 3, ly: 2, choiceSet: []},
            {lx: 3, ly: 3, choiceSet: ["Monster"]}
        ],
        backgroundImage:"assets/img/minimap/green.png"
    },

    {name: "Yellow",  type: "definition", generation: {},
        definition: [
            {lx: 1, ly: 1, choiceSet: ["Portal Orange"]},
            {lx: 1, ly: 2, choiceSet: ["Monster"]},
            {lx: 1, ly: 3, choiceSet: []},
            {lx: 2, ly: 1, choiceSet: ["Portal Any", "Monster"]},
            {lx: 2, ly: 2, choiceSet: ["Player"]},
            {lx: 2, ly: 3, choiceSet: ["Monster"]},
            {lx: 3, ly: 1, choiceSet: ["Seer"]},
            {lx: 3, ly: 2, choiceSet: []},
            {lx: 3, ly: 3, choiceSet: ["Portal Green"]}
        ],
        backgroundImage:"assets/img/minimap/yellow.png"
    },

    {name: "Orange",  type: "definition", generation: {},
        definition: [
            {lx: 1, ly: 1, choiceSet: ["Monster"]},
            {lx: 1, ly: 2, choiceSet: ["Portal Red"]},
            {lx: 1, ly: 3, choiceSet: []},
            {lx: 2, ly: 1, choiceSet: []},
            {lx: 2, ly: 2, choiceSet: ["Player"]},
            {lx: 2, ly: 3, choiceSet: ["Seer"]},
            {lx: 3, ly: 1, choiceSet: ["Monster"]},
            {lx: 3, ly: 2, choiceSet: []},
            {lx: 3, ly: 3, choiceSet: ["Portal Yellow"]}
        ],
        backgroundImage:"assets/img/minimap/orange.png"
    },

    {name: "Red",  type: "definition", generation: {},
        definition: [
            {lx: 1, ly: 1, choiceSet: []},
            {lx: 1, ly: 2, choiceSet: ["Boss"]},
            {lx: 1, ly: 3, choiceSet: []},
            {lx: 2, ly: 1, choiceSet: ["Portal Orange"]},
            {lx: 2, ly: 2, choiceSet: ["Player"]},
            {lx: 2, ly: 3, choiceSet: []},
            {lx: 3, ly: 1, choiceSet: ["Portal Yellow"]},
            {lx: 3, ly: 2, choiceSet: []},
            {lx: 3, ly: 3, choiceSet: ["Seer"]}
        ],
        backgroundImage:"assets/img/minimap/red.png"
    }
]
/*
 Data: Monsters
 Description:
 Holds the data for the various kinds of monsters, to be randomly outputted.
 */
var monsters = [

    {
        name: "Screw Rick Ross ",
        type: "Prison guard",
        health: 20,
        dice: 1,
        probability:0,
        level: 1,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m11.png' />",
        description:"A single attack with all the power, majesty, and finesse... of a Prison"

    },
    {
        name: "Brian Aldiss",
        type: "Correctional Officer ",
        health: 20,
        dice: 1,
        probability:0,
        level: 1,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m12.png' />",
        description:"Draped with machine gun bullets and holding an artillery shell."
    },
    {
        name: "Meg jackson",
        type: "Correctional Sergeant",
        health: 30,
        dice: 2,
        probability:0,
        level: 2,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m21.png' />",
        description:"You may not hire dudes to their gunfight skill for each your opponents posse has in it."
    },
    {
        name: "Greg Miller",
        type: "Correctional Lieutenant",
        health: 30,
        dice: 2,
        probability:0,
        level: 2,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m22.png' />",
        description:"Each group directly controlled by the Lieutenant , Be aware. "
    },
    {
        name: "Stewart Jock",
        type: "Captain",
        health: 40,
        dice: 2,
        probability:0,
        level: 3,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m31.png' />",
        description:"They stays on its victim until it's end. Spending an Illuminati action, at any time"
    },
    {
        name: "Terry Harison",
        type: "Unit Supervisor",
        health: 40,
        dice: 2,
        probability:0,
        level: 3,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m32.png' />",
        description:"Exhaust all opposing and take control of the available units."
    },
    {
        name: "Rolim Amaro",
        type: "Community officer",
        health: 50,
        dice: 3,
        probability:0,
        level: 4,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m41.png' />",
        description:"They Doesn't affected by resistance, smash, power and any other effects on the defending."
    },
    {
        name: "Len Murphy",
        type: "Major" ,
        health: 50,
        dice: 3,
        probability:0,
        level: 4,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m42.png' />",
        description:"They got an itchy trigger finger and a fondness for shooting dudes in the face."
    },
    {
        name: "Tom Lucas",
        type: "Armed Guards" ,
        health: 60,
        dice: 4,
        probability:0,
        level: 5,
        power:"",
        image: "<img class='image-scale img-radius' class='image-scale' src='assets/img/monsters/m51.png' />",
        description:"Maintains proficiency in the use of all assigned protective equipment, restraint devices and weapons"
    },
    {
        name: "Scott Collins",
        type: "Armed Guards" ,
        health: 60,
        dice: 4,
        probability:0,
        level: 5,
        power:"",
        image: "<img class='image-scale img-radius' src='assets/img/monsters/m52.png' />",
        description:"Maintains proficiency in the use of all assigned protective equipment, restraint devices and weapons"
    },
    {
        name: "David Andrews",
        type: "warden",
        health: 1,
        dice: 5,
        probability: 0,
        level: 10,
        power:"",
        image:"<img class='image-scale img-radius' src='assets/img/monsters/m101.png' />",
        description:"Required to utilize rapid and effective judgment in responding to unusual using appropriate escalation of force level"
    }
]


var rewards = [
    {
        name: "Healing Potion",
        type: "Health",
        value: 10
    },
    {
        name: "Healing Potion",
        type: "Health",
        value: 10
    },
    {
        name: "Healing Potion",
        type: "Health",
        value: 10
    },


    {
        name: "Super Healing Potion",
        type: "Health",
        value: 25
    },
    {
        name: "Super Healing Potion",
        type: "Health",
        value: 25
    },
    {
        name: "Super Healing Potion",
        type: "Health",
        value: 25
    },


    {
        name: "Master Healing Potion",
        type: "Health",
        value: 40
    },
    {
        name: "Master Healing Potion",
        type: "Health",
        value: 40
    },
    {
        name: "Master Healing Potion",
        type: "Health",
        value: 40
    },


    {
        name: "Dice",
        type: "Dice",
        value: 1
    },
    {
        name: "Dice",
        type: "Dice",
        value: 1
    },
    {
        name: "Dice",
        type: "Dice",
        value: 1
    }
]

portalTitle = [
    "Portal to Prison Cell",
    "Portal to Prison Cell Hallway",
    "Portal to Cafeteria",
    "Portal to Basketball Court",
    "Portal to Prison Courtyard",
    "Portal to Warden's Room"
 ]

/*
 Function: shuffle
 Description:
 Shuffles data to maximise effective randomization.
 */
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/*
PURPLE      PRISON CELL
BLUE        PRISON CELL HALLWAY
GREEN       CAFETERIA
YELLOW      BASKETBALL COURT
ORANGE      PRISON COURTYARD
RED         WARDEN ROOM
*/














