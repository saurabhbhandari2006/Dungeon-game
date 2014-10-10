
var mapHash;
var entityHash = [];

$(function() {
    createMap();
    createEntity();
    //getDungeon(2);
    addEntities();

});

function initializeTheme() {

    for(var i=0; i<mapHash.length; i++) {

        mapHash[i].backgroundImage = "assets/img/backgrounds/" + mapHash[i].name + ".png";
    }
}

function createMap() {

    mapHash = map;

    for(var i=0; i<mapHash.length; i++)
    {
        var imgName = mapHash[i].name;
        mapHash[i].id = i+1;
        mapHash[i].backgroundImage = "assets/img/backgrounds/" + imgName + ".png";
    }

    //console.log(mapHash);
}

function createRewards() {


}

function createEntity() {

    for(var i=0; i < monsters.length; i++)
    {
        entityHash.push(monsters[i]);
        entityHash[i].id = i+1;
        entityHash.class = "monster";
    }

    for(var i = 0; i < mapHash.length; i++) {
        var imgName = mapHash[i].name;

        entityHash.push(
            {
                id:entityHash.length+1,
                portal:imgName,
                portalImage:"assets/img/portals/" + imgName + ".png",
                class: "portal"
            }
        );
    }

    //console.log(entityHash);
}

function addEntities() {

    var x = 0;
    var y = 0;
    var dungeonSelect;
    var monsterSelect;
    var defGrep;

    for(var i=0; i<mapHash.length - 1; i++)
    {
        dungeonSelect = getDungeon(i+1);

        for(var j=0; j<dungeonSelect.definition.length; j++)
        {
            for(var a= 1, b= 1; a<=3, b<=3; a++, b++)
            {
                var getDef = getDefinition(dungeonSelect, a, b)
                {
                    var m = Math.floor(Math.random() * getDef.choiceSet.length);

                    var type = getDef.choiceSet[m];

                    var targetDiv;

                    if(type=="monster")
                    {
                        targetDiv = document.getElementById(a.toString() + b.toString());
                        targetDiv.innerHTML = "Monster";
                    }
                    else if(type=="portal")
                    {
                        targetDiv = document.getElementById(a.toString() + b.toString());
                        targetDiv.innerHTML = "Portal";
                    }
                }
            }
        }

        console.log(dungeonSelect);


//            var n = Math.random() < 0.5 ? 0 : 1;
//            var m = Math.random() < 0.5 ? 0 : dungeonSelect.choiceSet.length;
//
//            var selClass = dungeonSelect.choiceSet[m];
//
//            console.log(selClass);
//
//            defGrep = getDefinition(dungeonSelect, x, y);
//            console.log(x + " " + y);
//            if(defGrep.entity==0)
//            {
//
//                for(var k=0; k<mapHash[i].definition.length; k++)
//                {
//                    if(mapHash[i].definition[k].lx == x && mapHash[i].definition[k].ly == y)
//                    {
//                        mapHash[i].definition[k].entity = monsterSelect[n].id;
//                        defGrep.entity = monsterSelect[n].id;
//                    }
//                }
//
//            } else {
//                 j--;
//            }

//            console.log(mapHash[i]);
            //console.log(assignEntityId);

       }

}

function getDefinition(dungeon, lx, ly){

    var definition = dungeon.definition;

    for(var i=0; i<definition.length; i++) {
        if(definition[i].lx == lx && definition[i].ly == ly)
            return definition[i];
    }
}
function getRandom(min, max) {

//    var m = Math.floor(Math.random() *3 + 1);
    var n = Math.floor(Math.random() * (max-min) + min);
//
//    while(m==2 && n==2)
//        var temp = getRandom();

    return n;
}

//function checkBlocks(dungeonID) {
//
//    var dungeonSelect = getDungeon(dungeonID);
//    var x = getRandom();
//    var y = getRandom();
//
//    var defGrep = $.grep(mapHash, function(element){
//        for(var i=0; i<dungeonSelect.definition.length; i++)
//        {
//            if(x == dungeonSelect.definition[i].lx && y == dungeonSelect.definition.ly && dungeonSelect.definition.entity!=0)
//            {
//                return dungeonSelect.definition[i];
//            }
//        }
//    });
//
//}

function getDungeon(dungeonID)
{
    var dungeonSelect;

    dungeonSelect = $.grep(mapHash, function(element) {
            return element.id == dungeonID;
    });

    return dungeonSelect[0];
    //console.log(dungeonSelect);
}



























































//************************************************************************************************************************
//var selPort = [];       //Selected Portals
//var selMons = [];       //Selected Monsters
//var flag = 0;           //Flag value
//var portalPos = [];     //Positions of portals
//var monsterPos = [];    //Positions of monsters
//var posArr = [];        //Array of filled positions
//var mapID = 0;          //map ID
//var mapColor = 0;       //map color
//var element = 1;
//var monsterList = monsters;
//
///* Function: initEverything
//    Description:
//        Main initialization function, which is called first in the program flow.
//    Status:
//        COMPLETED
// */
//function initEverything()
//{
//   enterDungeon();
// //   setMonsters();
////     SetSeer();
//}
//
///*
//    Function: getPosition
//    Description:
//        Position getter function. Calculates positions after checking for conditions.
//    Status:
//        COMPLETED
// */
//function getPosition(flag)
//{
//    c = 0;
//    var pos;
//    posArr = [];
//
//    switch(element)
//    {
//        case 1:
//                while (c < flag)
//                {
//                    pos = getRandom();
//                    if(c == 0)
//                    {
//                        posArr.push(pos);
//                        c++;
//                    }
//                    else
//                    {
//                        if(validatePos(pos))
//                        {
//                            posArr.push(pos);
//                            c++;
//                        }
//                    }
//                }
//                break;
//
//        case 2:
//                pos = getRandom();
//                if(validatePos(pos))
//                {
//                    posArr.push(pos);
//                    c++;
//                }
//                break;
//    }
//
//}
//
//function getRandom() {
//    var mL = 0;
//    var mR = 0;
//
//    mL = Math.floor(Math.random() * (4-1) + 1);
//    mR = Math.floor(Math.random() * (4-1) + 1);
//
//    while(mL == 2 && mR == 2)
//    {
//        mL = Math.floor(Math.random() * (4-1) + 1);
//        mR = Math.floor(Math.random() * (4-1) + 1);
//    }
//
//    var pos = mL.toString() + mR.toString();
//    return pos;
//}
//
//function validatePos(pos) {
//    var can = true;
//    for (var i = 0; i < posArr.length; i++) {
//        if (pos == posArr[i])
//            can = false;
//    }
//
//    return can;
//
//}
//
//function enterDungeon()
//{
//    selPort = shuffle(portals);
//    selMons = shuffle(monsters);
//
//    if(mapColor==0)
//    {
//        document.getElementById("mainmatrix").style.backgroundColor = selPort[mapColor].backgroundColor;
//        mapColor=selPort[0].colorID;
//            setPortal();
//    }
//    else
//    {
//        mapColor=selPort[x].colorID;
//            setPortal();
//    }
//
//    setMonsters();
//    setPlayer();
//    setSeer();
//}
//
//
//function setPlayer()
//{
//    var pos = "22";
//
//    var targetDiv = document.getElementById(pos);
//
//    targetDiv.innerHTML = "<img src='assets/img/player.png' />";
//}
///*
//    Function: SetPortal
//    Description:
//        Function to randomly select and place 3 portals on the map.
//    Status:
//        COMPLETED
// */
//function setPortal()
//{
//    var pos;
//
//    flag = Math.floor(Math.random() * 3 + 1);
//    console.log(flag);
//
//    element = 1;
//    getPosition(flag);
//
//
//
//    for(var i=0; i<flag; i++)
//    {
//        console.log(i);
//        var targetDiv = document.getElementById(posArr[i]);
//
//        if(selPort[i].colorID != mapColor)
//        {
//            targetDiv.style.backgroundColor = selPort[i].backgroundColor;
//            console.log(selPort[i]);
//        }
//        else
//        {
//            targetDiv.style.backgroundColor = selPort[i+3].backgroundColor;
//            console.log(selPort);
//        }
//
//        console.log(targetDiv);
//        portalPos.push({colID:selPort[i].colorID, getPos:posArr[i]});
//    }
//
//    console.log(portalPos);
//}
//
///*
//    Function: SetMonsters
//    Description:
//        Function to randomly assign 3 monsters on the map.
//    Status:
//        COMPLETED
// */
//function setMonsters()
//{
//    flag = Math.floor(Math.random() * 3 +1);
//    console.log(flag);
//
//    element = 1;
//    getPosition(flag);
//
//    for(var i = 0; i<flag; i++)
//    {
//        var targetDiv = document.getElementById(posArr[i]);
//
//        targetDiv.innerHTML = selMons[i].image;
//
//        console.log(targetDiv);
//
//        monsterPos.push({colID:selMons[i].id, getPos:posArr[i]})
//        monsterList[i].health--;
//        console.log("Monster health: " + monsterList[i].health);
//    }
//
//    console.log(posArr);
//}
//
///*
//    Function: SetSeer
//    Description:
//        Function to randomly assign either 1 or no Seers on the map grid
//    Status:
//        Work in progress
// */
//function setSeer()
//{
////    var set = false;
////    flag = Math.floor(Math.random() * 1 + 1);
////
////    if(flag == 0)
////        set = true;
////
////    element = 2;
////
////    while (set == false) {
////        getPosition(flag);
////        for (var b = 0, c = 0; b < monsterPos.length, c < portalPos.length; b++, c++)
////            if(posArr[i]!= monsterPos[c].getPos || posArr[i] != portalPos[b].getPos){
////                var targetDiv = document.getElementById(posArr[i]);
////                targetDiv.innerHTML = "SEER!";
////                set = true;
////            } else {getPosition(flag);}
////    }
//
//
//
//    var c = 0;
//    var b = 0;
//    var i = 0;
//
//    flag = 1;//Math.floor(Math.random() * 1 + 1);
//
//    element = 2;
//    if(flag!=0)
//    {
//        getPosition(flag);
//        for(b=0; b<monsterPos.length; b++)
//        {
//            while(posArr[i]==monsterPos[b].getPos)
//            {
//                getPosition(flag);
//            }
//            while(posArr[i] == portalPos[c].getPos)
//            {
//                getPosition(flag);
//            }
//
//            var targetDiv = document.getElementById(posArr[i]);
//            targetDiv.innerHTML = "SEER!"
//
//            console.log("Seer position: " + posArr[i]);
//            console.log("Seer flag: " + flag);
//            c++;
//            b++;
//        }
//    }
//}