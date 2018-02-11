<template>
<div>
	<div class="theContainer" id="theContainer" style="height:780px;">
                <img src="../assets/backToCoachButton.png" id="backToCoachButton" onclick="backtoCoach()" />

                <img src="../assets/goal.png" style="position: absolute;left: 545px;-webkit-transform: scale(-0.6, 0.6);transform: scale(-0.6, 0.6);top: -58px;" />

                <p id="mainHeader">Lineup</p>
                <p id="assignmentsList">Assignments</p>

                <img src="../assets/clearButton.png" id="clearButton" onclick="clearCheckboxes()" />
                <img id="copyLineupButton" src="../assets/copyLineupButton.png" onclick="copyLineup()" />
                <img id="saveLineupButton" src="../assets/saveLineupButton.png" onclick="saveLineup(0)" />

                <div class="firstTable" id="firstTable">
                    <div id="titleRow" class="titleRow">
                        <div class="titleCell"><p>Player</p></div>
                        <div class="titleCell" hide1st="false" onclick="highlightColumn(1)"><p>20-16 Minutes</p></div>
                        <div class="titleCell" onclick="highlightColumn(2)"><p>16-12 Minutes</p></div>
                        <div class="titleCell" onclick="highlightColumn(3)"><p>12-8 Minutes</p></div>
                        <div class="titleCell" onclick="highlightColumn(4)"><p>8-4 Minutes</p></div>
                        <div class="titleCell" onclick="highlightColumn(5)"><p>4-0 Minutes</p></div>
                        <div class="titleCell"><p>HALF<br>TIME</p></div>
                        <div class="titleCell" hide1st="false" onclick="highlightColumn(7)"><p>20-16 Minutes</p></div>
                        <div class="titleCell" onclick="highlightColumn(8)"><p>16-12 Minutes</p></div>
                        <div class="titleCell" onclick="highlightColumn(9)"><p>12-8 Minutes</p></div>
                        <div class="titleCell" onclick="highlightColumn(10)"><p>8-4 Minutes</p></div>
                        <div class="titleCell" onclick="highlightColumn(11)"><p>4-0 Minutes</p></div>
                        <div class="titleCell"><p>Totals</p></div>
                    </div>
                </div>
                <img id="newPlayerButton" onclick="addNewPlayer()" src="../assets/addPlayerButton.png" />

                <img id="deletePlayerButton" onclick="deletePlayer()" src="../assets/removePlayerButton.png" />

                <img id="reorderPlayerButton" onclick="reorderPlayer()" src="../assets/reorderPlayerButton.png" />

                <div id="newPlayerDiv" style="display: none">

                    <label for="newPlayerName">New Player Name:</label>
                    <input type="text" id="newPlayerName" style="background-color: rgba(255, 255,255, 0.3);border: 4px double black;height:30px;width:200px;" />
                    <img id="newPlayerSubmit" style="height: 30px;position: absolute;top: 0px;left: 340px;" src="saveButton.png" onclick="saveNewPlayer()" />

                </div>
                <div id="removePlayerDiv" style="display: none">

                    <label for="removePlayerName">Player to Remove:</label>
                    <select id="removePlayerName" style="height: 30px;background-color: rgba(255, 255, 255, 0.3);border: 4px double black;width:200px;margin-right:5px;" />
                    <img id="removePlayerSubmit" src="../assets/removeButton.png" style="height: 30px;height: 30px;position: absolute;top: 0px;left: 340px;" onclick="removePlayer()" />

                </div>

                <div id="dynamicHeight" style="position:absolute;top: 370px;width: 100%;">
                    <p style="position: absolute;top: 30px;left: 30px;font-size: 25px;">Lineup by Play Period:</p>
                    <img src="../assets/toggleColorsButton.png" onclick="colorToggle()" style="position:relative;top:55px;left:15px;-webkit-transform: scale(0.7);transform: scale(0.7);" />
                    <div class="playingTable" id="playingTable">
                        <div id="titleRow" class="titleRow">
                            <div class="titleCell" hide1st="false"><p>20-16 Minutes</p></div>
                            <div class="titleCell"><p>16-12 Minutes</p></div>
                            <div class="titleCell"><p>12-8 Minutes</p></div>
                            <div class="titleCell"><p>8-4 Minutes</p></div>
                            <div class="titleCell"><p>4-0 Minutes</p></div>
                            <div class="titleCell"><p>HALF<br>TIME</p></div>
                            <div class="titleCell" hide1st="false"><p>20-16 Minutes</p></div>
                            <div class="titleCell"><p>16-12 Minutes</p></div>
                            <div class="titleCell"><p>12-8 Minutes</p></div>
                            <div class="titleCell"><p>8-4 Minutes</p></div>
                            <div class="titleCell"><p>4-0 Minutes</p></div>
                        </div>
                        <div id="playingRow1" class="playingRow1">
                            <div id="playingCell1x1" class="playingCell" hide1st="false"></div>
                            <div id="playingCell1x2" class="playingCell"></div>
                            <div id="playingCell1x3" class="playingCell"></div>
                            <div id="playingCell1x4" class="playingCell"></div>
                            <div id="playingCell1x5" class="playingCell"></div>
                            <div id="playingCell1x6" class="playingCell" halftime="true"><p>|</p></div>
                            <div id="playingCell1x7" class="playingCell" hide1st="false"></div>
                            <div id="playingCell1x8" class="playingCell"></div>
                            <div id="playingCell1x9" class="playingCell"></div>
                            <div id="playingCell1x10" class="playingCell"></div>
                            <div id="playingCell1x11" class="playingCell"></div>
                        </div>
                        <div id="playingRow2" class="playingRow2">
                            <div id="playingCell2x1" class="playingCell" hide1st="false"></div>
                            <div id="playingCell2x2" class="playingCell"></div>
                            <div id="playingCell2x3" class="playingCell"></div>
                            <div id="playingCell2x4" class="playingCell"></div>
                            <div id="playingCell2x5" class="playingCell"></div>
                            <div id="playingCell2x6" class="playingCell" halftime="true"><p>|</p></div>
                            <div id="playingCell2x7" class="playingCell" hide1st="false"></div>
                            <div id="playingCell2x8" class="playingCell"></div>
                            <div id="playingCell2x9" class="playingCell"></div>
                            <div id="playingCell2x10" class="playingCell"></div>
                            <div id="playingCell2x11" class="playingCell"></div>
                        </div>
                        <div id="playingRow3" class="playingRow3">
                            <div id="playingCell3x1" class="playingCell" hide1st="false"></div>
                            <div id="playingCell3x2" class="playingCell"></div>
                            <div id="playingCell3x3" class="playingCell"></div>
                            <div id="playingCell3x4" class="playingCell"></div>
                            <div id="playingCell3x5" class="playingCell"></div>
                            <div id="playingCell3x6" class="playingCell" halftime="true"><p>|</p></div>
                            <div id="playingCell3x7" class="playingCell" hide1st="false"></div>
                            <div id="playingCell3x8" class="playingCell"></div>
                            <div id="playingCell3x9" class="playingCell"></div>
                            <div id="playingCell3x10" class="playingCell"></div>
                            <div id="playingCell3x11" class="playingCell"></div>
                        </div>
                        <div id="playingRow4" class="playingRow4">
                            <div id="playingCell4x1" class="playingCell" hide1st="false"></div>
                            <div id="playingCell4x2" class="playingCell"></div>
                            <div id="playingCell4x3" class="playingCell"></div>
                            <div id="playingCell4x4" class="playingCell"></div>
                            <div id="playingCell4x5" class="playingCell"></div>
                            <div id="playingCell4x6" class="playingCell" halftime="true"><p>|</p></div>
                            <div id="playingCell4x7" class="playingCell" hide1st="false"></div>
                            <div id="playingCell4x8" class="playingCell"></div>
                            <div id="playingCell4x9" class="playingCell"></div>
                            <div id="playingCell4x10" class="playingCell"></div>
                            <div id="playingCell4x11" class="playingCell"></div>
                        </div>
                        <div id="playingRow5" class="playingRow5">
                            <div id="playingCell5x1" class="playingCell" hide1st="false"></div>
                            <div id="playingCell5x2" class="playingCell"></div>
                            <div id="playingCell5x3" class="playingCell"></div>
                            <div id="playingCell5x4" class="playingCell"></div>
                            <div id="playingCell5x5" class="playingCell"></div>
                            <div id="playingCell5x6" class="playingCell" halftime="true"><p>|</p></div>
                            <div id="playingCell5x7" class="playingCell" hide1st="false"></div>
                            <div id="playingCell5x8" class="playingCell"></div>
                            <div id="playingCell5x9" class="playingCell"></div>
                            <div id="playingCell5x10" class="playingCell"></div>
                            <div id="playingCell5x11" class="playingCell"></div>
                        </div>

                    </div>
                    <p style="position: absolute;top: 230px;left: 30px;font-size: 25px;">Bench by Play Period:</p>
                    <div class="benchTable" id="benchTable">
                        <div id="titleRow" class="titleRow">
                            <div class="titleCell" hide1st="false"><p>20-16 Minutes</p></div>
                            <div class="titleCell"><p>16-12 Minutes</p></div>
                            <div class="titleCell"><p>12-8 Minutes</p></div>
                            <div class="titleCell"><p>8-4 Minutes</p></div>
                            <div class="titleCell"><p>4-0 Minutes</p></div>
                            <div class="titleCell"><p>HALF<br>TIME</p></div>
                            <div class="titleCell" hide1st="false"><p>20-16 Minutes</p></div>
                            <div class="titleCell"><p>16-12 Minutes</p></div>
                            <div class="titleCell"><p>12-8 Minutes</p></div>
                            <div class="titleCell"><p>8-4 Minutes</p></div>
                            <div class="titleCell"><p>4-0 Minutes</p></div>
                        </div>
                        <div id="benchRow" class="benchRow">
                            <div class="benchCell" id="benchCell1" hide1st="false"></div>
                            <div class="benchCell" id="benchCell2"></div>
                            <div class="benchCell" id="benchCell3"></div>
                            <div class="benchCell" id="benchCell4"></div>
                            <div class="benchCell" id="benchCell5"></div>
                            <div class="benchCell" id="benchCell6" halftime="true"><p>|</p></div>
                            <div class="benchCell" id="benchCell7" hide1st="false"></div>
                            <div class="benchCell" id="benchCell8"></div>
                            <div class="benchCell" id="benchCell9"></div>
                            <div class="benchCell" id="benchCell10"></div>
                            <div class="benchCell" id="benchCell11"></div>
                        </div>
                    </div>
                    
                    <div id="statSheet"></div>
                </div>
            </div>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
	name: "ViewPage",
	data: function () {
		return {
			pageSrc: ''
		};
	},
}
</script>

<style scoped>
</style>
