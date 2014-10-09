var faceOne = 1;
var faceTwo = 1;
var faceThree = 1;
var faceFour = 1;
var done = true;
//----------------------------------dice roll -----------------------------------------
function hideAngle(){
	$("#dieOne").removeClass('oneShown');
	$("#dieTwo").removeClass('twoShown');
    $("#dieThree").removeClass('threeShown');
    $("#dieFour").removeClass('fourShown');
}

function hideFace(dieOne,dieTwo, dieThree, dieFour){
	$("#dieOne #face"+dieOne+"").hide();
	$("#dieTwo #face"+dieTwo+"").hide();
    $("#dieThree #face"+dieThree+"").hide();
    $("#dieFour #face"+dieFour+"").hide();
}

function showAngle(){
	$("#dieOne").addClass('oneShown');
	$("#dieTwo").addClass('twoShown');
//    $("#dieThree").addClass('threeShown');
    $("#dieFour").addClass('fourShown');
}


function setFaces(dieOne,dieTwo, dieThree, dieFour){
	$("#dieOne #face"+dieOne+"").show();
	$("#dieTwo #face"+dieTwo+"").show();
//    $("#dieThree #face"+dieThree+"").show();
    $("#dieFour #face"+dieFour+"").show();
}

function finalRoll(){
	faceOne = Math.floor((Math.random()*6)+1);
	faceTwo = Math.floor((Math.random()*6)+1);
    faceThree = Math.floor((Math.random()*6)+1);
    faceFour = Math.floor((Math.random()*6)+1);

	setFaces(faceOne,faceTwo, faceThree, faceFour);

	done = true;
    return faceOne+faceTwo+faceThree+faceFour
}
$(document).ready(function(){
    $("#diceBox").fadeIn();
    for(var i=0; i<6; ++i)
    {
        var die = i+1;
        $("#dieOne").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#dieTwo").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#dieThree").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#dieFour").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");

        $("#dieOne #face"+die+"").hide();
        $("#dieTwo #face"+die+"").hide();
        $("#dieThree #face"+die+"").hide();
        $("#dieFour #face"+die+"").hide();
    }
    //setFaces(1,1);
    hideFace(faceOne,faceTwo, faceThree, faceFour);
    showAngle();
    setTimeout(function(){
        hideAngle();
    },750);
    setTimeout(function(){
        finalRoll();
    },751)
});
//------------------------------------------------------------dice roll end-------------------------------------