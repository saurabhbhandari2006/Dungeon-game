var diceNum;
var playerHealth;
var gridSelected = false;
var mapHash;
var entityHash = [];
var rewardsHash;

function background() {
    $('body').css('background-image', "url(" + theme.background + ")");
    $('#gameAttack_wrapper').fadeOut();
    $('.How').fadeOut();
    blinkit = setInterval(blinker, 2000);
    $('#startClicker').on('click', function () {
        $('.gameTitle').fadeOut();
        $('.How').fadeIn();
        clearInterval(blinkit);
        howTo();
//        initGame();
    });
};

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
        initGame();
    });
}

function initGame() {
    diceNum = initDice;
    playerHealth = initHealth;
//    $("#gameAttack_wrapper").fadeIn();
    $("#fightArena").fadeOut();
    $("#qcard").fadeOut();
    $("#dungeons").fadeIn();
    playerHealthHud();
    playerDiceHud(diceNum);
    createMap();
    createEntity();
    addEntities();
    createRewards();
    console.log(mapHash);
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
            image: "<div id='player-div' style='padding-left: 6%; margin-top: -7%; position: absolute'> <img src='assets/img/player.png' /> </div>"
        }
    );
}

function addEntities() {
    console.log("in addEntities");
    var x = 0;
    var y = 0;
    var dungeonSelect;
    var getDef;
    for(var i=0; i<mapHash.length; i++) {
        dungeonSelect = getDungeon(i+1);
        var selMonsters;
        var selPortals;
        var selSeer;
        var selPlayer;
        var selBoss;
        var portal = [" "];
        for(var a=1; a<=3; a++) {
            for(var b=1; b<=3; b++) {
                getDef = getDefinition(dungeonSelect, a, b);
                var m = Math.floor(Math.random() * getDef.choiceSet.length);
                var type = getDef.choiceSet[m];
                if(getDef.choiceSet.length != 0) {
                    if(type.indexOf(' ') > 0)
                        portal = type.split(' ');
                }
                if(getDef.choiceSet.length == 0){
                    console.log(dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type);
                } else if(type=="Monster") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            if(dungeonSelect.id == 1){
                                selMonsters = $.grep(entityHash, function(element) {
                                    return element.level == 1;
                                });
                            } else if(dungeonSelect.id == 6) {
                                selMonsters = $.grep(entityHash, function(element) {
                                    return element.level == 5;
                                });
                            } else {
                                var temp = $.grep(entityHash, function(element) {
                                    return (element.level >= dungeonSelect.id-1);
                                });
                                selMonsters = $.grep(temp, function(element) {
                                    return (element.level <= dungeonSelect.id);
                                });
                            }
                            var random = getRandom(0,selMonsters.length);
                            var entity = selMonsters[random];
                            mapHash[i].definition[n].content = entity.image;
                            mapHash[i].definition[n].entity = entity.id;
                        }
                    }
                } else if(type=="Seer") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            var probability = Math.random();
                            if(probability>0.9) {
                                selSeer = getEntityByClass(type);
                                mapHash[i].definition[n].content = selSeer[0].image;
                                mapHash[i].definition[n].entity = selSeer[0].id;
                            } else {
                                mapHash[i].definition[n].choiceSet = [];
                            }
                            console.log(dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                        }
                    }
                } else if(type=="Player") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            selPlayer = getEntityByClass(type);
                            mapHash[i].definition[n].content = selPlayer[0].image;
                            mapHash[i].definition[n].entity = selPlayer[0].id;
                            console.log(dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                        }
                    }
                } else if(type == "Boss") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            selBoss = getEntityByClass(type);
                            mapHash[i].definition[n].content = selBoss[0].image;
                            mapHash[i].definition[n].entity = selBoss[0].id;
                            console.log(dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                        }
                    }
                } else if(portal[0]=="Portal") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            var name = portal[1];
                            var id=0;
                            if(portal[1] == "Any") {
                                selPortals = getEntityByClass(portal[0]);
                                var random = getRandom(0,selPortals.length);
                                while(selPortals[random].name == dungeonSelect.name)
                                    random = getRandom(0, selPortals.length);
                                var entity = selPortals[random];
                                name = entity.image;
                                id = entity.id;
                            } else {
                                selPortals = getEntityByClass(portal[0]);
                                var port = $.grep(selPortals, function(element){
                                    return element.name == portal[1];
                                });
                                name = port[0].image;
                                id = port[0].id;
                            }
                            mapHash[i].definition[n].content = name;
                            mapHash[i].definition[n].entity = id;
                            console.log(dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                        }
                    }
                    portal = [];
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
    var setMatrixColor = document.getElementById("mainmatrix");
    setMatrixColor.style.backgroundColor = dungeon.name;
    console.log(dungeon);

    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= 3; j++) {
            var content = getContent(dungeonId, i, j);
            if(content.choiceSet.length != 0) {
                drawEntity(content.lx, content.ly, content.content);
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
    var pos = lx+""+ly;
    var case1 = $("#player-div").clone();
    $("#22").append(case1);
    $("#player-div").css({opacity:0});
    console.log(pos);
    switch(pos){
        case "11":
//            console.log("in case");
            case1.animate({left:"-=33%",top:"-=34%"},1000);
//            $("#player-div").animate({left:"+=10.47%",top:"-=51.2%"},0);
            break;
        case "12":
            case1.animate({top:"-=34%"},1000);
            break;
        case "13":
            case1.animate({left:"+=33%",top:"-=34%"},1000);
            break;
        case "21":
            case1.animate({left:"-=33%"},1000);
            break;
        case "22":
//            case1.animate({left:"+=33%",top:"-=34%"},1000);
            break;
        case "23":
            case1.animate({left:"+=33%"},1000);
            break;
        case "31":
            case1.animate({left:"-=33%",top:"+=34%"},1000);
            break;
        case "32":
            case1.animate({top:"+=34%"},1000);
            break;
        case "33":
            case1.animate({left:"+=33%",top:"+=34%"},1000);
            break;


    }
    case1.fadeOut(2000);
    setTimeout(function(){case1.remove();},2500);
    setTimeout(function(){callback(entityId);},1200);
}

function checkReaction(entityId) {
    console.log("in checkReaction");
    var entity = getEntity(entityId);
    console.log(entity);
    console.log(entity.class);
    switch(entity.class) {
        case "Monster":
            console.log("its monster");
//            initBattleWindow(entityId);
            monsterCard(entityId);
            break;

        case "Boss":
            console.log("its Boss");
//            initBattleWindow(entityId);
            monsterCard(entityId);
            break;

        case "Portal":
            console.log("its portal");
            console.log(mapHash);
            teleport(entityId);
            break;

        case "Seer":
            console.log("its Seer");
            seer();
            break;
    }
}

function teleport(entityId) {
    console.log(entityId);
    var entity = getEntity(entityId);
    console.log(entity);
    var dungeonId = getDungeonId(entity.name);
    console.log(dungeonId);
    playerHealth -= teleportCost;
    gridSelected = false;

    playerHealthHud();

    checkSurvival(function() {
        $(".matrix").empty();
        drawDungeon(dungeonId);
        startGame(dungeonId);
    });
}

function monsterCard(entityId){
    var entity = getEntity(entityId);
    var hp= entity.health;
    $("#monster-card-hp").text(hp);
//    monsterHealthDiv = document.getElementById("monster-card-Health");
//    monsterHealthDiv.style.width = hp + "%";
    $("#monster-card-img").html(entity.image);

    $("#monster-card-name").text(entity.name);
    $("#monster-card-type").text(entity.type);
    $("#monster-card-level").text(entity.level);
    $("#monster-card-dice-num").text(entity.dice);
    var dice = $("#monster-card-dice-num").text();
    showDice(1,dice,0);

    console.log("Battle Window Getting initialised");
    $("#player-hud").css("opacity", "0.3");
    $("#mainmatrix").css({'opacity':'0.3'});
    $("#monster-card").css({'opacity':'1'});
    $("#monster-card").fadeIn();
    $("#btn-continue").on('click',function(){
        $("#player-hud").css("opacity", "1");
        $("#mainmatrix").css({'opacity':'1'});
        $("#monster-card").css({'opacity':'0'});
        $("#monster-card").fadeOut();
        initBattleWindow(entityId);
    });

    $("#btn-cancel").on('click', function(){
        $("#player-hud").css("opacity", "1");
        $("#mainmatrix").css({'opacity':'1'});
        $("#monster-card").css({'opacity':'0'});
        $("#monster-card").fadeOut();
        $("#player-div").css({opacity:1});
        gridSelected = false;

    });
}

function initBattleWindow(entityId) {
        $("#splasher").empty();
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
        showDice(2,dice,diceNum);

        $("#monster").css({'opacity': '0.5'});
        $("#monster-dice").css({'opacity': '0.5'});
        $("#monster").removeClass("scaling");

        console.log("Battle window init done....starting battle by player Turn");
        playerTurn(entityId);



}
//--------------------------------------------------------dice functions start-----------------------------------------------
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
    console.log("In final roll:returns the value fo dice to Dodamage function");
    var healthReduce =0;
    for (var i = 0; i < diceNum; i++) {
        diceVal.push(Math.floor((Math.random() * 6) + 1));
        healthReduce += diceVal[i];
    }
    setFaces(diceNum,diceVal);
    console.log("Dice value: "+healthReduce);
    return healthReduce;
}

function rollDice(diceNum,callback,callback1,callback2) {
    console.log("In roll Dice");
    emptyDiceDiv();
    var diceVal = [];
    $("#diceBox").fadeIn();
    console.log("Animation Of Dice Roll");
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
            console.log("checked whether callback is a function");
            // Call it, since we have confirmed it is callable​
            //this way we can pass local variables in callback function
            console.log("roll dice animation ends");
            callback(healthReduce,callback1,callback2);
        }
    }, 751)
}

function showDice(tp,dice1,dice2){
    console.log("******************************************************------------------------------------showdice");
    if(tp==1)
    {
        var j=36;
        $("#monster-card-dice-img").empty();
        for(var i=1;i<=dice1;i++){
            $("#monster-card-dice-img").append("<img src='assets/img/dice/face1.png' style=' bottom: 4%;height: 15%;position: absolute;left: "+j+"%'/>");
            j +=8;
        }
    }else if(tp==2)
    {
        $("#player-dice-img").empty();
        $("#monster-dice-img").empty();
        for(var i=1;i<=dice1;i++){
            $("#monster-dice-img").append("<img src='assets/img/dice/face1.png' style='height: 80%'/>");
        }
        for(var i=1;i<=dice2;i++){
            $("#player-dice-img").append("<img src='assets/img/dice/face1.png' style='height: 80%'/>");
        }
    }else if(tp==3){
        console.log("*****************************************-----------------------------------in append");
        for(var i=1;i<=5;i++){
            $("#die"+i).empty();
        }
            for(var i=1;i<=dice2;i++){
                $("#die"+i).append("<img src='assets/img/dice/face1.png' style='height: 100%'/>");
            }
    }else if (tp==4){
        for(var i=1;i<=5;i++){
            $("#die"+i).empty();
        }
            for(var i=1;i<=dice1;i++){
                $("#die"+i).append("<img src='assets/img/dice/face1.png' style='height: 100%'/>");
            }
    }




}
//------------------------------------------------------------dice roll end-------------------------------------
function playerTurn() {
    console.log("In Player Turn");
    setTimeout(function(){
        showSplash("Player Turn",2000);
    },400);
    setTimeout(function () {
        console.log("Player: Click to Roll The Dice OR Retreat");
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
                        console.log("Retreat selected");
                        closeBattle();
                        break;
                }
            }
        })
    }, 500);
}

function monster() {
    console.log("In Monster Turn");
    showSplash("Monster Turn",2000);
    setTimeout(function()
    {
//        console.log("in ai");
        if(player == false)
        {
            var dice = $("#monster-dice-num").text();
            rollDice(dice,checkAttackPowers,doDamage,checkSurvival);
        }
    },1500);
}

function switchTurn(from) {
    console.log("in switch turn");
    console.log("switching turn from "+from);
    console.log("checking player: "+player);
    setTimeout(function() {
        if (from == "player") {
            player = false;
            switchAnim(from, monster);
        } else {
            player = true;
            switchAnim(from, playerTurn);
        }

    }, 2000);
}

function switchAnim(from, callback) {
    if(from == "player") {
        $("#player").css({
            'opacity': '0.5'
//            '-webkit-box-shadow': '0px 0px 0px 0px rgba(0,0,255,1)',
//            '-moz-box-shadow': '0px 0px 0px 0px rgba(0,0,255,1)',
//            'box-shadow': '0px 0px 0px 0x rgba(0,0,255,1)'
        });
        $("#player-dice").css({'opacity': '0.5'});
        $("#player").removeClass("scaling");
        $("#monster").addClass("scaling");

        $("#monster").css({
            'opacity': '1'
//            '-webkit-box-shadow': '0px 0px 20px 5px rgba(255,0,0,1)',
//            '-moz-box-shadow': '0px 0px 20px 5px rgba(255,0,0,1)',
//            'box-shadow': '0px 0px 20px 5px rgba(255,0,0,1)'
        });

        $("#monster-dice").css({'opacity': '1'});
        var dice = $("#monster-dice-num").text();
        showDice(4,dice,0);


    } else {
        $("#player").css({
            'opacity': '1'
//            '-webkit-box-shadow': '0px 0px 20px 5px rgba(0,0,255,1)',
//            '-moz-box-shadow': '0px 0px 20px 5px rgba(0,0,255,1)',
//            'box-shadow': '0px 0px 20px 5px rgba(0,0,255,1)'
        });
        $("#player-dice").css({'opacity': '1'});
        $("#monster").removeClass("scaling");
        $("#player").addClass("scaling");


        $("#monster").css({
            'opacity': '0.5'
//            '-webkit-box-shadow': '0px 0px 0px 0px rgba(255,0,0,1)',
//            '-moz-box-shadow': '0px 0px 0px 0px rgba(255,0,0,1)',
//            'box-shadow': '0px 0px 0px 0x rgba(255,0,0,1)'
        });
        $("#monster-dice").css({'opacity': '0.5'});
        showDice(3,0,diceNum);

    }

    callback();
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
    console.log("In doDamage");
    console.log("Team Making Damage= "+team);
    console.log("Damage Amount "+damage);

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
    console.log("In checkDefendPowers");
    if (typeof callback === "function")
    {
        callback("player",damage,callback1);
    }

}

function checkIfDead(health){
    console.log("in checkIfDead function: monster health = "+health)
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
        callback("monster",damage,callback1);

}

function checkSurvival(callback){
    console.log("in checkSurvival");
//    console.log(callback.toString().length);
    console.log("playerhealth: "+playerHealth);
    if (playerHealth<=0)
        defeat();
    else {
        console.log("in else");
        if (typeof callback === "function")
        {
            if(callback.toString().length > 0){
                callback();
            }

        }

        else
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
        $("#player-div").css({opacity:1});
        $("#qcard").fadeOut();
        $("#dungeons").fadeIn();
    }, 2000);

}

function getRewards(callback) {
    console.log("In getRewards")
    var random = getRandom(1,10);
    var reward = rewardsHash[random];
    console.log("Reward: "+reward.type);
    console.log("checking for limits");
    switch (reward.type) {
        case "Health":
            if (playerHealth < 100)
                var maxHealthGain;
            maxHealthGain = 100 - playerHealth;
            if (reward.value < maxHealthGain) {
                playerHealth += reward.value;
                console.log("health gained: "+reward.value);
                showSplash(reward.value+" Health gain",2000);
            }
            else {
                playerHealth += maxHealthGain;
                console.log("health gained: "+maxHealthGain);
                showSplash(maxHealthGain+" Health gain",2000);
            }
            break;
        case "Dice":
            if (diceNum < 5) {
                diceNum += reward.value;
                console.log("No. of Dice Gained: "+reward.value);
                showSplash(reward.value+" Dice gain",2000);
            }
            else {
                console.log("dice limit reached");

                showSplash("Dice Limit Reached",2000);
            }
            break;

    }

    if (typeof callback === "function")
        callback();

}

function closeBattle(){
    gridSelected = false;
    $("#player-div").css({opacity:1});
    $("#fightArena").fadeOut();
    $("#dungeons").fadeIn();
    console.log("close battle");
    $("#player-dice-img").empty();
    $("#monster-dice-img").empty();
    playerHealthHud();
}

function victory() {
    console.log("'In Victory function");
    showSplash("You Won");
    setTimeout(function(){
        getRewards(function(){
            setTimeout(function(){closeBattle();},4000);
        });
        playerHealthHud();
        playerDiceHud(diceNum);
    },2000);
}

function defeat() {
    showSplash("You are Defeated",5000);
    console.log("in defeat");
    console.log("click play again to start game ")
    setTimeout(function(){
        $('#gameAttack_wrapper').fadeOut();
        $("#fightArena").fadeOut();
        $('.How').fadeOut();
        $(".defeat").fadeIn();
        var blinkit = setInterval(blinker3, 2000);
        $('#startAgainClicker').on('click', function () {
            clearInterval(blinkit);
            $(".defeat").fadeOut();
            $(".gameTitle").fadeIn();
            background();
        });
    },2000);

}

function blinker3() {
    $('#startAgainClicker').fadeOut(500, function () {
        $('#startAgainClicker').fadeIn(500);
    });
}

function playerHealthHud(){
    playerHealthDivHud = document.getElementById("player-Health-hud");
    $("#player-hp-hud").text(playerHealth);
    $("#player-health-val-hud").text("Health Left: " + playerHealth + "%");
    playerHealthDivHud.style.width = playerHealth + "%";
}

function playerDiceHud(dicep){
    $("#player-dice-hud").empty();
    for (var i = 1; i <= dicep; i++) {
        $("#player-dice-hud").append("<img src='assets/img/dice/face1.png' style='height: 100%'/>");
    }
}

function showSplash(msg,delay) {
    console.log("In display messages");
    $('#splasher').html(msg).show().delay(500).fadeIn(1000);
    $('#splasher').hide().fadeOut(delay);
//    $('#splasher').append(msg+"<br/>");
}