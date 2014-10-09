
var selPort = [];       //Selected Portals
var selMons = [];       //Selected Monsters
var flag = 0;           //Flag value
var portalPos = [];     //Positions of portals
var monsterPos = [];    //Positions of monsters
var posArr = [];        //Array of filled positions
var mapID = 0;          //map ID
var mapColor = 0;       //map color
var c = 0;

/* Function: initEverything
    Description:
        Main initialization function, which is called first in the program flow.
    Status:
        COMPLETED
 */
function initEverything()
{
   enterDungeon();
 //   setMonsters();
//     SetSeer();
}

/*
    Function: getPosition
    Description:
        Position getter function. Calculates positions after checking for conditions.
    Status:
        COMPLETED
 */
function getPosition()
{
    var c = 0;
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

        if(c==0)
        {
            posArr.push(pos);
            c++;
        }
        else
        {
            for(var i = 0; i<=posArr.length; i++)
            {
                while(pos == posArr[i])
                {
                    mL = Math.floor(Math.random() * (4-1) + 1);
                    mR = Math.floor(Math.random() * (4-1) + 1);

                    while(mL == 2 && mR == 2)
                    {
                        mL = Math.floor(Math.random() * (4-1) + 1);
                        mR = Math.floor(Math.random() * (4-1) + 1);
                    }

                    pos = mL.toString() + mR.toString();
                }

                posArr.push(pos);
                c++;
            }

        }

    return pos;
}

function enterDungeon()
{
    mapID++;

    selPort = shuffle(portals);

    if(mapID==1)
    {
        document.getElementById("mainmatrix").style.backgroundColor = selPort[0].backgroundColor;
        mapColor=selPort[0].colorID;
            setPortal();
    }
    else
    {
        mapColor=portals[x].colorID;
            setPortal();
    }

    setMonsters();
    setPlayer();
}


function setPlayer()
{
    var pos = "22";

    var targetDiv = document.getElementById(pos);

    targetDiv.innerHTML = "<img src='assets/img/player.png' />";
}
/*
    Function: SetPortal
    Description:
        Function to randomly select and place 3 portals on the map.
    Status:
        COMPLETED
 */
function setPortal()
{
    var pos;

    flag = Math.floor(Math.random() * (4-1) + 1);
    console.log(flag);
    for(var i=0; i<flag; i++)
    {
        pos = getPosition();
        console.log(i);
        var targetDiv = document.getElementById(pos);

        if(selPort[i].colorID != mapColor)
        {
            targetDiv.style.backgroundColor = selPort[i].backgroundColor;
            console.log(selPort[i]);
        }
        else
        {
            targetDiv.style.backgroundColor = selPort[i+3].backgroundColor;
            console.log(selPort);
        }

        console.log(targetDiv);
        portalPos.push({mapID:mapID, colID:selPort[i].colorID, getPos:pos});
    }

    console.log(portalPos);
}

/*
    Function: SetMonsters
    Description:
        Function to randomly assign 3 monsters on the map.
    Status:
        COMPLETED
 */
function setMonsters()
{
    selMons = shuffle(monsters);
    var pos = "";

    flag = Math.floor(Math.random() * (4-1) +1);
    for(var i = 0; i<flag; i++)
    {
        pos = getPosition();
        var targetDiv = document.getElementById(pos);

        console.log(pos);

        targetDiv.innerHTML = selMons[i].image;

        console.log(targetDiv);

        //monsterPos.push()
    }

    console.log(posArr);
}

function drawMonsters()
{

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
        if (portalPos[i].ps == pos)
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