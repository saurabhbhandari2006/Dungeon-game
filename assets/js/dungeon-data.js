var monsters = [

    {name: "The Amphisbaena", category: "monster", health: "30", dice:"1",image: "<img src='assets/img/m1.png' />"},
    {name: "The Caristae", category: "monster", health: "40", dice:"2",image: "<img src='assets/img/m2.png' />"},
    {name: "The Echeneis", category: "monster", health: "50", dice:"3",image: "<img src='assets/img/m3.png' />"},
    {name: "The Ghul ", category: "monster", health: "60", dice:"4",image: "<img src='assets/img/m4.png' />"},
    {name: "The Aniluus", category: "monster", health: "70", dice:"5",image: "<img src='assets/img/m5.png' />"},
    {name: "The Ogre", category: "monster", health: "80", dice:"6",image: "<img src='assets/img/m6.png' />"}
    ]

var portals = [

    {name: "Red", colorID: "1", backgroundColor:"red"},
    {name: "Green", colorID: "2", backgroundColor:"green"},
    {name: "Blue", colorID: "3", backgroundColor:"blue"},
    {name: "Yellow", colorID: "4", backgroundColor:"yellow"},
    {name: "Orange", colorID: "5", backgroundColor:"orange"}
    ]

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}