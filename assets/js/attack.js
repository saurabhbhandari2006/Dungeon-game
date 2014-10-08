var faceOne = 1;
var faceTwo = 1;
var diceValue = 0;
var faceValue = [];

//----------------------------------dice roll -----------------------------------------
function hideAngle(){
	$("#dieOne").removeClass('oneShown');
	$("#dieTwo").removeClass('twoShown');
	$("#dieThree").removeClass('threeShown');
	$("#dieFour").removeClass('fourShown');
	$("#dieFive").removeClass('fiveShown');
}

function hideFace(dieOne,dieTwo){
	$("#dieOne #face"+dieOne+"").hide();
	$("#dieTwo #face"+dieTwo+"").hide();
}

function showAngle(){
    for(var i=1; i<=diceValue.length; i++)
    {
        $("#die"+i).addClass('Shown'+i);
    }



}


function setFaces(){
    for(i=0; i<=diceValue.length; i++)

	$("#dieOne #face"+dieOne+"").show();
	$("#dieTwo #face"+dieTwo+"").show();
}

function finalRoll(dices){
    for(var i = 0;i<dices; i++){
        dices[i].push(Math.floor((Math.random()*6)+1));

//	faceOne = Math.floor((Math.random()*6)+1);
//	faceTwo = Math.floor((Math.random()*6)+1);

	setFaces();


    diceValue = faceOne + faceTwo;

}
function diceRoll(){
    $("#diceBox").fadeIn();
    for(var i=0; i<6; ++i){
        var die = i+1;
        $("#dieOne").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#dieTwo").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");

        $("#dieOne #face"+die+"").hide();
        $("#dieTwo #face"+die+"").hide();
    }
    setFaces(1,1);
    hideFace(faceOne,faceTwo);
    showAngle();
    setTimeout(function(){
        hideAngle();
    },750);
    setTimeout(function(){
        finalRoll();
    },751)
}

//------------------------------------------------------------dice roll end-------------------------------------