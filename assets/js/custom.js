var portals = new Array();
var count = 0;

function SetPortal()
{
    var fg = 0;
    var pID  = 0;
    var mL = 0;
    var mR = 0;

    fg = Math.floor(Math.random() * (4-1) + 1);

    document.getElementById("console1").innerHTML = fg;

    for(var i = 1; i<=fg; i++)
    {
        mL = Math.floor(Math.random() * (4-1) + 1);
        mR = Math.floor(Math.random() * (4-1) + 1);

        while(mL == 2 && mR == 2)
        {
            mL = Math.floor(Math.random() * (4-1) + 1);
            mR = Math.floor(Math.random() * (4-1) + 1);
        }

        var pos = mL.toString() + mR.toString();
        var targetDiv = document.getElementById(pos.toString());

        pID = Math.floor(Math.random() * (6-1) + 1);
        if(pID == 1)
            targetDiv.innerHTML = "Red";
        if(pID == 2)
            targetDiv.innerHTML = "Green";
        if(pID == 3)
            targetDiv.innerHTML = "Blue";
        if(pID == 4)
            targetDiv.innerHTML = "Yellow";
        if(pID == 5)
            targetDiv.innerHTML = "Orange";

        portals.push({id:i, ps:pos, puID:pID});
        count++;
    }

    document.getElementById("console2").innerHTML = portals.puID;

}