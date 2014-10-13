//var diceVal = [];
var diceNum = 2;
// var healthReduce;
var playerHealth = 100;//to get this value as player health
var monsterHealth = 100;//monster health
entityId = 1;

///*-------------------------------------------samrith-----------------------------------------*/
//
//var mapHash;
//var entityHash = [];
//
//$(function() {
//    createMap();
//    createEntity();
//    addEntities("Purple");
//
//});
//
//function initializeTheme() {
//}
//
//function createMap() {
//
//    mapHash = map;
//
//    for(var i=0; i<mapHash.length; i++)
//    {
//        var imgName = mapHash[i].name;
//        mapHash[i].id = i+1;
//        mapHash[i].backgroundImage = "assets/img/backgrounds/" + imgName + ".png";
//    }
//
//    //console.log(mapHash);
//}
//
//function createEntity() {
//
//    for(var i=0; i < monsters.length; i++)
//    {
//        entityHash.push(monsters[i]);
//        entityHash[i].id = i+1;
//    }
//
//    for(var i = 0; i < mapHash.length; i++) {
//        var imgName = mapHash[i].name;
//
//        entityHash.push(
//            {
//                id:entityHash.length,
//                portal:imgName,
//                portalImage:"assets/img/portals/" + imgName + ".png"
//            }
//        );
//    }
//
//    console.log(entityHash);
//}
//
//function addEntities(dungeon) {
//
//    var x = 0;
//    var y = 0;
//
//    x = Math.floor(Math.random() * 3 + 1);
//    y = Math.floor(Math.random() * 3 + 1);
//
//    if(dungeon=="Purple")
//    {
//        var dungeonSelect = $.grep(mapHash, function(element) {
//            return element.id == 1;
//        });
//
//        dungeonSelect.lx = x;
//        dungeonSelect.ly = y;
//
//        if(dungeonSelect.entity!=0)
//        {
//            x = Math.floor(Math.random() * 3 + 1);
//            y = Math.floor(Math.random() * 3 + 1);
//        }
//        else
//        {
//            var monsterAdd = $.grep(entityHash)
//        }
//        console.log(dungeonSelect);
//    }
//}
//
//
//
///*-----------------------------------------------end of samrith code-------------------------------------------*/
$(function () {
    initBattleWindow();
});
function initBattleWindow(entityId) {
    player = true;
    playerTurn(entityId);
}
//----------------------------------dice roll -----------------------------------------
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
function rollDice(entityId,diceNum,callback,callback1,callback2) {
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
            callback(entityId,healthReduce,callback1,callback2);
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
                        rollDice(entityId,diceNum,checkDefendPowers,doDamage,checkIfDead);

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
function monster(entityId,call) {
    setTimeout(function()
    {
//        console.log(monsterDice);
        if(player == false)
        {
            rollDice(entityId,2,checkAttackPowers,doDamage,checkSurvival);
            // function(){
            //          updateResources("player",function(){
            //                  emptyDiceDiv();
            //                  switchTurn("monster")
            //          });
            //      });
        }
    },3000);
}
function switchTurn(entityId,from) {
    console.log("switching turn from "+from);
    console.log("checking player: "+player);
    setTimeout(function() {
        if (from == "player") {
            player = false;
            monster(entityId);
        }
        else {
            player = true;
            playerTurn(entityId);
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
function doDamage(entityId,team, damage,callback){
    console.log("doDamage "+team);
    console.log("doDamage "+damage);

    playerHealthDiv = document.getElementById("player-Health");
    monsterHealthDiv = document.getElementById("monster-Health");

    if(team == "monster")
    {
        playerHealth -= damage;
        console.log("player health left" +playerHealth);
        $('.value_display').text(playerHealth  + '% health left');
        playerHealthDiv.style.width = playerHealth + "%"
        if (typeof callback === "function")
        {
            callback(entityId);
        }

    }
    else
    {
        monsterHealth = monsterHealth - damage;
        console.log("monster health left" +monsterHealth);
        $('.value_display').text(monsterHealth  + '% health left');
        monsterHealthDiv.style.width = monsterHealth + "%";
        if (typeof callback === "function")
        {
            callback(entityId,monsterHealth);
        }
        // checkDefendPowers();
    }
//    setTimeout(function()
//    {
//        if (typeof callback === "function")
//        {
//            callback(entityId,monsterHealth);
//        }
//    },2000);
}
function checkDefendPowers(entityId, damage,callback,callback1){
    console.log("in checkDefendPowers");
    if (typeof callback === "function")
    {
        callback(entityId,"player",damage,callback1);
    }
}
function checkIfDead(entityId,health){
    console.log("in checkIfDead function "+health)
    if (health<=0)
    {
        victory(entityId);
    }
    else
    {
        checkRecoveryPowers(entityId,"monster",switchTurn);
    }
}
function checkRecoveryPowers(entityId,team,callback){
    console.log("in recovery function");
    if (team == "player")
    {
        if (typeof callback === "function")
        {
            callback(entityId,"monster");
        }
    }
    else
    {
        if (typeof callback === "function")
        {
            callback(entityId,"player");
        }
    }
}
function checkAttackPowers(entityId, damage,callback,callback1){
    console.log("in checkAttackPowers");
    if (typeof callback === "function")
    {
        callback(entityId,"monster",damage,callback1);
    }

}
function checkSurvival(entityId){
    console.log("in checkSurvival");
    if (playerHealth<=0)
    {
        defeat();
    }
    else
    {
        checkRecoveryPowers(entityId,"player",10,switchTurn);
    }
}
function victory(callback){
console.log("'In Victory function");
    callback();
}

function getRewards(callback){

    var random = getRandom(1,12);
    var reward = rewards[random];
    switch (reward.type){
        case "health":
            playerHealth += reward.value;
            break;
        case "Dice":
            diceNum += reward.value;
            break;

    }

    callback();


}
function closeBattle(){

}







































/*--------------------------------------------------previous code---------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------*/
///**
// * Created by ptotem-desktop on 10/9/14.
// */
//var diceVal = [];
//var diceNum = 2;
//var healthReduce;
//var playerHealth = 100;//to get this value as player health
//var monsterHealth = 100;//monster health
//var monsterCallFlag=true;
//var value1 = 100;//to get this value as player health
//var monsterHealth = 100;//monster health
//$(function () {
//    initBattleWindow();
//});
//
//function initBattleWindow() {
////    gameOn = true;
//    var health = 100;
//    var dice = 1;
//    player = true;
//    playerTurn();
//
//}
////----------------------------------dice roll -----------------------------------------
//function hideAngle(numberOfDice) {
////	$("#dieOne").removeClass('oneShown');
////	$("#dieTwo").removeClass('twoShown');
//
//    for (var i = 1; i <= numberOfDice; i++) {
////        console.log("hide angle i " + i);
//        $("#die" + i).removeClass('shown' + i);
//    }
//
//}
//
//function hideFace(numberOfDice) {
////	$("#dieOne #face"+dieOne+"").hide();
////	$("#dieTwo #face"+dieTwo+"").hide();
//
//    for (var i = 1; i <= numberOfDice; i++) {
////        console.log("hide face i " + i);
//        $("#die" + i + " #face" + diceVal[i] + "").hide();
//    }
//
//
//}
//
//function showAngle(numberOfDice) {
////	$("#dieOne").addClass('oneShown');
////	$("#dieTwo").addClass('twoShown');
//
//    for (var i = 0; i <= numberOfDice; i++) {
////        console.log("show angle i " + i);
//        $("#die" + (i)).addClass('shown' + (i));
//    }
//
//}
//
//function setFaces(numberOfDice) {
////	$("#dieOne #face"+dieOne+"").show();
////	$("#dieTwo #face"+dieTwo+"").show();
//
//    for (var i = 0; i <= numberOfDice; i++) {
////        console.log("set face i " + i);
//        $("#die" + (i + 1) + " #face" + diceVal[i] + "").show();
//    }
//
//}
//
//function finalRoll(numberOfDice) {
//    diceVal = [];
//    healthReduce =0;
//    for (var i = 0; i < numberOfDice; i++) {
//        diceVal.push(Math.floor((Math.random() * 6) + 1));
//        healthReduce += diceVal[i];
////        console.log(diceVal[i]);
////        console.log(healthReduce);
//    }
////	faceOne = Math.floor((Math.random()*6)+1);
////	faceTwo = Math.floor((Math.random()*6)+1);
//    setFaces(numberOfDice);
////	done = true;
////    return faceOne+faceTwo
//}
//
//function diceRoll(numberOfDice,callback) {
//    $("#diceBox").fadeIn();
//    for (var i = 0; i < 6; ++i) {
//        var die = i + 1;
////        for(var i=1;i<=diceNum;i++)
////        {
////            $("#die"+i).append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
////              $("#die"+i+" #face"+die+"").hide();
////        }
//        $("#die1").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
//        $("#die2").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
//        $("#die3").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
//        $("#die4").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
//        $("#die5").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
////        for(var i=1;i<=diceNum;i++)
////        {
////            $("#die"+i+" #face"+die+"").hide();
////        }
//        $("#die1 #face" + die + "").hide();
//        $("#die2 #face" + die + "").hide();
//        $("#die3 #face" + die + "").hide();
//        $("#die4 #face" + die + "").hide();
//        $("#die5 #face" + die + "").hide();
//    }
//    setFaces(numberOfDice);
//    hideFace(numberOfDice);
//    showAngle(numberOfDice);
//    setTimeout(function () {
//        hideAngle(numberOfDice);
//    }, 750);
//    setTimeout(function () {
//        finalRoll(numberOfDice);
//        callback();
//    }, 751)
//}
////------------------------------------------------------------dice roll end-------------------------------------
//function playerTurn(call) {
////        setTimeout(function() {
////            $("#message").text("Player's Turn").css("color","white").fadeIn(1000).fadeOut(2000)});
//    setTimeout(function () {
//        console.log("Player:");
//
//        $(".btn").unbind('click').click(function () {
//            if (player) {
//                player = false;
//                btnId = $(this).attr("id");
//                switch (btnId) {
//                    case "btnAttack":
//                        console.log("attack selected");
//                        diceRoll(diceNum,function(){
//                            updateResources("monster",function()
//                            {
//                                emptyDiceDiv();
//                                switchTurn("player")
//                            });
//                        });
//                        break;
//                    case "btnRetreat":
//                        //drawMap();
//                        break;
//                }
//            }
//        })
//    }, 500);
//}
////
//function monster() {
////            $("#message").text("Opponent's Turn").css("color","white").fadeIn(1000).fadeOut(2000);
//    setTimeout(function()
//    {
//        if(player == false)
//        {
//            var monsterDice;
//
//            if(monsterCallFlag){
//                monsterDice = monsters[1].level;
//            }
//            console.log(monsterDice);
//            diceRoll(monsterDice,function(){
//                updateResources("player",function(){
//                    emptyDiceDiv();
//                    switchTurn("monster")
//                });
//            });
//        }
//    },2000);
//}
//
//function switchTurn(from) {
//    console.log("switching turn from "+from);
//    console.log("checking player: "+player);
//    setTimeout(function() {
//        if (from == "player") {
//            player = false;
//            monster();
//        }
//        else {
//            player = true;
//            playerTurn();
//        }
//    }, 2000);
//}
//
//function updateResources(to,callback) {
//    playerHealthDiv = document.getElementById("player-Health");
//    monsterHealthDiv = document.getElementById("monster-Health");
//    console.log(healthReduce);
////    value = value - healthReduce;
////    console.log(value);
//
////    if (value <= 0);
////    $('.value_display').text(value  + '% health left');
//    if(to == "player")
//    {
//        playerHealth -= healthReduce;
//        console.log("player health left" +playerHealth);
//        playerHealthDiv.style.width = playerHealth + "%";
////        playerHealth.style.left = marginShift;
//    }
//    else
//    {
//        monsterHealth -= healthReduce;
//        console.log("monster health left" +monsterHealth);
//        monsterHealthDiv.style.width = monsterHealth + "%";
//
//    }
//    setTimeout(function()
//    {
//        callback();
//    },2000);
//}
//
//function emptyDiceDiv() {
//    diceVal = [];
//    $("#die1").empty();
//    $("#die2").empty();
//    $("#die3").empty();
//    $("#die4").empty();
//    $("#die5").empty();
//}
//
//function getMonsterResources(id){
//    var mDice= monsters[id].level;
//    var mHealth = monsters[id].health;
//    return[mDice,mHealth]
//}