
var diceNum = 2;
var playerHealth = 100; //to get this value as player health
var selected = false;

var mapHash;
var entityHash = [];


$(function () {
    initGame();
})

function initializeTheme() {

    for(var i=0; i<mapHash.length; i++) {

        mapHash[i].backgroundImage = "assets/img/backgrounds/" + mapHash[i].name + ".png";
    }
}


function initGame() {
    $("#dungeons").fadeIn();
    createMap();
    createEntity();
    addEntities();
    drawDungeon(1);
    startGame(1);
}


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

    var i;

    for(i=0; i < monsters.length; i++)
    {
        entityHash.push(monsters[i]);
        entityHash[i].id = i+1;
        entityHash[i].class = "Monster";

    }

    entityHash[i-1].class = "Boss";

    for(i = 0; i < mapHash.length; i++) {
        var imgName = mapHash[i].name;
        entityHash.push(
            {
                id:entityHash.length+1,
                name:imgName,
                image:"<img src='assets/img/portals/" + imgName + ".gif' />",
                class: "Portal"
            }
        );
    }

    entityHash.push(
        {
            id:entityHash.length+1,
            class: "Seer",
            image: "<img src='assets/img/seer.png' />"
        }
    );

    entityHash.push(
        {
            id:entityHash.length+1,
            class: "Player",
            image: "<img src='assets/img/player.png' />"
        }
    );

    //console.log("entityHash:");
    //console.log(entityHash);
}

function addEntities() {
    console.log("in addEntities");
    var x = 0;
    var y = 0;
    var dungeonSelect;
    var getDef;
    for(var i=0; i<mapHash.length - 1; i++)
    {
        dungeonSelect = getDungeon(i+1);
        var selMonsters;
        var selPortals;
        var selSeer;
        var selPlayer;

        for(var j=0; j<dungeonSelect.definition.length; j++) {
            for(var a=1; a<=3; a++) {
                for(var b=1; b<=3; b++) {
                    getDef = getDefinition(dungeonSelect, a, b);
                    {
                        var m = Math.floor(Math.random() * getDef.choiceSet.length);
                        var type = getDef.choiceSet[m];
                        console.log("Type: "+type);
                        if(type.indexOf(' ') > 0) {
                            console.log(type.indexOf(' '));
                            type = type.split(' ');
                        }
                        if(type=="Monster") {
                            for(var n = 0; n < 9; n++) {
                                if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {

                                    selMonsters = $.grep(entityHash, function(element){
                                         if(dungeonSelect.id == 1)
                                         {
                                             return element.level == 1;
                                         }
                                         else
                                         {
                                             if(element.level <= dungeonSelect.id && element.level >= dungeonSelect.id-1)
                                                 return element;
                                         }
                                    });

                                    var random = getRandom(0,selMonsters.length);
                                    var entity = selMonsters[random];
                                    console.log("entity:" + entity);
                                    mapHash[i].definition[n].content = entity.image;
                                    mapHash[i].definition[n].entity = entity.id;
                                }
                            }

                            //console.log("selMons:");
                            //console.log(selMonsters);
                        }
                        else if(type[0]=="Portal") {
                            for(var n = 0; n < 9; n++) {
                                if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                                    var name = type[1];
                                    var id=0;
                                    if(type[1] == "Any") {
                                        selPortals = getEntityByClass(type[0]);
                                        var random = getRandom(0,selPortals.length);
                                        while(selPortals[random].name == dungeonSelect.name)
                                            random = getRandom(0, selPortals.length);
                                        var entity = selPortals[random];
                                        name = entity.name;
                                        id = entity.id;
                                    }
                                    else
                                    {
                                        selPortals = getEntityByClass(type[0]);

                                        var portal = $.grep(selPortals, function(element){
                                            return element.name = type[1];
                                        });

                                        name = portal.name;
                                        id = portal.id;
                                    }


                                    mapHash[i].definition[n].content = name;
                                    mapHash[i].definition[n].entity = id;
                                }
                            }
                        }

                        else if(type=="Seer") {
                            for(var n = 0; n < 9; n++) {
                                if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {

                                    var probability = Math.random();

                                    console.log("Probability: " + probability);
                                    if(probability>0.5)
                                    {
                                        selSeer = getEntityByClass(type);

                                        mapHash[i].definition[n].content = selSeer[0].image;
                                        mapHash[i].definition[n].entity = selSeer[0].id;
                                    }
                                    else
                                    {
                                        mapHash[i].definition[n].content = "";
                                        mapHash[i].definition[n].entity = 0;

                                    }
                                }
                            }
                        }

                        else if(type=="Player") {
                            for(var n = 0; n < 9; n++) {
                                if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {

                                    selPlayer = getEntityByClass(type);

                                    mapHash[i].definition[n].content = selPlayer[0].image;
                                    mapHash[i].definition[n].entity = selPlayer[0].id;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}

function getRandom(min, max) {
// var m = Math.floor(Math.random() *3 + 1);
    var n = Math.floor(Math.random() * (max-min) + min);
//
// while(m==2 && n==2)
// var temp = getRandom();
    return n;
}

function getDungeon(dungeonID) {
    var dungeonSelect;
    dungeonSelect = $.grep(mapHash, function(element) {
        return element.id == dungeonID;
    });
    return dungeonSelect[0];
//console.log(dungeonSelect);
}

function getDungeonId(dungeonName) {
    var dungeon = $.grep(mapHash, function (mapHash) {
        return mapHash.name == dungeonName;
    });
    //console.log(dungeon);
    return dungeon[0].id;
}

function getDefinition(dungeon, lx, ly) {
    var definition = dungeon.definition;
    for(var i = 0; i < definition.length; i++) {
        if(definition[i].lx == lx && definition[i].ly == ly) {
            return definition[i];
        }
    }
}

function getContent(dungeonId, lx, ly) {
    //console.log("start getContent");
    var dungeon = getDungeon(dungeonId);

    //console.log(dungeon.definition);

    var content = getDefinition(dungeon, lx, ly);
    //console.log("end getContent");

    return content;
}

function getEntity(entityId) {
    var entity = $.grep(entityHash, function (entityHash) {
        return entityHash.id == entityId;
    });

    return entity[0];
}

function getEntityByClass(cls) {
    var entities = $.grep(entityHash, function(entityHash) {
        return entityHash.class == cls;
    });

    return entities;
}



function startGame(dungeonId) {
    //console.log("start startGame");
    selected == false;
    $(".matrix").unbind('click').click(function() {
        if(selected == false) {
            selected = true;
            var p = $(this).attr("id");

            var lx = parseInt(p.charAt(0));
            var ly = parseInt(p.charAt(1));

            //console.log(lx + " " + ly);

            if(lx==2 && ly==2){
                selected = false;
                startGame(dungeonId);
            } else {
                var content = getContent(dungeonId, lx, ly);
                console.log(content);
                var entityId = content.entity;
                //console.log(entityId);
                movePlayer(lx, ly, entityId, checkReaction);
            }
        }
    });
}


function drawDungeon(dungeonId) {
    //console.log("start drawDungeon");
    var dungeon = getDungeon(dungeonId);
//    document.getElementById("dungeonBackground").src = dungeon.backgroundImage;

    var setMatrixColor = document.getElementById("mainmatrix");
    setMatrixColor.style.backgroundImage = "url(" + dungeon.backgroundImage + ")";

    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= 3; j++) {
            var content = getContent(dungeonId, i, j);
            if(content.choiceSet.length != 0) {
                drawEntity(content.lx, content.ly, content.content);
                //document.getElementById("22").innerHTML = "<img src='assets/img/player.png' />";
            }
        }
    }
    //console.log("end drawDungeon");
}

function drawEntity(lx, ly, content) {
    console.log("start drawEntity");
    var pos = lx+""+ly;
    document.getElementById(pos).innerHTML = content;
    //console.log("end drawEntity");
}

function movePlayer(lx, ly, entityId, callback) {
    //console.log("in movePlayer");
    callback(entityId);
}



function checkReaction(entityId) {
//    console.log("in checkReaction");
    var entity = getEntity(entityId);
//    console.log(entity);
//    console.log(entity.class);
    switch(entity.class) {
        case "Monster":
//            console.log("its monster");
            initBattleWindow(entityId);
            break;

        case "Portal":
//            console.log("its portal");
            teleport(entityId);
            break;

        case "Seer":
//            console.log("its Seer");
            seer();
            break;
    }
}

function teleport(entityId) {
    var entity = getEntity(entityId);
    var dungeonId = getDungeonId(entity.portal);
    drawDungeon(dungeonId);
    startGame(dungeonId);
}


function initBattleWindow(entityId) {
    $("#dungeons").fadeOut();
    $("#fightArena").fadeIn();

    player = true;
    var entity = getEntity(entityId);
    $("#monster-hp").text(entity.health);
    playerTurn(entityId);
}

function hideAngle(diceNum) {
    for (var i = 1; i <= diceNum; i++) {
        $("#die" + i).removeClass('shown' + i);
    }
}
function hideFace(diceNum,diceVal) {
    for (var i = 1; i <= diceNum; i++) {
        $("#die" + i + " #face" + diceVal[i] + "").hide();
    }
}
function showAngle(diceNum) {
    for (var i = 0; i <= diceNum; i++) {
        $("#die" + (i)).addClass('shown' + (i));
    }
}
function setFaces(diceNum,diceVal) {
    for (var i = 0; i <= diceNum; i++) {
        $("#die" + (i + 1) + " #face" + diceVal[i] + "").show();
    }
}
function finalRoll(diceNum,diceVal) {
    // diceVal = [];
    var healthReduce =0;
    for (var i = 0; i < diceNum; i++) {
        diceVal.push(Math.floor((Math.random() * 6) + 1));
        healthReduce += diceVal[i];
    }
    setFaces(diceNum,diceVal);
    return healthReduce;
}
function rollDice(diceNum,callback,callback1,callback2) {
    emptyDiceDiv();
    var diceVal = [];
    $("#diceBox").fadeIn();
    for (var i = 0; i < 6; ++i) {
        var die = i + 1;
        $("#die1").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
        $("#die2").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
        $("#die3").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
        $("#die4").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
        $("#die5").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");

        $("#die1 #face" + die + "").hide();
        $("#die2 #face" + die + "").hide();
        $("#die3 #face" + die + "").hide();
        $("#die4 #face" + die + "").hide();
        $("#die5 #face" + die + "").hide();
    }
    setFaces(diceNum,diceVal);
    hideFace(diceNum,diceVal);
    showAngle(diceNum);
    setTimeout(function () {
        hideAngle(diceNum);
    }, 750);
    setTimeout(function () {
        var healthReduce = finalRoll(diceNum,diceVal);



        // return healthReduce;
        // doDamage(team,healthReduce);
//        console.log(healthReduce);
        // Make sure the callback is a function​
        if (typeof callback === "function")
        {
//            console.log("checked whether callback is a function");
            // Call it, since we have confirmed it is callable​
            //this way we can pass local variables in callback function
            callback(healthReduce,callback1,callback2);
        }
    }, 751)
}
//------------------------------------------------------------dice roll end-------------------------------------
function playerTurn() {
    setTimeout(function () {
//        console.log("Player:");

        $(".btn").unbind('click').click(function () {
            if (player) {
                player = false;
                btnId = $(this).attr("id");
                switch (btnId) {
                    case "btnAttack":
                        console.log("attack selected");
                        //simply passing the function name in string format and then the variables are passed in callbacks as and what needed
                        rollDice(diceNum,checkDefendPowers,doDamage,checkIfDead);

                        // console.log("entering doDamage");
                        // doDamage("player",damage);
                        // function(){
                        //    updateResources("monster",function()
                        //    {
                        //            // emptyDiceDiv();
                        //            // switchTurn("player")
                        //    });


                        // });
                        break;
                    case "btnRetreat":
                        //drawMap();
                        break;
                }
            }
        })
    }, 500);
}
function monster(call) {
    setTimeout(function()
    {
        console.log("in ai");
        if(player == false)
        {
            rollDice(3,checkAttackPowers,doDamage,checkSurvival);
            // function(){
            //          updateResources("player",function(){
            //                  emptyDiceDiv();
            //                  switchTurn("monster")
            //          });
            //      });
        }
    },3000);
}
function switchTurn(from) {
    console.log("switching turn from "+from);
    console.log("checking player: "+player);
    setTimeout(function() {
        if (from == "player") {
            player = false;
            monster();
        }
        else {
            player = true;
            playerTurn();
        }

    }, 4000);
}

function emptyDiceDiv() {
    // diceVal = [];
    $("#die1").empty();
    $("#die2").empty();
    $("#die3").empty();
    $("#die4").empty();
    $("#die5").empty();
}
function doDamage(team, damage,callback){
    console.log("doDamage "+team);
    console.log("doDamage "+damage);

    playerHealthDiv = document.getElementById("player-Health");
    monsterHealthDiv = document.getElementById("monster-Health");
    var monsterHealth = $("#monster-hp").text();

    if(team == "monster")
    {
        playerHealth -= damage;
        console.log("player health left" +playerHealth);
        playerHealthDiv.style.width = playerHealth + "%";
    }
    else
    {
        monsterHealth = monsterHealth - damage;
        console.log("monster health left" +monsterHealth);
        $("#monster-hp").text(monsterHealth);
        monsterHealthDiv.style.width = monsterHealth + "%";
        // checkDefendPowers();
    }
    setTimeout(function()
    {
        if (typeof callback === "function")
        {
            callback(monsterHealth);
        }
    },2000);
}
function checkDefendPowers(damage,callback,callback1){
    console.log("in checkDefendPowers");
    if (typeof callback === "function")
    {
        callback("player",damage,callback1);
    }
}
function checkIfDead(health){
    console.log("in checkIfDead function "+health)
    if (health<=0)
    {
        victory();
    }
    else
    {
        checkRecoveryPowers("monster",switchTurn);
    }
}
function checkRecoveryPowers(team,callback){
    console.log("in recovery function");
    if (team == "player")
    {
        if (typeof callback === "function")
        {
            callback("monster");
        }
    }
    else
    {
        if (typeof callback === "function")
        {
            callback("player");
        }
    }
}
function checkAttackPowers(damage,callback,callback1){
    console.log("in checkAttackPowers");
    if (typeof callback === "function")
    {
        callback("monster",damage,callback1);
    }

}

// function checkDefendPowers(entityId, damage){
// 	console.log("in checkDefendPowers");
// if (typeof callback === "function")
//        {
//          	callback("player",damage,callback1);
//        }

// }
function checkSurvival(){
    console.log("in checkSurvival");
    if (playerHealth<=0)
    {
        defeat();
    }
    else
    {
        checkRecoveryPowers("player",switchTurn);
    }
}