var faceOne = 1;
var faceTwo = 1;
var done = true;
var diceVal = [];
var diceNum = 1;
var player= true;

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
function hideAngle(){
//	$("#dieOne").removeClass('oneShown');
//	$("#dieTwo").removeClass('twoShown');

    for(var i=1;i<=diceNum;i++)
    {
        console.log("hide angle i "+i);
        $("#die"+i).removeClass('shown'+i);
    }

}

function hideFace(){
//	$("#dieOne #face"+dieOne+"").hide();
//	$("#dieTwo #face"+dieTwo+"").hide();

    for(var i= 1;i<=diceNum;i++)
    {
        console.log("hide face i "+i);
        $("#die"+i+" #face"+diceVal[i]+"").hide();
    }


}

function showAngle(){
//	$("#dieOne").addClass('oneShown');
//	$("#dieTwo").addClass('twoShown');

    for(var i=0;i<=diceNum;i++)
    {
        console.log("show angle i "+i);
        $("#die"+(i)).addClass('shown'+(i));
    }

}

function setFaces(){
//	$("#dieOne #face"+dieOne+"").show();
//	$("#dieTwo #face"+dieTwo+"").show();

    for(var i=0;i<=diceNum;i++)
    {
        console.log("set face i "+i);
        $("#die"+(i+1)+" #face"+diceVal[i]+"").show();
    }

}

function finalRoll(){
    diceVal = [];
    for(var i= 0;i<diceNum;i++)
    {
        diceVal.push(Math.floor((Math.random()*6)+1));
    }

//	faceOne = Math.floor((Math.random()*6)+1);
//	faceTwo = Math.floor((Math.random()*6)+1);
	setFaces();
//	done = true;
//    return faceOne+faceTwo
}
function diceRoll(){
    $("#diceBox").fadeIn();
    for(var i=0; i<6; ++i){
        var die = i+1;
//        for(var i=1;i<=diceNum;i++)
//        {
//            $("#die"+i).append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
//              $("#die"+i+" #face"+die+"").hide();
//        }
        $("#die1").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#die2").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#die3").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#die4").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#die5").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
//        for(var i=1;i<=diceNum;i++)
//        {
//            $("#die"+i+" #face"+die+"").hide();
//        }
        $("#die1 #face"+die+"").hide();
        $("#die2 #face"+die+"").hide();
        $("#die3 #face"+die+"").hide();
        $("#die4 #face"+die+"").hide();
        $("#die5 #face"+die+"").hide();
    }
    setFaces();
     hideFace();
    showAngle();
    setTimeout(function(){
        hideAngle();
    },750);
    setTimeout(function(){
        finalRoll();
    },751)
}
//------------------------------------------------------------dice roll end-------------------------------------

function playerTurn(){
//        setTimeout(function() {
//            $("#message").text("Player's Turn").css("color","white").fadeIn(1000).fadeOut(2000)});

    setTimeout(function() {
        console.log("Player:");

        $(".btn").unbind('click').click(function () {
            if(playerTurn) {
//                playerTurn = false;
                btnId = $(this).attr("id");
                switch (btnId) {
                    case "btnAttack":
                        console.log("attack selected");
                        diceRoll();

                        break;
                    case "btnRetreat":

                        break;
                }


//
//                if (checkCost("player", card)) {
//                    cardEnlarge("player", function() {
//                        cardClicked(card, "player", "ai", function() {
//                            if(gameOn) switchTurn("player");
//                        });
//                    });
////                $.when(cardClicked(card, "player", "ai")).done(function(){switchTurn("player");});
//                } else {
//                    $("#message").text("Not enough Resources").fadeIn(1000).fadeOut(1000);
//                    player = true;
//                    setTimeout(function() {playerTurn("resource");}, 1000);
//                }
            }
        })
    }, 500);

}
//
//function aiTurn(call) {
//    if(call == "new") {
//        delay = 3000;
//        setTimeout(function() {
//            $("#message").text("Opponent's Turn").css("color","white").fadeIn(1000).fadeOut(2000);
//        }, 500);
//    } else {delay = 0;}
//
//    setTimeout(function() {
//        if(player == false) {
//            console.log("AI:");
//
//            if(call != "resource")
//                initDraw();
//
//            setTimeout(function() {
//                if(validateDraw("ai")) {
//
//                    var random = Math.floor((Math.random() * 3));
//                    var card = draw[random];
//                    cardId = "card"+(random+1);
//
//                    if(checkCost("ai", card)) {
//                        getCards();
//                    } else {
//                        aiTurn("resource");
//                    }
//
//
//                    setTimeout(function() {
//                        if (checkCost("ai", card)) {
//                            cardEnlarge("ai", function() {
//                                cardClicked(card, "ai", "player", function() {
//                                    if(gameOn) switchTurn("ai");
//                                });
//                            });
//                        }
//                    }, 8000)
//
//                } else {aiTurn();}
//            }, 500);
//        }
//    }, delay);
//
//}
//
//function switchTurn(from) {
//    console.log("switching turn from "+from);
//    console.log("checking player: "+player);
//    deckFadeIn(function() {
//        cardsToDeck(function() {
//            hideDeck();
//        });
//    });
//    setTimeout(function() {
//        if (from == "player") {
//            animSwitchTurn(from, function() {
//                player = false;
//                aiTurn("new");
//            });
//        } else {
//            animSwitchTurn(from, function() {
//                player = true;
//                playerTurn("new");
//            });
//        }
//    }, 4000);
//}