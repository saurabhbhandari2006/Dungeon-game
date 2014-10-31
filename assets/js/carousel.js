var count = 1;;

function initCarousel()
{
    $('#gameAttack_wrapper').hide();
    $("#carousel").fadeIn();
    $('#ppt img').attr("src", "assets/img/carousel/" + count + ".jpg");
}

function onClick(x)
{
    if(x==1)
    {
        if(count<1)
            count=1;
        count--;
        $('#ppt img').fadeOut();
        $('#ppt img').hide().attr("src", "assets/img/carousel/" + count + ".jpg");
        $('#ppt img').fadeOut(0);
        $('#ppt img').fadeIn();
    }
    if(x==2)
    {
        count++;
        if(count>4)
            count=4;
        $('#ppt img').fadeOut();
        $('#ppt img').hide().attr("src", "assets/img/carousel/" + count + ".jpg");
        $('#ppt img').fadeOut(0);
        $('#ppt img').fadeIn();
    }
    if(x==3)
    {
        $('#carousel').fadeOut(500);
        $('#gameAttack_wrapper').delay(250).fadeIn(500);

    }
}