var initHealth = 1;
var initDice = 2;
var teleportCost = 5;

/*

 */
var map = [

    {name: "Purple", type: "definition", generation: {},
        monsters:3,
        portals:2,
        seer: 0,
        definition: [
            {lx: 1, ly: 1, choiceSet: ["monster", "portal"]},
            {lx: 1, ly: 2, choiceSet: ["portal"]},
            {lx: 1, ly: 3, choiceSet: []},
            {lx: 2, ly: 1, choiceSet: []},
            {lx: 2, ly: 2, choiceSet: ["player"]},
            {lx: 2, ly: 3, choiceSet: ["portal"]},
            {lx: 3, ly: 1, choiceSet: ["monster"]},
            {lx: 3, ly: 2, choiceSet: []},
            {lx: 3, ly: 3, choiceSet: ["portal"]}
        ],
        backgroundImage:""
    },

    {name: "Blue",  type: "definition", generation: {},
        monsters:3,
        portals:2,
        seer: 0,
        definition: [
            {lx: 1, ly: 1, choiceSet: [""]},
            {lx: 1, ly: 2, choiceSet: [""]},
            {lx: 1, ly: 3, choiceSet: [""]},
            {lx: 2, ly: 1, choiceSet: [""]},
            {lx: 2, ly: 2, choiceSet: [""]},
            {lx: 2, ly: 3, choiceSet: [""]},
            {lx: 3, ly: 1, choiceSet: [""]},
            {lx: 3, ly: 2, choiceSet: [""]},
            {lx: 3, ly: 3, choiceSet: [""]}
        ],
        backgroundImage:""
    },

    {name: "Green",  type: "definition", generation: {},
        monsters:3,
        portals:2,
        seer: 1,
        definition: [
            {lx: 1, ly: 1, choiceSet: [""]},
            {lx: 1, ly: 2, choiceSet: [""]},
            {lx: 1, ly: 3, choiceSet: [""]},
            {lx: 2, ly: 1, choiceSet: [""]},
            {lx: 2, ly: 2, choiceSet: [""]},
            {lx: 2, ly: 3, choiceSet: [""]},
            {lx: 3, ly: 1, choiceSet: [""]},
            {lx: 3, ly: 2, choiceSet: [""]},
            {lx: 3, ly: 3, choiceSet: [""]}
        ],
        backgroundImage:""
    },

    {name: "Yellow",  type: "definition", generation: {},
        monsters:3,
        portals:2,
        seer: 1,
        definition: [
            {lx: 1, ly: 1, choiceSet: [""]},
            {lx: 1, ly: 2, choiceSet: [""]},
            {lx: 1, ly: 3, choiceSet: [""]},
            {lx: 2, ly: 1, choiceSet: [""]},
            {lx: 2, ly: 2, choiceSet: [""]},
            {lx: 2, ly: 3, choiceSet: [""]},
            {lx: 3, ly: 1, choiceSet: [""]},
            {lx: 3, ly: 2, choiceSet: [""]},
            {lx: 3, ly: 3, choiceSet: [""]}
        ],
        backgroundImage:""
    },

    {name: "Orange",  type: "definition", generation: {},
        monsters:3,
        portals:2,
        seer: 1,
        definition: [
            {lx: 1, ly: 1, choiceSet: [""]},
            {lx: 1, ly: 2, choiceSet: [""]},
            {lx: 1, ly: 3, choiceSet: [""]},
            {lx: 2, ly: 1, choiceSet: [""]},
            {lx: 2, ly: 2, choiceSet: [""]},
            {lx: 2, ly: 3, choiceSet: [""]},
            {lx: 3, ly: 1, choiceSet: [""]},
            {lx: 3, ly: 2, choiceSet: [""]},
            {lx: 3, ly: 3, choiceSet: [""]}
        ],
        backgroundImage:""
    },

    {name: "Red",  type: "definition", generation: {},
        monsters:3,
        portals:2,
        seer: 1,
        definition: [
            {lx: 1, ly: 1, choiceSet: [""]},
            {lx: 1, ly: 2, choiceSet: [""]},
            {lx: 1, ly: 3, choiceSet: [""]},
            {lx: 2, ly: 1, choiceSet: [""]},
            {lx: 2, ly: 2, choiceSet: [""]},
            {lx: 2, ly: 3, choiceSet: [""]},
            {lx: 3, ly: 1, choiceSet: [""]},
            {lx: 3, ly: 2, choiceSet: [""]},
            {lx: 3, ly: 3, choiceSet: [""]}
        ],
        backgroundImage:""
    }
]
/*
 Data: Monsters
 Description:
 Holds the data for the various kinds of monsters, to be randomly outputted.
 */
var monsters = [

    {
        name: "Zortran",
        type: "Wraith",
        health: 20,
        dice: 1,
        probability:0,
        level: 1,
        power:"",
        image: "<img src='assets/img/m1.png' />"
    },
    {
        name: "Phinos",
        type: "Necromancer",
        health: 20,
        dice: 1,
        probability:0,
        level: 1,
        power:"",
        image: "<img src='assets/img/m1.png' />"
    },
    {
        name: "Magina",
        type: "Mage",
        health: 30,
        dice: 2,
        probability:0,
        level: 2,
        power:"",
        image: "<img src='assets/img/m2.png' />"
    },
    {
        name: "Karo",
        type: "Golem",
        health: 30,
        dice: 2,
        probability:0,
        level: 2,
        power:"",
        image: "<img src='assets/img/m2.png' />"
    },
    {
        name: "Echenist",
        type: "Warlock",
        health: 40,
        dice: 2,
        probability:0,
        level: 3,
        power:"",
        image: "<img src='assets/img/m3.png' />"
    },
    {
        name: "Krobelus",
        type: "Prophet",
        health: 40,
        dice: 2,
        probability:0,
        level: 3,
        power:"",
        image: "<img src='assets/img/m3.png' />"
    },
    {
        name: "Ghul",
        type: "Undead",
        health: 50,
        dice: 3,
        probability:0,
        level: 4,
        power:"",
        image: "<img src='assets/img/m4.png' />"
    },
    {
        name: "Raxtax",
        type: "Spirit" ,
        health: 50,
        dice: 3,
        probability:0,
        level: 4,
        power:"",
        image: "<img src='assets/img/m4.png' />"
    },
    {
        name: "Enormo",
        type: "Giant" ,
        health: 60,
        dice: 4,
        probability:0,
        level: 5,
        power:"",
        image: "<img src='assets/img/m4.png' />"
    },
    {
        name: "Ghaijin",
        type: "Troll" ,
        health: 60,
        dice: 4,
        probability:0,
        level: 5,
        power:"",
        image: "<img src='assets/img/m4.png' />"
    },
    {
        name: "Infernus",
        type: "Dragon",
        health: 100,
        dice: 5,
        probability: 0,
        level: 10,
        power:"",
        image:""
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
        value: 20
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
        name: "Super Healing Potion",
        type: "Health",
        value: 25
    },
    {
        name: "Dice",
        type: "Dice",
        value: 1
    }
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