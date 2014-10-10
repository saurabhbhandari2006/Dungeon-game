var diceVal = [];
var diceNum = 2;
var player = true;
// var healthReduce;
var playerHealth = 100;//to get this value as player health
var value2 = 100;//monster health
entityId = 1;

$(function () {
    initBattleWindow();
});
function initBattleWindow() {
    player = true;
    playerTurn();
}
function scoreData() {
    var health = 100;
    var dice = 1;
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
        var monsterDice;
        console.log("in ai");
        monsterDice = monsters.level;
        console.log(monsterDice);
        if(player == false)
        {
            rollDice(2,checkAttackPowers,doDamage,checkSurvival);
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
function updateResources(to,callback) {
    playerHealth = document.getElementById("player-Health");
    monsterHealth = document.getElementById("monster-Health");
    console.log(healthReduce);

    if(to == "player")
    {
        var marginShift =100;
        value1 -= healthReduce;
        value1 -= healthReduce;
        marginShift -= value1;
        console.log("player health left" +value1);
        playerHealth.style.width = value1 + "%";
        playerHealth.style.left = marginShift;
    }
    else
    {
        value2 = value2 - healthReduce;
        console.log("monster health left" +value2);
        monsterHealth.style.width = value2 + "%";

    }
    setTimeout(function()
    {
        callback();
    },2000);
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

    if(team == "monster")
    {
        playerHealth -= damage;
        console.log("player health left" +playerHealth);
        playerHealthDiv.style.width = playerHealth + "%"
    }
    else
    {
        value2 = value2 - damage;
        console.log("monster health left" +value2);
        monsterHealthDiv.style.width = value2 + "%";
        // checkDefendPowers();
    }
    setTimeout(function()
    {
        if (typeof callback === "function")
        {
            callback(value2);
        }
    },2000);
}
function checkDefendPowers(entityId, damage,callback,callback1){
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
        checkRecoveryPowers("monster",10,switchTurn);
    }
}
function checkRecoveryPowers(team,entityId,callback){
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
function checkAttackPowers(entityId, damage,callback,callback1){
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
        checkRecoveryPowers("player",10,switchTurn);
    }
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
//var value2 = 100;//monster health
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