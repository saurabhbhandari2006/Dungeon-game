
var selPort = [];   //Selected Portals
var selMons = [];   //Selected Monsters
var flag = 0;       //Flag value
var portalPos = []; //Positions of elements on the map is held here
var map = 0;

/* Function: initEverything
 Description:
 Main initialization function, which is called first in the program flow.
 Status:
 COMPLETED
 */

function initEverything()
{
    SetPortal();
    SetMonsters();
//     SetSeer();
}

/*
 Function: getPosition
 Description:
 Position getter function. Calculates positions after checking for conditions.
 Status:
 COMPLETED
 */
function getPosition(pos)
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

    return pos;
}

/*
 Function: SetPortal
 Description:
 Function to randomly select and place 3 portals on the map.
 Status:
 COMPLETED
 */
function SetPortal()
{
    var pos;

    flag = Math.floor(Math.random() * (4-1) + 1);

    selPort = shuffle(portals);

    for(var i=0; i<flag; i++)
    {
        pos = getPosition();

        var targetDiv = document.getElementById(pos);

        targetDiv.style.backgroundColor = selPort[i].backgroundColor;

        portalPos.push({mapID:map, colID:portals[i].colorID, getPos:pos});
    }

    console.log(portalPos);
}

/*
 Function: SetSeer
 Description:
 Function to randomly assign either 1 or no Seers on the map grid
 Status:
 Work in progress
 */
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
        if (positions[i].ps == pos)
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
}

/*
 Function: SetMonsters
 Description:
 Function to randomly assign 3 monsters on the map.
 Status:
 COMPLETED
 */
function SetMonsters()
{
    var mL = 0;
    var mR = 0;

    flag = Math.floor(Math.random() * (4-1) + 1);

    selMons = shuffle(monsters);

    for(var i = 0; i<3; i++)
    {
        var targetDiv = document.getElementById(getPosition().toString());

        targetDiv.innerHTML = selMons[i].image;
    }
}