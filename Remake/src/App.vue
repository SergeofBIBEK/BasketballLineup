<template>
  <div id="EverythingDiv">
    <div id="navHeader" onclick="backToHome()"><p id="titleText">Line 'em Up</p><p id="subtitleText">Lineup Generator</p></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('./assets/main.css');
</style>
