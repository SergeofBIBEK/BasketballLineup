<template>
  <div id ="ChooseLineup">
  <p style="position: absolute;top: 180px;left: 120px;font-size: 30px;">Choose a Lineup:</p>
  <select id="lineupSelector" style="position: absolute;top: 218px;left: 120px;height: 35px;font-size: 15px;background-color: rgba(255, 255, 255, 0.3);border: 4px double black;width: 240px;">
    <option value="loading">Loading...</option>
  </select>
  <img class="submitButton" src="../assets/submitButton.png" onclick="navToLineup()" style="position: absolute;top: 220px;left: 370px;" />
  <img src="../assets/deleteButton.png" onclick="deleteLineup()" style="position: absolute;top: 256px;left: 370px;" />

  <p style="position: absolute;top: 325px;left: 120px;font-size: 30px;">New Lineup:</p>
  <label for="newLineupInput" style="position: absolute;top: 370px;left: 120px;font-size: 18px;">New Lineup Name/ID:</label>
  <input type="text" id="newLineupInput" style="position: absolute;top: 397px;left: 120px;height: 35px;width: 240px;background-color: rgba(255, 255, 255, 0.3);border: 4px double black;font-size: 18px;" />
  <label for="newLineupInput2" style="position: absolute;top: 440px;left: 120px;font-size: 18px;">Choose your League:</label>
  <select type="text" id="newLineupInput2" style="position: absolute;top: 467px;left: 120px;height: 35px;font-size: 15px;background-color: rgba(255, 255, 255, 0.3);border: 4px double black;width: 240px;">
    <option value="4">K-1 Basketball</option>
    <option value="4">2-3 Basketball</option>
    <option value="5">4-5 Basketball</option>
  </select>
  <img class="submitButton" src="../assets/submitButton.png" style="position: absolute;top: 468px;left: 370px;" onclick="setUpNewLineup()">
  </div>
</template>

<script>
export default {
  name: 'Lineups',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>
