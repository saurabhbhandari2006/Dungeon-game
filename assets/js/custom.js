
var diceNum;
var playerHealth;
var gridSelected = false;

var mapHash;
var entityHash = [];
var rewardsHash;


$(function () {
    initGame();
})

function initializeTheme() {

    for(var i=0; i<mapHash.length; i++) {

        mapHash[i].backgroundImage = "assets/img/backgrounds/" + mapHash[i].name + ".png";
    }
}


function initGame() {
    diceNum = initDice;
    playerHealth = initHealth;
    $("#dungeons").fadeIn();
    createMap();
    createEntity();
    addEntities();
    createRewards();
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
    rewardsHash = rewards;
    for(var i=0; i<rewardsHash.length; i++)
    {
        rewardsHash[i].id = i+1;
    }
    console.log("rewards");
    console.log(rewardsHash);
}

function createEntity() {
    console.log(entityHash);
    var i;
    for(i = 0; i < monsters.length; i++)
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
                portal:imgName,
                image:"<img src='assets/img/portals/" + imgName + ".png' />",
                class: "Portal"
            }
        );
    }

    console.log("entityhash:");
    console.log(entityHash);
}

function addEntities() {
    console.log("in addEntities");
    var dungeonSelect;
    var entities;
    for(var i=0; i<mapHash.length - 1; i++)
    {
        dungeonSelect = getDungeon(i+1);
        for(var j=0; j<dungeonSelect.definition.length; j++) {
            for(var a=1; a<=3; a++) {
                for(var b=1; b<=3; b++) {
                    var getDef = getDefinition(dungeonSelect, a, b);

                    var m = Math.floor(Math.random() * getDef.choiceSet.length);
                    var type = getDef.choiceSet[m];
                    entities = getEntityByClass(type);
                    if(type=="Monster") {
                        for(var n = 0; n < 9; n++) {
                            if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                                var random = getRandom(0,entities.length-1);
                                var entity = entities[random];
                                mapHash[i].definition[n].entity = entity.id;
                                mapHash[i].definition[n].content = entity.image;
                            }
                        }
                    } else if(type=="Portal") {
                        for(var n = 0; n < 9; n++) {
                            if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                                var random = getRandom(0,entities.length-1);
                                var entity = entities[random];
                                mapHash[i].definition[n].entity = entity.id;
                                mapHash[i].definition[n].content = entity.image;
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
    console.log(dungeon);
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
    console.log("start getContent");
    var dungeon = getDungeon(dungeonId);

    console.log(dungeon.definition);

    var content = getDefinition(dungeon, lx, ly);
    console.log("end getContent");

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
    console.log("start startGame");
    gridSelected == false;
    $(".matrix").unbind('click').click(function() {
        if(gridSelected == false) {
            gridSelected = true;
            var p = $(this).attr("id");

            var lx = parseInt(p.charAt(0));
            var ly = parseInt(p.charAt(1));
            console.log(lx + " " + ly);

            if(lx==2 && ly==2){
                gridSelected = false;
                startGame(dungeonId);
            } else {
                var content = getContent(dungeonId, lx, ly);
                console.log(content);
                var entityId = content.entity;
                console.log(entityId);
                movePlayer(lx, ly, entityId, checkReaction);
            }
        }
    });
}


function drawDungeon(dungeonId) {
    console.log("start drawDungeon");
    var dungeon = getDungeon(dungeonId);
//    document.getElementById("dungeonBackground").src = dungeon.backgroundImage;

    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= 3; j++) {
            var content = getContent(dungeonId, i, j);
            console.log(content);
            if(content.choiceSet.length != 0) {
                drawEntity(content.lx, content.ly, content.content);
                document.getElementById("22").innerHTML = "<img src='assets/img/player.png' />";
            }
        }
    }
    console.log("end drawDungeon");
}

function drawEntity(lx, ly, content) {
    console.log("start drawEntity");
    var pos = lx+""+ly;
    document.getElementById(pos).innerHTML = content;
    console.log("end drawEntity");
}

function movePlayer(lx, ly, entityId, callback) {
    console.log("in movePlayer");
    callback(entityId);
}



function checkReaction(entityId) {
    console.log("in checkReaction");
    var entity = getEntity(entityId);
    console.log(entity);
    console.log(entity.class);
    switch(entity.class) {
        case "Monster":
            console.log("its monster");
            initBattleWindow(entityId);
            break;

        case "Portal":
            console.log("its portal");
            teleport(entityId);
            break;

        case "Seer":
            console.log("its Seer");
            seer();
            break;
    }
}

function teleport(entityId) {
    var entity = getEntity(entityId);
    console.log(entity);
    var dungeonId = getDungeonId(entity.portal);
    console.log(dungeonId);
    playerHealth -= teleportCost;
    gridSelected = false;
    drawDungeon(dungeonId);
    startGame(dungeonId);
}


function initBattleWindow(entityId) {
    $("#dungeons").fadeOut();
    $("#fightArena").fadeIn();

    playerHealthDiv = document.getElementById("player-Health");
    monsterHealthDiv = document.getElementById("monster-Health");

    player = true;
    playerHealthDiv.style.width = playerHealth + "%";
    $("#player-hp").text(playerHealth);
    $("#player-health-val").text("Health Left: "+playerHealth+"%");

    var entity = getEntity(entityId);
    monsterHealthDiv.style.width = 100 + "%";
    $("#monster-hp").text(entity.health);
    $("#monster-max-hp").text(entity.health);
    $("#monster-health-val").text("Health Left: 100%");
    $("#monster-name").text(entity.name);
    $("#monster").html(entity.image);
    $("#monster-lvl").text("Lvl" + " " + entity.level);
    $("#monster-dice-num").text(entity.dice);
    var dice = $("#monster-dice-num").text();
    showDice(dice,diceNum);

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
        console.log(healthReduce);
        // Make sure the callback is a function​
        if (typeof callback === "function")
        {
            console.log("checked whether callback is a function");
            // Call it, since we have confirmed it is callable​
            //this way we can pass local variables in callback function
            callback(healthReduce,callback1,callback2);
        }
    }, 751)
}
function showDice(dice1,dice2){
    for(var i=1;i<=dice1;i++){
        $("#monster-dice-img").append("<img src='assets/img/dice/face1.png' style='height: 100%'/>");
    }
    for(var i=1;i<=dice2;i++){
        $("#player-dice-img").append("<img src='assets/img/dice/face1.png' style='height: 100%'/>");
    }
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
                        rollDice(diceNum,checkDefendPowers,doDamage,checkIfDead);
                        break;
                    case "btnRetreat":
                        closeBattle();
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
            var dice = $("#monster-dice-num").text();
            rollDice(dice,checkAttackPowers,doDamage,checkSurvival);
        }
    },1000);
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

    }, 2000);
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
        if(playerHealth < 0)
            playerHealth = 0;
        $("#player-health-val").text("Health Left: "+playerHealth+"%");
        $("#player-hp").text(playerHealth);
        playerHealthDiv.style.width = playerHealth + "%";
    }
    else
    {
        monsterHealth = monsterHealth - damage;
        if(monsterHealth < 0)
            monsterHealth = 0;
        $("#monster-hp").text(monsterHealth);
        var max = $("#monster-max-hp").text();
        var hp = Math.floor((monsterHealth*100)/max);
        $("#monster-health-val").text("Health Left: "+hp+"%");
        monsterHealthDiv.style.width = hp + "%";
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

function seer(){
    $("#dungeons").fadeOut();
    $("#qcard").fadeIn();
    getQuestion();

}

function getQuestion() {
    var list = quiz.questions[Math.floor(Math.random() * 3)];
    var elemlength = list.length;
    var randomnum = Math.floor(Math.random() * elemlength);
    var data = list[randomnum];
    setTimeout(function () {
        $("#quiz-content").show();
        $('#qquestion').fadeIn();
        $('#qprompt').fadeIn();
        $('#answerBlock').fadeIn();
        $('#qcard').fadeIn();
        $('#qquestion').html(data.name);
        $('#qid').html(data.id);
        $('#optax').html('<div class="answer-bullet" id="bulletA">A</div>' + data.opta);
        $('#optbx').html('<div class="answer-bullet" id="bulletB">B</div>' + data.optb);
        $('#optcx').html('<div class="answer-bullet" id="bulletC">C</div>' + data.optc);
        $('#optdx').html('<div class="answer-bullet" id="bulletD">D</div>' + data.optd);
        bindAnswers();
    }, 250);
}

function bindAnswers() {
    $('.answer').unbind('click').on('click', function () {
        processAnswers($(this).attr("id").split("x")[0]);
    });
}

function processAnswers(answer) {
    data = getAnswer($('#qid').html(), answer);
    var resultMsg = data.split('||')[1];
    var correctAnswer = data.split('||')[2];
    var answerPayoff = 0;
    if(data.split('||')[0] != 0)
        answerPayoff = 1;

    $('#answerBlock').hide();
    $('#answerMsg').html("<div class='scribble'> <h4 style='color: whitesmoke;'>" + resultMsg + "!! The correct answer is: </h4> <h3 style='color:#3399FF;margin:0;padding:3px;'>" + correctAnswer + "</h3></div> ").fadeIn();

    setTimeout(function () {
        $("#quiz-content").hide();
        $('#qquestion').fadeOut();
        $('#qprompt').fadeOut();
        $('#answerMsg').fadeOut();
    }, 1500);
    setTimeout(function(){
        console.log(answerPayoff);
        if (answerPayoff > 0) {
            getRewards();
        } else {
            console.log("wrong ans");
        }
        gridSelected = false;
        $("#qcard").fadeOut();
        $("#dungeons").fadeIn();
    }, 2000);

}

function getRewards(){
    console.log("In getRewards")
    var random = getRandom(1,12);
    var reward = rewardsHash[random];
    console.log(reward);
    switch (reward.type){
        case "Health":
            if(playerHealth<100)
                var maxHealthGain;
            maxHealthGain = 100 - playerHealth;
            if(reward.value<maxHealthGain){
                playerHealth += reward.value;
                console.log("health gained normally");
            }
            else
            {
                playerHealth += maxHealthGain;
            }
            break;
        case "Dice":
            if(diceNum<5)
            {
                diceNum += reward.value;
                console.log("dice gained");
            }
            else
            {
                console.log("dice limit reached");
            }
            break;

    }

    closeBattle();


}

function closeBattle(){
    gridSelected = false;
    $("#fightArena").fadeOut();
    $("#dungeons").fadeIn();
    console.log("close battle");
    $("#player-dice-img").empty();
    $("#monster-dice-img").empty();
}

function victory(){
    console.log("'In Victory function");
    getRewards();
}

function defeat(){
    console.log("in defeat");
    $("#fightArena").fadeOut();
    $(".defeat").fadeIn();
    var blinkit = setInterval(blinker, 2000);
    $('#startAgainClicker').on('click', function () {
        clearInterval(blinkit);
        $(".defeat").fadeOut();
        $(".defeat").fadeOut();
        initGame();
    });

}
function blinker() {
    $('#startAgainClicker').fadeOut(500, function () {
        $('#startAgainClicker').fadeIn(500);
    });
}
