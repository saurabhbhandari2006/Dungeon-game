
var diceNum;
var playerHealth;
var gridSelected;

var mapHash;
var entityHash = [];
var rewardsHash;

var bossHp;

$(function(){

    $("#carousel").hide();
    $("#gameAttack_wrapper").hide();
    $("#preload").show();

    var done = $.preload( 'assets/img/player.png',
        'assets/img/seer.png',
        'assets/img/shelf.png',
        'assets/img/hp.png',
        'assets/img/dice.png',
        'assets/img/diceroll.png',
        'assets/img/dicerollrev.png',
        'assets/img/help.png',
        'assets/img/descbg.png',
        'assets/img/namebg.png',
        'assets/img/monsters/m11.png',
        'assets/img/monsters/m12.png',
        'assets/img/monsters/m21.png',
        'assets/img/monsters/m22.png',
        'assets/img/monsters/m31.png',
        'assets/img/monsters/m32.png',
        'assets/img/monsters/m41.png',
        'assets/img/monsters/m42.png',
        'assets/img/monsters/m51.png',
        'assets/img/monsters/m52.png',
        'assets/img/monsters/m101.png',
        'assets/img/backgrounds/Purple.jpg',
        'assets/img/backgrounds/Blue.jpg',
        'assets/img/backgrounds/Green.jpg',
        'assets/img/backgrounds/Yellow.jpg',
        'assets/img/backgrounds/Orange.jpg',
        'assets/img/backgrounds/Red.jpg',
        'assets/img/minimap/purple.png',
        'assets/img/minimap/blue.png',
        'assets/img/minimap/green.png',
        'assets/img/minimap/yellow.png',
        'assets/img/minimap/orange.png',
        'assets/img/minimap/red.png',
        'assets/img/minimap/minimap-icon.png',
        'assets/img/portals/Purple.png',
        'assets/img/portals/Purple_.png',
        'assets/img/portals/Blue.png',
        'assets/img/portals/Blue_.png',
        'assets/img/portals/Green.png',
        'assets/img/portals/Green_.png',
        'assets/img/portals/Yellow.png',
        'assets/img/portals/Yellow_.png',
        'assets/img/portals/Orange.png',
        'assets/img/portals/Orange_.png',
        'assets/img/portals/Red.png',
        'assets/img/portals/Red_.png',
        'assets/img/dice/face1.png',
        'assets/img/dice/face2.png',
        'assets/img/dice/face3.png',
        'assets/img/dice/face4.png',
        'assets/img/dice/face5.png',
        'assets/img/dice/face6.png'
    );


    if(done == "done")
        initTheme();

});

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
         initGame();
    });
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
        initTheme();
    });
}


function initTheme() {
    $("#preload").hide();

//    for(var i=0; i<mapHash.length; i++) {
//
//        mapHash[i].backgroundImage = "assets/img/backgrounds/" + mapHash[i].name + ".png";
//    }

    document.getElementById("Purple").src = "assets/img/minimap/purple.png";
    document.getElementById("Blue").src = "assets/img/minimap/blue.png";
    document.getElementById("Green").src = "assets/img/minimap/green.png";
    document.getElementById("Yellow").src = "assets/img/minimap/yellow.png";
    document.getElementById("Orange").src = "assets/img/minimap/orange.png";
    document.getElementById("Red").src = "assets/img/minimap/red.png";

    initGame();

}


function initGame() {
    $("#splasher").fadeOut(0);
    $("#player-hud").css({"width": "25%", 'opacity': "1"})
    $("#playerHud").css({'opacity': "1", 'background': "transparent"});
    $("#mainmatrix").css("opacity", "1");
    $("#container").css({"width": "75%", 'opacity': "1", 'background': "transparent"});
    $(".matrix").empty();
    $("#toMap").show();

    console.log("initGame start");
    diceNum = initDice;
    playerHealth = initHealth;
    gridSelected = false;
    $("#player-hp").text(playerHealth);
    $("#player-dice-num").text(diceNum);


//    $("#gameAttack_wrapper").fadeIn();
    $("#fightArena").hide();
    $("#qcard").hide();
    $("#mainmatrix").fadeIn();
    $("#minimap").hide();
    $("#dice-div").hide();

    createMap();
    createEntity();
    addEntities();
    createRewards();
    drawDungeon(1);
    startGame(1);

//    initBattleWindow(1);

    console.log("initGame ends");
}

function createMap() {
    console.log(" ");
    console.log("creating map...");
    mapHash = map;
    for(var i=0; i<mapHash.length; i++)
    {
        var imgName = mapHash[i].name;
        mapHash[i].id = i+1;
        mapHash[i].backgroundImage = "assets/img/backgrounds/" + imgName + ".jpg";
    }
    console.log("map created");
//console.log(mapHash);
}

function createRewards() {
    console.log(" ");
    console.log("creating rewards...");
    rewardsHash = rewards;
    for(var i=0; i<rewardsHash.length; i++)
    {
        rewardsHash[i].id = i+1;
    }
    console.log("rewards created");
}

function createEntity() {
    console.log(" ");
    console.log("creating entities...");
    var i;

    for(i=0; i < monsters.length; i++)
    {
        entityHash.push(monsters[i]);
        entityHash[i].id = i+1;
        entityHash[i].class = "Monster";

    }
    console.log("   monsters created");

    bossHp = entityHash[i-1].health;
    entityHash[i-1].class = "Boss";
    console.log("   boss created");

    for(i = 0; i < mapHash.length; i++) {
        var imgName = mapHash[i].name;
        entityHash.push(
            {
                id:entityHash.length+1,
                name:imgName,
                image:"<img class='' src='assets/img/portals/" + imgName + ".png' id='portal" + (i+1) + "' title='" + portalTitle[i] + "' " +
                    "onmouseover='portalMouseOver(this, "+imgName+")' " +
                    "onmouseout='portalMouseOut(this, "+imgName+")'/>",
                class: "Portal"
            }
        );
    }
    console.log("   portals created");

    entityHash.push(
        {
            id:entityHash.length+1,
            class: "Seer",
            probability: 0.5,
            image: "<img class='img-radius' src='assets/img/seer.png' />"
        }
    );
    console.log("   seer created");

    entityHash.push(
        {
            id:entityHash.length+1,
            class: "Player",
            image: "<div id='player-div'> <img class='img-radius' src='assets/img/player.png' /> </div>"
        }
    );
    console.log("   player created");
    console.log("all entities created");
}

function addEntities() {
    console.log(" ");
    console.log("adding entities...");
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
                            console.log("   "+dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                        }
                    }
                } else if(type=="Seer") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            var probability = Math.random();
                            selSeer = getEntityByClass(type);
                            if(probability>selSeer[0].probability) {
                                mapHash[i].definition[n].content = selSeer[0].image;
                                mapHash[i].definition[n].entity = selSeer[0].id;
                                    console.log("   "+dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);

                            } else {
                                mapHash[i].definition[n].choiceSet = [];
                                console.log("   "+dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                            }

                        }
                    }
                } else if(type=="Player") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            selPlayer = getEntityByClass(type);
                            mapHash[i].definition[n].content = selPlayer[0].image;
                            mapHash[i].definition[n].entity = selPlayer[0].id;
                                console.log("   "+dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                        }
                    }
                } else if(type == "Boss") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            selBoss = getEntityByClass(type);
                            mapHash[i].definition[n].content = selBoss[0].image;
                            mapHash[i].definition[n].entity = selBoss[0].id;
                                console.log("   "+dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                        }
                    }

                } else if(portal[0]=="Portal") {
                    for(var n = 0; n < 9; n++) {
                        if(mapHash[i].definition[n].lx == a && mapHash[i].definition[n].ly == b) {
                            var name = portal[1];
                            var id=0;
                            var to = "";
                            if(portal[1] == "Any") {
                                selPortals = getEntityByClass(portal[0]);
                                var random = getRandom(0,selPortals.length);
                                while(selPortals[random].name == dungeonSelect.name)
                                    random = getRandom(0, selPortals.length);
                                var entity = selPortals[random];
//                                mapHash[i].definition[n].choiceSet.push(entity.class + " " + entity.name);
                                name = entity.image;
                                id = entity.id;
                                to = entity.name;

                            } else {
                                selPortals = getEntityByClass(portal[0]);
                                var port = $.grep(selPortals, function(element){
                                    return element.name == portal[1];
                                });
                                name = port[0].image;
                                id = port[0].id;
                                to = port[0].name;

                            }
                            mapHash[i].definition[n].content = name;
                            mapHash[i].definition[n].entity = id;
                                console.log("   "+dungeonSelect.name+"["+a+" "+b+"]"+", Type: "+type+", Content: "+mapHash[i].definition[n].content);
                        }
                    }
                    portal = [" "];
                }


            }
        }
    }
    console.log("entities added");
//    console.log("***************************************************************************");
//    console.log(mapHash);
//    console.log("***************************************************************************");

}

function getRandom(min, max) {
    var n = Math.floor(Math.random() * (max-min) + min);
    return n;
}

function getDungeon(dungeonID) {
    var dungeonSelect;
    dungeonSelect = $.grep(mapHash, function(element) {
        return element.id == dungeonID;
    });
    return dungeonSelect[0];
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



function getMinimap(dungeonId) {
    var dungeon = getDungeon(dungeonId);
    drawMinimap(dungeon.name);
    $(".mini").on('click', function() {
        drawMinimap($(this).attr("id"));
    });
}

function drawMinimap(dungeonName) {
    var dungeonId = getDungeonId(dungeonName);

    $(".minimatrix").empty();

    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= 3; j++) {
            var content = getContent(dungeonId, i, j);
            if(content.choiceSet.length != 0) {
                console.log(content);
                drawMiniEntity(content.lx, content.ly, content.content);
            }
        }
    }
}

function drawMiniEntity(lx, ly, content) {
    var pos = "m"+lx+""+ly;
    document.getElementById(pos).innerHTML = content;
}

function startGame(dungeonId) {
    console.log("starting Game...");
    gridSelected == false;
    $("#toGrid").hide();
    $("#toMap").on('click', function() {
        $("#mainmatrix").hide();
        $("#minimap").show();
        getMinimap(dungeonId);
        $("#toGrid").show();
        $("#toMap").hide();
    });
    $("#toGrid").on('click', function() {
        $("#mainmatrix").show();
        $("#minimap").hide();
        $("#toGrid").hide();
        $("#toMap").show();
    });

    $(".matrix").unbind('click').click(function() {
        if(gridSelected == false) {
            console.log("selected: "+$(this));
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
                console.log("content: "+content);
                var entityId = content.entity;
                console.log("entityId: "+entityId);
                movePlayer(lx, ly, entityId, checkReaction);
            }
        }
    });
}


function drawDungeon(dungeonId) {
    console.log("start drawDungeon");
    var dungeon = getDungeon(dungeonId);
    var setMatrixColor = document.getElementById("dungeons");
    $("#background").attr("src", dungeon.backgroundImage);
    console.log(dungeon);

    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= 3; j++) {
            var content = getContent(dungeonId, i, j);
            if(content.choiceSet.length != 0) {
                drawEntity(content.lx, content.ly, content.content);
            }
        }
    }
    initCarousel();
    console.log("end drawDungeon");
}

function drawEntity(lx, ly, content) {
    console.log("start drawEntity");
    var pos = lx+""+ly;
    document.getElementById(pos).innerHTML = content;
    console.log("end drawEntity");
}

function movePlayer(lx, ly, entityId, callback) {
    console.log("moving player...");
    var pos = lx+""+ly;
    var case1 = $("#player-div").clone();
    $("#22").append(case1);
//    $("#player-div").css({opacity:0});
    $("#player-div").hide();
    console.log(pos);
    switch(pos){
        case "11":
            case1.animate({left:"-=101%",top:"-=108%"},1000);
            break;
        case "12":
            case1.animate({top:"-=115%"},1000);
            break;
        case "13":
            case1.animate({left:"+=101%",top:"-=108%"},1000);
            break;
        case "21":
            case1.animate({left:"-=100%"},1000);
            break;
        case "22":
//            case1.animate({left:"+=33%",top:"-=34%"},1000);
            break;
        case "23":
            case1.animate({left:"+=100%"},1000);
            break;
        case "31":
            case1.animate({left:"-=100%",top:"+=110%"},1000);
            break;
        case "32":
            case1.animate({top:"+=110%"},1000);
            break;
        case "33":
            case1.animate({left:"+=100%",top:"+=110%"},1000);
            break;


    }
    case1.fadeOut(600);
    setTimeout(function(){case1.remove();},2500);
    console.log("player moved");
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
    if(playerHealth < 0)
        playerHealth = 0;
    $("#player-hp").text(playerHealth);
    gridSelected = false;

    checkSurvival(function() {
        $(".matrix").empty();
        drawDungeon(dungeonId);
        startGame(dungeonId);
    });
}

function monsterCard(entityId){
    var entity = getEntity(entityId);
    var hp= entity.health;
    if(entity.class == "Boss") {
        hp = bossHp;
    }
    $("#monster-card-hp").text(hp);
//    monsterHealthDiv = document.getElementById("monster-card-Health");
//    monsterHealthDiv.style.width = hp + "%";
    $("#monster-card-image").html(entity.image);

    $("#monster-card-name").text(entity.name);
    $("#monster-card-type").text(entity.type);
    $("#monster-card-dice-num").text(entity.dice);
    $("#desc").text(entity.description)
    var dice = $("#monster-card-dice-num").text();
    showDice(1,dice,0);

    console.log("Battle Window Getting initialised");
    $("#player-hud").css("opacity", "0.3");
    $("#mainmatrix").css({'opacity':'0.3'});
    $("#monster-card").css({'opacity':'1'});
    $("#monster-card").fadeIn();
    $("#btn-continue").on('click',function(){
        $("#mainmatrix").hide();
        $("#monster-card").fadeOut();
        initBattleWindow(entityId);
    });

    $("#btn-cancel").on('click', function(){
        $("#player-hud").css("opacity", "1");
        $("#mainmatrix").css({'opacity':'1'});
        $("#monster-card").css({'opacity':'0'});
        $("#monster-card").fadeOut();
//        $("#player-div").css({opacity:1});
        $("#player-div").show();
        gridSelected = false;

    });
}

function initBattleWindow(entityId) {

    $("#player-hud").css("background", "rgba(0,0,0,0.8)");
    $("#container").css("background", "rgba(0,0,0,0.8)");

    $("#dice-div").show();
    $("#toMap").hide();
    $("#splasher").empty();
    $("#fightArena").fadeIn();

    $("#monster-hud").show();

    $("#player-hud").css("width", "50%");
    $("#container").css("width", "50%");
    $("#player-hud").css("opacity", "1");

    player = true;
    $("#player-hp").text(playerHealth);
    $("#player-health-val").text("Health Left: "+playerHealth+"%");

    var entity = getEntity(entityId);
    if(entity.class == "Monster") {
        $("#monster-hp").text(entity.health);
    } else {
        $("#monster-hp").text(bossHp);
    }

    $("#monster-max-hp").text(entity.health);
    $("#monster-name").text(entity.name);
    $("#monster").html(entity.image);
    $("#monster-dice-num").text(entity.dice);
    var dice = $("#monster-dice-num").text();

    console.log("Battle window init done....starting battle by player Turn");
    showDice(3,0,diceNum);
    $("#monster").css("opacity", "0.5");
    $("#monster-hud").css("opacity", "0.5");
    $("#monster-health").removeClass("scaling");
    $("#monster-dice").removeClass("floating");


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

        for(var i=1;i<=dice1;i++){
            $("#die"+i).append("<img src='assets/img/dice/face1.png' style='height: 100%'/>");
        }

    }

}
//------------------------------------------------------------dice roll end-------------------------------------
function playerTurn() {
    $("#toMap").hide();
    console.log("In Player Turn");
    showSplash("Player Turn",500);
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
    });
}

function monster() {
    console.log("In Monster Turn");
    showSplash("Opponent's Turn",500);
    setTimeout(function()
    {
//        console.log("in ai");
        if(player == false)
        {
            var dice = $("#monster-dice-num").text();
            rollDice(dice,checkAttackPowers,doDamage,checkSurvival);
        }
    },1000);
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

    }, 500);
}

function switchAnim(from, callback) {
    if(from == "player") {
        $("#playerHud").css("opacity", "0.5");
        $("#monster").css("opacity", "1");
        $("#monster-hud").css("opacity", "1");
        var dice = $("#monster-dice-num").text();
        $("#player-health").removeClass("scaling");
        $("#monster-health").addClass("scaling");

        $("#player-dice").removeClass("floating");
        $("#monster-dice").addClass("floating");

        showDice(3,dice,0);
    } else {
        $("#playerHud").css("opacity", "1");
        $("#monster").css("opacity", "0.5");
        $("#monster-hud").css("opacity", "0.5");
        $("#player-health").addClass("scaling");
        $("#monster-health").removeClass("scaling");

        $("#player-dice").addClass("floating");
        $("#monster-dice").removeClass("floating");
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

//    playerHealthDiv = document.getElementById("player-Health");
//    monsterHealthDiv = document.getElementById("monster-Health");
    var monsterHealth = $("#monster-hp").text();

    if(team == "monster")
    {
        playerHealth -= damage;
        if(playerHealth < 0)
            playerHealth = 0;
//        $("#player-health-val").text("Health Left: "+playerHealth+"%");
        $("#player-hp").text(playerHealth);
        var msg = "You took " + damage + " damage";
        showSplash(msg, 500);
//        playerHealthDiv.style.width = playerHealth + "%";
    }
    else
    {
        monsterHealth = monsterHealth - damage;
        if(monsterHealth < 0)
            monsterHealth = 0;
        $("#monster-hp").text(monsterHealth);
        if(parseInt($("#monster-dice-num").text()) == 5) {
            bossHp -= damage;
        }
        var msg = "You dealt " + damage + " damage";
        showSplash(msg, 500)
//        var max = $("#monster-max-hp").text();
//        var hp = Math.floor((monsterHealth*100)/max);
//        $("#monster-health-val").text("Health Left: "+hp+"%");
//        monsterHealthDiv.style.width = hp + "%";
        // checkDefendPowers();
    }
    setTimeout(function()
    {
        if (typeof callback === "function")
        {
            callback(monsterHealth);
        }
    },1000);
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
    if (playerHealth<=0) {
        $("#container").css("opacity", "1");
        $("#container").css("opacity", "0.5");
        $("#player-hud").css("opacity", "1");
        $("#player-hud").css("opacity", "0.5");
        defeat();
    }

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
    $("#mainmatrix").css({'opacity': 0.5});
    $("#qcard").fadeIn();
    $("#toMap").hide();
    setTimeout(function() {$("#player-div").fadeIn();}, 600);
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
        $("#mainmatrix").css({'opacity': "1"});
    }, 2000);

}

function getRewards(callback){
    console.log("In getRewards")
    var random = getRandom(0,rewardsHash.length);
    console.log(random);
    var reward = rewardsHash[random];
    console.log(reward);
    var msg;
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
            msg = "You gained a " + reward.name + " (" +reward.value + " " + reward.type +")";
            $("#player-hp").text(playerHealth);
            break;
        case "Dice":
            if(diceNum<5)
            {
                msg = "You gained a " + reward.name + " (" +reward.value + " " + reward.type +")";
                diceNum += reward.value;
                console.log("dice gained");
                $("#player-dice-num").text(diceNum);
            }
            else
            {
                msg = "You have reached the maximum Dice limit";
                console.log("dice limit reached");
            }
            break;

    }

    if(parseInt($("#monster-dice-num").text()) == 5) {
        var msg = '<span style="text-decoration: none; color: white" >You WIN! <br /><br />Click Continue to Start Again</span>'
        showSplash(msg, 1, callback);
    } else {
        showSplash(msg, 0, callback);
    }

}

function closeBattle(){

    gridSelected = false;
    console.log("close battle");
    $("#splasher").fadeOut();
    $("#player-hud").css({"width": "25%", "backgroundColor": "transparent"});
    $("#container").css({'width': "75%", 'opacity': 1, "backgroundColor": "transparent"});
    $("#player-div").show();
    $("#mainmatrix").css({'opacity': 1});
    $("#dice-div").hide();
    $("#monster-hud").hide();
    $("#mainmatrix").fadeIn();
    $("#toMap").show();
    $("#monster-dice-num").text(" ");

}

function victory(){
    console.log("'In Victory function");
    getRewards(closeBattle);
}

function defeat(){
    console.log("in defeat");
    var msg = '<span style="text-decoration: none; color: white">Defeated! <br /><br />Click Continue to Start Again</span>'
    showSplash(msg,1);
//    $('#gameAttack_wrapper').fadeOut();
//
//    $("#player-hud").fadeOut();
//    $("#container").fadeOut();
//    $("#fightArena").fadeOut();
//    $('.How').fadeOut();
//    $(".defeat").fadeIn();
//    var blinkit = setInterval(blinker3, 2000);
//    $('#startAgainClicker').on('click', function () {
//        clearInterval(blinkit);
//        $(".defeat").fadeOut();
//        $(".gameTitle").fadeIn();
//        background();
//    });
}

function blinker3() {
    $('#startAgainClicker').fadeOut(500, function () {
        $('#startAgainClicker').fadeIn(500);
        background();
    });
}

function playerHealthHud(){
    playerHealthDivHud = document.getElementById("player-Health-hud");
    $("#player-hp-hud").text(playerHealth);
}


function showSplash(msg,delay, callback) {
    console.log("In display messages");

    switch (delay.toString()) {
        case "0":
            msg += " <br /> <br /> <input value='Continue' type='button' onclick='closeBattle()' /> "
            $('#splasher').html(msg).fadeIn(500);
            break;

        case "1":
            console.log("Win/Defeated")
            msg += " <br /> <br /> <input value='Continue' type='button' onclick='initGame()' /> ";
            $('#splasher').html(msg).hide().fadeIn(500);
            break;

        default:
            $('#splasher').html(msg).fadeIn(500).delay(delay).fadeOut(500);
            setTimeout(function() {
                if(typeof callback === "function") {
                    callback();
                }
            }, 3000);
            break;
    }

}

function portalMouseFunct()
{
    var getId = $('.matrix').mouseover(function() {
        return this.id;
    });

    var getPort = $('#' + getId + '#')
    $("#" + getId + " img").attr("src", "assets/img/portals/")


}

function iconMouseFunct(x) {

    if(x==1)
    {
        $('#info').show();
        $('#info').text("Help");
        $('#info').css({"backgroundColor": "navy", "color": "white", "float": "left"});
    }
    if(x==2)
    {
        $('#info').show();
        $('#info').text("Mini-map");
        $('#info').css({"backgroundColor": "maroon", "color": "white", "float": "right"});
    }
    if(x==3)
        $('#info').hide();


}

function portalMouseOver(obj, portal) {
    obj.attributes.class.value = portal.attributes.id.value;
    switch(portal.attributes.id.value) {
        case "Purple":
            $(".Purple").attr("src", "assets/img/portals/Purple_.png");
            break;
        case "Blue":
            console.log(document.getElementsByClassName("Blue").src);
            $(".Blue").attr("src", "assets/img/portals/Blue_.png");
            break;
        case "Green":
            $(".Green").attr("src", "assets/img/portals/Green_.png");
            break;
        case "Yellow":
            $(".Yellow").attr("src", "assets/img/portals/Yellow_.png");
            break;
        case "Orange":
            $(".Orange").attr("src",  "assets/img/portals/Orange_.png");
            break;
        case "Red":
            $(".Red").attr("src", "assets/img/portals/Red_.png");
            break;
    }

}

function portalMouseOut(obj, portal) {

    switch(portal.attributes.id.value) {
        case "Purple":
            $(".Purple").attr("src", "assets/img/portals/Purple.png");
            break;
        case "Blue":
            console.log(document.getElementsByClassName("Blue").src);
            $(".Blue").attr("src", "assets/img/portals/Blue.png");
            break;
        case "Green":
            $(".Green").attr("src", "assets/img/portals/Green.png");
            break;
        case "Yellow":
            $(".Yellow").attr("src", "assets/img/portals/Yellow.png");
            break;
        case "Orange":
            $(".Orange").attr("src",  "assets/img/portals/Orange.png");
            break;
        case "Red":
            $(".Red").attr("src", "assets/img/portals/Red.png");
            break;
    }
    obj.attributes.class.value = "";
}
