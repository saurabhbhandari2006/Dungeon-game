$(document).ready(function () {
    $("#diceBox").fadeIn();
    for(var i=0; i<6; ++i){
        var die = i+1;
        $("#dieOne").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");
        $("#dieTwo").append("<img src='assets/img/dice/face"+die+".png' id='face"+die+"' />");

        $("#dieOne #face"+die+"").hide();
        $("#dieTwo #face"+die+"").hide();
    }
    setFaces(1,1);

    $(".btn").click(function(){
        hideFace(faceOne,faceTwo);
        showAngle();
        setTimeout(function () {
            hideAngle();
        }, 750);
        setTimeout(function(){
            finalRoll();
        },751);
    });
});
