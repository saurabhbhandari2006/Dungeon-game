
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

function startGame(dungeonId) {
    console.log("start startGame");
    selected == false;
    $(".matrix").unbind('click').click(function() {
        if(selected == false) {
            selected = true;
            var p = $(this).attr("id");

            var lx = parseInt(p.charAt(0));
            var ly = parseInt(p.charAt(1));

            if(lx==2 && ly==2){
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


function createEntity() {
    for(var i=0; i < monsters.length; i++)
    {
        entityHash.push(monsters[i]);
        entityHash[i].id = i+1;
        entityHash[i].class = "monster";
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
                    var getDef = getDefinition(dungeonSelect, a, b);
                    {
                        var m = Math.floor(Math.random() * getDef.choiceSet.length);
                        var type = getDef.choiceSet[m];
                        if(type=="monster")
                        {
                            for(var n = 0; n < 9; n++) {
                                if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                                    mapHash[i].definition[n].content = "Monster";
                                    mapHash[i].definition[n].entity = 1;
                                }
                            }
                        }
                        else if(type=="portal")
                        {
                            for(var n = 0; n < 9; n++) {
                                if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
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
    for(var i=0; i<definition.length; i++) {
        if(definition[i].lx == lx && definition[i].ly == ly)
            return definition[i];
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









function drawDungeon(dungeonId) {
    console.log("start drawDungeon");
    var dungeon = getDungeon(dungeonId);
//    document.getElementById("dungeonBackground").src = dungeon.backgroundImage;

    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= 3; j++) {
            var content = getContent(dungeonId, i, j);
            if(content.choiceSet.length != 0) {
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

function drawEntity(lx, ly, content) {
    console.log("start drawEntity");
    var pos = lx+""+ly;
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
    switch(entity.class) {
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
    },2000);
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
    var reward = rewards[random];
    switch (reward.type){
        case "health":
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
}
function victory(){
    console.log("'In Victory function");
    getRewards();
}


















































//**********************************************************************************************************************
//var selPort = [];       //Selected Portals
//var selMons = [];       //Selected Monsters
//var flag = 0;           //Flag value
//var portalPos = [];     //Positions of portals
//var bossPos;    //Positions of monsters
//var posArr = [];        //Array of filled positions
//var bossMap = 0;          //map ID
//var mapColor;       //map color
//var mapId = 0;
//var c = 0;
//
///* Function: initEverything
// Description:
// Main initialization function, which is called first in the program flow.
// Status:
// COMPLETED
// */
//function initEverything()
//{
//    setBoss();
//    enterDungeon();
//    //   setMonsters();
////     SetSeer();
//}
//
//function setBoss() {
//    bossPos = getRandom();
//    var random = Math.floor(Math.random() * 5) + 1;
//    bossMap = portals[random].backgroundColor;
//}
//
//function getPosition(flag) {
//    var pos;
//    posArr = [];
//    console.log("flag: " + flag);
//    console.log("bossMap: "+bossMap);
//    console.log("bossPos: "+bossPos);
//
//    while (posArr.length <= flag) {
//        pos = getRandom();
//        console.log("posArr")
//        console.log(posArr);
//        console.log("pos: "+pos);
//        console.log("mapColor: " + mapColor);
//
//        if(validatePos(pos)) {
//            posArr.push(pos);
//            c++;
//        }
//    }
//}
//
//function getRandom() {
//    var mL = 0;
//    var mR = 0;
//    mL = Math.floor(Math.random() * (4-1) + 1);
//    mR = Math.floor(Math.random() * (4-1) + 1);
//    while(mL == 2 && mR == 2)
//    {
//        mL = Math.floor(Math.random() * (4-1) + 1);
//        mR = Math.floor(Math.random() * (4-1) + 1);
//    }
//    var pos = mL.toString() + mR.toString();
//    return pos;
//}
//
//function validatePos(pos) {
//    var can = true;
//    console.log("posArr.length: "+posArr.length);
//    for (var i = 0; i < posArr.length; i++) {
//        if (pos == posArr[i])
//            can = false;
//
//        if((mapColor == bossMap) && (pos == bossPos))
//            can = false;
//    }
//    return can;
//}
//
//
//
//
//function enterDungeon()
//{
//    mapId++;
//    selPort = shuffle(portals);
//    selMons = shuffle(monsters);
//    if(mapId == 1)
//    {
//        document.getElementById("mainmatrix").style.backgroundColor = selPort[0].backgroundColor;
//        mapId=selPort[0].backgroundColor;
//        setPortal();
//    }
//    else
//    {
//        mapId=portals[x].colorID;
//        setPortal();
//    }
//    setMonsters();
//    setPlayer();
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
//
//function setPortal()
//{
//    var pos;
//    flag = Math.floor(Math.random() * 3 + 1);
//    getPosition(flag);
//    for(var i=0; i<flag; i++)
//    {
//        var targetDiv = document.getElementById(posArr[i]);
//        if(selPort[i].colorID != mapColor)
//        {
//            targetDiv.style.backgroundColor = selPort[i].backgroundColor;
//        }
//        else
//        {
//            targetDiv.style.backgroundColor = selPort[i+3].backgroundColor;
//        }
//        portalPos.push({mapID:mapID, colID:selPort[i].colorID, getPos:pos});
//    }
//}
//
//function setMonsters()
//{
//    flag = Math.floor(Math.random() * 3 +1);
//    console.log(flag);
//    getPosition(flag);
//    for(var i = 0; i<flag; i++)
//    {
//        var targetDiv = document.getElementById(posArr[i]);
//        targetDiv.innerHTML = selMons[i].image;
//        console.log(targetDiv);
////monsterPos.push()
//    }
//    console.log(posArr);
//}
//
//function drawMonsters()
//{
//
//}
//
//
//function SetSeer()
//{
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
//
//    for(var i=0; i<=positions.length; i++)
//    {
//        console.log(i);
//        if (portalPos[i].ps == pos)
//        {
//            mL = Math.floor(Math.random() * (4 - 1) + 1);
//            mR = Math.floor(Math.random() * (4 - 1) + 1);
//
//            while (mL == 2 && mR == 2)
//            {
//                mL = Math.floor(Math.random() * (4 - 1) + 1);
//                mR = Math.floor(Math.random() * (4 - 1) + 1);
//            }
//        }
//    }
//
//    pos = mL.toString() + mR.toString();
//
//    var targetDiv = document.getElementById(pos.toString());
//    console.log(targetDiv);
//
//    targetDiv.innerHTML = "<span style='color:#fff;'>SEER!</span>";
//    positions.push({ps:pos, posFlags:1});
//}