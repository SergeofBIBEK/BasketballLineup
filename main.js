//firebase vars
var CoachID = "";
var currentLineup = "";
var haveCoach = false;
var haveLineup = false;
var dataJSON;
var getDataComplete = false;
//local vars
var benchArrays = [["none"]];
var playingArrays = [["none"],[],[],[],[],[],["none"],[],[],[],[],[]];
var reorderArray = [];
//Completion Variables
var rowsDone = false;
var cellsDone = false;
var totalRowDone = false;
var benchDone = false;
var saveComplete = false; 

function signedInHandler()
{
    document.getElementById("firebaseui-auth-container").style.display = "none";

    CoachID = currentUser.uid;
    haveCoach = true;
    init();
}

function signedOutHandler()
{
    haveCoach = false;
    document.getElementById("logoutButton").style.display = "none";
    init();
}

function init()
{
    checkQueryString();
    if (!haveCoach)
    {
        document.getElementById("EnterCoachID").style.display = "block";
    }
    if (haveCoach && !haveLineup)
    {
        document.getElementById("ChooseLineup").style.display = "block";
        //Get Firebase list of Lineups
        getFirebaseData();
        setLineupList();
    }
    if (haveCoach && haveLineup)
    {
        document.getElementById("theContainer").style.display = "block";
        //Get full Firebase data
        getFirebaseData();
        createPlayerRows();
        createPlayerCells();
        fillPlayerData();
        createTotalRow();
        fillTotals();
        setUpBench();
        setNumPeriods();
        fillStatTable();
    }
}
function checkQueryString()
{
    if (window.location.search != "")
    {
        var tempVars = window.location.search.substring(1).split("&");
        var tempArray = [];
        for (var i = 0; i < tempVars.length; i++)
        {
            tempArray.push(tempVars[i].split("=")[0]);
            tempArray.push(tempVars[i].split("=")[1]);
        }
        if (tempArray.indexOf("LineupID") != -1 && tempArray[eval(tempArray.indexOf("LineupID") + 1)] != "")
        {
            currentLineup = unescape(tempArray[eval(tempArray.indexOf("LineupID") + 1)]);
            haveLineup = true;
        }
    }
}
function getFirebaseData()
{

    if (haveCoach && !haveLineup)
    {
        firebase.database().ref(CoachID).once('value', function(coachLineups){
            dataJSON = coachLineups.val();
            getDataComplete = true;
        });
    }
    if (haveCoach && haveLineup)
    {
        firebase.database().ref(CoachID + "/" + currentLineup).once('value', function(lineupData){
            dataJSON = lineupData.val();
            getDataComplete = true;
        });
    }
}
function createPlayerRows()
{
    if (getDataComplete)
    {
        var count = 0;
        for (var player in dataJSON)
        {
            if (player != "playPeriods")
            {
                //Create a row for each player.
                var newRow = document.createElement("div");
                newRow.id = "player" + count + "Row";
                newRow.className = "playerRow";
                document.getElementById("firstTable").appendChild(newRow);
                count++;
            }
        }
        rowsDone = true;
    }
    else
    {
        setTimeout(createPlayerRows, 100);
    }
}
function createPlayerCells()
{
    if (rowsDone)
    {
        var rowArray = document.getElementsByClassName("playerRow");
        for (var i = 0; i < rowArray.length; i++)
        {
            for (var j = 0; j < 13; j++)
            {
                var newCell = document.createElement("div");
                newCell.id = "player" + i + "Cell" + j;
                newCell.className = "playerCell";
                newCell.setAttribute("picked","false");
                if (j == 6)
                {
                    newCell.setAttribute("halftime", "true");
                }
                if (j == 1 || j == 7)
                {
                    newCell.setAttribute("hide1st", "false");
                }
                if (j == 0)
                {
                    newCell.setAttribute("onclick","colorRow(this)");
                    newCell.className = "playerNameCell";
                }
                document.getElementById("player" + i + "Row").appendChild(newCell);
            }
        }
        cellsDone = true;
    }
    else
    {
        setTimeout(createPlayerCells, 100);
    }
}
function fillPlayerData()
{
    if (cellsDone && getDataComplete)
    {
        for (var player in dataJSON)
        {
            if (player != "playPeriods")
            {
                document.getElementById("player" + dataJSON[player].Skill + "Cell0").innerHTML = "<p class=\"playerNameP\">" + player + "</p>";
                for (var j = 1; j < 6; j++)
                {
                    var newCheckbox = document.createElement("input");
                    newCheckbox.type = "checkbox";
                    newCheckbox.id = "player" + dataJSON[player].Skill + "Cell" + j + "Checkbox";
                    newCheckbox.className = "playingCheckbox";
                    newCheckbox.style.display = "none";
                    newCheckbox.setAttribute("onclick","checkboxHandler(this)");
                    if (dataJSON[player].Checkboxes.split(",")[j] == 1)
                    {
                        newCheckbox.setAttribute("checked", "checked");
                    }
                    document.getElementById("player" + dataJSON[player].Skill + "Cell" + j).appendChild(newCheckbox);
                    var newLabel = document.createElement("label");
                    newLabel.htmlFor = "player" + dataJSON[player].Skill + "Cell" + j + "Checkbox";
                    newLabel.id = "player" + dataJSON[player].Skill + "Cell" + j + "CheckboxLabel";
                    document.getElementById("player" + dataJSON[player].Skill + "Cell" + j).appendChild(newLabel);
                    var newImage = document.createElement("img");
                    newImage.src = "unchecked.png";
                    newImage.style.height = "15px";
                    newImage.style.width = "auto";
                    newImage.className = "uncheckedImg";
                    document.getElementById("player" + dataJSON[player].Skill + "Cell" + j + "CheckboxLabel").appendChild(newImage);
                    var newImage2 = document.createElement("img");
                    newImage2.src = "checked.png";
                    newImage2.style.height = "15px";
                    newImage2.style.width = "auto";
                    newImage2.className = "checkedImg";
                    document.getElementById("player" + dataJSON[player].Skill + "Cell" + j + "CheckboxLabel").appendChild(newImage2);
                }
                document.getElementById("player" + dataJSON[player].Skill + "Cell6").innerHTML = "<p>|</p>";
                for (var j = 7; j < 12; j++)
                {
                    var newCheckbox = document.createElement("input");
                    newCheckbox.type = "checkbox";
                    newCheckbox.id = "player" + dataJSON[player].Skill + "Cell" + j + "Checkbox";
                    newCheckbox.className = "playingCheckbox";
                    newCheckbox.style.display = "none";
                    newCheckbox.setAttribute("onclick","checkboxHandler(this)");
                    if (dataJSON[player].Checkboxes.split(",")[j] == 1)
                    {
                        newCheckbox.setAttribute("checked", "checked");
                    }
                    document.getElementById("player" + dataJSON[player].Skill + "Cell" + j).appendChild(newCheckbox);
                    var newLabel = document.createElement("label");
                    newLabel.htmlFor = "player" + dataJSON[player].Skill + "Cell" + j + "Checkbox";
                    newLabel.id = "player" + dataJSON[player].Skill + "Cell" + j + "CheckboxLabel";
                    document.getElementById("player" + dataJSON[player].Skill + "Cell" + j).appendChild(newLabel);
                    var newImage = document.createElement("img");
                    newImage.src = "unchecked.png";
                    newImage.style.height = "15px";
                    newImage.style.width = "auto";
                    newImage.className = "uncheckedImg";
                    document.getElementById("player" + dataJSON[player].Skill + "Cell" + j + "CheckboxLabel").appendChild(newImage);
                    var newImage2 = document.createElement("img");
                    newImage2.src = "checked.png";
                    newImage2.style.height = "15px";
                    newImage2.style.width = "auto";
                    newImage2.className = "checkedImg";
                    document.getElementById("player" + dataJSON[player].Skill + "Cell" + j + "CheckboxLabel").appendChild(newImage2);
                }
            }
        }
        document.getElementById("mainHeader").innerHTML += " for: " + currentLineup;
        document.getElementById("assignmentsList").innerHTML += ": (" + (Object.keys(dataJSON).length - 1) + " players)";
    }
    else
    {
        setTimeout(fillPlayerData, 100);
    }
}
function createTotalRow()
{
    if (cellsDone && getDataComplete)
    {
        var newRow = document.createElement("div");
        newRow.id = "totalRow";
        newRow.className = "totalRow";
        document.getElementById("firstTable").appendChild(newRow);
        for (var j = 0; j < 13; j++)
        {
            var newCell = document.createElement("div");
            newCell.id = "totalCell" + j;
            newCell.className = "totalCell";
            if (j == 6)
            {
                newCell.setAttribute("halftime", "true");
                newCell.innerHTML = "<p>|</p>"
            }
            if (j == 0)
            {
                newCell.innerHTML = "<p>Totals</p>"
            }
            if (j == 1 || j == 7)
            {
                newCell.setAttribute("hide1st", "false");
            }
            document.getElementById("totalRow").appendChild(newCell);
        }
        totalRowDone = true;
    }
    else
    {
        setTimeout(createTotalRow, 100);
    }
}
function fillTotals()
{
    if (totalRowDone)
    {
        var count = 0;
        for (var player in dataJSON)
        {
            if (player != "playPeriods")
            {
                document.getElementById("player" + count + "Cell12").innerHTML = 0;
                count++;
            }
        }
        for (var j = 1; j < 6; j++)
        {
            document.getElementById("totalCell" + j).innerHTML = 0;
        }
        for (var j = 7; j < 13; j++)
        {
            document.getElementById("totalCell" + j).innerHTML = 0;
        }
    }
    else
    {
        setTimeout(fillTotals, 100);
    }
}
function setUpBench()
{
    if (getDataComplete)
    {
        for (var i = 1; i < 12; i++)
        {
            if (i == 6)
            {
                benchArrays.push(["none"]);
            }
            else
            {
                var newArray = [];
                for (var player in dataJSON)
                {
                    if (player != "playPeriods")
                    {
                        newArray.push(dataJSON[player]);
                    }
                }
                benchArrays.push(newArray);
            }
        }
        updateBench();
        benchDone = true;
        var currentTop = parseInt(document.getElementById("dynamicHeight").style.top);
        currentTop += (Object.keys(dataJSON).length - 1) * 20;
        document.getElementById("dynamicHeight").style.top = currentTop;
        var currentHeight = parseInt(document.getElementById("theContainer").style.height);
        currentHeight += (Object.keys(dataJSON).length - 1) * 32;
        document.getElementById("theContainer").style.height = currentHeight;
        var supportTop = parseInt(document.getElementById("supportButton").style.top);
        supportTop += (Object.keys(dataJSON).length - 1) * 32;
        document.getElementById("supportButton").style.top = supportTop;
    }
    else
    {
        setTimeout(setUpBench, 100);
    }
}
function setNumPeriods()
{
    if (totalRowDone && benchDone)
    {
        if (dataJSON.playPeriods == 4)
        {
            var tempArray = $('[hide1st]');
            for (var i = 0; i < tempArray.length; i++)
            {
                tempArray[i].setAttribute("hide1st", "true");
            }
        }
        $('.playingCheckbox:checkbox:checked').each(function () {checkboxHandler(this);});
    }
    else
    {
        setTimeout(setNumPeriods,100);
    }
}
function updateBench()
{
    for (var j = 1; j < 12; j++)
    {
        if (j != 6)
        {
            document.getElementById("benchCell" + j).innerHTML = "";
            for (var k = 0; k < benchArrays[j].length; k++)
            {
                var newP = document.createElement("p");
                newP.innerHTML = benchArrays[j][k].Name;
                newP.className = "playerNameP";
                document.getElementById("benchCell" + j).appendChild(newP);
            }
        }
    }
}
function checkboxHandler(e)
{
    var playerNum = e.id.split("Cell")[0].split("player")[1];
    var columnNum = e.id.split("Cell")[1].split("Checkbox")[0];
    var playerName = document.getElementById(e.id.split("Cell")[0] + "Cell0").firstChild.innerHTML;
    var playerTotal = parseInt(document.getElementById("player" + playerNum + "Cell12").innerHTML);
    var columnTotal = parseInt(document.getElementById("totalCell" + columnNum).innerHTML);
    if (e.checked == true)
    {
        document.getElementById("player" + playerNum + "Cell" + columnNum).setAttribute("picked", "true");
        if (columnNum != 5 && columnNum != 11)
        {
            document.getElementById("player" + playerNum + "Cell" + (parseInt(columnNum) + 1)).setAttribute("playedAlready","true");
        }
        if (columnNum == 5)
        {
            document.getElementById("player" + playerNum + "Cell" + (parseInt(columnNum) + (2 - (dataJSON.playPeriods - 5)))).setAttribute("playedAlready","true");
        }
        document.getElementById("player" + playerNum + "Cell12").innerHTML = playerTotal + 1;
        document.getElementById("totalCell" + columnNum).innerHTML = columnTotal + 1;
        if (parseInt(document.getElementById("totalCell" + columnNum).innerHTML) < 5)
        {
            document.getElementById("totalCell" + columnNum).style.backgroundColor = "#5d5e5f";
        }
        if (parseInt(document.getElementById("totalCell" + columnNum).innerHTML) == 5)
        {
            document.getElementById("totalCell" + columnNum).style.backgroundColor = "#6b897c";
        }
        if (parseInt(document.getElementById("totalCell" + columnNum).innerHTML) > 5)
        {
            document.getElementById("totalCell" + columnNum).style.backgroundColor = "#8f3e02";
        }
        //addToLineup
        playingArrays[columnNum].push(dataJSON[playerName]);
        updateLineup();
        //removeFromBench
        for (var i = 0; i < benchArrays[columnNum].length; i++)
        {
            if (benchArrays[columnNum][i].Name == playerName)
            {
                benchArrays[columnNum].splice(i, 1);
            }
        }
        updateBench();
    }
    if (e.checked == false)
    {
        document.getElementById("player" + playerNum + "Cell" + columnNum).setAttribute("picked", false);
        if (columnNum != 5 && columnNum != 11)
        {
            document.getElementById("player" + playerNum + "Cell" + (parseInt(columnNum) + 1)).setAttribute("playedAlready", "false");
        }
        if (columnNum == 5)
        {
            document.getElementById("player" + playerNum + "Cell" + (parseInt(columnNum) + (2 - (dataJSON.playPeriods - 5)))).setAttribute("playedAlready", "false");
        }
        document.getElementById("player" + playerNum + "Cell12").innerHTML = playerTotal - 1;
        document.getElementById("totalCell" + columnNum).innerHTML = columnTotal - 1;
        if (parseInt(document.getElementById("totalCell" + columnNum).innerHTML) < 5)
        {
            document.getElementById("totalCell" + columnNum).style.backgroundColor = "#5d5e5f";
        }
        if (parseInt(document.getElementById("totalCell" + columnNum).innerHTML) == 5)
        {
            document.getElementById("totalCell" + columnNum).style.backgroundColor = "#6b897c";
        }
        if (parseInt(document.getElementById("totalCell" + columnNum).innerHTML) > 5)
        {
            document.getElementById("totalCell" + columnNum).style.backgroundColor = "#8f3e02";
        }
        //remove from lineup
        for (var i = 0; i < playingArrays[columnNum].length; i++)
        {
            if (playingArrays[columnNum][i].Name == playerName)
            {
                playingArrays[columnNum].splice(i, 1);
            }
        }
        updateLineup();
        //add to bench
        benchArrays[columnNum].push(dataJSON[playerName]);
        updateBench();
    }
    if (parseInt(document.getElementById("player" + playerNum + "Cell12").innerHTML) == Math.floor((dataJSON.playPeriods * 10)/(Object.keys(dataJSON).length - 1)))
    {
        document.getElementById("player" + playerNum + "Cell12").style.backgroundColor = "#6b897c";
    }
    if (parseInt(document.getElementById("player" + playerNum + "Cell12").innerHTML) == Math.ceil((dataJSON.playPeriods * 10)/(Object.keys(dataJSON).length - 1)))
    {
        document.getElementById("player" + playerNum + "Cell12").style.backgroundColor = "#2a6c40";
    }
    if (parseInt(document.getElementById("player" + playerNum + "Cell12").innerHTML) < Math.floor((dataJSON.playPeriods * 10)/(Object.keys(dataJSON).length - 1)))
    {
        document.getElementById("player" + playerNum + "Cell12").style.backgroundColor = "#5d5e5f";
    }
    if (parseInt(document.getElementById("player" + playerNum + "Cell12").innerHTML) > Math.ceil((dataJSON.playPeriods * 10)/(Object.keys(dataJSON).length - 1)))
    {
        document.getElementById("player" + playerNum + "Cell12").style.backgroundColor = "#8f3e02";
    }
    updateTotal();
}
function updateTotal()
{
    var runningTotal = 0;
    for (var player in dataJSON)
    {
        if (player != "playPeriods")
        {
            runningTotal += parseInt(document.getElementById("player" + dataJSON[player].Skill + "Cell12").innerHTML);
        }
    }
    document.getElementById("totalCell12").innerHTML = runningTotal;
    if (parseInt(document.getElementById("totalCell12").innerHTML) < (dataJSON.playPeriods * 10))
    {
        document.getElementById("totalCell12").style.backgroundColor = "#5d5e5f";
    }
    if (parseInt(document.getElementById("totalCell12").innerHTML) == (dataJSON.playPeriods * 10))
    {
        document.getElementById("totalCell12").style.backgroundColor = "#6b897c";
    }
    if (parseInt(document.getElementById("totalCell12").innerHTML) > (dataJSON.playPeriods * 10))
    {
        document.getElementById("totalCell12").style.backgroundColor = "#8f3e02";
    }
}
function updateLineup()
{
    for (var j = 1; j < 12; j++)
    {
        //if (dataJSON.playPeriods == 4)
        //{
        playingArrays[j].sort(function (a, b) {
            return a.Skill - b.Skill;
        });
        //}
        if (j != 6)
        {
            for (var l = 1; l < 6; l++)
            {
                document.getElementById("playingCell" + l + "x" + j).innerHTML = "";
            }
            for (var k = 0; k < playingArrays[j].length; k++)
            {
                if (k < 5)
                {
                    document.getElementById("playingCell" + eval(k + 1) + "x" + j).innerHTML = "<p class=\"playerNameP\">" + playingArrays[j][k].Name + "</p>";
                }
            }
        }
    }
}
function setLineupList()
{
    if (getDataComplete == true)
    {
        document.getElementById("lineupSelector").innerHTML = "";
        for (var lineup in dataJSON)
        {
            var newOption = document.createElement("option");
            newOption.value = lineup;
            newOption.innerHTML= lineup;
            document.getElementById("lineupSelector").appendChild(newOption);
        }
    }
    else
    {
        setTimeout(setLineupList, 100);
    }
}
function navToLineup()
{
    var lineupVar = document.getElementById("lineupSelector").value;
    window.open("/?LineupID=" + lineupVar, "_self");
}
function setUpNewLineup()
{
    var newLineup = unescape(document.getElementById("newLineupInput").value).split("/").join("").split(" ").join("");
    var newPlayPeriods = document.getElementById("newLineupInput2").value.split("/").join("").split(" ").join("");
    if (newLineup != "" && newPlayPeriods != "")
    {
        try
        {
            firebase.database().ref(CoachID + "/" + newLineup).update({
                "playPeriods": newPlayPeriods,
            },function(error){
                if (error)
                {
                    alert("An error occurred saving your data.");
                }
                else
                {
                    window.location.search = "?LineupID=" + newLineup;
                }
            });
        }
        catch(e)
        {
            alert("An error occurred saving your data. Check that the LineupID doesn't contain invalid characters such as \".\", \"#\", \"$\", \"[\", or \"]\"");
        }
    }
    else
    {
        alert("Please Fill In All Fields");
    }
}
function addNewPlayer()
{
    document.getElementById("newPlayerDiv").style.display = "block";
    document.getElementById("removePlayerDiv").style.display = "none";
}
function saveNewPlayer()
{
    var newCount = 0;
    var alreadyExists = false;
    var newPlayer = unescape(document.getElementById("newPlayerName").value).split("/").join("");
    for (var player in dataJSON)
    {
        if (player != "playPeriods")
        {
            if (player == newPlayer)
            {
                alreadyExists = true;
            }
            newCount++;
        }
    }
    if (alreadyExists || newPlayer == "playPeriods" || newPlayer == "")
    {
        alert("Invalid Name, Try Again");
    }
    else
    {
        try
        {
            firebase.database().ref(CoachID + "/" + currentLineup + "/" + newPlayer).update({
                "Name": newPlayer,
                "Skill": newCount,
                "Checkboxes": "0,0,0,0,0,0,0,0,0,0,0,0,0",
            },function(error){
                if (error)
                {
                    alert("An error occurred saving your data.");
                }
                else
                {
                    window.location.search = "?LineupID=" + currentLineup;
                }
            });
        }
        catch(e)
        {
            alert("An error occurred saving your data. Check that the player name doesn't contain invalid characters such as \".\", \"#\", \"$\", \"[\", or \"]\"");
        }
    }
    //save the new player
    if (confirm("Do you wish to save your current assignments?"))
    {
        saveLineup(1);
    }
}
function saveLineup(num)
{
    var thisNum = 0;
    thisNum += parseInt(num);
    var thisCount = 0;
    for (var player in dataJSON)
    {
        if (player != "playPeriods")
        {
            var tempString = "0";
            for (var checkbox = 1; checkbox < 12; checkbox++)
            {
                if (checkbox != 6)
                {
                    if (document.getElementById("player" + dataJSON[player].Skill + "Cell" + checkbox + "Checkbox").checked)
                    {
                        tempString += ",1";
                    }
                    else
                    {
                        tempString += ",0";
                    }
                }
                else
                {
                    tempString += ",0";
                }
            }
            tempString += ",0";
            firebase.database().ref(CoachID + "/" + currentLineup + "/" + player).update({
                "Checkboxes": tempString,
            },function(error){
                if (error)
                {
                    alert("An error occurred saving your data.");
                }
                else if (thisNum == 0)
                {
                    window.location.search = "?LineupID=" + currentLineup;
                }
                else if (thisNum == 2)
                {
                    window.location.search = "";
                }
                else if (thisNum == 3 && thisCount == Object.keys(dataJSON).length)
                {
                    removePlayerPart2();
                }
            });
        }
        thisCount++;
    }
}
function copyLineup()
{
    var copyToLineup = unescape(prompt("Please enter lineup name/ID to copy to. | Note: This will create a new lineup if there is not one, and it will overwrite existing lineups.")).split("/").join("").split(" ").join("");
    if (copyToLineup == "" || copyToLineup == "playPeriods")
    {
        alert("Invalid Name");
    }
    else
    {
        firebase.database().ref(CoachID + "/" + copyToLineup).update({
            "playPeriods": dataJSON.playPeriods,
        });
        var numLoops = 1;
        for (player in dataJSON)
        {
            if (player != "playPeriods")
            {
                if (numLoops == (Object.keys(dataJSON).length - 1 ))
                {
                    try
                    {
                        firebase.database().ref(CoachID + "/" + copyToLineup + "/" + player).update({
                            "Checkboxes": dataJSON[player].Checkboxes,
                            "Skill": dataJSON[player].Skill,
                            "Name": dataJSON[player].Name,
                        },function(error){
                            if (error)
                            {
                                alert("An error occurred saving your data.");
                            }
                            else
                            {
                                if (confirm("Copied successfully to: " + copyToLineup + " Click OK to go there, Cancel to stay on this Lineup"))
                                {
                                    window.location.search = "?LineupID=" + copyToLineup;
                                }
                            }
                        });
                    }
                    catch(e)
                    {
                        alert("An error occurred saving your data. Check that the LineupID doesn't contain invalid characters such as \".\", \"#\", \"$\", \"[\", or \"]\"");
                    }
                }
                else
                {
                    try
                    {
                        firebase.database().ref(CoachID + "/" + copyToLineup + "/" + player).update({
                            "Checkboxes": dataJSON[player].Checkboxes,
                            "Skill": dataJSON[player].Skill,
                            "Name": dataJSON[player].Name,
                        });
                    }
                    catch(e)
                    {
                        alert("An error occurred saving your data. Check that the LineupID doesn't contain invalid characters such as \".\", \"#\", \"$\", \"[\", or \"]\"");
                    }
                }
            }
            numLoops++;
        }
    }
}
function backtoCoach()
{
    if (confirm("Do you wish to save your current assignments first?"))
    {
        saveLineup(2);
    }
    else
    {
        location.search = "";
    }
}
function deleteLineup()
{
    var lineupToDelete = unescape(document.getElementById("lineupSelector").value);
    if (confirm("Are you sure you wish to delete " + lineupToDelete + "? This action cannot be undone."))
    {
        firebase.database().ref(CoachID + "/" + lineupToDelete).remove(function(){window.location.search = "";});
    }
}
function deletePlayer()
{
    document.getElementById("removePlayerDiv").style.display = "block";
    document.getElementById("newPlayerDiv").style.display = "none";
    for (var player in dataJSON)
    {
        if (player != "playPeriods")
        {
            var newOption = document.createElement("option");
            newOption.value = player;
            newOption.innerHTML= player;
            document.getElementById("removePlayerName").appendChild(newOption);
        }
    }
}
function removePlayer()
{
    if (confirm("Do you wish to save your current assignments first?"))
    {
        saveLineup(3);
    }
    else
    {
        removePlayerPart2();
    }
}
function removePlayerPart2()
{
    var playerToDelete = unescape(document.getElementById("removePlayerName").value);
    var decision = confirm("Are you sure you wish to delete " + playerToDelete + "? This action cannot be undone.");
    if (decision)
    {
        var tempArray =[];
        delete dataJSON[playerToDelete];
        for (var player in dataJSON)
        {
            if (player != "playPeriods")
            {
                tempArray.push(dataJSON[player]);
            }
        }
        tempArray.sort(function (a, b) {
            return a.Skill - b.Skill;
        });
        for (var i = 0; i < tempArray.length; i++)
        {
            dataJSON[tempArray[i].Name].Skill = i;
        }
        for (var player in dataJSON)
        {
            if (player != "playPeriods")
            {
                firebase.database().ref(CoachID + "/" + currentLineup + "/" + player).update({
                    "Skill": dataJSON[player].Skill,
                });
            }
        }
    }
    if (decision && playerToDelete != "playPeriods" && playerToDelete != "")
    {
        firebase.database().ref(CoachID + "/" + currentLineup + "/" + playerToDelete).remove(function(){window.location.search = "?LineupID=" + currentLineup});
    }
}
function reorderPlayer()
{
    document.getElementById("reorderDiv").style.display = "block";
    document.getElementById("theContainer").style.display = "none";
    if (confirm("Do you wish to save your current assignments first?"))
    {
        saveLineup(1);
    }
    var tempArray = []
    for (var player in dataJSON)
    {
        if (player != "playPeriods")
        {
            tempArray.push(dataJSON[player]);
        }
    }
    tempArray.sort(function (a, b) {
        return a.Skill - b.Skill;
    });
    reorderArray = [];
    for (var i = 0; i < tempArray.length; i++)
    {
        var newRow = document.createElement("div");
        newRow.className = "reorderRow";
        newRow.id = "reorderRow" + i;
        document.getElementById("reorderContainer").appendChild(newRow);
        var newA = document.createElement("div");
        newA.id = "ADiv" + i;
        newA.className = "reorderCell";
        document.getElementById("reorderRow" + i).appendChild(newA);
        var newB = document.createElement("div");
        newB.id = "BDiv" + i;
        newB.className = "reorderCell";
        document.getElementById("reorderRow" + i).appendChild(newB);
        reorderArray.push(tempArray[i].Name);
        var newP = document.createElement("p");
        newP.className = "playerNameP";
        newP.innerHTML = tempArray[i].Name;
        newP.style.position = "relative";
        newP.style.top = "-4px";
        newP.style.left = "5px";
        document.getElementById("ADiv" + i).appendChild(newP);
        var newUp = document.createElement("input");
        newUp.type = "image";
        newUp.src = "upButton.png"
        newUp.id = tempArray[i].Name + "Up";
        newUp.setAttribute("onclick", "movePlayer(this)");
        newUp.style.position = "relative";
        newUp.style.top = "1px";
        newUp.style.left = "5px";
        document.getElementById("BDiv" + i).appendChild(newUp);
        var newDown = document.createElement("input");
        newDown.type = "image";
        newDown.src = "downButton.png"
        newDown.id = tempArray[i].Name + "Down";
        newDown.setAttribute("onclick", "movePlayer(this)");
        newDown.style.position = "relative";
        newDown.style.top = "1px";
        newDown.style.left = "10px";
        document.getElementById("BDiv" + i).appendChild(newDown);
    }
}
function movePlayer(e)
{
    var playerToMove = e.id.split("Up")[0].split("Down")[0];
    var direction = e.id.split(playerToMove)[1];
    console.log(playerToMove + " goes " + direction);
    if (direction == "Up")
    {
        // move up
        var index = reorderArray.indexOf(playerToMove);
        reorderArray.splice(index,1);
        index--;
        reorderArray.splice(index,0,playerToMove);
    }
    else
    {
        //move down
        var index = reorderArray.indexOf(playerToMove);
        reorderArray.splice(index,1);
        index++;
        reorderArray.splice(index,0,playerToMove);
    }
    while(document.getElementById("reorderContainer").hasChildNodes())
    {
        document.getElementById("reorderContainer").removeChild(document.getElementById("reorderContainer").lastChild);
    }
    for (var i = 0; i < reorderArray.length; i++)
    {
        var newRow = document.createElement("div");
        newRow.className = "reorderRow";
        newRow.id = "reorderRow" + i;
        document.getElementById("reorderContainer").appendChild(newRow);
        var newA = document.createElement("div");
        newA.id = "ADiv" + i;
        newA.className = "reorderCell";
        document.getElementById("reorderRow" + i).appendChild(newA);
        var newB = document.createElement("div");
        newB.id = "BDiv" + i;
        newB.className = "reorderCell";
        document.getElementById("reorderRow" + i).appendChild(newB);
        var newP = document.createElement("p");
        newP.className = "playerNameP";
        newP.innerHTML = reorderArray[i];
        newP.style.position = "relative";
        newP.style.top = "-4px";
        newP.style.left = "5px";
        document.getElementById("ADiv" + i).appendChild(newP);
        var newUp = document.createElement("input");
        newUp.type = "image";
        newUp.src = "upButton.png"
        newUp.id = reorderArray[i] + "Up";
        newUp.setAttribute("onclick", "movePlayer(this)");
        newUp.style.position = "relative";
        newUp.style.top = "1px";
        newUp.style.left = "5px";
        document.getElementById("BDiv" + i).appendChild(newUp);
        var newDown = document.createElement("input");
        newDown.type = "image";
        newDown.src = "downButton.png"
        newDown.id = reorderArray[i] + "Down";
        newDown.setAttribute("onclick", "movePlayer(this)");
        newDown.style.position = "relative";
        newDown.style.top = "1px";
        newDown.style.left = "10px";
        document.getElementById("BDiv" + i).appendChild(newDown);
    }
}
function saveReorder()
{
    for (var i = 0; i < reorderArray.length; i++)
    {
        firebase.database().ref(CoachID + "/" + currentLineup + "/" + reorderArray[i]).update({
            "Skill": i,
        }, function(){
            window.location.search = "?LineupID=" + currentLineup;
        });
    }
}
function clearCheckboxes()
{
    $('input[type="checkbox"]:checked').each(function () {this.click();});
}
function colorRow(e)
{
    var playerNumber = e.id.split("Cell")[0];
    if (document.getElementById(playerNumber + "Row").style.borderColor == "")
    {
        document.getElementById(playerNumber + "Row").style.borderColor = "yellow";
    }
    else
    {
        document.getElementById(playerNumber + "Row").style.borderColor = "";
    }
}
function highlightColumn(colNum)
{
    for (player in dataJSON)
    {
        if (player != "playPeriods")
        {
            if (document.getElementById("player" + dataJSON[player].Skill + "Cell" + colNum).style.borderColor == "")
            {
                document.getElementById("player" + dataJSON[player].Skill + "Cell" + colNum).style.borderColor = "yellow";
            }
            else
            {
                document.getElementById("player" + dataJSON[player].Skill + "Cell" + colNum).style.borderColor = "";
            }
        }
    }
}
function backToHome()
{
    window.location.search = "";
}
function colorToggle()
{
    for (var i = 1; i < 6; i++)
    {
        if (document.getElementById("playingRow" + i).className == "playingRow" + i)
        {
            document.getElementById("playingRow" + i).className = "playingRowClear";
        }
        else
        {
            document.getElementById("playingRow" + i).className = "playingRow" + i;
        }
    }
}

function fillStatTable()
{
    var tableContainer = document.getElementById("statSheet");
    var statSheetHTML = "";
    
    //start table
    statSheetHTML += "<div class='statsTable'>";

    //first row
    statSheetHTML += "<div class='titleRow'>";
    
    //make cells
    statSheetHTML += "<div class='titleCell'>Num</div>";
    statSheetHTML += "<div class='titleCell'>Player</div>";
    statSheetHTML += "<div class='titleCell'>Points</div>";
    statSheetHTML += "<div class='titleCell'>Rebounds</div>";
    statSheetHTML += "<div class='titleCell'>Assists</div>";
    statSheetHTML += "<div class='titleCell'>Steals</div>";
    statSheetHTML += "<div class='titleCell'>Blocks</div>";
    
    statSheetHTML += "</div>";
    //end first row
    
    firebase.database().ref(CoachID + "/" + currentLineup).orderByChild("Skill").on('value', function(lineup){
        lineup.forEach(function(player){
            if (player.key != "playPeriods")
            {
                //make row
                statSheetHTML += "<div class='row'>";
                
                //make cells

                statSheetHTML += "<div class='cell'></div>";
                statSheetHTML += "<div class='cell'>" + player.key + "</div>";
                statSheetHTML += "<div class='cell'></div>";
                statSheetHTML += "<div class='cell'></div>";
                statSheetHTML += "<div class='cell'></div>";
                statSheetHTML += "<div class='cell'></div>";
                statSheetHTML += "<div class='cell'></div>";
                
                //end row
                statSheetHTML += "</div>";
            }
        });
        //end table
        statSheetHTML += "</div>";
        tableContainer.innerHTML = statSheetHTML;
    });

}

//Feature Requests
/*
            1. after the 5 for a period is selected, the three who didn't play are highlighted in the next column, so you know that you have to select them.
        */