var faceOne = 1;
var faceTwo = 1;
var done = true;
var diceVal = [];
var diceNum = 2;
var player = true;
var healthReduce;

$(function () {
    initBattleWindow();
});

function initBattleWindow() {
//    gameOn = true;
    player = true;
    playerTurn();

}

function scoreData() {
    var health = 100;
    var dice = 1;
}

//----------------------------------dice roll -----------------------------------------
function hideAngle() {
//	$("#dieOne").removeClass('oneShown');
//	$("#dieTwo").removeClass('twoShown');

    for (var i = 1; i <= diceNum; i++) {
//        console.log("hide angle i " + i);
        $("#die" + i).removeClass('shown' + i);
    }

}

function hideFace() {
//	$("#dieOne #face"+dieOne+"").hide();
//	$("#dieTwo #face"+dieTwo+"").hide();

    for (var i = 1; i <= diceNum; i++) {
//        console.log("hide face i " + i);
        $("#die" + i + " #face" + diceVal[i] + "").hide();
    }


}

function showAngle() {
//	$("#dieOne").addClass('oneShown');
//	$("#dieTwo").addClass('twoShown');

    for (var i = 0; i <= diceNum; i++) {
//        console.log("show angle i " + i);
        $("#die" + (i)).addClass('shown' + (i));
    }

}

function setFaces() {
//	$("#dieOne #face"+dieOne+"").show();
//	$("#dieTwo #face"+dieTwo+"").show();

    for (var i = 0; i <= diceNum; i++) {
//        console.log("set face i " + i);
        $("#die" + (i + 1) + " #face" + diceVal[i] + "").show();
    }

}

function finalRoll() {
    diceVal = [];
    healthReduce =0;
    for (var i = 0; i < diceNum; i++) {
        diceVal.push(Math.floor((Math.random() * 6) + 1));
        healthReduce += diceVal[i];
//        console.log(diceVal[i]);
//        console.log(healthReduce);

    }

//	faceOne = Math.floor((Math.random()*6)+1);
//	faceTwo = Math.floor((Math.random()*6)+1);
    setFaces();
//	done = true;
//    return faceOne+faceTwo
}

function diceRoll(callback) {
    $("#diceBox").fadeIn();
    for (var i = 0; i < 6; ++i) {
        var die = i + 1;
//        for(var i=1;i<=diceNum;i++)
//        {
//            $("#die"+i).append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
//              $("#die"+i+" #face"+die+"").hide();
//        }
        $("#die1").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
        $("#die2").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
        $("#die3").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
        $("#die4").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
        $("#die5").append("<img src='assets/img/dice/face" + die + ".png' id='face" + die + "' />");
//        for(var i=1;i<=diceNum;i++)
//        {
//            $("#die"+i+" #face"+die+"").hide();
//        }
        $("#die1 #face" + die + "").hide();
        $("#die2 #face" + die + "").hide();
        $("#die3 #face" + die + "").hide();
        $("#die4 #face" + die + "").hide();
        $("#die5 #face" + die + "").hide();
    }
    setFaces();
    hideFace();
    showAngle();
    setTimeout(function () {
        hideAngle();
    }, 750);
    setTimeout(function () {
        finalRoll();
        callback();
    }, 751)
}
//------------------------------------------------------------dice roll end-------------------------------------

function playerTurn() {
//        setTimeout(function() {
//            $("#message").text("Player's Turn").css("color","white").fadeIn(1000).fadeOut(2000)});

    setTimeout(function () {
        console.log("Player:");

        $(".btn").unbind('click').click(function () {
            if (player) {
                player = false;
                btnId = $(this).attr("id");
                switch (btnId) {
                    case "btnAttack":
                        console.log("attack selected");
                        diceRoll(function(){
                            updateResources("ai",function()
                            {
                                    emptyDiceDiv();
                                    switchTurn("player")
                            });


                        });
                        break;
                    case "btnRetreat":
                        //drawMap();
                        break;
                }
            }
        })
    }, 500);

}
//
function aiTurn() {

            $("#message").text("Opponent's Turn").css("color","white").fadeIn(1000).fadeOut(2000);
    setTimeout(function()
    {
        if(player == false)
        {
            diceRoll(function(){
                updateResources("player",function(){

                        emptyDiceDiv();
                        switchTurn("ai")

                });
            });
       }
    },3000);
}
function switchTurn(from) {
    console.log("switching turn from "+from);
    console.log("checking player: "+player);
    setTimeout(function() {
        if (from == "player") {
                player = false;
                aiTurn();
            }
         else {
                player = true;
                playerTurn();
            }

    }, 4000);
}

var value1 = 100;
var value2 = 100;
playerHealth = document.getElementById("playerHealth");
aiHealth = document.getElementById("aiHealth");
function updateResources(to,callback) {

    console.log(healthReduce);
//    value = value - healthReduce;
//    console.log(value);

//    if (value <= 0);
//    $('.value_display').text(value  + '% health left');
    if(to == "player")
    {
        value1 = value1 - healthReduce;
        console.log("player health left" +value1);
        playerHealth.style.width = value1 + "%";
    }
    else
    {
        value2 = value2 - healthReduce;
        console.log("ai health left" +value2);
        aiHealth.style.width = value2 + "%";
    }
    setTimeout(function()
    {
        callback();
    },2000);
}

function emptyDiceDiv() {
    diceVal = [];
    $("#die1").empty();
    $("#die2").empty();
    $("#die3").empty();
    $("#die4").empty();
    $("#die5").empty();
}