<template>
  <div id="everythingDiv">
    <div id="navHeader" onclick="backToHome()"><p id="titleText">Line 'em Up</p><p id="subtitleText">Lineup Generator</p></div>
    <input value="Sign Out" id="logoutButton" type="button">
    <router-view/>
    <div id="supportButton" style="top: 875px; width: 978px;">
      <p>Support the Developer?</p>
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="PVGPVVPNV8F3Y">
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>
      <p style="position: absolute; top: 0px; right: 0px;">
        <a href="https://www.youtube.com/watch?v=fHD48LRUyno">Click Here</a> to view a tutorial.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('./assets/main.css');

  #logoutButton {
    z-index: 1;
  }

  #everythingDiv {
    overflow: hidden;
  }
</style>
