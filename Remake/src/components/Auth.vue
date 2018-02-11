<template>
	<div id="EnterCoachID">
    <p style="position: absolute;top: 180px;left: 115px;font-size: 30px;">Welcome to Line 'em Up!</p>
    <iframe style="position: absolute; top: 340px; left: 110px; width: 420px; height: 320px;" src="https://www.youtube.com/embed/fHD48LRUyno?" frameborder="0" allowFullScreen></iframe>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
	name: 'Auth',
	mounted() {
    var uiConfig = {
      signInSuccessUrl: '/editor',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    },
}
</script>

<style>
	@import "firebaseui/dist/firebaseui.css";

</style>
