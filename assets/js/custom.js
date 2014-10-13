var diceNum = 2;
var playerHealth = 1; //to get this value as player health
var selected = false;

var mapHash;
var entityHash = [];
var blinkit;

function background() {
    $('body').css('background-image', "url(" + theme.background + ")");
    blinkit = setInterval(blinker, 2000);
    $('#startClicker').on('click', function () {
        $('.gameTitle').fadeOut();
        $('.How').fadeIn();
        clearInterval(blinkit);
        howTo();
        initGame();

    });
};


function initializeTheme() {

    for (var i = 0; i < mapHash.length; i++) {

        mapHash[i].backgroundImage = "assets/img/backgrounds/" + mapHash[i].name + ".png";
    }
}

function blinker() {
    $('#startClicker').fadeOut(500, function () {
        $('#startClicker').fadeIn(500);
    });
}
function blinker2() {
    $('#start').fadeOut(500, function () {
        $('#start').fadeIn(500);
    });
}
function howTo() {
    blinkit = setInterval(blinker2, 2000);
    $('#start').on('click', function () {
        $('.How').fadeOut();
        $('#gameAttack_wrapper').fadeIn();
        clearInterval(blinkit);

    });
}
function initGame() {
    $("#dungeons").fadeIn();
    $(".defeat").fadeOut();
    createMap();
    createEntity();
    addEntities();
    drawDungeon(1);
    startGame(1);
}

function startGame(dungeonId) {
    console.log("start startGame");
    selected = false;
console.log("selected value : " +selected);
    $(".matrix").unbind('click').click(function () {
        if (selected == false) {
            selected = true;
            var p = $(this).attr("id");

            var lx = parseInt(p.charAt(0));
            var ly = parseInt(p.charAt(1));

            if (lx == 2 && ly == 2) {
                startGame(dungeonId);
            } else {
                var content = getContent(dungeonId, lx, ly);
                console.log(content);
                var entityId = content.entity;
                movePlayer(lx, ly, entityId, checkReaction);
            }
        }
    });
}




function createMap() {
    mapHash = map;
    for (var i = 0; i < mapHash.length; i++) {
        var imgName = mapHash[i].name;
        mapHash[i].id = i + 1;
        mapHash[i].backgroundImage = "assets/img/backgrounds/" + imgName + ".png";
    }
//console.log(mapHash);
}

function createRewards() {
}

function createEntity() {
    for (var i = 0; i < monsters.length; i++) {
        entityHash.push(monsters[i]);
        entityHash[i].id = i + 1;
        entityHash[i].class = "monster";
    }
    for (var i = 0; i < mapHash.length; i++) {
        var imgName = mapHash[i].name;
        entityHash.push(
            {
                id: entityHash.length + 1,
                portal: imgName,
                portalImage: "assets/img/portals/" + imgName + ".png",
                class: "portal"
            }
        );
    }
}

function addEntities() {
    var x = 0;
    var y = 0;
    var dungeonSelect;
    var monsterSelect;
    var defGrep;
    for (var i = 0; i < mapHash.length - 1; i++) {
        dungeonSelect = getDungeon(i + 1);
        for (var j = 0; j < dungeonSelect.definition.length; j++) {
            for (var a = 1; a <= 3; a++) {
                for (var b = 1; b <= 3; b++) {
                    var getDef = getDefinition(dungeonSelect, a, b);
                    {
                        var m = Math.floor(Math.random() * getDef.choiceSet.length);
                        var type = getDef.choiceSet[m];
                        if (type == "monster") {
                            for (var n = 0; n < 9; n++) {
                                if (mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                                    mapHash[i].definition[n].content = "Monster";
                                    mapHash[i].definition[n].entity = 1;
                                }
                            }
                        }
                        else if (type == "portal") {
                            for (var n = 0; n < 9; n++) {
                                if (mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                                    mapHash[i].definition[n].content = "Portal";
                                    mapHash[i].definition[n].entity = 1;
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(dungeonSelect);
    }
    console.log(mapHash);

}

function getDefinition(dungeon, lx, ly) {
    var definition = dungeon.definition;
    for (var i = 0; i < definition.length; i++) {
        if (definition[i].lx == lx && definition[i].ly == ly)
            return definition[i];
    }
}

function getRandom(min, max) {
// var m = Math.floor(Math.random() *3 + 1);
    var n = Math.floor(Math.random() * (max - min) + min);
//
// while(m==2 && n==2)
// var temp = getRandom();
    return n;
}

function getDungeon(dungeonID) {
    var dungeonSelect;
    dungeonSelect = $.grep(mapHash, function (element) {
        return element.id == dungeonID;
    });
    return dungeonSelect[0];
//console.log(dungeonSelect);
}


function drawDungeon(dungeonId) {
    console.log("start drawDungeon");
    var dungeon = getDungeon(dungeonId);
//    document.getElementById("dungeonBackground").src = dungeon.backgroundImage;

    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= 3; j++) {
            var content = getContent(dungeonId, i, j);
            if (content.choiceSet.length != 0) {
                drawEntity(content.lx, content.ly, content.content);
                document.getElementById("22").innerHTML = "<img src='assets/img/player.png' />";
            }
        }
    }
    console.log("end drawDungeon");
}

function getDungeonId(dungeonName) {
    var dungeon = $.grep(mapHash, function (mapHash) {
        return mapHash.name == dungeonName;
    });
    console.log(dungeon);
    return dungeon[0].id;
}

function getDefinition(dungeon, lx, ly) {
    var definition = dungeon.definition;
    for (var i = 0; i < definition.length; i++) {
        if (definition[i].lx == lx && definition[i].ly == ly) {
            return definition[i];
        }
    }
}

function getContent(dungeonId, lx, ly) {
    console.log("start getContent");
    var dungeon = getDungeon(dungeonId);

    console.log(dungeon.definition);

    var content = getDefinition(dungeon, lx, ly);
    console.log("end getContent");

    return content;
}

function drawEntity(lx, ly, content) {
    console.log("start drawEntity");
    var pos = lx + "" + ly;
    document.getElementById(pos).innerHTML = content;
    console.log("end drawEntity");
}

function getEntity(entityId) {
    var entity = $.grep(entityHash, function (entityHash) {
        return entityHash.id == entityId;
    });

    return entity[0];
}

function movePlayer(lx, ly, entityId, callback) {
    console.log("in movePlayer");
    callback(entityId);
}


function checkReaction(entityId) {
    console.log("in checkReaction");
    var entity = getEntity(entityId);
    console.log(entity.class);
    switch (entity.class) {
        case "monster":
            console.log("its monster");
            initBattleWindow(entityId);
            break;

        case "portal":
            teleport(entityId);
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
    $("#monster-name").text(entity.name);
    $("#monster").html(entity.image);
    $("#monster-lvl").text("Lvl" + " " + entity.level);


    playerTurn(entityId);
}

function hideAngle(diceNum) {
    for (var i = 1; i <= diceNum; i++) {
        $("#die" + i).removeClass('shown' + i);
    }
}
function hideFace(diceNum, diceVal) {
    for (var i = 1; i <= diceNum; i++) {
        $("#die" + i + " #face" + diceVal[i] + "").hide();
    }
}
function showAngle(diceNum) {
    for (var i = 0; i <= diceNum; i++) {
        $("#die" + (i)).addClass('shown' + (i));
    }
}
function setFaces(diceNum, diceVal) {
    for (var i = 0; i <= diceNum; i++) {
        $("#die" + (i + 1) + " #face" + diceVal[i] + "").show();
    }
}
function finalRoll(diceNum, diceVal) {
    // diceVal = [];
    var healthReduce = 0;
    for (var i = 0; i < diceNum; i++) {
        diceVal.push(Math.floor((Math.random() * 6) + 1));
        healthReduce += diceVal[i];
    }
    setFaces(diceNum, diceVal);
    return healthReduce;
}
function rollDice(diceNum, callback, callback1, callback2) {
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
    setFaces(diceNum, diceVal);
    hideFace(diceNum, diceVal);
    showAngle(diceNum);
    setTimeout(function () {
        hideAngle(diceNum);
    }, 750);
    setTimeout(function () {
        var healthReduce = finalRoll(diceNum, diceVal);


        // return healthReduce;
        // doDamage(team,healthReduce);
        console.log(healthReduce);
        // Make sure the callback is a function​
        if (typeof callback === "function") {
            console.log("checked whether callback is a function");
            // Call it, since we have confirmed it is callable​
            //this way we can pass local variables in callback function
            callback(healthReduce, callback1, callback2);
        }
    }, 751)
}
//------------------------------------------------------------dice roll end-------------------------------------
function playerTurn() {
    setTimeout(function () {
        console.log("Player:");

        $(".btn").unbind('click').click(function () {
            if (player) {
                player = false;
                btnId = $(this).attr("id");
                switch (btnId) {
                    case "btnAttack":
                        console.log("attack selected");
                        //simply passing the function name in string format and then the variables are passed in callbacks as and what needed
                        rollDice(diceNum, checkDefendPowers, doDamage, checkIfDead);

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
    setTimeout(function () {
        console.log("in ai");
        if (player == false) {
            rollDice(3, checkAttackPowers, doDamage, checkSurvival);
            // function(){
            //          updateResources("player",function(){
            //                  emptyDiceDiv();
            //                  switchTurn("monster")
            //          });
            //      });
        }
    }, 3000);
}
function switchTurn(from) {
    console.log("switching turn from " + from);
    console.log("checking player: " + player);
    setTimeout(function () {
        if (from == "player") {
            player = false;
            monster();
        }
        else {
            player = true;
            playerTurn();
        }

    }, 1000);
}

function emptyDiceDiv() {
    // diceVal = [];
    $("#die1").empty();
    $("#die2").empty();
    $("#die3").empty();
    $("#die4").empty();
    $("#die5").empty();
}
function doDamage(team, damage, callback) {
    console.log("doDamage " + team);
    console.log("doDamage " + damage);

    playerHealthDiv = document.getElementById("player-Health");
    monsterHealthDiv = document.getElementById("monster-Health");
    var monsterHealth = $("#monster-hp").text();

    if (team == "monster") {
        playerHealth -= damage;
        console.log("player health left" + playerHealth);
        playerHealthDiv.style.width = playerHealth + "%";
    }
    else {
        monsterHealth = monsterHealth - damage;
        console.log("monster health left" + monsterHealth);
        $("#monster-hp").text(monsterHealth);
        monsterHealthDiv.style.width = monsterHealth + "%";
        // checkDefendPowers();
    }
    setTimeout(function () {
        if (typeof callback === "function") {
            callback(monsterHealth);
        }
    }, 2000);
}
function checkDefendPowers(damage, callback, callback1) {
    console.log("in checkDefendPowers");
    if (typeof callback === "function") {
        callback("player", damage, callback1);
    }
}
function checkIfDead(health) {
    console.log("in checkIfDead function " + health)
    if (health <= 0) {
        victory();
    }
    else {
        checkRecoveryPowers("monster", switchTurn);
    }
}
function checkRecoveryPowers(team, callback) {
    console.log("in recovery function");
    if (team == "player") {
        if (typeof callback === "function") {
            callback("monster");
        }
    }
    else {
        if (typeof callback === "function") {
            callback("player");
        }
    }
}
function checkAttackPowers(damage, callback, callback1) {
    console.log("in checkAttackPowers");
    if (typeof callback === "function") {
        callback("monster", damage, callback1);
    }

}

// function checkDefendPowers(entityId, damage){
// 	console.log("in checkDefendPowers");
// if (typeof callback === "function")
//        {
//          	callback("player",damage,callback1);
//        }

// }
function checkSurvival() {
    console.log("in checkSurvival");
    if (playerHealth <= 0) {
        defeat();
    }
    else {
        checkRecoveryPowers("player", switchTurn);
    }
}
function defeat(){
    console.log("in defeat");
    $("#fightArena").fadeOut();
    $('#gameAttack_wrapper').fadeOut();
    $('.How').fadeOut();
    $(".defeat").fadeIn();
    blinkit = setInterval(blinker, 2000);
    $('#startAgainClicker').on('click', function () {
        $(".defeat").fadeIn();
       clearInterval(blinkit);
        $(".gameTitle").fadeIn();
        background();
    });


}


