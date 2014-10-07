
var selPort = [];
var selMons = [];
var flag = 0;
var positions = [];


function initEverything()
{
   SetPortal();
    SetMonsters();
    //SetSeer();
}

function SetPortal()
{
    var mL = 0;
    var mR = 0;

    flag = Math.floor(Math.random() * (4-1) + 1);

    selPort = shuffle(portals);

    //console.log(portals);
    //console.log(selPort);

    document.getElementById("console1").innerHTML = flag;

    for(var i = 0; i<flag; i++)
    {
        //draw.push(selPort);

        mL = Math.floor(Math.random() * (4-1) + 1);
        mR = Math.floor(Math.random() * (4-1) + 1);

        while(mL == 2 && mR == 2)
        {
            mL = Math.floor(Math.random() * (4-1) + 1);
            mR = Math.floor(Math.random() * (4-1) + 1);
        }

        var pos = mL.toString() + mR.toString();
        var targetDiv = document.getElementById(pos.toString());

        targetDiv.style.backgroundColor = selPort[i].backgroundColor;
        positions.push({ps:pos, posFlags:1});
    }

    //console.log(positions);
}

function SetSeer()
{
    var mL = 0;
    var mR = 0;

    mL = Math.floor(Math.random() * (4-1) + 1);
    mR = Math.floor(Math.random() * (4-1) + 1);

    while(mL == 2 && mR == 2)
      {
        mL = Math.floor(Math.random() * (4-1) + 1);
        mR = Math.floor(Math.random() * (4-1) + 1);
      }

    var pos = mL.toString() + mR.toString();

    for(var i=0; i<=positions.length; i++)
    {
        console.log(i);
        if (positions[i].posFlags == 1)
        {
            mL = Math.floor(Math.random() * (4 - 1) + 1);
            mR = Math.floor(Math.random() * (4 - 1) + 1);

            while (mL == 2 && mR == 2)
            {
                mL = Math.floor(Math.random() * (4 - 1) + 1);
                mR = Math.floor(Math.random() * (4 - 1) + 1);
            }
        }
    }

     pos = mL.toString() + mR.toString();

    var targetDiv = document.getElementById(pos.toString());
    console.log(targetDiv);

    targetDiv.innerHTML = "<span style='color:#fff;'>SEER!</span>";
    positions.push({ps:pos, posFlags:1});

    //console.log(positions);
}

function SetMonsters()
{
    var mL = 0;
    var mR = 0;

    flag = Math.floor(Math.random() * (4-1) + 1);

    selMons = shuffle(monsters);

    //console.log(portals);
    console.log(selMons);

    for(var i = 1; i<=3; i++)
    {
        //draw.push(selPort);

        mL = Math.floor(Math.random() * (4-1) + 1);
        mR = Math.floor(Math.random() * (4-1) + 1);

        while(mL == 2 && mR == 2)
        {
            mL = Math.floor(Math.random() * (4-1) + 1);
            mR = Math.floor(Math.random() * (4-1) + 1);
        }

        var pos = mL.toString() + mR.toString();
        var targetDiv = document.getElementById(pos.toString());

        targetDiv.innerHTML = selMons[i].image;
        positions.push({ps:pos, posFlags:1});
    }

    //console.log(positions);
}