
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
            for(var a=1; a<=3; a++)
            {
                for(var b=1; b<=3; b++)
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
        }

        console.log(dungeonSelect);

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